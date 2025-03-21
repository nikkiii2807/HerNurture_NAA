import React, { useState } from 'react';
import axios from 'axios';
import './HealthReport.css';

const HealthReport = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    console.log('Uploading file...'); // Debug
    console.log('File:', file); // Debug

    try {
      const response = await axios.post('http://localhost:5000/api/upload-health-report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data); // Debug
      setResults(response.data);
    } catch (error) {
      console.error('Error uploading health report:', error); // Debug
      alert('Error uploading health report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="health-report-container">
      <h2>Upload Health Report</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload'}
        </button>
      </form>

      {results && (
        <div className="results">
          <h3>Extracted Text:</h3>
          <pre>{results.text}</pre>

          <h3>Health Metrics:</h3>
          <pre>{JSON.stringify(results.healthMetrics, null, 2)}</pre>

          <h3>Recommendations:</h3>
          <p>{results.recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default HealthReport;