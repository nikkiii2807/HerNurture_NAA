import React from "react";

function Contact() {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" />
        <label>Email:</label>
        <input type="email" name="email" />
        <label>Message:</label>
        <textarea name="message"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
