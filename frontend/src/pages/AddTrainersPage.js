import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTrainerPage = () => {
    const [name, setName] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el envío del formulario por defecto

        // Validar que todos los campos estén completos
        if (!name || !especialidad || !experiencia) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Crear un nuevo entrenador
        const newTrainer = {
            nombre: name, // Asegúrate de que el nombre del campo coincida con el backend
            especialidad,
            experiencia,
            usuario: { id: 1 } // Asigna un ID de usuario válido (esto debe venir del frontend)
        };

        try {
            // Enviar el nuevo entrenador a la API
            const response = await fetch('http://localhost:8080/entrenadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTrainer),
            });

            if (response.status === 201) {
                // Redirigir a la página de entrenadores
                navigate('/trainers'); // Cambia a la ruta correcta
            } else {
                console.error('Error al guardar el entrenador');
                alert('Error al crear el entrenador');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert('Error de conexión. Intenta nuevamente.');
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