// Authentication.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Authentication.css';

const Authentication = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorSendingMessage, setErrorSendingMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const validateForm = (formData) => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) {
        newErrors[key] = 'This field is required';
      }
      if (key === 'email' && !validateEmail(formData[key])) {
        newErrors[key] = 'Please enter a valid email';
      }
      if (key === 'password' && formData[key].length < 6) {
        newErrors[key] = 'Password must be at least 6 characters';
      }
    });
    return newErrors;
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.reload();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/login', formData);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setAuthError('');
        setShowAuth(false);
        setIsAuthenticated(true);
        window.location.reload();
      } catch (error) {
        setAuthError(error.response?.data?.error || 'An error occurred during login');
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    };
    
    const formErrors = validateForm(formData);
    
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/signup', formData);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setAuthError('');
        setShowAuth(false);
        setIsAuthenticated(true);
        window.location.reload();
      } catch (error) {
        setAuthError(error.response?.data?.error || 'An error occurred during signup');
      }
    }
  };

  const LoginForm = () => (
    <form className="auth-form" onSubmit={handleLogin}>
      {authError && <div className="auth-error">{authError}</div>}
      <div className="form-group">
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      <button type="submit" className="primary-button">Login</button>
    </form>
  );

  const SignupForm = () => (
    <form className="auth-form" onSubmit={handleSignup}>
      {authError && <div className="auth-error">{authError}</div>}
      <div className="form-group">
        <input 
          type="text" 
          name="fullName"
          placeholder="Full Name" 
        />
        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
      </div>
      <div className="form-group">
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      <div className="form-group">
        <input 
          type="password" 
          name="confirmPassword"
          placeholder="Confirm Password" 
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>
      <button type="submit" className="primary-button">Sign Up</button>
    </form>
  );

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

  const Chatbot = () => (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>AI Health Assistant</h3>
        <button className="close-button" onClick={() => setShowChatbot(false)}>×</button>
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
        {loading && <p>Loading...</p>}
        {errorSendingMessage && <p className="error-message">{errorSendingMessage}</p>}
      </div>
      <div className="chatbot-footer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about women's health"
          autoFocus
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );

  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <div className="authenticated-container">
          <button className="secondary-button" onClick={handleLogout}>Logout</button>
          <button className="primary-button" onClick={() => setShowChatbot(true)}>
            Speak to AI Health Assistant
          </button>
        </div>
      ) : (
        !showAuth ? (
          <div className="button-container">
            <button className="primary-button" onClick={() => setShowAuth(true)}>
              Get Started
            </button>
            <button className="secondary-button" onClick={() => setShowChatbot(true)}>
              Speak to an AI Health Assistant
            </button>
          </div>
        ) : (
          <div className="modal-overlay">
            <div className="auth-card">
              <button className="close-button" onClick={() => {
                setShowAuth(false);
                setErrors({});
                setAuthType('');
              }}>×</button>
              {!authType ? (
                <div className="auth-options">
                  <button className="primary-button" onClick={() => setAuthType('signup')}>
                    Sign Up
                  </button>
                  <button className="secondary-button" onClick={() => setAuthType('login')}>
                    Login
                  </button>
                </div>
              ) : (
                <div className="auth-form-container">
                  <div className="form-header">
                    <h3>{authType === 'login' ? 'Login' : 'Sign Up'}</h3>
                    <button className="back-button" onClick={() => {
                      setAuthType('');
                      setErrors({});
                    }}>
                      Back
                    </button>
                  </div>
                  {authType === 'login' ? <LoginForm /> : <SignupForm />}
                </div>
              )}
            </div>
          </div>
        )
      )}
      {showChatbot && (
        <div className="modal-overlay">
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default Authentication;