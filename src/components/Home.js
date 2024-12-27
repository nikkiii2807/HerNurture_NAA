import React from "react";
import logo from '../assets/logo.jpg'; // Adjust the path if necessary
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="header">
        
      
      </header>
      <div className="main-content">
        <h2>Welcome to HerHealth AI</h2>
        <img src={logo} alt="Logo" className="logo" />
        <p>Your personalized platform for women’s healthcare solutions powered by AI.</p>
      </div>
      <div className="cta-buttons">
        <button>Get Started</button>
        <button>Speak to an AI Health Assistant</button>
      </div>
    </div>
  );
}

export default Home;
