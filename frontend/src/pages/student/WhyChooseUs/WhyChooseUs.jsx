import React from "react";
import {
  FaChalkboardTeacher,
  FaLaptopCode,
  FaClock,
  FaUsers,
} from "react-icons/fa";

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
    <section className="max-w-6xl mx-auto px-4 py-0 md:py-12">
      {/* Header */}
      <h2 className="text-3xl  text-orange-600 text-left mb-2">
        Why Choose Us
      </h2>
      <p className="text-gray-600 mb-8">
        Here’s what makes us different
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="text-4xl text-orange-500 mb-4 flex justify-center lg:justify-start">
              {reason.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {reason.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {reason.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
