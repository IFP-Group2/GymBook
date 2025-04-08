import React from 'react';
import '../styles/TrainersPage.css';

const TrainersPage = () => {
    // Aquí podrías traer la lista de entrenadores, si es que tienes una API o datos locales

    // Datos de ejemplo
    const trainers = [
        { id: 1, name: 'Alex Johnson', specialty: 'Fuerza y Acondicionamiento' },
        { id: 2, name: 'Samantha Lee', specialty: 'Yoga y Movilidad' },
        { id: 3, name: 'Carlos Pérez', specialty: 'CrossFit y Resistencia' },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Nuestros Entrenadores</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="border p-4 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold">{trainer.name}</h2>
                        <p className="text-gray-600">{trainer.specialty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainersPage;
