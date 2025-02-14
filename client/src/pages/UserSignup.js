// src/pages/UserSignup.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserSignup({ onToggleView }) {
  const navigate = useNavigate(); // Get the navigate function

  const handleSignup = (event) => {
    event.preventDefault();
    const { name, mobile, age, password } = event.target;

    axios.post('http://localhost:5000/api/users/register', {
      name: name.value,
      mobile: mobile.value,
      age: age.value,
      password: password.value,
    })
    .then(response => {
      navigate('/home'); // Redirect to home page after signup
    })
    .catch(error => {
      console.error('Error during signup:', error.response ? error.response.data : error.message);
      alert('Signup failed. Please try again.');
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Sign Up!</h1>
      <form onSubmit={handleSignup}>
        <div><input type="text" name="name" placeholder="Name" required /></div>
        <div><input type="text" name="mobile" placeholder="Mobile" required /></div>
        <div><input type="number" name="age" placeholder="Age" required /></div>
        <div><input type="password" name="password" placeholder="Password" required /></div>
        
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default UserSignup;
