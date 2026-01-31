// src/pages/Admin/ManageModule.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaBook,
  FaSortNumericUp,
  FaFileAlt,
  FaVideo,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaEye,
  FaSearch,
  FaFilter,
  FaSort,
  FaListOl,
  FaUpload,
  FaSortNumericDown
} from "react-icons/fa";
import { clearModuleMessages } from "../../../features/modules/moduleSlice";
import {
  addModuleThunk,
  updateModuleThunk,
  deleteModuleThunk,
  getAllModulesThunk,
} from "../../../features/modules/moduleThunks";
import { fetchAllCourses } from "../../../features/courses/courseThunks";

const ManageModule = () => {
  const dispatch = useDispatch();

  const { modules, loading, error, successMessage } = useSelector(
    (state) => state.modules
  );
  const { allCourses: courses } = useSelector((state) => state.courses);

  const [formVisible, setFormVisible] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'order', direction: 'asc' });
  const [formData, setFormData] = useState({
    title: "",
    order: 1,
    contentType: "text",
    textContent: "",
    file: null,
  });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(getAllModulesThunk());
    dispatch(clearModuleMessages());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      resetForm();
      const timer = setTimeout(() => {
        dispatch(clearModuleMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  // Filter and sort modules
  const filteredAndSortedModules = modules
    ?.filter(module => 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (module.course?.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.key === 'order') {
        return sortConfig.direction === 'asc' ? a.order - b.order : b.order - a.order;
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
    if (name === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, file }));
      if (file && formData.contentType === "video") {
        setVideoFile(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      alert("Please select a course first");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("order", Number(formData.order));
    data.append("contentType", formData.contentType);
    if (formData.contentType === "text") data.append("textContent", formData.textContent);
    if (formData.file) data.append("file", formData.file);

    if (editingModule) {
      dispatch(updateModuleThunk({ moduleId: editingModule._id, formData: data }));
    } else {
      dispatch(addModuleThunk({ courseId: selectedCourse, formData: data }));
    }
  };

  // Edit module
  const handleEdit = (module) => {
    setEditingModule(module);
    setSelectedCourse(module.course?._id || module.course);
    setFormData({
      title: module.title,
      order: module.order,
      contentType: module.contentType,
      textContent: module.textContent || "",
      file: null,
    });
    setVideoFile(null);
    setFormVisible(true);
  };

  // Delete module
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      dispatch(deleteModuleThunk(id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormVisible(false);
    setEditingModule(null);
    setSelectedCourse("");
    setFormData({
      title: "",
      order: 1,
      contentType: "text",
      textContent: "",
      file: null,
    });
    setVideoFile(null);
  };

  const openCreateForm = () => {
    setEditingModule(null);
    setSelectedCourse("");
    setFormData({
      title: "",
      order: 1,
      contentType: "text",
      textContent: "",
      file: null,
    });
    setVideoFile(null);
    setFormVisible(true);
  };

  const getModuleTypeBadge = (type) => {
    const isText = type === "text";
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${isText ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
        {isText ? <FaFileAlt className="text-xs" /> : <FaVideo className="text-xs" />}
        <span className="text-sm font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </div>
    );
  };

  const getCourseTitle = (module) => {
    if (!module.course) return "N/A";
    if (typeof module.course === "object") return module.course.title;
    return courses.find((c) => c._id === module.course)?.title || "Unknown Course";
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-1">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-2xl font-bold bg-gray-700 bg-clip-text text-transparent">
              Module Management
            </h1>
            <p className="text-gray-600 mt-2">Organize learning content for each course</p>
          </div>
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 max-w-fit p-3 md:px-6 md:py-3  bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <FaPlus />
            New Module
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl  border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FaListOl className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{modules?.length || 0}</h3>
                <p className="text-sm text-gray-600">Total Modules</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaFileAlt className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {modules?.filter(m => m.contentType === 'text').length || 0}
                </h3>
                <p className="text-sm text-gray-600">Text Modules</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaVideo className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {modules?.filter(m => m.contentType === 'video').length || 0}
                </h3>
                <p className="text-sm text-gray-600">Video Modules</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaBook className="text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {new Set(modules?.map(m => m.course?._id || m.course)).size || 0}
                </h3>
                <p className="text-sm text-gray-600">Courses Covered</p>
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
              placeholder="Search modules or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300">
            <FaFilter className="text-gray-500" />
            <span className="text-gray-700">{filteredAndSortedModules?.length} modules found</span>
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

      {/* Modal Form */}
      <AnimatePresence>
        {formVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingModule ? "Edit Module" : "Create New Module"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="space-y-4">
                    {/* Course Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Course
                      </label>
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all appearance-none bg-white"
                        required
                      >
                        <option value="">-- Select Course --</option>
                        {courses.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Module Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Module Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter module title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      />
                    </div>

                    {/* Order */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order
                      </label>
                      <input
                        type="number"
                        name="order"
                        placeholder="Module order"
                        value={formData.order}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      />
                      <p className="text-sm text-gray-500 mt-1 italic">Determines the display sequence</p>
                    </div>

                    {/* Content Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, contentType: 'text' }))}
                          className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${formData.contentType === 'text' ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-gray-400'}`}
                        >
                          <FaFileAlt className={`text-xl ${formData.contentType === 'text' ? 'text-amber-600' : 'text-gray-500'}`} />
                          <span className={`font-medium ${formData.contentType === 'text' ? 'text-amber-700' : 'text-gray-700'}`}>
                            Text
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, contentType: 'video' }))}
                          className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${formData.contentType === 'video' ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-gray-400'}`}
                        >
                          <FaVideo className={`text-xl ${formData.contentType === 'video' ? 'text-amber-600' : 'text-gray-500'}`} />
                          <span className={`font-medium ${formData.contentType === 'video' ? 'text-amber-700' : 'text-gray-700'}`}>
                            Video
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Content based on type */}
                    {formData.contentType === "text" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Text Content
                        </label>
                        <textarea
                          name="textContent"
                          placeholder="Enter module content here..."
                          value={formData.textContent}
                          onChange={handleChange}
                          rows="6"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-vertical"
                        />
                      </div>
                    )}

                    {formData.contentType === "video" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Video File
                        </label>
                        <div 
                          onClick={() => document.getElementById('video-file-input').click()}
                          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-all hover:border-amber-400 bg-gray-50"
                        >
                          {videoFile ? (
                            <div className="space-y-3">
                              <video src={videoFile} controls className="w-48 h-32 mx-auto rounded-lg" />
                              <p className="text-gray-600 font-medium">Click to change video</p>
                            </div>
                          ) : (
                            <>
                              <FaUpload className="text-3xl text-gray-400 mx-auto mb-3" />
                              <p className="text-gray-600 font-medium">Click to upload video</p>
                              <p className="text-sm text-gray-500 mt-1">MP4, AVI, MOV, WMV formats</p>
                            </>
                          )}
                          <input
                            id="video-file-input"
                            type="file"
                            name="file"
                            accept="video/*"
                            onChange={handleChange}
                            className="hidden"
                          />
                        </div>
                        {formData.file && (
                          <p className="text-sm text-gray-600 mt-2 italic">
                            Selected: {formData.file.name}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                      disabled={loading || !selectedCourse}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          {editingModule ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        editingModule ? "Update Module" : "Create Module"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modules Table */}
      <div className="bg-white  shadow-sm overflow-hidden">
        

        {loading && modules?.length === 0 ? (
          <div className="p-12 text-center">
            <FaSpinner className="text-3xl text-amber-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading modules...</p>
          </div>
        ) : filteredAndSortedModules?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-black">
                <tr>
                  <th 
                    onClick={() => handleSort('title')} 
                    className="py-4 px-6 text-left font-semibold cursor-pointertransition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FaBook />
                      <span>Title</span>
                      <FaSort className={`text-sm ${sortConfig.key === 'title' ? 'opacity-100' : 'opacity-50'} ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <FaBook />
                      <span>Course</span>
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('order')} 
                    className="py-4 px-6 text-left font-semibold cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FaSortNumericUp />
                      <span>Order</span>
                      <FaSort className={`text-sm ${sortConfig.key === 'order' ? 'opacity-100' : 'opacity-50'} ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Type</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedModules.map((module, index) => (
                  <motion.tr
                    key={module._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <h4 className="font-semibold text-gray-800">{module.title}</h4>
                        {module.contentType === 'text' && module.textContent && (
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {module.textContent.length > 80 
                              ? `${module.textContent.slice(0, 80)}...` 
                              : module.textContent}
                          </p>
                        )}
        
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5  text-gray-700 rounded-lg">
                        <FaBook className="text-sm" />
                        <span className="font-medium">{getCourseTitle(module)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg">
                        <FaSortNumericUp className="text-sm" />
                        <span className="font-bold">{module.order}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getModuleTypeBadge(module.contentType)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(module)}
                          className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
                          title="Edit module"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(module._id)}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                          title="Delete module"
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
            <FaListOl className="text-4xl text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No modules found</h4>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first module to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={openCreateForm}
                className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2 mx-auto"
              >
                <FaPlus /> Create Module
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageModule;