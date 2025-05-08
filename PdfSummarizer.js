import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const PdfSummarizer = () => {
  const [summary, setSummary] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    multiple: false,
    onDrop: files => handleFileUpload(files[0])
  });

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSummary(response.data.summary);
      setExtractedText(response.data.extracted_text); // Set extracted text
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {loading ? (
          <p>Processing...</p>
        ) : (
          <p>Drag & drop a PDF here, or click to select</p>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {extractedText && (
        <div style={{ marginTop: '20px' }}>
          <h3>Extracted Text:</h3>
          <div style={textBoxStyles}>
            {extractedText}
          </div>
        </div>
      )}

      {summary && (
        <div style={{ marginTop: '20px' }}>
          <h3>Summary:</h3>
          <div style={summaryBoxStyles}>
            {summary}
          </div>
        </div>
      )}
    </div>
  );
};

// Add these new styles
const textBoxStyles = {
  border: '1px solid #ccc',
  padding: '15px',
  borderRadius: '4px',
  maxHeight: '300px',
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  textAlign: 'left',
  margin: '10px 0'
};

const summaryBoxStyles = {
  border: '1px solid #4CAF50',
  backgroundColor: '#f8fff8',
  padding: '15px',
  borderRadius: '4px',
  textAlign: 'left',
  margin: '10px 0'
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  margin: '20px 0'
};

export default PdfSummarizer;