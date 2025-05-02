import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'usuario'
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, phone } = formData;
 
        if (!name || !email || !password || !phone) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }
 
        try {
            const response = await axios.post('http://localhost:8080/usuarios', {
                nombre: name, 
                email,
                password,
                telefono: phone 
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
 
            setMessage(`¡Inscripción completada para ${name}!`);
            setFormData({ name: '', email: '', password: '', phone: '' });
        } catch (error) {
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || 'Hubo un problema al registrarse. Intenta de nuevo.'}`);
            } else {
                setMessage('Error al registrarse. Intenta de nuevo.');
            }
        }
    };
    
    return (
        <div className="signup-container">
            <h1>Crear Cuenta</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <button type="submit">Registrarse</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default SignUpPage;
