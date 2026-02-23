import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // For smooth transitions


// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import NoticesPage from './pages/Notices';
import ComplaintsPage from './pages/Complaints';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

// We need a separate component for the Animated Routes to use the location hook correctly
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          {/* Using the wrapper for animations */}
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;