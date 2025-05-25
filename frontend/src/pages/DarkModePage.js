import React, { useState, useEffect } from 'react';
import '../styles/DarkModePage.css';
import BottomNavBar from '../components/BottomNavBar';

const DarkModePage = () => {
    // Inicializamos darkMode leyendo del sessionStorage (con fallback a false)
    const [darkMode, setDarkMode] = useState(() => {
        return sessionStorage.getItem('dark_mode') === 'true';
    });

    // Aplicamos las clases de modo oscuro o claro cuando cambia el estado
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }

        // Guardamos la preferencia en sessionStorage cada vez que cambie
        sessionStorage.setItem('dark_mode', darkMode);
        console.log("DarkMode: "+darkMode);
    }, [darkMode]);

    const handleToggle = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <div className="dark-mode-page">
            <h1>Preferencias</h1>
            <div className="dark-mode-toggle">
                <label>
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={handleToggle}
                    />
                    {darkMode == true ? "Desactivar" : "Activar"} Modo Oscuro
                </label>
            </div>

            {/* Menú */}
            <BottomNavBar />
        </div>
    );
};

export default DarkModePage;
