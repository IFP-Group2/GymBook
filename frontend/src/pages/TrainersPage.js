import React from 'react';
import '../styles/TrainersPage.css';
import { Link } from 'react-router-dom';


const TrainersPage = () => {
    // Datos de ejemplo
    const trainers = [
        { id: 1, name: 'Pablo Romero', especialidad: 'Fuerza, Pilates y Acondicionamiento', experiencia: '3 años' },
        { id: 2, name: 'Celia Martínez', especialidad: 'Yoga y Movilidad', experiencia: '5 años' },
        { id: 3, name: 'Carlos Pérez', especialidad: 'CrossFit y Resistencia', experiencia: '1 año' },
    ];

    return (
        <div className="trainers-container">
            <h1>Nuestros Entrenadores</h1>

            <div className="trainer-list">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="trainer-card">
                        <h2>{trainer.name}</h2>
                        <p><strong>Especialidad:</strong> {trainer.especialidad}</p>
                        <p> <strong>Experiencia:</strong> {trainer.experiencia}</p>
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
