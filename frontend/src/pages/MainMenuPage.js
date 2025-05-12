import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainMenuPage.css';
import { IconContext } from "react-icons";
import { LuCalendarDays } from "react-icons/lu";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaGears } from "react-icons/fa6";
import BottomNavBar from '../components/BottomNavBar';

const MainMenuPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Obtener el nombre de usuario desde el Session Storage
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Actualizar el estado con el nombre del usuario
    } else {
      setUsername('Usuario'); // Valor por defecto si no hay nombre
    }

    // Simulación de obtención de datos del menú
    const fetchData = async () => {
      try {
        const response = {
          data: {
            menuItems: [
              { title: 'Reservar', link: '/book-class', icon: <LuCalendarDays /> },
              { title: 'Entrenadores', link: '/trainers', icon: <BsPersonLinesFill /> },
              { title: 'Configuración', link: '/settings', icon: <FaGears /> },
            ]
          }
        };
        setData(response.data.menuItems);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError('Error al obtener los datos.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-menu-container">
      {/* Mensaje de bienvenida con el nombre del usuario */}
      <h1>Bienvenid@ a tu gimnasio, {username}!</h1>
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
