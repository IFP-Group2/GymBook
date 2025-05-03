import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = new URLSearchParams(window.location.search).get('token');
        console.log("Token:", token); // Verificar que el token está siendo extraído correctamente
        console.log("New Password:", newPassword); // Verificar que la nueva contraseña es válida
    
        try {
            const response = await axios.post('http://localhost:8080/auth/reset-password', {
                token,
                newPassword
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response); // Verificar respuesta exitosa
    
            setMessage('Contraseña restablecida con éxito. Redirigiendo al login...');
            // Redirigir después de 3 milisegundos
            setTimeout(() => navigate('/login'), 3);
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error.response || error);
            setMessage('Error al restablecer la contraseña.');
        }
    };
    
    return (
        <div className="forgot-password-container">
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Restablecer</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ResetPasswordPage;