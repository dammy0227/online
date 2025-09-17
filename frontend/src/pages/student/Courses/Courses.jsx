import React, { useState } from "react";
import "./Courses.css";

const Courses = ({ course, hideLike = false }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(course.likesCount || 0);

  const handleToggleLike = () => {
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const priceLabel = course.price === 0 ? "Free" : `$${course.price}`;

  return (
    <article className="course-card-modern">
      <div className="card-media">
        <img
          className="card-thumb"
          src={course.thumbnail || "/placeholder-course.png"}
          alt={course.title}
          loading="lazy"
        />
        <span className={`badge ${course.price === 0 ? "badge-free" : "badge-paid"}`}>
          {priceLabel}
        </span>

        {!hideLike && (
          <button
            className={`thumb-like ${liked ? "liked" : ""}`}
            onClick={handleToggleLike}
            title="Like"
          >
            {liked ? "★" : "☆"}
            <span className="like-count">{likesCount}</span>
          </button>
        )}
      </div>

      <div className="card-body">
        <header className="card-header">
          <h3 className="card-title">{course.title}</h3>
          <div className="card-sub">
            <span className="meta-item">{course.duration || "—"} •</span>
            <span className="meta-item">{course.level || "All levels"}</span>
          </div>
        </header>

        <p className="card-desc">{course.description || "No description provided."}</p>

        <div className="card-footer">
          <div className="price-and-rating">
            <div className="course-price">{priceLabel}</div>
            <div className="rating">
              <span className="star">★</span>
              <span className="rating-value">
                {course.averageRating ? course.averageRating.toFixed(1) : "0.0"}
              </span>
              <span className="rating-count">({course.reviewCount || 0})</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Courses;
