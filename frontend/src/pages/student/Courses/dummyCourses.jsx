import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaFire, FaStar, FaClock, FaSignal } from "react-icons/fa";
import Courses from "./Courses";

const dummyCourses = [
  {
    _id: "1",
    title: "React for Beginners",
    description: "Learn React from scratch with hands-on projects. Master components, hooks, and state management.",
    thumbnail: "https://i.pinimg.com/736x/dc/2b/a9/dc2ba98a94158ab62705c4a927ad1876.jpg",
    price: 0,
    duration: "5h 30m",
    level: "Beginner",
    averageRating: 4.5,
    reviewCount: 120,
    likesCount: 15,
    students: 1234,
  },
  {
    _id: "2",
    title: "Advanced Node.js",
    description: "Deep dive into Node.js with real-world examples. Build scalable backend applications.",
    thumbnail: "https://i.pinimg.com/736x/06/1a/70/061a70b0d54b4c2f7b4f1d5e0482ac55.jpg",
    price: 49,
    duration: "8h 20m",
    level: "Advanced",
    averageRating: 4.8,
    reviewCount: 90,
    likesCount: 25,
    students: 876,
  },
  {
    _id: "3",
    title: "HTML & CSS Mastery",
    description: "Master the fundamentals of web development. Create responsive and beautiful websites.",
    thumbnail: "https://i.pinimg.com/736x/68/ae/be/68aebe036126b45098ae268a82882e3f.jpg",
    price: 0,
    duration: "3h 15m",
    level: "Beginner",
    averageRating: 4.3,
    reviewCount: 80,
    likesCount: 10,
    students: 2567,
  },
  {
    _id: "4",
    title: "JavaScript Deep Dive",
    description: "Learn core JavaScript concepts with examples. From closures to promises and async/await.",
    thumbnail: "https://i.pinimg.com/1200x/b6/ab/52/b6ab52333dd3effe49adf85e8179155a.jpg",
    price: 19,
    duration: "6h 40m",
    level: "Intermediate",
    averageRating: 4.6,
    reviewCount: 150,
    likesCount: 20,
    students: 1890,
  },
  {
    _id: "5",
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis, visualization, and machine learning.",
    thumbnail: "https://i.pinimg.com/1200x/d1/e0/e4/d1e0e4d8b16641b1cf652e190d62bbf2.jpg",
    price: 59,
    duration: "10h 15m",
    level: "Intermediate",
    averageRating: 4.7,
    reviewCount: 110,
    likesCount: 30,
    students: 1456,
  },
  {
    _id: "6",
    title: "UI/UX Design Principles",
    description: "Learn the fundamentals of user interface and experience design. Create stunning designs.",
    thumbnail: "https://i.pinimg.com/originals/54/b9/e6/54b9e65e0f60a16aa007b94855241850.gif",
    price: 39,
    duration: "7h 30m",
    level: "Beginner",
    averageRating: 4.4,
    reviewCount: 95,
    likesCount: 18,
    students: 1023,
  },
];

const DummyCourses = () => {
  const featuredCourses = dummyCourses.slice(0, 3);
  const popularCourses = dummyCourses.slice(3, 6);

  return (
    <section className="relative py-20 overflow-hidden bg-linear-to-b from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
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
            Start Learning Today
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular{' '}
            <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from hundreds of courses taught by industry experts
          </p>
        </motion.div>

        {/* Featured Courses */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FaFire className="w-6 h-6 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900">Featured Courses</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-xl border-orange-200 hover:bg-orange-50 transition-all duration-300"
            >
              <span onClick={()=>alert('sign up to continue')}>View All</span>
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Courses course={course}  featured={true} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Courses */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FaStar className="w-6 h-6 text-amber-500" />
              <h3 className="text-2xl font-bold text-gray-900">Most Popular</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span onClick={()=>alert('sign up to continue')}>Browse All</span>
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Courses course={course} theme="orange" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-linear-to-r from-orange-500 to-amber-500 rounded-3xl text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-xl mb-8 text-white/90">Join thousands of students already learning on MyAcademy</p>
            <motion.button
            onClick={()=>alert('sign up to continue')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started for Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DummyCourses;