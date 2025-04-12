import React, { useState } from 'react';
import '../styles/BookClassPage.css';

const BookClassPage = () => {
    // Mensaje de éxito de reserva
    const [message, setMessage] = useState('');

    // Datos de clases (falsos, escritos directamente aquí)
    const classes = [
        {
            id: 1,
            name: 'Yoga Avanzado',
            trainer: 'Ana López',
            date: '2025-06-20',
            time: '10:00'
        },
        {
            id: 2,
            name: 'Crossfit Principiantes',
            trainer: 'Carlos Pérez',
            date: '2025-06-21',
            time: '12:00'
        },
        {
            id: 3,
            name: 'Pilates Intermedio',
            trainer: 'Laura Sánchez',
            date: '2025-06-22',
            time: '09:00'
        }
    ];

    // Función al hacer clic en "Reservar"
    const handleReservation = (className) => {
        setMessage(`¡Reserva exitosa para la clase: ${className}!`);
    };

    return (
        <div className="book-class-container">
            <h1>Reservar Clase</h1>

            <div className="class-list">
                {classes.map((item) => (
                    <div key={item.id} className="class-card">
                        <h2>{item.name}</h2>
                        <p><strong>Entrenador:</strong> {item.trainer}</p>
                        <p><strong>Fecha:</strong> {item.date}</p>
                        <p><strong>Hora:</strong> {item.time}</p>
                        <button onClick={() => handleReservation(item.name)}>Reservar</button>
                    </div>
                ))}
            </div>

            {message && <div className="reservation-message">{message}</div>}
        </div>
    );
}

export default BookClassPage;
