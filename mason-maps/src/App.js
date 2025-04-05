import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ScheduleView from './components/Scheduler';
import MapView from './components/MapDirections';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    console.log("Token updated:", token);
  }, [token]);

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      {/* Logout Button */}
      <button onClick={() => {
        localStorage.removeItem('token');
        setToken(null);
      }} style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        padding: '0.5rem 1rem'
      }}>
        Log Out
      </button>

      {/* Layout */}
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
