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
import SignUpPage from './pages/SignUpPage';
import AddTrainerPage from './pages/AddTrainerPage';
import EditTrainerPage from './pages/EditTrainerPage'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/mainmenu" element={<MainMenuPage />} />   
                    <Route path="/book-class" element={<BookClassPage />} />
                    <Route path="/trainers" element={<TrainersPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/edit-account" element={<EditAccountPage />} />
                    <Route path="/manage-notifications" element={<ManageNotificationsPage />} />
                    <Route path="/dark-mode" element={<DarkModePage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/add-trainer" element={<AddTrainerPage />} />
                    <Route path="/edit-trainer/:id" element={<EditTrainerPage />} />
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
