import React, { useState } from 'react'; import axios from 'axios'; import '../styles/ForgotPasswordPage.css';

const ForgotPasswordPage = () => { const [email, setEmail] = useState(''); const [message, setMessage] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
        setMessage('Por favor, ingresa tu correo electrónico.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/auth/forgot-password', {
            email,
        });
        setMessage('Revisa tu correo para instrucciones de recuperación.');
    } catch (error) {
        setMessage('Error al enviar el correo de recuperación.');
    }

    // Limpiar campo
    setEmail('');
};

return (
    <div className="forgot-password-container">
        <h1>Recuperar Contraseña</h1>
        <form onSubmit={handleSubmit} className="forgot-password-form">
            <input
                type="email"
                placeholder="Correo electrónico"
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