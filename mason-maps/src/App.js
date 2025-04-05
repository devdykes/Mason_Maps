import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ScheduleView from './components/Scheduler';
import MapView from './components/MapDirections';

function App() {
  const [token, setToken] = useState(null);

  // Check if token already exists in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    console.log(token);
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        <ScheduleView token={token} />
      </div>
      <div style={{ flex: 2, padding: '1rem' }}>
        <MapView token={token} />
      </div>
    </div>
  );
}

export default App;
