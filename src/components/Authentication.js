import React, { useState } from 'react';
import './Authentication.css';

const Authentication = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) {
        newErrors[key] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      // Process login
      console.log('Login successful');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    };
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length === 0) {
      // Process signup
      console.log('Signup successful');
    }
  };

  const LoginForm = () => (
    <form className="auth-form" onSubmit={handleLogin}>
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

  return (
    <div className="auth-container">
      {!showAuth ? (
        <div className="button-container">
          <button className="primary-button" onClick={() => setShowAuth(true)}>
            Get Started
          </button>
          <button className="secondary-button">
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
      )}
    </div>
  );
};

export default Authentication;