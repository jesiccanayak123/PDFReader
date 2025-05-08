// frontend/src/App.js
import React from 'react';
import PdfSummarizer from './components/PdfSummarizer';
import './App.css'; // Make sure this import exists

function App() {
  return (
    <div className="App">
      <h1>PDF Summarizer</h1>
      <div className="summarizer-container">
        <PdfSummarizer />
      </div>
    </div>
  );
}

export default App;