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
import './CreateAccountPage.css';

function CreateAccountPage() {
  const [name, setName] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleCreateAccount() {
    if (!name || !homeCity || !email || !password) {
      alert("Error: Complete all fields to create account");
      return;
    }

    const newUser = { name, homeCity, email, password };
    sessionStorage.setItem('demoUser', JSON.stringify(newUser));
    
    setTimeout(() => {
      navigate('/concerts');
    }, 100);
  }

  function goHome() {
    navigate('/');
  }

  return (
    <div className="create-container">
      <button className="home-button" onClick={goHome}>
        Home
      </button>

      <h1 className="create-title">Account Creation</h1>
      <p className="create-subtitle">
        Enter your information below, then click &quot;Create Account&quot; to begin
        seeing concerts in your home city!
      </p>

      {/* Name */}
      <div className="input-wrapper">
        <input
          className="create-input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Home City */}
      <div className="input-wrapper">
        <input
          className="create-input"
          placeholder="Home City"
          value={homeCity}
          onChange={(e) => setHomeCity(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="input-wrapper">
        <input
          className="create-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="input-wrapper">
        <input
          className="create-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="create-button" onClick={handleCreateAccount}>
        Create Account
      </button>
    </div>
  );
}

export default CreateAccountPage;