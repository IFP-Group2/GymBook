import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTrainerPage = () => {
    const { id } = useParams(); // Obtener el ID del entrenador desde la URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [experiencia, setExperiencia] = useState('');

    // Cargar los datos del entrenador al montar el componente
    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/entrenadores/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setEspecialidad(data.especialidad);
                    setExperiencia(data.experiencia);
                } else {
                    console.error('Error al cargar el entrenador');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
            }
        };

        fetchTrainer();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos actualizados
        const updatedTrainer = {
            name,
            especialidad,
            experiencia
        };

        try {
            // Enviar los datos actualizados a la API
            const response = await fetch(`http://localhost:8080/api/entrenadores/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTrainer),
            });

            if (response.ok) {
                // Redirigir a la página de entrenadores
                navigate('/trainers');
            } else {
                console.error('Error al actualizar el entrenador');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };

    return (
        <div>
            <h1>Editar Entrenador</h1>
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
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditTrainerPage;