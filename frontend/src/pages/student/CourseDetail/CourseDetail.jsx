import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseById } from "../../../features/courses/courseThunks";
import { fetchMyProgress } from "../../../features/progress/progressThunks";
import ModuleCard from "./ModuleCard";
import {
  FaArrowLeft,
  FaPlay,
  FaClock,
  FaUserGraduate,
  FaBook,
  FaStar,
  FaRegStar,
  FaShareAlt,
  FaBookmark,
  FaRegBookmark,
  FaCheckCircle,
  FaChevronRight,
  FaHome,
  FaVideo,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { selectedCourse, loading: courseLoading, error: courseError } = useSelector(
    (state) => state.courses
  );
  const { progress, loading: progressLoading, error: progressError } = useSelector(
    (state) => state.progress
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
      dispatch(fetchMyProgress(courseId));
    }
  }, [dispatch, courseId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEnroll = () => {
    // Implement enrollment logic
    console.log("Enrolling in course:", courseId);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const calculateProgress = () => {
    if (!progress || !selectedCourse?.modules) return 0;
    const completedCount = progress.completedModules?.length || 0;
    const totalCount = selectedCourse.modules.length;
    return totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  };

  if (courseLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700">Loading course...</h3>
          <p className="text-gray-500">Fetching course details and your progress</p>
        </div>
      </div>
    );
  }

  if (courseError || progressError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBook className="text-2xl text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Course</h3>
          <p className="text-gray-600 mb-6">{courseError || progressError}</p>
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBook className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Course Not Found</h3>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = calculateProgress();
  const totalModules = selectedCourse.modules?.length || 0;
  const completedModules = progress?.completedModules?.length || 0;

  return (
    <div className="min-h-screen bg-linear-to-br  from-gray-50 to-gray-100">
      {/* Header Navigation */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <FaArrowLeft />
                <span className="font-medium">Back</span>
              </button>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <FaHome />
                <FaChevronRight className="text-xs" />
                <span>Courses</span>
                <FaChevronRight className="text-xs" />
                <span className="text-gray-800 font-medium">{selectedCourse.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleBookmark}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title={isBookmarked ? "Remove bookmark" : "Bookmark course"}
              >
                {isBookmarked ? (
                  <FaBookmark className="text-amber-500" />
                ) : (
                  <FaRegBookmark className="text-gray-600" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Share">
                <FaShareAlt className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl  p-6 mb-6 border border-gray-300"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Course Thumbnail */}
                <div className="md:w-1/3">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={selectedCourse.thumbnail || "/placeholder-course.png"}
                      alt={selectedCourse.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-bold ${
                      selectedCourse.price === 0 
                        ? 'bg-green-500 text-white' 
                        : 'bg-linear-to-r from-amber-500 to-orange-500 text-white'
                    }`}>
                      {selectedCourse.price === 0 ? "Free" : `$${selectedCourse.price}`}
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="md:w-2/3">
                  <h1 className="text-2xl md:text-2xl font-bold text-gray-700 mb-3">
                    {selectedCourse.title}
                  </h1>
                  <p className="text-gray-600 mb-6">{selectedCourse.description}</p>
                  
                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                        <FaBook />
                        <span className="font-medium">Modules</span>
                      </div>
                      <span className="text-xl font-bold text-gray-700">{totalModules}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                        <FaClock />
                        <span className="font-medium">Duration</span>
                      </div>
                      <span className="text-md font-bold text-gray-700">{selectedCourse.duration || "Self-paced"}</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                        <FaUserGraduate />
                        <span className="font-medium">Enrolled</span>
                      </div>
                      <span className="text-xl font-bold text-gray-700">
                        {selectedCourse.enrolledStudents?.toLocaleString() || "1.2k"}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                        <FaStar className="text-amber-500" />
                        <span className="font-medium">Rating</span>
                      </div>
                      <span className="text-xl font-bold text-gray-700">
                        {selectedCourse.averageRating?.toFixed(1) || "4.5"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl  p-6 mb-6 border border-gray-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-700">Your Progress</h2>
                <span className="text-lg font-bold text-amber-600">{progressPercentage}%</span>
              </div>
              <div className="mb-2">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{completedModules} of {totalModules} modules completed</span>
                <span>Keep going!</span>
              </div>
            </motion.div>

            {/* Modules Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Course Modules</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm">Total: {totalModules} modules</span>
                  {completedModules > 0 && (
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <FaCheckCircle />
                      {completedModules} completed
                    </span>
                  )}
                </div>
              </div>

              {selectedCourse.modules?.length === 0 ? (
                <div className="bg-white rounded-2xl  p-8 text-center border border-gray-300">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBook className="text-2xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Modules Available</h3>
                  <p className="text-gray-600">Course modules will be added soon.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedCourse.modules.map((mod, index) => (
                    <ModuleCard
                      key={mod._id}
                      module={mod}
                      courseId={courseId}
                      completedModules={progress?.completedModules || []}
                      index={index + 1}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              {/* Enroll Card */}
              <div className="bg-white rounded-2xl  p-6 mb-6 border border-gray-300">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Enroll in Course</h3>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {selectedCourse.price === 0 ? "Free" : `$${selectedCourse.price}`}
                  </div>
                  {selectedCourse.price > 0 && (
                    <div className="text-sm text-gray-500 line-through">${Math.round(selectedCourse.price * 1.5)}</div>
                  )}
                </div>
                <button
                  onClick={handleEnroll}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all hover:shadow-lg mb-4"
                >
                  <FaPlay />
                  {progress ? "Continue Learning" : "Enroll Now"}
                </button>
                <p className="text-center text-sm text-gray-600 mb-6">
                  {progress ? "Resume your learning journey" : "Start your learning journey today"}
                </p>

                {/* Course Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FaVideo className="text-amber-600" />
                    </div>
                    <span>Video lessons with experts</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaFileAlt className="text-blue-600" />
                    </div>
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaQuestionCircle className="text-green-600" />
                    </div>
                    <span>Quizzes & assessments</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FaCheckCircle className="text-purple-600" />
                    </div>
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>

              {/* Instructor Info */}
              {selectedCourse.instructor && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">About the Instructor</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white text-xl font-bold">
                      {selectedCourse.instructor.name?.charAt(0) || "I"}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{selectedCourse.instructor.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{selectedCourse.instructor.title || "Lead Instructor"}</p>
                      <div className="flex items-center gap-2 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-amber-500 text-sm" />
                        ))}
                        <span className="text-sm font-medium">4.9</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {selectedCourse.instructor.bio || "Expert instructor with years of experience in this field."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;