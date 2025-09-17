// src/pages/student/BrowseCourses/CourseCard.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  enrollCourse,
  fetchMyCourses,
  toggleCourseLikeThunk,
} from "../../../features/courses/courseThunks";
import "./BrowseCourses.css";

const CourseCard = ({ course, hideLike = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myCourses, loading } = useSelector((state) => state.courses);
  const user = useSelector((state) => state.auth.user);

  const [enrolling, setEnrolling] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const isEnrolled = myCourses?.some((p) => p.course._id === course._id);

  const handleEnroll = async () => {
    setEnrolling(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const result = await dispatch(enrollCourse(course._id)).unwrap();
      setSuccessMsg(result.message || "Enrolled successfully!");
      await dispatch(fetchMyCourses());
    } catch (err) {
      setErrorMsg(err?.message || err || "Failed to enroll.");
    } finally {
      setEnrolling(false);
    }
  };

  const handleNavigateCourse = () => {
    if (isEnrolled) navigate(`/student/courses/${course._id}`);
  };

  const handleViewProgress = () => {
    if (isEnrolled) navigate(`/student/courses/${course._id}/progress`);
  };

  const handleToggleLike = () => {
    if (!user) return; // must be logged in
    dispatch(toggleCourseLikeThunk(course._id));
  };

  const priceLabel = course.price === 0 ? "Free" : `$${course.price}`;

  return (
    <article className="course-card-modern" aria-labelledby={`course-${course._id}-title`}>
      <div className="card-media">
        <img
          className="card-thumb"
          src={course.thumbnail || "/placeholder-course.png"}
          alt={course.title}
          loading="lazy"
        />
        <span className={`badge ${course.price === 0 ? "badge-free" : "badge-paid"}`}>
          {course.price === 0 ? "Free" : "Paid"}
        </span>
        {/* optional small meta at top-right (likes) */}
        {!hideLike && (
          <button
            aria-label={course.liked ? "Unlike course" : "Like course"}
            className={`thumb-like ${course.liked ? "liked" : ""}`}
            onClick={handleToggleLike}
            title="Like"
          >
            {course.liked ? "★" : "☆"}
            <span className="like-count">{course.likesCount || 0}</span>
          </button>
        )}
      </div>

      <div className="card-body">
        <header className="card-header">
          <h3 id={`course-${course._id}-title`} className="card-title">
            {course.title}
          </h3>
          <div className="card-sub">
            {/* sample metadata — keep or replace with your own fields */}
            <span className="meta-item">{course.duration || "—"} •</span>
            <span className="meta-item">{course.level || "All levels"}</span>
          </div>
        </header>

        <p className="card-desc">
          {course.description || "No description provided."}
        </p>

        <div className="card-footer">
          <div className="price-and-rating">
            <div className="course-price">{priceLabel}</div>
            <div className="rating">
              <span className="star">★</span>
              <span className="rating-value">{course.averageRating ? course.averageRating.toFixed(1) : "0.0"}</span>
              <span className="rating-count">({course.reviewCount || 0})</span>
            </div>
          </div>

          <div className="actions">
            {course.price === 0 ? (
              <button
                className="btn primary"
                onClick={handleEnroll}
                disabled={enrolling || loading || isEnrolled}
                aria-pressed={isEnrolled}
              >
                {isEnrolled ? "Enrolled" : enrolling ? "Enrolling..." : "Enroll"}
              </button>
            ) : (
              <button
                className="btn primary"
                onClick={() => alert("Payment coming soon")}
                disabled={isEnrolled}
              >
                {isEnrolled ? "Paid" : `Buy ${priceLabel}`}
              </button>
            )}

            <div className="secondary-group">
              <button
                className="btn secondary"
                onClick={handleNavigateCourse}
                disabled={!isEnrolled}
                title="Open course"
              >
                Open
              </button>

              <button
                className="btn outline"
                onClick={handleViewProgress}
                disabled={!isEnrolled}
                title="View progress"
              >
                Progress
              </button>
            </div>
          </div>
        </div>

        {successMsg && <p className="msg success">{successMsg}</p>}
        {errorMsg && <p className="msg error">{errorMsg}</p>}
      </div>
    </article>
  );
};

export default CourseCard;
