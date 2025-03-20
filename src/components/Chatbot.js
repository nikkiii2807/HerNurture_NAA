import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css"; // For styling

function Chatbot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [errorSendingMessage, setErrorSendingMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  // Reference for speech recognition
  const recognitionRef = useRef(null);
  
  // Check if speech recognition is supported
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechSupported(true);
      
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Configure speech recognition
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
    
    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  // Function to toggle voice input
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  // Function to handle text-to-speech for bot messages
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
  };
  
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
      speakText(response.data.content);
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
        <h3>AI Symptom Checker</h3>
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
        <div className="input-group">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your symptoms"
            autoFocus
          />
          {speechSupported && (
            <button 
              className={`voice-input-button ${isListening ? 'listening' : ''}`}
              onClick={toggleListening}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? '⏹️ Recording...' : '🎤'}
            </button>
          )}
        </div>
        <button onClick={handleSendMessage} className="send-button">Send</button>
        <button onClick={() => speakText(conversation[conversation.length - 1]?.text || '')} className="speak-button">🔊</button>
      </div>
    </div>
  );
}

export default Chatbot;