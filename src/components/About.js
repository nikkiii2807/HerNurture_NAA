import React from "react";
import about from "../assets/about.avif";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about-content">
        <div className="text-content">
          <h2>About Us</h2>
          <p>
            HerNurture AI is a dedicated platform that focuses on leveraging AI to enhance women's healthcare access and tackle maternal, reproductive, and mental health challenges. 
          </p>
          <p>
            Our mission is to ensure equitable healthcare solutions for women, promoting gender equity and better health outcomes. By integrating cutting-edge technology with compassion, we aim to make a lasting impact on women's well-being.
          </p>
        </div>
        <img src={about} alt="About HerNurture AI" className="about-image" />
      </div>
    </div>
  );
}

export default About;
