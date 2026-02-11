import React from "react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaClock,
  FaUsers,
  FaCertificate,
  FaHeadset,
  FaRocket,
  FaGlobe,
} from "react-icons/fa";

const reasons = [
  {
    id: 1,
    icon: <FaChalkboardTeacher />,
    title: "Expert Instructors",
    desc: "Learn from industry professionals with years of real-world experience.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: <FaLaptopCode />,
    title: "Hands-on Projects",
    desc: "Build real-world projects that showcase your skills to employers.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    icon: <FaClock />,
    title: "Learn at Your Pace",
    desc: "24/7 access to course materials. Study anytime, anywhere.",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    icon: <FaUsers />,
    title: "Community Support",
    desc: "Join a vibrant community of learners and mentors ready to help.",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 5,
    icon: <FaCertificate />,
    title: "Verified Certificates",
    desc: "Earn recognized certificates to boost your professional profile.",
    color: "from-red-500 to-rose-500",
  },
  {
    id: 6,
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Get help whenever you need it with our dedicated support team.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 7,
    icon: <FaRocket />,
    title: "Career Guidance",
    desc: "Access resources and guidance to advance your career.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 8,
    icon: <FaGlobe />,
    title: "Global Community",
    desc: "Connect with learners from over 50 countries worldwide.",
    color: "from-teal-500 to-cyan-500",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
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
            Why MyAcademy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We're{' '}
            <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Different
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here's what makes us the preferred choice for thousands of learners
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-orange-500 to-amber-500 rounded-3xl p-12 mb-16 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-white/90">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-white/90">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-white/90">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-white/90">Support Available</div>
            </div>
          </div>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* linear Border on Hover */}
              <div className={`absolute inset-0 bg-linear-to-r ${reason.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-r ${reason.color} flex items-center justify-center mb-6 text-white text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {reason.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.desc}
              </p>

              {/* Decorative Dot */}
              <div className={`absolute bottom-4 right-4 w-2 h-2 rounded-full bg-linear-to-r ${reason.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already learning and growing with MyAcademy
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
            onClick={()=>alert('sign up to continue')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </motion.button>
            <motion.button
            onClick={()=>alert('sign up to continue')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 transition-all duration-300"
            >
              Browse Courses
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;