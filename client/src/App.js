// src/App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import BookingList from './pages/BookingList'; // Import BookingList component
import Error from './pages/Error';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);

    if (!loggedIn && window.location.pathname !== '/auth') {
      navigate('/auth');
    }

    // Prevent default touch events
    const preventTouchMove = (e) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventTouchMove);
    };
  }, [navigate]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/home'); // Redirect to Home after successful login/signup
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/auth'); // Redirect to AuthPage after logout
  };

  return (
    <>
      <Routes>
        <Route path='/auth' element={<AuthPage onAuthSuccess={handleAuthSuccess} />} />
        <Route path='/' element={isAuthenticated ? <Navigate to='/home' /> : <Navigate to='/auth' />} />
        <Route path='/home' element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><Home /></> : <Navigate to='/auth' />} />
        <Route path='/rooms' element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><Rooms /></> : <Navigate to='/auth' />} />
\        
        {/* Add the BookingList route */}
        <Route path='/booking-list' element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><BookingList /></> : <Navigate to='/auth' />} />
        <Route path='/rooms/:slug' element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><SingleRoom /></> : <Navigate to='/auth' />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
