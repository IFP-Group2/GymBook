import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//Funcion ResetPassword Page que contiene la logica para establecer una nueva contraseña
const ResetPasswordPage = () => {
    const { token } = useParams(); // Obtener el token de la URL
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            setMessage('Por favor, ingresa una nueva contraseña.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/reset-password', {
                token, // Enviar el token
                newPassword, // Enviar la nueva contraseña
            }, {
                headers: {
                    'Content-Type': 'application/json', // Asegúrate de enviar el encabezado correcto
                },
            });
            setMessage('Contraseña actualizada correctamente.');
        } catch (error) {
            setMessage('Error al actualizar la contraseña.');
            console.error(error); // Imprime el error en la consola
        }

        // Limpiar campo
        setNewPassword('');
    };
    //Apariencia de la pagina
    return (
        <div className="reset-password-container">
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <input
                    type="password"
                    placeholder="Nueva contraseña"
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
