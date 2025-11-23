import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8000/api/chat/mensagens/';

function TelaDoChat({ activeUser }) {
  const [sessionMessages, setSessionMessages] = useState([]);
  const [NovaMensagem, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const AjustaDataHora = (dateString) => {

  if (!dateString) return 'Sem data';

  const date = new Date(dateString);
  const options = {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    };

    return date.toLocaleString('pt-BR', options);
  }
  
  const EnvioMensagem = async (e) => {
    e.preventDefault();

    if (!NovaMensagem.trim()) return;

    setLoading(true);
    setError(null);

    const userMessage = NovaMensagem;
    const dataToSend = {
      texto: userMessage,
      usuario: activeUser,
    };

    try {

      const response = await axios.post(API_URL, dataToSend);
      const savedMessage = response.data;

      setSessionMessages(prevMessages => [...prevMessages, savedMessage]);
      setNewMessage('');

    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setError("Erro ao se comunicar com o chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="chat-box">

      <div>

        <div><h3>Solicitações para o Chatbot</h3></div>
        <p className='texto-chat'>No que podemos ajuda-lo ?</p>
        <div className="message-area">
          {sessionMessages.length === 0 ? (
            <p>Envie sua primeira mensagem!</p>
          ) : (
            sessionMessages.map((msg, index) => (
              <div key={index}>
                <div className={msg.usuario === activeUser ? "user-message" : "chatbot-message"}>
                  <strong>Você:</strong> {msg.texto}
                  <br></br>
                  <span className="hora-chat">{AjustaDataHora(msg.data_envio)} </span>
                </div>

                <div className="chatbot-response">{msg.resposta_chatbot}</div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={EnvioMensagem} className="input-form">
          <input
            type="text"
            value={NovaMensagem}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={loading}
            className="text-input"
          />
          <button type="submit" disabled={loading} className="btn-send">
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}

      </div>

    </section>
  );
}


export default TelaDoChat;