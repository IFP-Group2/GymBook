import React from 'react';
import { Link } from 'react-router-dom';  // 👈 Importar Link
import '../styles/HomePage.css';  // Estilos específicos para esta página

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Bienvenidos a GymBook</h1>
      <p>¡Con nosotros encontrareis la mejor forma de gestionar tu gimnasio!</p>
      <Link to="/login">
        <button>Empieza ahora</button>
      </Link>
    </div>
  );
}

export default HomePage;
