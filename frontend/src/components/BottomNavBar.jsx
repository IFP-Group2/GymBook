import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BottomNavBar.css';
import { LuCalendarDays } from "react-icons/lu";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaGears } from "react-icons/fa6";
import homeIcon from '../assets/logos/logo_gymbook_favicon_dark.png'; // ruta a tu imagen PNG

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <button
        onClick={() => navigate('/mainmenu')}
        className={location.pathname === '/mainmenu' ? 'active' : ''}
      >
        <img src={homeIcon} alt="Inicio" className="bottom-icon" />
        {/* <span>Inicio</span> */}
      </button>
      <button 
        onClick={() => navigate('/book-class')} 
        className={location.pathname === '/book-class' ? 'active' : ''}
      >
        <LuCalendarDays />
        {/* <span>Reservar</span> */}
      </button>
      <button 
        onClick={() => navigate('/trainers')} 
        className={location.pathname === '/trainers' ? 'active' : ''}
      >
        <BsPersonLinesFill />
        {/* <span>Entrenadores</span> */}
      </button>
      <button 
        onClick={() => navigate('/settings')} 
        className={location.pathname === '/settings' ? 'active' : ''}
      >
        <FaGears />
        {/* <span>Ajustes</span> */}
      </button>
    </div>
  );
};

export default BottomNavBar;
