import React from 'react';
import './App.css';
import Scheduler from './components/Scheduler';
import MapDirections from './components/MapDirections';

function App() {
  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '1', padding: '1rem', overflowY: 'auto' }}>
        <Scheduler />
      </div>
      <div style={{ flex: '2', padding: '1rem' }}>
        <MapDirections />
      </div>
    </div>
  );
}

export default App;
