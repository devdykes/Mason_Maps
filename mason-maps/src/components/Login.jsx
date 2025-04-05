import api from "../api/axiosConfig"

import React, { useState } from 'react';

const Login = ({ onLogin }) => { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/api/user/login',
        JSON.stringify({ user: username, password: password }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log(username + " " + password);
      console.log(res.data);

      const data = res.data;
      console.log(data);
      localStorage.setItem('token', data.token);
      window.location.reload(false);
      onLogin(data.token);

      
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;