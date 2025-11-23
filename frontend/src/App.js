import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import TelaDoChat from './TelaDoChat';
import TelaDeHistorico from './TelaDeHistorico';
import './App.css';
import Logo4blue from './4blue.png';

function App() {

  const [activeUser, EscolhaUsuario] = useState(() => {
    return localStorage.getItem('activeUser') || null;
  });

  const TrocaUsuario = (user) => {
    EscolhaUsuario(user);
    localStorage.setItem('activeUser', user);
  };

  const DeslogueUsuario = () => {
    EscolhaUsuario(null);
    localStorage.removeItem('activeUser');
  };

  if (!activeUser) {
    return (
      <section>
        <div className="imagem-logo"><img src={Logo4blue} alt="Logo da 4blue"></img></div>
        <div className="logo-divisoria"></div>

        <section >

          <div className="Sessoes">

            <h3>Simulador de Chatbot (Prototipo Processo Seletivo <span className="azul4blue">4blue</span>)</h3>
            <br></br>
            <h1>Seleção de Perfil </h1>
            <p>Escolha o perfil para iniciar a sessão de chat.</p>
            <br></br>

            <div>

              <button className="btn-login-usuario" onClick={() => TrocaUsuario('A')} > Entrar como Usuário A </button>
              <button className="btn-login-usuario" onClick={() => TrocaUsuario('B')} >Entrar como Usuário B </button>

            </div>
          </div>

        </section>

        <section className="footer-notes">

          <small>Protótipo Utilizado para SOMENTE o processo seletivo.</small>
          <br></br>
          <small>Logo utilizado apenas para fins de estetica, todos direitos são reservados a empresa</small>

        </section>

      </section>
    );
  }

  return (
    <Router>

      <div className="div-login">

        <header className="header-logo-logado">

          <div className="imagem-logo"><img src={Logo4blue} alt="Logo da 4blue"></img></div>

          <div className="header-login-logoff">

            <span className="user-info">Usuário Logado: Usuário {activeUser}</span>
            <button onClick={DeslogueUsuario} className="btn-logout">Logout</button>


          </div>

        </header>

        <div className="div-btn-ajuste">

          <Link to="/Chat" className="btn-mudança-pagina">Chat</Link>
          <Link to="/historico" className="btn-mudança-pagina">Histórico de Solicitações</Link>


        </div>


        <Routes>
          <Route path="/Chat" element={<TelaDoChat activeUser={activeUser} />} />
          <Route path="/historico" element={<TelaDeHistorico activeUser={activeUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </div>

    </Router>
  );
}

export default App;