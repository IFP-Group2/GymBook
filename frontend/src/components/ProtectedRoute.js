import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente de ruta protegida que verifica la existencia de sesión
const ProtectedRoute = ({ children }) => {
    // Verificar si existe el token en el Session Storage
    const token = sessionStorage.getItem('token');

    // Si no hay token, redirigir a la página de login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay token, renderizar el componente hijo
    return children;
};

export default ProtectedRoute;
