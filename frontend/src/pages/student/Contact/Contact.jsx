import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  const [formStatus, setFormStatus] = useState("idle"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      value: "support@myacademy.com",
      link: "mailto:support@myacademy.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      value: "123 Learning St, Education City, EC 12345",
      link: "https://maps.google.com",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      value: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: null,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: <FaTwitter />, href: "#", label: "Twitter", color: "bg-sky-500 hover:bg-sky-600" },
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn", color: "bg-blue-700 hover:bg-blue-800" },
    { icon: <FaInstagram />, href: "#", label: "Instagram", color: "bg-linear-to-r from-purple-500 to-pink-500" },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-linear-to-b from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's{' '}
            <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${info.color} flex items-center justify-center mb-4 text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                    {info.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-600 transition-colors text-sm"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-sm">{info.value}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-xl ${social.color} text-white flex items-center justify-center text-xl shadow-lg transition-all duration-300`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-6">
                Follow us on social media for updates, tips, and exclusive content
              </p>
            </div>
          </motion.div>

          {/* Contact Form - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100">
              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                  <p className="text-gray-600 mb-8">We typically respond within 24 hours</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          required
                          disabled={formStatus === "submitting"}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          required
                          disabled={formStatus === "submitting"}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                        disabled={formStatus === "submitting"}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        placeholder="How can we help you?"
                        required
                        disabled={formStatus === "submitting"}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        rows="5"
                        placeholder="Tell us about your inquiry..."
                        required
                        disabled={formStatus === "submitting"}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm resize-none focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <div className="h-96 bg-gray-200 relative">
              {/* This would be replaced with actual Google Maps embed */}
              <iframe
                title="MyAcademy Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-73.9851076845842!3d40.75889697932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1644262073400!5m2!1sen!2sus"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;