import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddTrainerPage.css';

const AddTrainerPage = () => {
    const [especialidad, setEspecialidad] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    // Cargar la lista de usuarios al montar el componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch('http://localhost:8080/usuarios');
                const data = await res.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        if (!especialidad || !experiencia || !usuarioId) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Crear el objeto entrenador con el formato que el backend espera
        const newTrainer = {
            especialidad,
            experiencia: parseInt(experiencia),
            usuario: { id: parseInt(usuarioId) } // Asegúrate de que el ID sea un número
        };

        try {
            // Enviar la solicitud POST al backend
            const response = await fetch('http://localhost:8080/entrenadores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTrainer)
            });

            // Si la respuesta es exitosa, redirigir a la página de entrenadores
            if (response.status === 201) {
                navigate('/trainers');
            } else {
                alert('Error al guardar el entrenador.');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };

    return (
        <div className="add-trainer-container">
            <h1>Añadir nuevo entrenador</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Especialidad:</label>
                    <input
                        type="text"
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Experiencia (años):</label>
                    <input
                        type="number"
                        value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Usuario:</label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">Añadir Entrenador</button>
            </form>
        </div>
    );
};

export default AddTrainerPage;