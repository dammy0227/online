import React from "react";
import { FaChalkboardTeacher, FaLaptopCode, FaClock, FaUsers, FaStar } from "react-icons/fa";
import "./WhyChooseUs.css";

const reasons = [
  {
    id: 1,
    icon: <FaChalkboardTeacher />,
    title: "Expert Instructors",
    desc: "Learn from experienced professionals passionate about teaching.",
  },
  {
    id: 2,
    icon: <FaLaptopCode />,
    title: "Practical Learning",
    desc: "Hands-on projects and real-world scenarios to build confidence.",
  },
  {
    id: 3,
    icon: <FaClock />,
    title: "Flexible & Accessible",
    desc: "Study anytime, anywhere, and at your own pace.",
  },
  {
    id: 4,
    icon: <FaUsers />,
    title: "Supportive Community",
    desc: "Join a vibrant network of learners and mentors.",
  },
  
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us</h2>
      <p className="subtitle">Here’s what makes us different</p>

      <div className="reasons-grid">
        {reasons.map((reason) => (
          <div key={reason.id} className="reason-card">
            <div className="icon">{reason.icon}</div>
            <h3>{reason.title}</h3>
            <p>{reason.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
