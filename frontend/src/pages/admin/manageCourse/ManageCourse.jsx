// src/pages/Admin/ManageCourse/ManageCourse.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaImage,
  FaDollarSign,
  FaBook,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaEye,
  FaSearch,
  FaFilter,
  FaSort,
  FaCalendar
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import {
  fetchAllCourses,
  createCourseThunk,
  updateCourseThunk,
  deleteCourseThunk,
} from "../../../features/courses/courseThunks";

const ManageCourse = () => {
  const dispatch = useDispatch();
  const { allCourses: courses, loading, error, successMessage } = useSelector(
    (state) => state.courses
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    thumbnail: null,
  });

  const [editingCourse, setEditingCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  // Filter and sort courses
  const filteredAndSortedCourses = courses
    ?.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.key === 'price') {
        return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortConfig.key === 'title') {
        return sortConfig.direction === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    if (formData.thumbnail) data.append("thumbnail", formData.thumbnail);

    if (editingCourse) {
      dispatch(updateCourseThunk({ courseId: editingCourse._id, formData: data }));
    } else {
      dispatch(createCourseThunk(data));
    }

    if (!loading) {
      closeModal();
    }
  };

  const openCreateModal = () => {
    setIsCreating(true);
    setEditingCourse(null);
    setFormData({ title: "", description: "", price: 0, thumbnail: null });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    setIsCreating(false);
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      thumbnail: null,
    });
    setImagePreview(course.thumbnail || null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourseThunk(id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setIsCreating(false);
    setFormData({ title: "", description: "", price: 0, thumbnail: null });
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-1">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-2xl font-bold bg-gray-700 bg-clip-text text-transparent">
              Course Management
            </h1>
            <p className="text-gray-600 mt-2 text-[15px]">Manage and organize your course catalog</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 max-w-fit p-3 md:px-6 md:py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <FaPlus />
            New Course
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl  border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FaBook className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{courses?.length || 0}</h3>
                <p className="text-sm text-gray-600">Total Courses</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaDollarSign className="text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {courses?.filter(c => c.price > 0).length || 0}
                </h3>
                <p className="text-sm text-gray-600">Paid Courses</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaImage className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {courses?.filter(c => c.thumbnail).length || 0}
                </h3>
                <p className="text-sm text-gray-600">With Thumbnail</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl  border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaCalendar className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {courses?.filter(c => !c.thumbnail).length || 0}
                </h3>
                <p className="text-sm text-gray-600">Without Thumbnail</p>
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
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300">
            <FaFilter className="text-gray-500" />
            <span className="text-gray-700">{filteredAndSortedCourses?.length} courses found</span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3"
          >
            <FaExclamationCircle className="text-red-500 shrink-0" />
            <span className="text-red-700 font-medium">{error}</span>
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center gap-3"
          >
            <FaCheckCircle className="text-green-500 shrink-0" />
            <span className="text-green-700 font-medium">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    {isCreating ? "Create New Course" : "Edit Course"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  {/* Image Upload */}
                  <div className="mb-6">
                    <div 
                      onClick={() => document.getElementById('thumbnail-input').click()}
                      className={`border-2 border-dashed ${imagePreview ? 'border-green-400' : 'border-gray-300'} rounded-xl p-8 text-center cursor-pointer transition-all hover:border-amber-400 bg-gray-50`}
                    >
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Preview" className="w-32 h-32 mx-auto object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                            <span className="text-white font-medium">Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <FaImage className="text-3xl text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 font-medium">Click to upload thumbnail</p>
                          <p className="text-sm text-gray-500 mt-1">Recommended: 16:9 ratio</p>
                        </>
                      )}
                      <input
                        id="thumbnail-input"
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter course title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        placeholder="Describe what students will learn..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (USD)
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</div>
                        <input
                          type="number"
                          name="price"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1 italic">Set to 0 for free courses</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          {isCreating ? "Creating..." : "Saving..."}
                        </>
                      ) : (
                        isCreating ? "Create Course" : "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Courses Table */}
      <div className="bg-white shadow-sm overflow-hidden">
  

        {loading && courses?.length === 0 ? (
          <div className="p-12 text-center">
            <FaSpinner className="text-3xl text-amber-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading courses...</p>
          </div>
        ) : filteredAndSortedCourses?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-black">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <FaImage />
                      <span>Thumbnail</span>
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('title')} 
                    className="py-4 px-6 text-left font-semibold cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FaBook />
                      <span>Title</span>
                      <FaSort className={`text-sm ${sortConfig.key === 'title' ? 'opacity-100' : 'opacity-50'} ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Description</span>
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('price')} 
                    className="py-4 px-6 text-left font-semibold cursor-pointer  transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FaDollarSign />
                      <span>Price</span>
                      <FaSort className={`text-sm ${sortConfig.key === 'price' ? 'opacity-100' : 'opacity-50'} ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCourses.map((course, index) => (
                  <motion.tr
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200">
                        {course.thumbnail ? (
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <FaImage className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                       
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-600 line-clamp-2 text-[15px]">
                        {course.description?.length > 50 
                          ? `${course.description.slice(0, 50)}...` 
                          : course.description || "No description"}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${course.price === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        <FaDollarSign className="text-xs" />
                        <span className="font-semibold">{course.price === 0 ? 'FREE' : course.price.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
                          title="Edit course"
                        >
                          <FaEdit />
                      
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                          title="Delete course"
                        >
                          <FaTrash />
                         
                        </button>
                       
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center border-t border-gray-200">
            <FaBook className="text-4xl text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h4>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first course to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={openCreateModal}
                className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2 mx-auto"
              >
                <FaPlus /> Create Course
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourse;