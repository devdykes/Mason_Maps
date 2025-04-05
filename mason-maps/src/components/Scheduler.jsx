import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../api/axiosConfig';
import pdfToText from 'react-pdftotext';

import MapDirections from './MapDirections';
import ClassInfo from './ClassInfo';
import './Scheduler.css';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Scheduler = ({ token }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [dayClasses, setDayClasses] = useState([]);
  const [mapTarget, setMapTarget] = useState(null);

  const user = localStorage.getItem('username');

  // 🧠 On PDF upload, extract text
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfFile(file);
    try {
      const out = await pdfToText(file);
      setExtractedText(out);
    } catch (err) {
      console.error("Failed to extract PDF text:", err);
      alert("Could not read text from PDF");
    }
  };

  // 🧠 Send parsed text to backend
  const handleUploadSubmit = async () => {
    if (!extractedText) return alert("Please upload and extract a PDF first.");

    try {
      const res = await api.post("/api/schedule/create",
        JSON.stringify({ user, pdf: extractedText }),
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.status === 200) {
        alert("Schedule uploaded successfully.");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload.");
    }
  };

  // 🧠 Fetch classes from backend
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await api.get(`/api/schedule/get/${user}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const parsed = (res.data.schedule || []).map((cls) => ({
          courseName: cls.title,
          locationLabel: `${cls.location} Room ${cls.room}`,
          startTime: `${cls.timeHour.toString().padStart(2, '0')}:${cls.timeMin.toString().padStart(2, '0')}`,
          days: cls.date,
          location: { lat: cls.longitude, lng: cls.latitude }
        }));

        setSchedule(parsed);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
      }
    };

    fetchSchedule();
  }, [token]);

  // 🧠 Update dayClasses on calendar change
  useEffect(() => {
    const weekday = weekdays[selectedDate.getDay()];
    const filtered = schedule.filter(cls => cls.days.includes(weekday));
    setDayClasses(filtered);
    setMapTarget(null); // Optional: clear map on day change
  }, [selectedDate, schedule]);

  return (
    <div className="scheduler-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h2>Choose a Day</h2>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <hr />
        <h3>Upload Your Schedule PDF</h3>
        <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        {pdfFile && <p>Uploaded: {pdfFile.name}</p>}
        {pdfFile && <button onClick={handleUploadSubmit}>Submit Extracted Text</button>}

        {extractedText && (
          <>
            <h4>Preview of Extracted Text:</h4>
            <pre style={{ maxHeight: '200px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
              {extractedText}
            </pre>
          </>
        )}
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="map-container">
          <MapDirections target={mapTarget} />
        </div>
        <h3>Classes on {weekdays[selectedDate.getDay()]}</h3>
        <ClassInfo classes={dayClasses} onSelectLocation={setMapTarget} />
      </div>
    </div>
  );
};

export default Scheduler;