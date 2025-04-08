import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainMenuPage.css';

const MainMenuPage = () => {
  const navigate = useNavigate();
  return (
    <div className="main-menu-container">
      <h1>Bienvenid@ a tu gimnasio</h1>
      <div className="menu-options">
        <button onClick={() => navigate('/book-class')}>
          Reservar Clase
        </button>
        <button onClick={() => navigate('/trainers')}>
          Ver Entrenadores
        </button>
        <button onClick={() => navigate('/settings')}>
          Configuraciones
        </button>
      </div>
    </div>
  );
}

export default MainMenuPage;
