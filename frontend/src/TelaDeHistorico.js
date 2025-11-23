import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8000/api/chat/mensagens/';

function TelaDeHistorico({ activeUser }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const AjustaDataHora = (dateString) => {
  const date = new Date(dateString);
  const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    };

    return date.toLocaleString('pt-BR', options);

  };

  useEffect(() => {

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}?usuario=${activeUser}`);
        setHistory(response.data);
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
        setError("Não foi possível carregar o histórico de mensagens.");
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

  }, [activeUser]);

  if (loading) return <p>Carregando histórico do Usuário {activeUser}...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (

    <div className="chat-box">

      <h2>Histórico de Mensagens - Usuário {activeUser}</h2>

      {history.length === 0 ? (
        <p className="div-historico"> Nenhuma mensagem encontrada enviada pelo Usuário {activeUser}.</p>
      ) : (
        history.map((msg) => (
          <div key={msg.id} className="div-historico">
            <p>Mensagem enviada no dia <strong>{AjustaDataHora(msg.data_envio)} </strong> para o chatbot pelo <strong>Usuario {activeUser}</strong></p>
            <div className='div-efeito-pergunta'>
              <p className="resposta-historico">Pergunta enviada pelo Usuario {activeUser} : <br></br><br></br> <strong> {msg.texto}</strong></p>
            </div>
            <br></br>
            <div className='div-efeito-resposta'>
              <p>Resposta do Chatbot: *{msg.resposta_chatbot}*</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TelaDeHistorico;