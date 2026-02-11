import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaClock, FaSignal, FaUsers, FaHeart, FaRegHeart } from "react-icons/fa";

const Courses = ({ course,  featured = false }) => {
  const [liked, setLiked] = useState(false);
  const [setLikesCount] = useState(course.likesCount || 0);

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const priceLabel = course.price === 0 ? "Free" : `$${course.price}`;


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-amber-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <motion.article
      whileHover={{ y: -5 }}
      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 ${
        featured ? "ring-2 ring-orange-500 ring-offset-2" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
          src={course.thumbnail || "/placeholder-course.png"}
          alt={course.title}
          loading="lazy"
        />
        
        {/* linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Price Badge */}
        <span
          className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-lg ${
            course.price === 0
              ? "bg-linear-to-r from-green-500 to-emerald-500 text-white" 
              : "bg-linear-to-r from-orange-500 to-amber-500 text-white"
          } shadow-lg`}
        >
          {priceLabel}
        </span>

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleLike}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          {liked ? (
            <FaHeart className="w-5 h-5 text-red-500" />
          ) : (
            <FaRegHeart className="w-5 h-5 text-gray-700" />
          )}
        </motion.button>

        {/* Level Badge */}
        <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
          {course.level || "All levels"}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description || "No description provided."}
        </p>

        {/* Course Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FaClock className="w-4 h-4" />
            <span>{course.duration || "—"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaSignal className="w-4 h-4" />
            <span>{course.level || "All"}</span>
          </div>
          {course.students && (
            <div className="flex items-center gap-1">
              <FaUsers className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {renderStars(course.averageRating)}
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {course.averageRating?.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">
            ({course.reviewCount || 0} reviews)
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${
              course.price === 0 
                ? "text-green-600" 
                : "text-orange-600"
            }`}>
              {priceLabel}
            </span>
          </div>
          
          <motion.button
          onClick={()=>alert('sign up to continue')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Enroll Now
          </motion.button>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute -top-3 -right-3 w-16 h-16">
            <div className="absolute w-full h-full bg-linear-to-r from-orange-500 to-amber-500 rotate-45 transform origin-bottom-left"></div>
            <span className="absolute top-3 left-0 w-full text-center text-white text-xs font-bold uppercase tracking-wider">
              Featured
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default Courses;