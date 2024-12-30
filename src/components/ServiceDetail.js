import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceDetail.css";

function ServiceDetail() {
  const { id } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "AI Symptom Checker",
      description: "A tool that uses AI to analyze symptoms and provide preliminary diagnoses."
    },
    {
      id: 2,
      title: "Mental Wellness Support",
      description: "Resources and support for maintaining mental health and well-being."
    },
    {
      id: 3,
      title: "Maternal and Reproductive Health Tracker",
      description: "Track maternal health and monitor reproductive health milestones."
    },
    {
      id: 4,
      title: "Gender-Aware Medical Recommendations",
      description: "Personalized medical recommendations tailored to women's health needs."
    }
  ];

  const service = services.find((s) => s.id === parseInt(id));

  return (
    <div className="service-detail">
      {service ? (
        <div className="service-detail-content">
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          <button onClick={() => navigate("/services")}>Back to Services</button>
        </div>
      ) : (
        <p>Service not found</p>
      )}
    </div>
  );
}

export default ServiceDetail;
