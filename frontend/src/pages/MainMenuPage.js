import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainMenuPage.css';
import { IconContext } from "react-icons";
import { LuCalendarDays } from "react-icons/lu";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaGears } from "react-icons/fa6";
import BottomNavBar from '../components/BottomNavBar';


const MainMenuPage = () => {
  const navigate = useNavigate();
  return (
    <div className="main-menu-container">
      <h1>Bienvenid@ a tu gimnasio</h1>
      <div className="menu-options">
        <button onClick={() => navigate('/book-class')}>
        <span className="button-content">
          <IconContext.Provider value={{ className: "button_icon" }}><LuCalendarDays /></IconContext.Provider>
          Reservar
        </span>
        </button>
        <button onClick={() => navigate('/trainers')}>
        <span className="button-content">
          <IconContext.Provider value={{ className: "button_icon" }}><BsPersonLinesFill /></IconContext.Provider>
          Entrenadores
        </span>
        </button>
        <button onClick={() => navigate('/settings')}>
        <span className="button-content">
          <IconContext.Provider value={{ className: "button_icon" }}><FaGears /></IconContext.Provider>
          Configuración
        </span>
        </button>
      </div>
      <BottomNavBar />
    </div>
  );
}

export default MainMenuPage;
