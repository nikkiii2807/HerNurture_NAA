import React, { useState } from "react";
import axios from "axios";
import "./Chatbot1.css"; // For styling

function Chatbot1() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [errorSendingMessage, setErrorSendingMessage] = useState('');


  // Function to send message to the backend and get response
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', text: message };
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setMessage('');
    setLoading(true);
    setErrorSendingMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/generate-chatbot-response', 
        { message },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      const botMessage = { type: 'bot', text: response.data.content };
      setConversation([...newConversation, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorSendingMessage('Error communicating with the chatbot. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Mental Wellness Support</h3> {/* Updated h3 text */}
      </div>
      <div className="chatbot-body">
        {conversation.length === 0 && <p>How can I assist you today?</p>}
        <div className="conversation">
          {conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
            </div>
          ))}
        </div>
        {loading && <p className="loading">Loading...</p>}
        {errorSendingMessage && <p className="error-message">{errorSendingMessage}</p>}
      </div>
      <div className="chatbot-footer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Need someone to talk to? I'm here to help." 
          autoFocus
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot1;
