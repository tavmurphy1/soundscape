/* 
 * Author: Tavner Murphy
 * Date: 2/10/2024
 * React Starter App - Bootstrapped with Create React App
 * 
 * Source: Facebook, Inc. (2024). React Starter App. Retrieved from https://react.dev
 * 
 * This project was initialized using Create React App.
 * See documentation at https://create-react-app.dev
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    const storedData = sessionStorage.getItem('demoUser');
    if (!storedData) {
      setMessage('No account found. Please create an account first.');
      return;
    }

    const user = JSON.parse(storedData);

    // validate email and password
    if (user.email === email && user.password === password) {
      setMessage('Login successful!');
      navigate('/concerts');
    } else {
      setMessage('Invalid email or password.');
    }
  }

  function goToCreateAccount() {
    navigate('/create-account');
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">
          Welcome to <br />
          SoundScape!
        </h1>
        <p className="login-tagline">
          Find the best concerts.
          <br />
          Secure your tickets fast.
          <br />
          Never miss a show again.
        </p>

        <div className="input-container">
          <input
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <p className="or-text">Or</p>

        <button className="signup-button" onClick={goToCreateAccount}>
          Get Started — it's Free!
        </button>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
