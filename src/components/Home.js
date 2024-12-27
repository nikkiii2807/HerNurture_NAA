import React from "react";
import logo from '../assets/logo.jpg'; // Adjust the path if necessary
import './Home.css';
import hero from '../assets/hero.jpg';

function Home() {
  return (
    <div className="home">
      <header className="header"></header>
      <div className="main-content">
        <div className="text-content">
          <h2>Welcome to HerHealth AI</h2>
          <p>Your personalized platform for women’s healthcare solutions powered by AI.</p>
          <img src={logo} alt="Logo" className="logo1" />
        </div>
        <img src={hero} alt="hero" className="hero" />
      </div>
      <div className="cta-buttons">
        <button>Get Started</button>
        <button>Speak to an AI Health Assistant</button>
      </div>
    </div>
  );
}

export default Home;
