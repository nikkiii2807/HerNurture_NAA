import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

function Services() {
  const services = [
    {
      id: 1,
      title: "AI Symptom Checker",
    },
    {
      id: 2,
      title: "Mental Wellness Support",
    },
    {
      id: 3,
      title: "Maternal and Reproductive Health Tracker",
    },
    {
      id: 4,
      title: "Gender-Aware Medical Recommendations",
    }
  ];

  return (
    <div className="services">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.map((service) => (
          <div key={service.id} className="service-box">
            <Link to={`/service/${service.id}`}>
              <h3>{service.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
