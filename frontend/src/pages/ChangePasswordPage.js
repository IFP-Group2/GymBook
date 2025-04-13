import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ChangePasswordPage.css';

const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage('La nueva contraseña no coincide.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/change-password', {
                currentPassword,
                newPassword,
            });
            setMessage('¡Contraseña cambiada exitosamente!');
        } catch (error) {
            setMessage('Error al cambiar la contraseña.');
        }

        // Limpiar campos
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="settings-subpage">
            <h1>Cambiar Contraseña</h1>
            <form onSubmit={handleSubmit} className="change-password-form">
                <input
                    type="password"
                    placeholder="Contraseña actual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Cambiar Contraseña</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ChangePasswordPage