import React, { useState } from 'react';
import './PeriodTracker.css'; // Assuming external CSS file

const PeriodTracker = () => {
  const [cycleHistory, setCycleHistory] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [customCycleLength, setCustomCycleLength] = useState(28);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const getDaysUntilNextPeriod = () => {
    if (cycleHistory.length === 0) return customCycleLength;

    const lastPeriod = new Date(cycleHistory[cycleHistory.length - 1].date);
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    const daysRemaining = customCycleLength - daysSinceLastPeriod;

    return daysRemaining > 0 ? daysRemaining : customCycleLength;
  };

  const addPeriodDate = () => {
    if (!newDate) return;

    const newDateObj = new Date(newDate);
    let length = customCycleLength;

    if (cycleHistory.length > 0) {
      const lastDate = new Date(cycleHistory[cycleHistory.length - 1].date);
      length = Math.round((newDateObj - lastDate) / (1000 * 60 * 60 * 24));
    }

    setCycleHistory([
      ...cycleHistory,
      {
        date: newDate,
        length,
        displayDate: formatDate(newDate),
      },
    ]);
    setNewDate('');
  };

  const predictNextThreePeriods = () => {
    if (cycleHistory.length < 1) return [];

    const predictions = [];
    let lastDate = new Date(cycleHistory[cycleHistory.length - 1].date);

    for (let i = 0; i < 3; i++) {
      lastDate = new Date(lastDate);
      lastDate.setDate(lastDate.getDate() + Number(customCycleLength));
      predictions.push(formatDate(lastDate));
    }

    return predictions;
  };

  const CircularCountdown = () => {
    const daysLeft = getDaysUntilNextPeriod();
    const percentage = ((customCycleLength - daysLeft) / customCycleLength) * 100;

    return (
      <div className="circular-countdown">
        <svg className="countdown-circle" viewBox="0 0 36 36">
          <path
            className="circle-bg"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle-progress"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="countdown-text">
          <span className="days-left">{daysLeft}</span>
          <span className="label">days until next period</span>
        </div>
      </div>
    );
  };

  return (
    <div className="period-tracker-container">
      <h2 className="title">Period Tracker</h2>

      <div className="input-section">
        <div className="input-group">
          <label>Average Cycle Length (days):</label>
          <input
            type="number"
            min="21"
            max="35"
            value={customCycleLength}
            onChange={(e) => setCustomCycleLength(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Add Period Date:</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <button onClick={addPeriodDate}>Add Date</button>
        </div>
      </div>

      <CircularCountdown />

      <div className="prediction-section">
        <p>Next Periods (Based on {customCycleLength}-day cycle):</p>
        <ul>
          {predictNextThreePeriods().map((date, index) => (
            <li key={index}>
              Period {index + 1}: {date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PeriodTracker;
