// src/pages/Admin/ManageModule.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearModuleMessages } from "../../../features/modules/moduleSlice";
import {
  addModuleThunk,
  updateModuleThunk,
  deleteModuleThunk,
  getAllModulesThunk,
} from "../../../features/modules/moduleThunks";
import { fetchAllCourses } from "../../../features/courses/courseThunks";
import "./ManageModule.css";

const ManageModule = () => {
  const dispatch = useDispatch();

  // Redux state
  const { modules, loading, error, successMessage } = useSelector(
    (state) => state.modules
  );
  const { allCourses: courses } = useSelector((state) => state.courses);

  // Local states
  const [formVisible, setFormVisible] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    order: 1,
    contentType: "text",
    textContent: "",
    file: null,
  });

  // Load courses + modules on mount
  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(getAllModulesThunk());
    dispatch(clearModuleMessages());
  }, [dispatch]);

  // Reset form after success
  useEffect(() => {
    if (successMessage) {
      resetForm();
      const timer = setTimeout(() => {
        dispatch(clearModuleMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
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
  };

  return (
    <div className="manage-module-container">
      <h1 className="title">Manage Modules</h1>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <button onClick={() => setFormVisible(true)} className="add-module-btn">
        + {editingModule ? "Edit Module" : "Add Module"}
      </button>

      {/* Form Popup */}
      {formVisible && (
        <div className="module-form-popup">
          <form onSubmit={handleSubmit} className="module-form">
            <h2>{editingModule ? "Edit Module" : "Add Module"}</h2>

            <label>Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">-- Select Course --</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="title"
              placeholder="Module Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="order"
              placeholder="Order"
              value={formData.order}
              onChange={handleChange}
              required
            />
            <select
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
            >
              <option value="text">Text</option>
              <option value="video">Video</option>
            </select>
            {formData.contentType === "text" && (
              <textarea
                name="textContent"
                placeholder="Module Text Content"
                value={formData.textContent}
                onChange={handleChange}
              />
            )}
            {formData.contentType === "video" && (
              <input
                type="file"
                name="file"
                accept="video/*"
                onChange={handleChange}
              />
            )}
            <div className="form-buttons">
              <button type="submit" disabled={loading}>
                {loading
                  ? editingModule
                    ? "Updating..."
                    : "Adding..."
                  : editingModule
                  ? "Update Module"
                  : "Add Module"}
              </button>
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modules Table */}
      <table className="module-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Course</th>
            <th>Order</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.length > 0 ? (
            modules.map((module) => (
              <tr key={module._id}>
                <td>{module.title}</td>
                <td>
                  {module.course?.title ||
                    courses.find((c) => c._id === module.course)?.title ||
                    "N/A"}
                </td>
                <td>{module.order}</td>
                <td>{module.contentType}</td>
                <td>
                  <button onClick={() => handleEdit(module)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(module._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-modules">
                No modules found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageModule;
