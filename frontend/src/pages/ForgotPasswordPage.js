import React, { useState } from 'react'; import axios from 'axios'; import '../styles/ForgotPasswordPage.css';
//Funcion que contiene la logica de ForgotPasswordPage
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState(''); const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Por favor, ingresa tu correo electrónico.');//Mensaje si no se rellena el campo email
            return;
        }
        //Bloque try-catch destinado al correo de recuperacion
        try {
            const response = await axios.post('http://localhost:8080/auth/forgot-password', {
                email,
            });
            setMessage('Revisa tu correo para instrucciones de recuperación.');//Mensaje de exito
        } catch (error) {
            //Mensaje de error si no se puede enviar el correo de recuperacion
            setMessage('Error al enviar el correo de recuperación.');
        }

        setEmail('');
    };
    //Apariencia de ForgotPasswordPage
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