import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We make learning easier by connecting students with top-quality online
            courses. Whether you’re a beginner or advanced learner, we provide
            the tools you need to grow your skills anytime, anywhere.
          </p>
        </div>

        {/* Our Services */}
        <div className="footer-section">
          <h3>Our Courses</h3>
          <ul>
            <li>Web Development</li>
            <li>Mobile App Development</li>
            <li>Data Science & AI</li>
            <li>Cybersecurity</li>
            <li>Cloud Computing</li>
            <li>UI/UX Design</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📍 Lagos, Nigeria</p>
          <p>📞 +234 800 765 4321</p>
          <p>📧 support@MyAcademy.com</p>
        </div>

        {/* Get in Touch */}
        <div className="footer-section">
          <h3>Get in Touch</h3>
          <p>Follow us on social media and get our app:</p>
          <div className="footer-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
          <div className="footer-stores">
            <button><FaGooglePlay /> Google Play</button>
            <button><FaAppStoreIos /> App Store</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 LearnHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
