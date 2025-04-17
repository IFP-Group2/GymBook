import React, { useState } from 'react';
import '../styles/AddTrainerPage.css';

const AddTrainerPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        experience: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, specialty, experience } = formData;

        if (!name || !specialty || !experience) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }

        // Aquí iría una petición a un backend si lo tuvieras
        setMessage(`Entrenador ${name} añadido correctamente.`);

        setFormData({
            name: '',
            specialty: '',
            experience: ''
        });
    };

    return (
        <div className="add-trainer-container">
            <h1>Añadir Entrenador</h1>

            <form className="add-trainer-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del entrenador"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="specialty"
                    placeholder="Especialidad"
                    value={formData.specialty}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="experience"
                    placeholder="Años de experiencia"
                    value={formData.experience}
                    onChange={handleChange}
                />

                <button type="submit">Añadir Entrenador</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AddTrainerPage;
