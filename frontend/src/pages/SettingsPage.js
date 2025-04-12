import React from 'react';
import '../styles/SettingsPage.css';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
    return (
        <div className="settings-container">
            <h1>Configuración</h1>

            <div className="settings-section">
                <h2>Cuenta</h2>
                <Link to="/change-password">
                    <button>Cambiar contraseña</button>
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
        </div>
    );
};

export default SettingsPage;
