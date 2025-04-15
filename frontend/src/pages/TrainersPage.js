import React, { useState, useEffect } from 'react';
import '../styles/TrainersPage.css';
import { Link } from 'react-router-dom';

const TrainersPage = () => {
    const [trainers, setTrainers] = useState([]);

    // Cargar los entrenadores al montar el componente
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/entrenadores');
                if (response.ok) {
                    const data = await response.json();
                    setTrainers(data);
                } else {
                    console.error('Error al cargar los entrenadores');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
            }
        };

        fetchTrainers();
    }, []);

    // Función para eliminar un entrenador
    const deleteTrainer = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/entrenadores/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Actualizar la lista de entrenadores
                setTrainers(trainers.filter(trainer => trainer.id !== id));
            } else {
                console.error('Error al eliminar el entrenador');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };

    return (
        <div className="trainers-container">
            <h1>Nuestros Entrenadores</h1>

            <div className="trainer-list">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="trainer-card">
                        <h2>{trainer.name}</h2>
                        <p><strong>Especialidad:</strong> {trainer.especialidad}</p>
                        <p><strong>Experiencia:</strong> {trainer.experiencia}</p>
                        <div className="trainer-actions">
                            <Link to={`/edit-trainer/${trainer.id}`}>
                                <button>Editar</button>
                            </Link>
                            <button onClick={() => deleteTrainer(trainer.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="trainers-add">
                <Link to="/add-trainer">
                    <button>Añadir nuevo entrenador</button>
                </Link>
            </div>
        </div>
    );
};

export default TrainersPage;