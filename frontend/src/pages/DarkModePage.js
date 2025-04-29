import React, { useState } from 'react';
import '../styles/DarkModePage.css';
//Funcion DarkModePage que contiene la logica de cambio de color del sistema
const DarkModePage = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        //Condicional if-else que cambia el color del sistema en funcion este activado o no
        if (!darkMode) {
            document.body.style.backgroundColor = '#222';
            document.body.style.color = '#eee';
        } else {
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#333';
        }
    };
    //Apariencia de la pagina
    return (
        <div className="dark-mode-page">
            <h1>Preferencias</h1>

            <div className="dark-mode-toggle">
                <label>
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                    />
                    Activar Modo Oscuro
                </label>
            </div>
        </div>
    );
};

export default DarkModePage;
