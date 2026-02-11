import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaGlobe, FaRocket } from 'react-icons/fa';
import img from '../../../assets/images/img2.jpeg';
import img1 from '../../../assets/images/img4.jpeg';

const About = () => {
  const stats = [
    { icon: <FaUsers />, value: '10K+', label: 'Active Students' },
    { icon: <FaGraduationCap />, value: '500+', label: 'Courses' },
    { icon: <FaGlobe />, value: '50+', label: 'Countries' },
    { icon: <FaRocket />, value: '98%', label: 'Success Rate' },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
            About MyAcademy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Empowering Learners{' '}
            <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make quality education accessible to everyone, everywhere.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src={img1}
                  alt="Learning Environment"
                  className="w-full h-100 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-orange-500/20 to-amber-500/20 rounded-2xl"></div>
              </div>
              
              {/* Overlay Image */}
              <div className="absolute -bottom-10 -right-10 z-20">
                <div className="relative">
                  <img
                    src={img}
                    alt="Student Success"
                    className="w-48 h-48 object-cover rounded-2xl border-4 border-white shadow-xl"
                  />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-linear-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    4.8
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-200 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-200 rounded-full blur-2xl opacity-60"></div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Vision */}
            <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                At MyAcademy, we believe that education should be accessible to everyone, everywhere. 
                We provide high-quality online courses led by experienced instructors, designed to help 
                learners gain practical skills, advance their careers, and achieve personal growth.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to create a learning environment that is flexible, affordable, and impactful. 
                Whether you are a student looking to improve academic performance, a professional seeking 
                career advancement, or a lifelong learner exploring new interests, MyAcademy offers courses 
                tailored to your goals.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl text-orange-500 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span onClick={()=>alert('sign up to continue')}>Join Our Community</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;