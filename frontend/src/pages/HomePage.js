import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>Bienvenidos a GymBook</h1>
            <p>¡Con nosotros encontraréis la mejor forma de gestionar tu gimnasio!</p>
            <Link to="/login">
                <button>Empieza ahora</button>
            </Link>
        </div>
    );
}

export default HomePage;
