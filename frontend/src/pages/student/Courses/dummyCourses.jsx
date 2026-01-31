import React from "react";
import Courses from "./Courses";


const dummyCourses = [
  {
    _id: "1",
    title: "React for Beginners",
    description: "Learn React from scratch with hands-on projects.",
    thumbnail:
      "https://i.pinimg.com/736x/dc/2b/a9/dc2ba98a94158ab62705c4a927ad1876.jpg",
    price: 0,
    duration: "5h 30m",
    level: "Beginner",
    averageRating: 4.5,
    reviewCount: 120,
    likesCount: 15,
  },
  {
    _id: "2",
    title: "Advanced Node.js",
    description: "Deep dive into Node.js with real-world examples.",
    thumbnail:
      "https://i.pinimg.com/736x/06/1a/70/061a70b0d54b4c2f7b4f1d5e0482ac55.jpg",
    price: 49,
    duration: "8h 20m",
    level: "Advanced",
    averageRating: 4.8,
    reviewCount: 90,
    likesCount: 25,
  },
  {
    _id: "3",
    title: "HTML & CSS Basics",
    description: "Master the fundamentals of web development.",
    thumbnail:
      "https://i.pinimg.com/736x/68/ae/be/68aebe036126b45098ae268a82882e3f.jpg",
    price: 0,
    duration: "3h 15m",
    level: "Beginner",
    averageRating: 4.3,
    reviewCount: 80,
    likesCount: 10,
  },
  {
    _id: "4",
    title: "JavaScript Essentials",
    description: "Learn core JavaScript concepts with examples.",
    thumbnail:
      "https://i.pinimg.com/1200x/b6/ab/52/b6ab52333dd3effe49adf85e8179155a.jpg",
    price: 19,
    duration: "6h 40m",
    level: "Intermediate",
    averageRating: 4.6,
    reviewCount: 150,
    likesCount: 20,
  },
];

const DummyCourses = () => {
  return (
    <div className="max-w-300 mx-auto px-4 py-6 pt-0 md:pt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-orange-500 text-2xl font-light px-3 py-2 rounded ">
          Our Course
        </h1>
        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
          See More
        </button>
      </div>

      {/* Courses Row */}
      <div className="flex flex-wrap gap-6">
        {dummyCourses.map((course) => (
          <div key={course._id} className="flex-1 min-w-62.5 max-w-sm">
            <Courses course={course} theme="orange" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DummyCourses;
