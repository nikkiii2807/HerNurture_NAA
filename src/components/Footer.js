import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>HerHealth AI</h3>
          <p>Empowering women with AI-driven healthcare solutions.</p>
        </div>
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#Home">Home</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#Services">Services</a></li>
            <li><a href="#Contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p>Email: support@herhealthai.com</p>
          <p>Phone: +1-234-567-890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 HerHealth AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
