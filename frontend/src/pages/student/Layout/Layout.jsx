import React, { useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
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
  const [authView, setAuthView] = useState("register");

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-linear-to-r from-orange-600 to-amber-600 text-white z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              onClick={() => scroll.scrollToTop()} 
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  MA
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tight group-hover:text-orange-100 transition-colors duration-300">
                MyAcademy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { to: "home", label: "Home" },
                { to: "about", label: "About" },
                { to: "courses", label: "Courses" },
                { to: "testimony", label: "Testimonials" },
                { to: "choose", label: "Why Choose Us" },
                { to: "contact", label: "Contact" }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  activeClass="text-orange-200 font-semibold"
                  className="text-white hover:text-orange-200 transition-colors duration-300 cursor-pointer relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-b from-orange-700 to-amber-700 rounded-lg shadow-xl mt-2">
              {[
                { to: "home", label: "Home" },
                { to: "about", label: "About" },
                { to: "courses", label: "Courses" },
                { to: "testimony", label: "Testimonials" },
                { to: "choose", label: "Why Choose Us" },
                { to: "contact", label: "Contact" }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  onClick={closeMenu}
                  activeClass="bg-white/20 text-white font-semibold"
                  className="block px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative bg-linear-to-br from-gray-900 via-gray-800 to-orange-900 pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="space-y-8 text-white">
              <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Learn. Grow.{" "}
                <span className="bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Succeed.
                </span>
                <br />
                <span className="text-4xl md:text-6xl">Your Future Starts Here</span>
              </h1>
              
              <p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
                Join thousands of learners worldwide and achieve your goals with expert-led courses. 
                Gain practical skills, access exclusive resources, and become part of a vibrant community 
                of lifelong learners dedicated to personal and professional growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-8 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-amber-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                  Start Learning Free
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Demo
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-300">10K+</div>
                  <div className="text-sm text-gray-400">Active Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-300">500+</div>
                  <div className="text-sm text-gray-400">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-300">98%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Auth Form */}
            <div className="relative">
              <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8">
             

                {/* Auth Form */}
                <div className="min-h-100">
                  {authView === "register" ? (
                    <Register switchToLogin={() => setAuthView("login")} />
                  ) : (
                    <Login switchToRegister={() => setAuthView("register")} />
                  )}
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-linear-to-r from-orange-500 to-amber-500 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-linear-to-r from-orange-500 to-amber-500 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="flex flex-col items-center text-white hover:text-orange-300 transition-colors duration-300 cursor-pointer"
          >
            <span className="text-sm mb-2">Explore More</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </Link>
        </div>
      </section>

      {/* Other Sections */}
      <section id="about" className="bg-linear-to-b from-gray-50 to-white">
        <About />
      </section>

      <section id="courses" className=" bg-white">
        <DummyCourses />
      </section>

      <section id="testimony" className=" bg-linear-to-b from-gray-50 to-white">
        <Testimonials />
      </section>

      <section id="choose" className="bg-linear-to-b from-gray-50 to-white">
        <WhyChooseUs />
      </section>

      <section id="contact" className=" bg-white">
        <Contact />
      </section>

      <section className="bg-linear-to-b from-gray-900 to-gray-950">
        <Footer />
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => scroll.scrollToTop()}
        className="fixed bottom-8 right-8 w-12 h-12 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default Layout;