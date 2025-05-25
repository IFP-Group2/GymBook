import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import useApplyDarkMode from '../hooks/useApplyDarkMode'; // Hook de DarkMode

function LoginPage() {
    // Definición de los estados para el formulario y el mensaje de respuesta
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Aplicamos el modo oscuro según sessionStorage
    useApplyDarkMode();

    // Manejo del envío del formulario
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
    
            // Verificar si el inicio de sesión fue exitoso
            if (response.data.message === "Login exitoso") {
                console.log(response.data);
                console.log(response.data.username);
                // Obtener los datos del usuario desde la respuesta del servidor
                const { username, role, token } = response.data;
    
                // Guardar en el Session Storage (corrección del campo username)
                sessionStorage.setItem('username', username || email); // Si no hay nombre, guarda el email
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('dark_mode', true);
    
                setMessage('Inicio de sesión exitoso');
                navigate('/mainmenu');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage('Credenciales incorrectas. Verifica tu email y contraseña.');
                } else {
                    setMessage(error.response.data.message || 'Error en el inicio de sesión');
                }
            } else {
                setMessage('Error al conectar con el servidor');
            }
        }
    };    

    // Ruta del logo en la carpeta public
    const logo = '/assets/logos/logo_gymbook_dark.png';

    return (
        <div className="login-container">
            {/* Mostrar el logo de la aplicación */}
            <img src={logo} alt="GymBook logo" className="login-logo" />

            {/* Título de la página */}
            <h1 className="h1_inicio">Inicia sesión</h1>

            {/* Formulario de inicio de sesión */}
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

            {/* Enlace para recuperar la contraseña */}
            <div className="forgot-password">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>

            {/* Enlace para crear una cuenta nueva */}
            <div className="signup-link">
                <p>¿No tienes cuenta?</p>
                <Link to="/signup">Crear una cuenta</Link>
            </div>
        </div>
    );
}

export default LoginPage;
