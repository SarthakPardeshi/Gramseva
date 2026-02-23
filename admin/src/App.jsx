import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NoticesPage from './pages/NoticesPage';
import ComplaintsPage from './pages/ComplaintsPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'; // Make sure to import this
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf9]">
      {/* Navbar stays at the top of every page */}
      <Navbar />
      
      {/* Routes decide which Page component to show based on the URL */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Admin route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App;