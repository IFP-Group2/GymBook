import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BookClassPage.css';
import BottomNavBar from '../components/BottomNavBar';


const BookClassPage = () => {
    const [message, setMessage] = useState('');

    const classes = [
        { id: 1, name: 'Yoga Avanzado', trainer: 'Celia Martínez', date: '2025-06-20', time: '10:00' },
        { id: 2, name: 'Crossfit Principiantes', trainer: 'Carlos Pérez', date: '2025-06-21', time: '12:00' },
        { id: 3, name: 'Pilates Intermedio', trainer: 'Pablo Romero', date: '2025-06-22', time: '09:00' }
    ];

    const handleReservation = async (className, classId) => {
        const userEmail = localStorage.getItem('userEmail'); // Obtén el correo electrónico del almacenamiento local

        if (!userEmail) {
            setMessage('Por favor, inicia sesión para hacer una reserva.');
            return;
        }

        const reservationData = {
            classId: classId,
            userEmail: userEmail // Usa el correo electrónico del usuario que ha iniciado sesión
        };

        try {
            const response = await axios.post('http://localhost:8080/inscripciones', reservationData);
            setMessage(`¡Reserva exitosa para la clase: ${className}!`);
        } catch (error) {
            console.error('Error al hacer la reserva:', error.response.data);
            setMessage(`Error al hacer la reserva: ${error.response.data}`);
        }
    };

    return (
        <div className="book-class-container">
            <h1>Reservar Clase</h1>
            <div className="class-list">
                {classes.map ((item) => (
                    <div key={item.id} className="class-card">
                        <h2>{item.name}</h2>
                        <p><strong>Entrenador:</strong> {item.trainer}</p>
                        <p><strong>Fecha:</strong> {item.date}</p>
                        <p><strong>Hora:</strong> {item.time}</p>
                        <button onClick={() => handleReservation(item.name, item.id)}>Reservar</button>
                    </div>
                ))}
            </div>
            {message && <div className="reservation-message">{message}</div>}
            
            {/* Menú */}
            <BottomNavBar />
        </div>
    );
};

export default BookClassPage;