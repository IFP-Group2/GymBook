import React from 'react';
import '../styles/SettingsPage.css';

const SettingsPage = () => {
    return (
        <div className="settings-container">
            <h1>Configuración</h1>

            <div className="settings-section">
                <h2>Cuenta</h2>
                <button>Cambiar contraseña</button>
            </div>

            <div className="settings-section">
                <h2>Notificaciones</h2>
                <button>Gestionar notificaciones</button>
            </div>

            <div className="settings-section">
                <h2>Preferencias</h2>
                <button>Cambiar idioma</button>
            </div>
        </div>
    );
};

export default SettingsPage;
