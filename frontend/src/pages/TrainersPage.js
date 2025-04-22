import React, { useState, useEffect } from 'react';
import '../styles/TrainersPage.css';
import { Link } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
//Funcion TrainersPage con la logica para mostrar los entrenadores
const TrainersPage = () => {
    const [trainers, setTrainers] = useState([]);

    // Cargar la lista de entrenadores al montar el componente
    useEffect(() => {
        const fetchTrainers = async () => {
            //Bloque try-catch para cargar la lista de entrenadores
            try {
                const response = await fetch('http://localhost:8080/entrenadores');
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

    // Eliminar un entrenador
    const deleteTrainer = async (id) => {
        //Bloque try-catch para actualizar la lista de entrenadores tras una eliminacion
        try {
            const response = await fetch(`http://localhost:8080/entrenadores/${id}`, {
                method: 'DELETE',
            });

            // Actualizar la lista de entrenadores si la respuesta es ok
            if (response.ok) {
                setTrainers(trainers.filter(trainer => trainer.usuarioId !== id));
            } else {
                console.error('Error al eliminar el entrenador');
            }
        } catch (error) {
            console.error('Error de conexión:', error);//Mensaje de error
        }
    };
    //Apariencia de la pagina
    return (
        <div className="trainers-container">
            <h1>Nuestros Entrenadores</h1>

            <div className="trainer-list">
                {trainers.map((trainer) => (
                    <div key={trainer.usuarioId} className="trainer-card">
                        <h2>{trainer.usuario?.nombre || 'Sin nombre'}</h2> {/* Acceder al nombre del usuario */}
                        <p><strong>Especialidad:</strong> {trainer.especialidad}</p>
                        <p><strong>Experiencia:</strong> {trainer.experiencia}</p>
                        <div className="trainer-actions">
                            <Link to={`/edit-trainer/${trainer.usuarioId}`}>
                                <button>Editar</button>
                            </Link>
                            <button onClick={() => deleteTrainer(trainer.usuarioId)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="trainers-add">
                <Link to="/add-trainer">
                    <button>Añadir nuevo entrenador</button>
                </Link>
            </div>

            {/* Menú */}
            <BottomNavBar />
        </div>
    );
};

export default TrainersPage;