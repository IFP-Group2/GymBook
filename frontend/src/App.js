import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainMenuPage from './pages/MainMenuPage';
import BookClassPage from './pages/BookClassPage';
import TrainersPage from './pages/TrainersPage';
import SettingsPage from './pages/SettingsPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ManageNotificationsPage from './pages/ManageNotificationsPage';
import DarkModePage from './pages/DarkModePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';



function App() {
    return (
        //Router que crea la ruta entre las paginas
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/mainmenu" element={<MainMenuPage />} />
                    <Route path="/book-class" element={<BookClassPage />} />
                    <Route path="/trainers" element={<TrainersPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/change-password" element={<ChangePasswordPage />} />
                    <Route path="/manage-notifications" element={<ManageNotificationsPage />} />
                    <Route path="/dark-mode" element={<DarkModePage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
