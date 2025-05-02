import React, { useState, useEffect } from 'react';
import '../styles/DarkModePage.css';
import BottomNavBar from '../components/BottomNavBar';

const DarkModePage = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
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
                    Activar Modo Oscuro
                </label>
            </div>
            
            {/* Menú */}
            <BottomNavBar />
        </div>
    );
};

export default DarkModePage;
