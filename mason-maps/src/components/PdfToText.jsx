import React from 'react';
import pdfToText from 'react-pdftotext';

const pdfToText = () => {
  const extractText = (event) => {
    const file = event.target.files[0];
    if (file) {
      pdfToText(file)
        .then((text) => console.log(text))
        .catch((error) => console.error('Failed to extract text from PDF', error));
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={extractText} />
    </div>
  );
};

export default PdfToText;
