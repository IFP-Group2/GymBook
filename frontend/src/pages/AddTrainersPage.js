import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTrainerPage = () => {
    const [name, setName] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un nuevo entrenador
        const newTrainer = {
            name,
            especialidad,
            experiencia
        };

        try {
            // Enviar el nuevo entrenador a la API
            const response = await fetch('http://localhost:8080/api/entrenadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTrainer),
            });

            if (response.ok) {
                // Redirigir a la página de entrenadores
                navigate('/trainers');
            } else {
                console.error('Error al guardar el entrenador');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };

    return (
        <div>
            <h1>Agregar nuevo entrenador</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Especialidad:</label>
                    <input
                        type="text"
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                    />
                </div>
                <div>
                    <label>Experiencia:</label>
                    <input
                        type="text"
                        value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                    />
                </div>
                <button type="submit">Añadir Entrenador</button>
            </form>
        </div>
    );
};

export default AddTrainerPage;