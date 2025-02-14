// src/pages/UserLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function UserLogin({ onLoginSuccess }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (event) => {
    event.preventDefault();
    const { mobile, password } = event.target;

    axios.post('http://localhost:5000/api/users/login', {
      mobile: mobile.value,
      password: password.value,
    })
    .then(response => {
      onLoginSuccess(); // Call the callback to indicate success
      navigate('/home'); // Redirect to home upon successful login
    })
    .catch(error => {
      setErrorMessage('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Login!</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div><input type="text" name="mobile" placeholder="Mobile" required /></div>
        <div><input type="password" name="password" placeholder="Password" required /></div>
        
        <button type="submit">Login</button>
      
      </form>
    </div>
  );
}

export default UserLogin;
