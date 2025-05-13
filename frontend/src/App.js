import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainMenuPage from './pages/MainMenuPage';
import BookClassPage from './pages/BookClassPage';
import TrainersPage from './pages/TrainersPage';
import SettingsPage from './pages/SettingsPage';
import EditAccountPage from './pages/EditAccountPage';
import ManageNotificationsPage from './pages/ManageNotificationsPage';
import DarkModePage from './pages/DarkModePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignUpPage from './pages/SignUpPage';
import AddTrainerPage from './pages/AddTrainerPage';
import EditTrainerPage from './pages/EditTrainerPage';

// Importa el componente de ruta protegida
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />

                    {/* Rutas protegidas: solo accesibles si hay sesión */}
                    <Route path="/mainmenu" element={
                        <ProtectedRoute>
                            <MainMenuPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/book-class" element={
                        <ProtectedRoute>
                            <BookClassPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/trainers" element={
                        <ProtectedRoute>
                            <TrainersPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/edit-account" element={
                        <ProtectedRoute>
                            <EditAccountPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/manage-notifications" element={
                        <ProtectedRoute>
                            <ManageNotificationsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/dark-mode" element={
                        <ProtectedRoute>
                            <DarkModePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/add-trainer" element={
                        <ProtectedRoute>
                            <AddTrainerPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/edit-trainer/:id" element={
                        <ProtectedRoute>
                            <EditTrainerPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
