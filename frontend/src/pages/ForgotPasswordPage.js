import React, { useState } from 'react';
import '../styles/ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Por favor, introduce tu correo electrónico.');
            return;
        }

        // Aquí simularíamos enviar un email para resetear la contraseña
        setMessage('Si el correo existe en el sistema, recibirás un enlace para restablecer tu contraseña.');

        // Limpiar el campo de email
        setEmail('');
    };

    return (
        <div className="forgot-password-page">
            <h1>Recuperar Contraseña</h1>

            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Introduce tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ForgotPasswordPage;
