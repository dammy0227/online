import React, { useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./Layout.css";
import Register from "../../auth/Register";
import Login from "../../auth/Login";
import About from "../About/About";
import DummyCourses from "../Courses/dummyCourses";
import Testimonials from "../Testimonials/Testimonials";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authView, setAuthView] = useState("register"); // 🔹 toggle between register/login

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => scroll.scrollToTop()}>
          MyAcademy
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="home" smooth duration={500} onClick={closeMenu} spy activeClass="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="about" smooth duration={500} onClick={closeMenu} spy activeClass="active">
              About
            </Link>
          </li>
          <li>
            <Link to="courses" smooth duration={500} onClick={closeMenu} spy activeClass="active">
              Courses
            </Link>
          </li>
          <li>
            <Link to="testimony" smooth duration={500} onClick={closeMenu} spy activeClass="active">
              Testimony
            </Link>
          </li>
          <li>
            <Link to="choose" smooth duration={500} onClick={closeMenu} spy activeClass="active">
              Why Choose Us
            </Link>
          </li>
          <li>
            <Link to="contact" smooth duration={500} onClick={closeMenu} spy activeClass="active">
              Contact us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sections */}
      <section id="home" className="home-section">
        <div className="home-wrapper">
          <div className="home-text">
            <h1>Learn. Grow. Succeed. Your Future Starts Here</h1>
            <p>
              Join thousands of learners worldwide and achieve your goals with expert-led courses. Gain practical
              skills, access exclusive resources, and become part of a vibrant community of lifelong learners dedicated
              to personal and professional growth.
            </p>
            <div className="home-btn">
              <button className="home-purple">Learn More</button>
              <button className="home-white">Watch Demo</button>
            </div>
          </div>
          
          <div className="home-login">
            {authView === "register" ? (
                  <Register switchToLogin={() => setAuthView("login")} />
            ) : (
                <Login switchToRegister={() => setAuthView("register")} />
                 )}
            </div>
        </div>
      </section>

      {/* Other Sections */}
      <section id="about" className="section about">
            <About />
      </section>

      <section id="courses" className="section courses">
        <DummyCourses />
      </section>

      <section id="testimony" className="section testimony">
        <Testimonials />
      </section>

      <section id="choose" className="section choose">
        <WhyChooseUs />
      </section>

      <section id="contact" className="section contact">
        <Contact />
      </section>

      <section  className="section footer">
        <Footer />
      </section>

      
    </div>
  );
}; 

export default Layout;
