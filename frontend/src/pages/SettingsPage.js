import React from 'react';
import '../styles/SettingsPage.css';

const SettingsPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Configuración</h1>

            <div className="space-y-4">
                <div className="border p-4 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Cuenta</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Cambiar contraseña
                    </button>
                </div>

                <div className="border p-4 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Notificaciones</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Gestionar notificaciones
                    </button>
                </div>

                <div className="border p-4 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Preferencias</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Cambiar idioma
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
