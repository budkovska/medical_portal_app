import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import messageWhiteIcon from './assets/icons/message_white.png';
import Navbar from './components/Navbar';
import ContactModal from './components/ContactModal'; 
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Clinics from './pages/Clinics';
import ClinicDetail from './pages/ClinicDetail';
import DoctorDetail from './pages/DoctorDetail';
import Dashboard from './pages/Dashboard';
import AllAppointments from './pages/AllAppointments';
import DeclarationInfo from './pages/DeclarationInfo';
import Doctors from './pages/Doctors';
import News from './pages/news';
import About from './pages/About';
import Faq from './pages/Faq';
import NewsDetail from './pages/NewsDetail';
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/clinics" element={<PageWrapper><Clinics /></PageWrapper>} />
        <Route path="/clinics/:id" element={<PageWrapper><ClinicDetail /></PageWrapper>} />
        <Route path="/doctors/:id" element={<PageWrapper><DoctorDetail /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/all-appointments" element={<PageWrapper><AllAppointments /></PageWrapper>} />
        <Route path="/declaration-info" element={<PageWrapper><DeclarationInfo /></PageWrapper>} />
        <Route path="/doctors" element={<PageWrapper><Doctors /></PageWrapper>} />
        <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
        <Route path="/news/:id" element={<PageWrapper><NewsDetail /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><Faq /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}
function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <Router>
      <Navbar />
      <div className="container mt-4 pb-5">
        <AnimatedRoutes />
      </div>
      <button 
        className="btn btn-primary rounded-3 shadow-lg position-fixed d-flex align-items-center justify-content-center hover-up" 
        style={{ 
          bottom: '30px', 
          right: '30px', 
          width: '60px', 
          height: '60px', 
          zIndex: 1000,
          border: '3px solid white'
        }}
        onClick={() => setIsContactOpen(true)}
        title="Написати нам"
      >
        <img 
          src={messageWhiteIcon} 
          alt="Contact" 
          style={{ width: '30px', height: '30px' }} 
        />
      </button>
      <ContactModal 
        show={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
      <Footer />
    </Router>
  );
}
export default App;