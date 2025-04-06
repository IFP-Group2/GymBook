import React from 'react';
import '../styles/LoginPage.css'; // Importamos los estilos específicos

function LoginPage() {
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form className="login-form">
        <input type="text" placeholder="Nombre de usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
