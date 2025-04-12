import React, { useState } from 'react';
import '../styles/ManageNotificationsPage.css';

const ManageNotificationsPage = () => {
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [appNotifications, setAppNotifications] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = () => {
        // Aquí podrías enviar los cambios al servidor en el futuro
        setMessage('¡Preferencias de notificación guardadas correctamente!');
    };

    return (
        <div className="settings-subpage">
            <h1>Gestionar Notificaciones</h1>

            <form className="notifications-form">
                <label>
                    <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                    Recibir notificaciones por Email
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={smsNotifications}
                        onChange={(e) => setSmsNotifications(e.target.checked)}
                    />
                    Recibir notificaciones por SMS
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={appNotifications}
                        onChange={(e) => setAppNotifications(e.target.checked)}
                    />
                    Recibir notificaciones en la App
                </label>

                <button type="button" onClick={handleSave}>
                    Guardar Cambios
                </button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ManageNotificationsPage;
