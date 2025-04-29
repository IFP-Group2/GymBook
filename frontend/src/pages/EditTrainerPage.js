import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//Funcion que contiene la logica de EditTrainersPage
const EditTrainerPage = () => {
    const { id } = useParams(); // Obtener el ID del entrenador desde la URL
    const navigate = useNavigate();
    const [especialidad, setEspecialidad] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [trainer, setTrainer] = useState({}); // Estado para el entrenador

    // Cargar la lista de usuarios al montar el componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch('http://localhost:8080/usuarios');
                if (!res.ok) throw new Error('No se pudieron cargar los usuarios.');
                const data = await res.json();
                setUsuarios(data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };
        fetchUsuarios();
    }, []);

    // Cargar el entrenador al montar el componente
    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                const response = await fetch(`http://localhost:8080/entrenadores/${id}`);
                if (!response.ok) {
                    console.error('Error al cargar el entrenador');
                    return;
                }
                const data = await response.json();
                setTrainer(data);
                setEspecialidad(data.especialidad);
                setExperiencia(data.experiencia);
                setUsuarioId(data.usuarioId);
            } catch (error) {
                console.error('Error de conexión:', error);
            }
        };
        fetchTrainer();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        if (!especialidad || !experiencia || !usuarioId) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Crear el objeto entrenador con el formato que el backend espera
        const updatedTrainer = {
            especialidad,
            experiencia: parseInt(experiencia),
            usuario: { id: parseInt(usuarioId) }
        };

        try {
            // Enviar la solicitud PUT al backend
            const response = await fetch(`http://localhost:8080/entrenadores/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTrainer)
            });

            // Si la respuesta es exitosa, redirigir a la página de entrenadores
            if (response.ok) {
                navigate('/trainers');
            } else {
                let errorMessage = 'Error al actualizar el entrenador.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                    const text = await response.text();
                    errorMessage = text || errorMessage;
                }
                console.error('Error del backend:', errorMessage);
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    };
    //Apariencia de EditTrainersPage
    return (
        <div>
            <h1>Editar Entrenador</h1>
            <form onSubmit={handleSubmit}>
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
                        type="number"
                        value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                    />
                </div>
                <div>
                    <label>Usuario:</label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                    >
                        <option value="">Selecciona un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditTrainerPage;
