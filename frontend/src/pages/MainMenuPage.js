import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainMenuPage.css';
import { IconContext } from "react-icons";
import { LuCalendarDays } from "react-icons/lu";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaGears } from "react-icons/fa6";
import BottomNavBar from '../components/BottomNavBar';
import axios from 'axios';

const MainMenuPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:8080/api/main-menu', { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Error al obtener los datos.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-menu-container">
      <h1>Bienvenid@ a tu gimnasio</h1>
      {error && <p>{error}</p>}
      {data ? (
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
      ) : (
        <p>Cargando...</p>
      )}
      <BottomNavBar />
    </div>
  );
}

export default MainMenuPage;
