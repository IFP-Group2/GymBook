import React from 'react';
import '../styles/SettingsPage.css';
import { Link } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import LogoutButton from '../components/LogoutButton'; // Importar el botón de cerrar sesión
import useApplyDarkMode from '../hooks/useApplyDarkMode'; // Hook de DarkMode

// Funcion SettingsPage para la pagina de configuracion
const SettingsPage = () => {

    // Aplicamos el modo oscuro según sessionStorage
    useApplyDarkMode();

    // Apariencia de la pagina
    return (
        <div className="settings-container">
            <h1>Configuración</h1>

            <div className="settings-section">
                <h2>Cuenta</h2>
                <Link to="/edit-account">
                    <button>Editar cuenta</button>
                </Link>
            </div>

            <div className="settings-section">
                <h2>Notificaciones</h2>
                <Link to="/manage-notifications">
                    <button>Gestionar notificaciones</button>
                </Link>
            </div>

            <div className="settings-section">
                <h2>Preferencias</h2>
                <Link to="/dark-mode">
                    <button>Cambiar a modo oscuro</button>
                </Link>
            </div>

            {/* Sección para cerrar sesión */}
            <div className="settings-section">
                <h2>Sesión</h2>
                <LogoutButton /> {/* Botón de cierre de sesión */}
            </div>

            {/* Menú de navegación en la parte inferior */}
            <BottomNavBar />
        </div>
    );
};

export default SettingsPage;
