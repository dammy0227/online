import React from "react";
import "./Contact.css";
import contactImg from "../../../assets/images/img1.jpeg"; // replace with your image path

const Contact = () => {
  return (
    <section className="contact-container">
      <div className="contact-card">
        {/* Left Side - Image */}
        <div className="contact-img">
          <img src={contactImg} alt="Contact Us" />
        </div>

        {/* Right Side - Form */}
        <div className="contact-form">
          <h2>Contact Us</h2>
          <p>We’d love to hear from you! Fill out the form below.</p>

          <form>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Write your message..." required />
            </div>

            <button type="submit" className="btn-submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
