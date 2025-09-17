// src/pages/Admin/ManageCourse/ManageCourse.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCourses,
  createCourseThunk,
  updateCourseThunk,
  deleteCourseThunk,
} from "../../../features/courses/courseThunks";
import './ManageCourse.css';

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
  const [isCreating, setIsCreating] = useState(false); // distinguish between create/edit

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
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

    closeModal();
  };

  const openCreateModal = () => {
    setIsCreating(true);
    setEditingCourse(null);
    setFormData({ title: "", description: "", price: 0, thumbnail: null });
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
  };

  return (
    <div className="manage-course-container">
      <h1 className="title">Manage Courses</h1>

      {/* Messages */}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      {/* Create Course Button */}
      <button onClick={openCreateModal} className="create-btn">
        Create Course
      </button>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isCreating ? "Create Course" : "Edit Course"}</h2>
            <form onSubmit={handleSubmit} className="course-form">
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Course Description"
                value={formData.description}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price (0 = Free)"
                value={formData.price}
                onChange={handleChange}
              />
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
              />
              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {isCreating ? "Create" : "Save"}
                </button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course List */}
      <table className="course-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses?.length > 0 ? (
            courses.map((course) => (
              <tr key={course._id}>
                <td>
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="thumbnail"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>${course.price}</td>
                <td>
                  <button onClick={() => handleEdit(course)} className="edit-btn">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-courses">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCourse;
