import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot"; // Import the Chatbot component
import "./ServiceDetail.css";
import Chatbot1 from "./Chatbot1";
import Chatbot2 from "./Chatbot2";

import PeriodTracker from "./PeriodTracker";

function ServiceDetail() {
  const { id } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "AI Symptom Checker",
      description: "A tool that uses AI to analyze symptoms and provide preliminary diagnoses.",
      component: <Chatbot /> // Add the Chatbot component for this service
    },
    {
      id: 2,
      title: "Mental Wellness Support",
      description: "Resources and support for maintaining mental health and well-being.",
      component: <Chatbot1 /> // Add the Chatbot component for this service
    },
    {
      id: 3,
    title: "Menstrual Cycle and Period Tracker",
    description: "Monitor your menstrual cycle, predict next periods, and track cycle history for better health insights.",
      component:<PeriodTracker/>
    },
    {
      id: 4,
      title: "Pregnancy Support and Guidance",
      description: "Receive personalized guidance and support throughout your pregnancy journey. From weekly tips to expert advice on health, nutrition, and self-care, this service helps you stay informed and empowered every step of the way",
      component: <Chatbot2 /> // Add the Chatbot component for this service
    }
  ];

  const service = services.find((s) => s.id === parseInt(id));

  return (
    <div className="service-detail">
      {service ? (
        <div className="service-detail-content">
          <h2>{service.title}</h2>
          <p>{service.description}</p>
          {service.component}
          <button onClick={() => navigate("/services")}>Back to Services</button>
        </div>
      ) : (
        <p>Service not found</p>
      )}
    </div>
  );
}

export default ServiceDetail;
