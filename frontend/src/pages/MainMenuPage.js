import React from 'react';
import '../styles/MainMenuPage.css';

const MainMenuPage = () => {
  return (
    <div className="main-menu-container">
      <h1>Bienvenido a tu gimnasio</h1>
      <div className="menu-options">
        <button>Reservar Clase</button>
        <button>Ver Entrenadores</button>
        <button>Consultar Progreso</button>
        <button>Historial de Pagos</button>
        <button>Configuraciones</button>
      </div>
    </div>
  );
}

export default MainMenuPage;
