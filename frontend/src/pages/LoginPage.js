import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';

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
            // Mensaje de la respuesta
            setMessage(response.data.message);
            if (response.data.message === "Login exitoso") {
                localStorage.setItem('userEmail', email);
                navigate('/mainmenu');
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                // Manejo de error 401
                if (error.response.status === 401) {
                    setMessage('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
                } else {
                    setMessage(error.response.data.message || 'Error en el inicio de sesión');
                }
            } else {
                setMessage('Error al conectar con el servidor');
            }
        }
    };
    // Referencia a la imagen en la carpeta public
    const logo = '/assets/logos/logo_gymbook_dark.png'; // Ruta a tu imagen PNG

    return (
        <div className="login-container">
            {/* Logo arriba del formulario */}
            <img src={logo} alt="GymBook logo" className="login-logo" />

            <h1 className="h1_inicio">Inicia sesión</h1>
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
            {message && <p>{typeof message === 'string' ? message : JSON.stringify(message)}</p>}

            {/* Aquí agregamos el "¿Olvidaste tu contraseña?" */}
            <div className="forgot-password">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="signup-link">
                <p>¿No tienes cuenta?</p>
                <Link to="/signup">Crear una cuenta</Link>
            </div>
        </div>
    );
}

export default LoginPage;