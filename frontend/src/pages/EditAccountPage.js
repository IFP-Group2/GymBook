import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EditAccountPage.css';

const EditAccountPage = () => {
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
            await axios.put('http://localhost:8080/usuarios/editar', { name, email, password, phone, role });
            setMessage('Perfil actualizado con éxito.');
        } catch (error) {
            setMessage('Error al actualizar el perfil. Intenta de nuevo.');
        }
    };

    return (
        <div className="edit-account-container">
            <h1>Editar Cuenta</h1>
            <form className="edit-account-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
                <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="usuario">Usuario</option>
                    <option value="entrenador">Entrenador</option>
                </select>
                <button type="submit">Actualizar</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default EditAccountPage;