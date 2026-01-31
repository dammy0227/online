import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  enrollCourse,
  fetchMyCourses,
  toggleCourseLikeThunk,
} from "../../../features/courses/courseThunks";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaClock,
  FaUserGraduate,
  FaBook,
  FaPlay,
  FaChartLine,
  FaLock,
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const CourseCard = ({ course, hideLike = false, isEnrolled = false, progress }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myCourses,  } = useSelector((state) => state.courses);
  const user = useSelector((state) => state.auth.user);

  const [enrolling, setEnrolling] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const enrolled = isEnrolled || myCourses?.some((p) => p.course._id === course._id);
  const isLiked = course.liked || false;

  const handleEnroll = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const result = await dispatch(enrollCourse(course._id)).unwrap();
      setSuccessMsg(result.message || "Enrolled successfully!");
      await dispatch(fetchMyCourses());
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setErrorMsg(err?.message || err || "Failed to enroll.");
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setEnrolling(false);
    }
  };

  const handleCardClick = () => {
    if (enrolled) {
      navigate(`/student/courses/${course._id}`);
    }
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    dispatch(toggleCourseLikeThunk(course._id));
  };

  const priceLabel = course.price === 0 ? "Free" : `$${course.price}`;
  const rating = course.averageRating || 0;
  const progressPercentage = progress?.percentage || 0;

  return (
    <motion.article
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
      className={`group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer h-full flex flex-col ${
        enrolled ? 'ring-1 ring-amber-200' : ''
      }`}
    >
      {/* Course Thumbnail - Compact */}
      <div className="relative h-40 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={course.thumbnail || "/placeholder-course.png"}
          alt={course.title}
          loading="lazy"
        />
        
        {/* Price Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold ${
          course.price === 0 
            ? 'bg-green-500 text-white' 
            : 'bg-linear-to-r from-amber-500 to-orange-500 text-white'
        }`}>
          {priceLabel}
        </div>

        {/* Like Button */}
        {!hideLike && (
          <button
            onClick={handleToggleLike}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm"
            aria-label={isLiked ? "Unlike course" : "Like course"}
          >
            {isLiked ? (
              <FaHeart className="text-red-500 text-sm" />
            ) : (
              <FaRegHeart className="text-gray-600 text-sm hover:text-red-500" />
            )}
          </button>
        )}

        {/* Enrolled Badge */}
        {enrolled && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-md">
            <FaCheckCircle className="inline mr-1" />
            Enrolled
          </div>
        )}

        {/* Progress Bar (if enrolled) */}
        {enrolled && progressPercentage > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-linear-to-r from-amber-500 to-orange-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>

      {/* Course Content - Compact */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Header */}
        <header className="mb-3">
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-amber-600 transition-colors text-sm leading-tight">
            {course.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">
            {course.description || "No description provided."}
          </p>
        </header>

        {/* Course Stats - Compact */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              i < Math.floor(rating) ? (
                <FaStar key={i} className="text-amber-500 text-xs" />
              ) : (
                <FaRegStar key={i} className="text-gray-300 text-xs" />
              )
            ))}
            <span className="text-xs font-semibold text-gray-800 ml-1">{rating.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <FaClock className="text-gray-400" />
            <span>{course.duration?.split(' ')[0] || "Self"}</span>
          </div>
        </div>

        {/* Messages - Compact */}
        {successMsg && (
          <div className="mb-2 p-1.5 bg-green-50 border border-green-200 rounded flex items-center gap-1">
            <FaCheckCircle className="text-green-500 text-xs shrink-0" />
            <span className="text-xs text-green-700 truncate">{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-2 p-1.5 bg-red-50 border border-red-200 rounded flex items-center gap-1">
            <FaExclamationCircle className="text-red-500 text-xs shrink-0" />
            <span className="text-xs text-red-700 truncate">{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons - Compact */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          {enrolled ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/student/courses/${course._id}`);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                <FaPlay className="text-xs" />
                <span>Continue</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/student/courses/${course._id}/progress`);
                }}
                className="px-2 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                title="View progress"
              >
                <FaChartLine className="text-xs" />
              </button>
            </div>
          ) : course.price === 0 ? (
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-linear-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enrolling ? (
                <>
                  <FaSpinner className="animate-spin text-xs" />
                  <span>Enrolling...</span>
                </>
              ) : (
                <>
                  <FaBook className="text-xs" />
                  <span>Enroll Free</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-800">{priceLabel}</div>
              </div>
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="flex items-center gap-1 px-3 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enrolling ? (
                  <FaSpinner className="animate-spin text-xs" />
                ) : (
                  <>
                    {user ? (
                      <>
                        <FaBook className="text-xs" />
                        <span>Enroll</span>
                      </>
                    ) : (
                      <>
                        <FaLock className="text-xs" />
                        <span>Login</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Progress Display (if enrolled) */}
        {enrolled && progressPercentage > 0 && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span className="font-semibold text-amber-600">{progressPercentage}%</span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default CourseCard;