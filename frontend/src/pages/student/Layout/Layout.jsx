import React, { useState, useRef } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Register from "../../auth/Register";
import Login from "../../auth/Login";
import About from "../About/About";
import DummyCourses from "../Courses/dummyCourses";
import Testimonials from "../Testimonials/Testimonials";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

// Animation wrapper component for scroll animations
const AnimatedSection = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 60, opacity: 0 };
      case "down": return { y: -60, opacity: 0 };
      case "left": return { x: -60, opacity: 0 };
      case "right": return { x: 60, opacity: 0 };
      case "scale": return { scale: 0.8, opacity: 0 };
      default: return { y: 60, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { y: 0, x: 0, scale: 1, opacity: 1 } : getInitialPosition()}
      transition={{ 
        duration: 0.7, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
const StaggerContainer = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }) => {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// Floating animation for decorative elements
const FloatingElement = ({ children, delay = 0, duration = 3, className = "" }) => {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authView, setAuthView] = useState("register");

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Navigation items
  const navItems = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "courses", label: "Courses" },
    { to: "testimony", label: "Testimonials" },
    { to: "choose", label: "Why Choose Us" },
    { to: "contact", label: "Contact" }
  ];

  // Stats data
  const stats = [
    { value: '10K+', label: 'Active Learners' },
    { value: '500+', label: 'Courses' },
    { value: '98%', label: 'Success Rate' }
  ];

  return (
    <div className="landing-page">
      {/* Navbar - Fixed with fade in animation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full bg-linear-to-r from-orange-600 to-amber-600 text-white z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with rotate animation */}
            <motion.div 
              onClick={() => scroll.scrollToTop()} 
              className="flex items-center space-x-2 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl font-bold bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  MA
                </span>
              </motion.div>
              <span className="text-2xl font-bold tracking-tight group-hover:text-orange-100 transition-colors duration-300">
                MyAcademy
              </span>
            </motion.div>

            {/* Desktop Navigation with staggered animation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
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
                </motion.div>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
            </motion.button>
          </div>

          {/* Mobile Navigation with slide down animation */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-linear-to-b from-orange-700 to-amber-700 rounded-lg shadow-xl mt-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative bg-linear-to-br from-gray-900 via-gray-800 to-orange-900 pt-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingElement delay={0} duration={4}>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-10"></div>
          </FloatingElement>
          <FloatingElement delay={1} duration={5}>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-10"></div>
          </FloatingElement>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text with slide in animations */}
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-8 text-white">
                <motion.h1 
                  className="text-3xl sm:text-3xl lg:text-4xl font-bold leading-tight"
                  animate={{ 
                    textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Learn. Grow.{" "}
                  <span className="bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent bg-size-200 animate-linear">
                    Succeed.
                  </span>
                  <br />
                  <span className="text-4xl md:text-6xl">Your Future Starts Here</span>
                </motion.h1>
                
                <motion.p 
                  className="text-sm sm:text-lg text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Join thousands of learners worldwide and achieve your goals with expert-led courses. 
                  Gain practical skills, access exclusive resources, and become part of a vibrant community 
                  of lifelong learners dedicated to personal and professional growth.
                </motion.p>
                
                <StaggerContainer delay={0.6}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <StaggerItem>
                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg"
                      >
                        Start Learning Free
                      </motion.button>
                    </StaggerItem>
                    <StaggerItem>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Watch Demo
                        </span>
                      </motion.button>
                    </StaggerItem>
                  </div>
                </StaggerContainer>

                {/* Stats with scale animation */}
                <StaggerContainer delay={0.8}>
                  <div className="grid grid-cols-3 gap-4 pt-8">
                    {stats.map((stat, index) => (
                      <StaggerItem key={index}>
                        <motion.div 
                          className="text-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="text-2xl font-bold text-orange-300">{stat.value}</div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              </div>
            </AnimatedSection>

            {/* Auth Form with scale animation */}
            <AnimatedSection direction="right" delay={0.3}>
              <div className="relative">
                <motion.div 
                  className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8"
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Auth Form */}
                  <div className="min-h-100">
                    {authView === "register" ? (
                      <Register switchToLogin={() => setAuthView("login")} />
                    ) : (
                      <Login switchToRegister={() => setAuthView("register")} />
                    )}
                  </div>
                </motion.div>
                
                {/* Decorative Elements with floating animation */}
                <FloatingElement delay={0} duration={4}>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-linear-to-r from-orange-500 to-amber-500 rounded-full"></div>
                </FloatingElement>
                <FloatingElement delay={1} duration={5}>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-linear-to-r from-orange-500 to-amber-500 rounded-full opacity-50"></div>
                </FloatingElement>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll Indicator with bounce animation */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="flex flex-col items-center text-white hover:text-orange-300 transition-colors duration-300 cursor-pointer"
          >
            <span className="text-sm mb-2">Explore More</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Other Sections with scroll animations */}
      <AnimatedSection direction="up" delay={0.1}>
        <section id="about">
          <About />
        </section>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <section id="courses">
          <DummyCourses />
        </section>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <section id="testimony">
          <Testimonials />
        </section>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <section id="choose">
          <WhyChooseUs />
        </section>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <section id="contact">
          <Contact />
        </section>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.1}>
        <section>
          <Footer />
        </section>
      </AnimatedSection>

      {/* Back to Top Button with floating animation */}
      <motion.button
        onClick={() => scroll.scrollToTop()}
        className="fixed bottom-8 right-8 w-12 h-12 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-40"
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* CSS for linear animation */}
      <style jsx>{`
        @keyframes linearShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-linear {
          background-size: 200% 200%;
          animation: linearShift 3s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default Layout;