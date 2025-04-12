import React, { useState } from 'react';
import '../styles/ChangeLanguagePage.css';

const ChangeLanguagePage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [message, setMessage] = useState('');

    const handleSave = () => {
        if (!selectedLanguage) {
            setMessage('Por favor, selecciona un idioma.');
            return;
        }
        // Aquí podrías enviar el idioma seleccionado al servidor en el futuro
        setMessage(`¡Idioma cambiado a ${selectedLanguage}!`);
    };

    return (
        <div className="settings-subpage">
            <h1>Cambiar Idioma</h1>

            <form className="language-form">
                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                    <option value="">-- Selecciona un idioma --</option>
                    <option value="Español">Español</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                </select>

                <button type="button" onClick={handleSave}>
                    Guardar Cambios
                </button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ChangeLanguagePage;
