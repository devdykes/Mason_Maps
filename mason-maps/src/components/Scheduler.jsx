import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../api/axiosConfig';
import pdfToText from 'react-pdftotext';

import './Scheduler.css';


const Scheduler = ({token}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected day:", date.toDateString());
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfFile(file);
    console.log("PDF: ", file.name);

    try {
      const out = await pdfToText(file);
      console.log("text:", out);
      setExtractedText(out)
    } catch (err) {
      console.error("Failed to extract PDF text:", err);
      alert("Could not read text from PDF");
    }
  };

  const handleUploadSubmit = async () => {
    if (!extractedText) {
      alert("Please extract text from a PDF file first.");
      return;
    }

    try {
      const res = await api.post( "/api/schedule/create",
        JSON.stringify({ user: token, pdf: extractedText }),
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      if (res.status === 200) {
        alert("Text uploaded and schedule processed successfully.");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload.");
    }
  };

  return (
    <div className="scheduler-container">
      <div className="left-panel">
        <h2>Choose a Day</h2>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <hr />
        <h3>Upload Your Schedule PDF</h3>
        <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        {pdfFile && <p>Uploaded: {pdfFile.name}</p>}
        {pdfFile && <button onClick={handleUploadSubmit}>Submit Extracted Text</button>}

        {extractedText && (
          <>
            <h4>Preview of Extracted Text:</h4>
            <pre style={{ maxHeight: '200px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>{extractedText}</pre>
          </>
        )}
      </div>

      <div className="right-panel">
        {/* Google Map auto-renders here */}
      </div>
    </div>
  );
};

export default Scheduler;
