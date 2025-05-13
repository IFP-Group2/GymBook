import React from 'react';
import { useNavigate } from 'react-router-dom';

// Botón para cerrar sesión y redirigir al login
const LogoutButton = () => {
    const navigate = useNavigate();

    // Manejar el cierre de sesión
    const handleLogout = () => {
        // Limpiar el almacenamiento de sesión
        sessionStorage.clear();
        // Redirigir al login
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} style={logoutButtonStyle}>
            Cerrar Sesión
        </button>
    );
};

// Estilo para el botón de cerrar sesión (opcional)
const logoutButtonStyle = {
    padding: '10px 20px',
    marginTop: '15px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
};

export default LogoutButton;
