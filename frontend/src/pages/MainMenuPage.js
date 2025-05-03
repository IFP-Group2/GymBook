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
      // Simulando la llamada al backend
      const token = localStorage.getItem('authToken');
      try {
        // Si no tienes un backend real, simula los datos de menú aquí.
        // Puedes omitir la llamada Axios y directamente asignar los datos.
        const response = {
          data: {
            menuItems: [
              { title: 'Reservar', link: '/book-class', icon: <LuCalendarDays /> },
              { title: 'Entrenadores', link: '/trainers', icon: <BsPersonLinesFill /> },
              { title: 'Configuración', link: '/settings', icon: <FaGears /> },
            ]
          }
        };
        setData(response.data.menuItems); // Asignamos los datos simulados
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
          {data.map((item, index) => (
            <button key={index} onClick={() => navigate(item.link)}>
              <span className="button-content">
                <IconContext.Provider value={{ className: "button_icon" }}>
                  {item.icon}
                </IconContext.Provider>
                {item.title}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <BottomNavBar />
    </div>
  );
};

export default MainMenuPage;

