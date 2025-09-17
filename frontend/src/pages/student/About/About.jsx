import React from 'react'
import './About.css'
import img from '../../../assets/images/img2.jpeg'
import img1 from '../../../assets/images/img4.jpeg'

const About = () => {
  return (
    <div className='about-container'>
      <h1>About Us</h1>
      <div className="about-wrapper">
            <div className="about-img">
                  <img src={img1} alt="" className='img' />
                  <img src={img} alt="" className='imgs'/>
            </div>

            <div className="about-text">
                  <h3>Our Vision</h3>
                  <p>At MyAcademy, we believe that education should be accessible to everyone, everywhere.
                        We provide high-quality online courses led by experienced instructors, designed to help
                         learners gain practical skills, advance their careers, and achieve personal growth.</p>
                  <h3>Our Mission</h3>
                  <p>Our mission is to create a learning environment that is flexible, affordable, and impactful.
                         Whether you are a student looking to improve academic performance, a professional seeking 
                         career advancement, or a lifelong learner exploring new interests, MyAcademy offers courses tailored to your goals.</p>
                   <h3>Join Us</h3>
                  <p>Join our growing community of learners and start your journey to success today.</p>
            </div>
      </div>
    </div>
  ) 
}

export default About
