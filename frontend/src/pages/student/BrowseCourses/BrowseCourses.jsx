import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses, fetchMyCourses } from "../../../features/courses/courseThunks";
import CourseCard from "./CourseCard";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaSpinner,
  FaExclamationCircle,
  FaBook,
  FaFire,
  FaClock,
  FaStar,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BrowseCourses = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [priceFilter, setPriceFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const { allCourses, myCourses, loading: coursesLoading, error: coursesError } = useSelector(
    (state) => state.courses
  );

  const enrolledCourseIds = myCourses?.map(course => course._id) || [];

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchMyCourses());
  }, [dispatch]);

  // Filter and sort courses
  const filteredAndSortedCourses = allCourses
    .filter(course => {
      const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = priceFilter === "all" ? true :
                          priceFilter === "free" ? course.price === 0 :
                          course.price > 0;
      
      const matchesLevel = levelFilter === "all" ? true :
                          course.level?.toLowerCase() === levelFilter;
      
      return matchesSearch && matchesPrice && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.enrolledStudents || 0) - (a.enrolledStudents || 0);
        case "rating":
          return (b.averageRating || 0) - (a.averageRating || 0);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const categories = [
    { id: "all", name: "All Courses", icon: <FaBook />, count: allCourses.length },
    { id: "enrolled", name: "My Courses", icon: <FaClock />, count: myCourses?.length || 0 },
    { id: "popular", name: "Popular", icon: <FaFire />, count: allCourses.filter(c => c.enrolledStudents > 100).length },
    { id: "top-rated", name: "Top Rated", icon: <FaStar />, count: allCourses.filter(c => c.averageRating >= 4).length },
  ];

  const sortOptions = [
    { id: "popular", label: "Most Popular" },
    { id: "rating", label: "Highest Rated" },
    { id: "newest", label: "Newest" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
  ];

  const levels = ["beginner", "intermediate", "advanced"];

  if (coursesLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br  from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-amber-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Loading Courses</h3>
          <p className="text-gray-500">Discovering amazing learning opportunities...</p>
        </div>
      </div>
    );
  }

  if (coursesError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Courses</h3>
          <p className="text-gray-600 mb-6">{coursesError}</p>
          <button
            onClick={() => {
              dispatch(fetchAllCourses());
              dispatch(fetchMyCourses());
            }}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br  from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-2xl font-bold text-gray-600">
              Browse Courses
            </h1>
            <p className="text-gray-600 mt-2">Discover and enroll in amazing courses to advance your skills</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-300">
            <FaBook className="text-amber-500" />
            <span className="text-gray-700">
              <span className="font-bold">{filteredAndSortedCourses.length}</span> courses available
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mb-6">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses by title, description, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  if (category.id === "enrolled") {
                    setSortBy("enrolled");
                  } else if (category.id === "popular") {
                    setSortBy("popular");
                  } else if (category.id === "top-rated") {
                    setSortBy("rating");
                  } else {
                    setSortBy("popular");
                  }
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                  sortBy === category.id
                    ? "bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  sortBy === category.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors ${
                showFilters ? 'text-amber-600 border-amber-500' : 'text-gray-700'
              }`}
            >
              <FaFilter />
              <span>Filters</span>
              <FaChevronDown className={`text-xs transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                {sortBy.includes("price-high") ? (
                  <FaSortAmountUp className="text-gray-400" />
                ) : (
                  <FaSortAmountDown className="text-gray-400" />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-end">
            <p className="text-gray-600">
              Showing <span className="font-bold">{filteredAndSortedCourses.length}</span> of{" "}
              <span className="font-bold">{allCourses.length}</span> courses
            </p>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-4 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Filter */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Price</h4>
                  <div className="space-y-2">
                    {["all", "free", "paid"].map((price) => (
                      <label key={price} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          value={price}
                          checked={priceFilter === price}
                          onChange={(e) => setPriceFilter(e.target.value)}
                          className="w-4 h-4 text-amber-500 focus:ring-amber-200"
                        />
                        <span className="text-gray-700 capitalize">
                          {price === "all" ? "All Prices" : price === "free" ? "Free Only" : "Paid Only"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Level</h4>
                  <div className="space-y-2">
                    {["all", ...levels].map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="level"
                          value={level}
                          checked={levelFilter === level}
                          onChange={(e) => setLevelFilter(e.target.value)}
                          className="w-4 h-4 text-amber-500 focus:ring-amber-200"
                        />
                        <span className="text-gray-700 capitalize">
                          {level === "all" ? "All Levels" : level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Quick Stats</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Free Courses</span>
                      <span className="font-semibold text-amber-600">
                        {allCourses.filter(c => c.price === 0).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Paid Courses</span>
                      <span className="font-semibold text-green-600">
                        {allCourses.filter(c => c.price > 0).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Your Enrollments</span>
                      <span className="font-semibold text-blue-600">
                        {enrolledCourseIds.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Courses Grid */}
      {filteredAndSortedCourses.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBook className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Courses Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || priceFilter !== "all" || levelFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "No courses are available at the moment. Check back soon!"}
          </p>
          {(searchTerm || priceFilter !== "all" || levelFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("all");
                setLevelFilter("all");
              }}
              className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredAndSortedCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <CourseCard 
                  course={course} 
                  isEnrolled={enrolledCourseIds.includes(course._id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

   
    </div>
  );
};

export default BrowseCourses;