import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import ServiceDetail from "./components/ServiceDetail"; 
import Contact from "./components/Contact";
import HealthReport from "./components/HealthReport";
import Footer from "./components/Footer";
import PeriodTracker from "./components/PeriodTracker"; 
import logo from './assets/logo.jpg'; 
import "./App.css";
import Journal from "./components/Journal";
import "@fontsource/poppins"; 
import "@fontsource/poppins/300.css"; 
import "@fontsource/poppins/600.css"; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-left">
            <img src={logo} alt="Logo" className="logo" />
            <h1>HerNurture AI</h1>
          </div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/period-tracker">Period Tracker</Link></li>
              <li><Link to="/journal">Journal</Link></li>
              <li><Link to="/healthreport">Health Report</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>
        </header>

        {/* Wrapper to push footer to bottom */}
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/period-tracker" element={<PeriodTracker />} />
            <Route path='/journal' element={<Journal/>}/>
            <Route path='/healthreport'element={<HealthReport/>}/>
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
