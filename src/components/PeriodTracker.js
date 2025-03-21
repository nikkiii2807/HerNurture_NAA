import React from 'react';
import './PeriodTracker.css'; // For custom styling

const PeriodTracker = () => {
  return (
    <div className="gradio-container">
      <iframe
        src="https://3b7409e9f51d69c1f7.gradio.live/"
        title="Gradio Period Tracker"
        width="100%"
        height="100vh" // Full screen height
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default PeriodTracker;