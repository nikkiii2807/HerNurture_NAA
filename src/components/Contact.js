import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS
import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa"; // Importing icons
import "./Contact.css"; // Import custom CSS

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data using EmailJS
    emailjs
      .sendForm("service_1r020ru", "template_4kfd6w9", e.target, "s3npNXP8HosiLgTq8")
      .then(
        (result) => {
          alert("Message Sent Successfully!");
          console.log(result.text);
        },
        (error) => {
          alert("Message Sending Failed!");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Message:</label>
        <textarea
          name="message"
          placeholder="Write your message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <div className="social-media">
        <h3>Follow Us</h3>
        <div className="icons">
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon whatsapp" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="icon instagram" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="icon facebook" />
          </a>
          <a href="mailto:hernurtureai7@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="icon gmail" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
