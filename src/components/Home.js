import React from "react";
import Authentication from './Authentication';
import logo from '../assets/logo.jpg';
import hero from '../assets/hero.jpg';
import './Home.css';

function Home() {
  return (
   <div id="Home" className="home">
  {/* Your Home component content */}


    <div className="home">
      <header className="header"></header>
      <div className="main-content">
        <div className="text-content">
          <h2>Welcome to HerNurture AI</h2>
          <p>Your personalized platform for women's healthcare solutions powered by AI.</p>
          <img src={logo} alt="Logo" className="logo1" />
        </div>
        <img src={hero} alt="hero" className="hero" />
      </div>
      <Authentication />
    </div></div>
  );
}

export default Home;