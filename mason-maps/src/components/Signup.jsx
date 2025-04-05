import React, { useState } from 'react';
import api from "../api/axiosConfig";

import './Login.css'

const Signup = ({ onDone }) => {

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

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/user/register",
        JSON.stringify({user: username, password:password}), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 200 || res.status === 201) {
        alert("Sign-up successful! Please log in.");
        onDone(); // switches back to login screen
      } else {
        alert("Sign-up failed. Try again.");
      }

    } catch (err) {
      console.error("Signup error:", err);
      alert("Error signing up. Make sure username is available.");
    }
  };

  return (
    <div className="backgroundlogin">
    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
      <h1 className = "headerformat">Sign Up</h1>
      <div className="backgroundImage"> </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className = "textboxsize"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className = "textboxsize"
      />
      <button type="submit">Create Account</button>
      <button type="button" onClick={onDone} style={{ marginTop: '1rem' }}>Back to Login</button>
    </form>
    </div>
  );
};

export default Signup;