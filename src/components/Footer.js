import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>HerNurture AI</h3>
          <p>Empowering women with AI-driven healthcare solutions.</p>
        </div>
        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p>Email: hernurtureai7@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 HerNurture AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
