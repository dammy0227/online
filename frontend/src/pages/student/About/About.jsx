import React from 'react';
import img from '../../../assets/images/img2.jpeg';
import img1 from '../../../assets/images/img4.jpeg';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-orange-500 p-2 font-light  w-fit text-3xl sm:text-4xl ">About Us</h1>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
        {/* Images */}
        <div className="relative flex-1 min-w-75 cursor-pointer">
          {/* Main Image */}
          <img
            src={img1}
            alt="Main"
            className="w-4/5 rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:brightness-50 sm:w-11/12"
          />
          {/* Overlay Image */}
          <img
            src={img}
            alt="Overlay"
            className="w-1/2 absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 rounded-lg border-4 border-orange-400 shadow-md transition-transform duration-300 hover:scale-105 hover:brightness-60 sm:top-[70%] sm:left-1/2 sm:w-2/3"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-75">
          <h3 className="text-amber-600 text-xl font-semibold mb-2">Our Vision</h3>
          <p className="mb-4 text-sm sm:text-base text-gray-800 leading-relaxed">
            At MyAcademy, we believe that education should be accessible to everyone, everywhere. We provide high-quality online courses led by experienced instructors, designed to help learners gain practical skills, advance their careers, and achieve personal growth.
          </p>

          <h3 className="text-amber-600 text-xl font-semibold mb-2">Our Mission</h3>
          <p className="mb-4 text-sm sm:text-base text-gray-800 leading-relaxed">
            Our mission is to create a learning environment that is flexible, affordable, and impactful. Whether you are a student looking to improve academic performance, a professional seeking career advancement, or a lifelong learner exploring new interests, MyAcademy offers courses tailored to your goals.
          </p>

          <h3 className="text-amber-600 text-xl font-semibold mb-2">Join Us</h3>
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
            Join our growing community of learners and start your journey to success today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
