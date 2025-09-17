import React from "react";
import Courses from "./Courses"; 
import "./Courses.css"; // Make sure you style the header too

// Dummy data
const dummyCourses = [
  {
    _id: "1",
    title: "React for Beginners",
    description: "Learn React from scratch with hands-on projects.",
    thumbnail: "https://i.pinimg.com/736x/dc/2b/a9/dc2ba98a94158ab62705c4a927ad1876.jpg",
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
    thumbnail: "https://i.pinimg.com/736x/06/1a/70/061a70b0d54b4c2f7b4f1d5e0482ac55.jpg",
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
    thumbnail: "https://i.pinimg.com/736x/68/ae/be/68aebe036126b45098ae268a82882e3f.jpg",
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
    thumbnail: "https://i.pinimg.com/1200x/b6/ab/52/b6ab52333dd3effe49adf85e8179155a.jpg",
    price: 19,
    duration: "6h 40m",
    level: "Intermediate",
    averageRating: 4.6,
    reviewCount: 150,
    likesCount: 20,
  },
//   {
//     _id: "5",
//     title: "Python for Data Science",
//     description: "Introduction to Python and data science workflows.",
//     thumbnail: "https://via.placeholder.com/300x180.png?text=Python+Data+Science",
//     price: 39,
//     duration: "10h 00m",
//     level: "Intermediate",
//     averageRating: 4.7,
//     reviewCount: 200,
//     likesCount: 30,
//   },
//   {
//     _id: "6",
//     title: "UI/UX Design Basics",
//     description: "Learn design principles to create user-friendly apps.",
//     thumbnail: "https://via.placeholder.com/300x180.png?text=UI+UX",
//     price: 25,
//     duration: "4h 10m",
//     level: "Beginner",
//     averageRating: 4.2,
//     reviewCount: 70,
//     likesCount: 8,
//   },
//   {
//     _id: "7",
//     title: "Database Fundamentals",
//     description: "Understand SQL and NoSQL databases with examples.",
//     thumbnail: "https://via.placeholder.com/300x180.png?text=Database",
//     price: 29,
//     duration: "7h 45m",
//     level: "Intermediate",
//     averageRating: 4.4,
//     reviewCount: 95,
//     likesCount: 12,
//   },
//   {
//     _id: "8",
//     title: "Machine Learning Intro",
//     description: "Get started with machine learning and AI concepts.",
//     thumbnail: "https://via.placeholder.com/300x180.png?text=Machine+Learning",
//     price: 59,
//     duration: "12h 30m",
//     level: "Advanced",
//     averageRating: 4.9,
//     reviewCount: 250,
//     likesCount: 40,
//   },
];

const DummyCourses = () => {
  return (
    <div className="courses">
      <div className="header">
      <div className="courses-header">
        <h1>Our Courses</h1>
        <button>See More</button>
      </div>

      {/* Course list */}
      <div className="course-list">
        {dummyCourses.map((course) => (
          <Courses key={course._id} course={course} />
        ))}
      </div>
      </div>

    </div>
  );
};

export default DummyCourses;
