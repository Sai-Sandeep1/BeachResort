import React, { useState } from 'react';
import UserLogin from './UserLogin';
import UserSignup from './UserSignup';
import '../AuthPage.css'; // Import your CSS styles

function AuthPage({ onAuthSuccess }) { // Accept onAuthSuccess as a prop
  const [view, setView] = useState('login');

  const toggleView = () => {
    setView((prevView) => (prevView === 'login' ? 'signup' : 'login'));
  };

  const handleLoginSuccess = () => {
    
    onAuthSuccess(); // Call the onAuthSuccess function to navigate to Home
  };

  const handleSignupSuccess = () => {
    onAuthSuccess(); // Call the onAuthSuccess function to navigate to Home
  };

  return (
    <div className="auth-page"><br/><br/>
      <h1 className="welcome-message">WELCOME TO THE BEACH RESORT</h1>
      <div className="auth-container">
        <div className="container">
          {view === 'login' ? (
            <>
              <UserLogin onLoginSuccess={handleLoginSuccess} />
              <button onClick={toggleView}>Don't have an account? Signup</button>
            </>
          ) : (
            <>
              <UserSignup onSignupSuccess={handleSignupSuccess} />
              <button onClick={toggleView}>Already have an account? Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
