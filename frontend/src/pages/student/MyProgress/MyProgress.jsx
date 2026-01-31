import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyCourses } from "../../../features/courses/courseThunks";
import {
  FaSpinner,
  FaExclamationCircle,
  FaBook,
  FaChartLine,
  FaTrophy,
  FaClock,
  FaCheckCircle,
  FaFilter,
  FaSearch,
  FaCalendar,
  FaGraduationCap,
  FaFire,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import CourseCard from "../BrowseCourses/CourseCard";

const MyProgress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myCourses, loading, error } = useSelector((state) => state.courses);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, in-progress, completed, recent
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  // Calculate course statistics
  const stats = {
    total: myCourses?.length || 0,
    completed: myCourses?.filter(c => c.progress?.percentage === 100).length || 0,
    inProgress: myCourses?.filter(c => c.progress?.percentage > 0 && c.progress?.percentage < 100).length || 0,
    notStarted: myCourses?.filter(c => !c.progress?.percentage || c.progress?.percentage === 0).length || 0,
    averageProgress: myCourses?.length 
      ? Math.round(myCourses.reduce((sum, c) => sum + (c.progress?.percentage || 0), 0) / myCourses.length)
      : 0,
  };

  // Filter and sort courses
  const filteredAndSortedCourses = myCourses
    ?.filter(enrollment => {
      const course = enrollment.course;
      const progress = enrollment.progress;
      
      // Search filter
      const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesFilter = 
        filter === "all" ? true :
        filter === "completed" ? progress?.percentage === 100 :
        filter === "in-progress" ? (progress?.percentage > 0 && progress?.percentage < 100) :
        filter === "not-started" ? (!progress?.percentage || progress?.percentage === 0) :
        true;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const progressA = a.progress?.percentage || 0;
      const progressB = b.progress?.percentage || 0;
      const dateA = new Date(a.enrolledAt || 0);
      const dateB = new Date(b.enrolledAt || 0);
      
      switch (sortBy) {
        case "progress-desc":
          return progressB - progressA;
        case "progress-asc":
          return progressA - progressB;
        case "recent":
          return dateB - dateA;
        case "title":
          return a.course.title.localeCompare(b.course.title);
        default:
          return dateB - dateA;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-amber-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Loading Your Progress</h3>
          <p className="text-gray-500">Fetching your enrolled courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Progress</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchMyCourses())}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!myCourses || myCourses.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              My Learning Progress
            </h1>
            <p className="text-gray-600 mt-2">Track and manage all your enrolled courses</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <div className="w-24 h-24 bg-linear-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBook className="text-3xl text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Courses Enrolled</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Start your learning journey by exploring available courses.
            </p>
            <button
              onClick={() => navigate("/student/courses")}
              className="px-8 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 mt-10">
            <div>
              <h1 className="text-2xl md:text-2xl font-bold   text-gray-700">
                My Learning Progress
              </h1>
              <p className="text-gray-600 mt-2">Track and manage all your enrolled courses</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-300">
              <FaChartLine className="text-amber-500" />
              <span className="text-gray-700">
                <span className="font-bold">{filteredAndSortedCourses?.length}</span> of <span className="font-bold">{myCourses.length}</span> courses
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-r from-amber-500 to-orange-500 rounded-lg">
                  <FaBook className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
                  <p className="text-sm text-gray-600">Total Courses</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-r from-green-500 to-emerald-500 rounded-lg">
                  <FaCheckCircle className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.completed}</h3>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <FaClock className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.inProgress}</h3>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-r from-gray-500 to-gray-700 rounded-lg">
                  <FaGraduationCap className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.notStarted}</h3>
                  <p className="text-sm text-gray-600">Not Started</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg">
                  <FaTrophy className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.averageProgress}%</h3>
                  <p className="text-sm text-gray-600">Avg Progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-gray-400 text-sm">Clear</span>
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 appearance-none"
                >
                  <option value="all">All Courses</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Not Started</option>
                </select>
              </div>
              
              <div className="relative">
                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 appearance-none"
                >
                  <option value="recent">Recently Added</option>
                  <option value="progress-desc">Progress (High to Low)</option>
                  <option value="progress-asc">Progress (Low to High)</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Learning Progress Overview</h2>
            <div className="flex items-center gap-2 text-amber-600">
              <FaFire />
              <span className="font-medium">Keep going!</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {myCourses.map((enrollment) => {
              const course = enrollment.course;
              const progress = enrollment.progress?.percentage || 0;
              const completedModules = enrollment.progress?.completedModules?.length || 0;
              const totalModules = course.modules?.length || 0;
              
              return (
                <div key={course._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{course.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      progress === 100 ? 'bg-green-100 text-green-700' :
                      progress > 0 ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {progress}% Complete
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          progress === 100 ? 'bg-linear-to-r from-green-500 to-emerald-500' :
                          progress > 0 ? 'bg-linear-to-r from-amber-500 to-orange-500' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{completedModules} of {totalModules} modules completed</span>
                    <button
                      onClick={() => navigate(`/student/courses/${course._id}`)}
                      className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                    >
                      Continue Learning →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Your Enrolled Courses</h2>
            <div className="text-sm text-gray-600">
              Showing {filteredAndSortedCourses?.length} courses
            </div>
          </div>
          
          {filteredAndSortedCourses?.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
              <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "No courses match your criteria"}
              </p>
              {(searchTerm || filter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("all");
                  }}
                  className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedCourses.map((enrollment, index) => (
                <motion.div
                  key={enrollment.course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full"
                >
                  <CourseCard
                    course={enrollment.course}
                    isEnrolled={true}
                    hideLike={true}
                    progress={enrollment.progress}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Achievement Summary */}
        <div className="bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Learning Achievement</h2>
              <p className="text-amber-100 mb-4">
                You're making great progress! {stats.completed > 0 
                  ? `You've completed ${stats.completed} course${stats.completed === 1 ? '' : 's'}!`
                  : "Keep going to complete your first course!"}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-300" />
                  <span className="font-medium">Avg Rating: 4.8</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span className="font-medium">Active Learner</span>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => navigate("/student/courses")}
                className="px-6 py-3 bg-white text-amber-700 font-bold rounded-lg hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
              >
                Explore More Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;