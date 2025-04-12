import React from 'react';
import '../styles/TrainersPage.css';

const TrainersPage = () => {
    // Datos de ejemplo
    const trainers = [
        { id: 1, name: 'Pablo Romero', specialty: 'Fuerza y Acondicionamiento' },
        { id: 2, name: 'Celia Martínez', specialty: 'Yoga y Movilidad' },
        { id: 3, name: 'Carlos Pérez', specialty: 'CrossFit y Resistencia' },
    ];

    return (
        <div className="trainers-container">
            <h1>Nuestros Entrenadores</h1>

            <div className="trainer-list">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="trainer-card">
                        <h2>{trainer.name}</h2>
                        <p><strong>Especialidad:</strong> {trainer.specialty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainersPage;
