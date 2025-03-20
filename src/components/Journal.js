import React, { useState } from 'react';
import './Journal.css';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);

  const handleSaveEntry = () => {
    if (!entry || !deliveryDate) return;

    const newEntry = {
      id: Date.now(),
      text: entry,
      date: new Date().toLocaleDateString(),
      deliveryDate: deliveryDate,
    };

    setSavedEntries([...savedEntries, newEntry]);
    setEntry('');
    setDeliveryDate('');
  };

  return (
    <div className="journal-container">
      <h2>Dear Future Me...</h2>

      <div className="journal-input">
        <textarea
          placeholder="Write your thoughts, goals, or a message to your future self..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
        />
        <button onClick={handleSaveEntry}>Save Entry</button>
      </div>

      <div className="saved-entries">
        <h3>Scheduled Messages</h3>
        {savedEntries.length === 0 ? (
          <p>No entries yet. Write your first message!</p>
        ) : (
          savedEntries.map((entry) => (
            <div key={entry.id} className="entry">
              <p><strong>Written on:</strong> {entry.date}</p>
              <p><strong>Delivery Date:</strong> {entry.deliveryDate}</p>
              <p>{entry.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;