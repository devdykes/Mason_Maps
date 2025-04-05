import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pdfFile, setPdfFile] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected day:", date.toDateString());
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    console.log("PDF uploaded:", file.name);
  };

  return (
    <div>
      <h2>Choose a Day</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <hr />
      <h3>Upload Your Schedule PDF</h3>
      <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
      {pdfFile && <p>Uploaded: {pdfFile.name}</p>}
    </div>
  );
};

export default Scheduler;
