import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginPage.css';
import { useNavigate, Link } from 'react-router-dom'; // 👈 Importar Link también

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });
            setMessage(response.data.message);
            navigate('/mainmenu'); // Redirigir si login exitoso
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Error en el inicio de sesión');
            } else {
                setMessage('Error al conectar con el servidor');
            }
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>

            {/* Mensaje de error o éxito */}
            {message && <p>{message}</p>}

            {/* Aquí agregamos el "¿Olvidaste tu contraseña?" */}
            <div className="forgot-password">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
        </div>
    );
}

export default LoginPage;
