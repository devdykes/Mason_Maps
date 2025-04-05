import React, { useState } from 'react';
import api from "../api/axiosConfig";
import Signup from './Signup';

import './Login.css'

const Login = ({ onLogin }) => {

  const [color, setColor] = useState('lightblue');

  React.useEffect(() => {
    document.body.style.backgroundColor = color;
    const intervalId = setInterval(() => {
      setColor((prevColor) => (prevColor === 'lightblue'));
    }, 0);
    return () => clearInterval(intervalId);
  }, [color]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/api/user/login',
        JSON.stringify({ user: username, password: password }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log("Logging in with:", username, password);
      const data = res.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      onLogin(data.token);
      delay(1000);
      window.location.reload(false);

    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

  if (showSignup) {
    return <Signup onDone={() => setShowSignup(false)} />;
  }

  return (
    <div className="backgroundlogin"> 
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
        <h1 className = "headerformat">Mason Maps</h1>
        <div className="backgroundImage"> </div>
        <br />
        <input className = "textboxsize"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          
        />
        <input className = "textboxsize"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          
        />
        <br />
        <button  type="submit">Login</button>
        <button type="button" onClick={() => setShowSignup(true)} style={{ marginTop: '1rem' }}>
        Sign Up
      </button>
        
      </form>    
    </div>

  );
};

export default Login;
