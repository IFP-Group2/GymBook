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
        const { name, email, password, phone, role } = formData;

        if (!name || !email || !password || !phone) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/usuarios', { name, email, password, phone, role });
            setMessage(`¡Inscripción completada para ${name} como ${role}!`);
            setFormData({ name: '', email: '', password: '', phone: '', role: 'usuario' });
        } catch (error) {
            setMessage('Error al registrarse. Intenta de nuevo.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Crear Cuenta</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="usuario">Usuario</option>
                    <option value="entrenador">Entrenador</option>
                </select>
                <button type="submit">Registrarse</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default SignUpPage;