import React, { useState } from "react";

const Courses = ({ course, hideLike = false }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(course.likesCount || 0);

  const handleToggleLike = () => {
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const priceLabel = course.price === 0 ? "Free" : `$${course.price}`;

  return (
    <article className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image + Badge + Like */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={course.thumbnail || "/placeholder-course.png"}
          alt={course.title}
          loading="lazy"
        />
        {/* Price Badge */}
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
            course.price === 0
              ? "bg-green-500 text-white" 
              : "bg-orange-600 text-white" 
          }`}
        >
          {priceLabel}
        </span>

        {/* Like Button */}
        {!hideLike && (
          <button
            onClick={handleToggleLike}
            title="Like"
            className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-sm font-semibold rounded ${
              liked
                ? "bg-amber-400 text-white hover:bg-amber-500"
                : "bg-gray-200 text-gray-700 hover:bg-amber-400"
            } transition-colors`}
          >
            {liked ? "★" : "☆"} <span>{likesCount}</span>
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title + Meta */}
        <header className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
          <div className="flex text-sm text-gray-500 gap-2">
            <span>{course.duration || "—"} •</span>
            <span>{course.level || "All levels"}</span>
          </div>
        </header>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {course.description || "No description provided."}
        </p>

        {/* Footer: Price + Rating */}
        <div className="flex justify-between items-center mt-auto">
          <div className="text-orange-600 font-semibold">{priceLabel}</div>
          <div className="flex items-center gap-1 text-amber-400">
            <span>★</span>
            <span className="text-gray-800 font-medium">
              {course.averageRating ? course.averageRating.toFixed(1) : "0.0"}
            </span>
            <span className="text-gray-500 text-sm">
              ({course.reviewCount || 0})
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Courses;
