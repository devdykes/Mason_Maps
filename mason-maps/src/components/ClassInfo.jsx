import React from 'react';
import './ClassInfo.css';

const ClassInfo = ({ classes = [], onSelectLocation }) => {
  if (classes.length === 0) {
    return ( null
    );
  }

  return (
    <div className="class-info-container">
      {classes.map((cls, index) => (
        <div key={index} className="class-item">
          <h2 className="class-name">{cls.courseName || 'Unnamed Course'}</h2>
          <p className="class-location">{cls.locationLabel || 'No location'}</p>
          <p className="class-time">{cls.startTime || '??'}</p>
          <p className="class-description">{cls.description || ''}</p>
          {cls.location && (
            <button onClick={() => onSelectLocation(cls.location)}>
              View on Map
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClassInfo;

