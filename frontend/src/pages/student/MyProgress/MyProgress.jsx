// src/pages/student/MyProgress/MyProgress.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCourses } from "../../../features/courses/courseThunks";
import CourseCard from "../BrowseCourses/CourseCard";
import "./MyProgress.css";

const MyProgress = () => {
  const dispatch = useDispatch();
  const { myCourses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  if (loading) return <p>Loading your courses…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="my-progress">
      {!myCourses || myCourses.length === 0 ? (
        <p>You haven’t enrolled in any courses yet.</p>
      ) : (
        <div className="course-list">
          {myCourses.map((enrollment) => (
            <CourseCard
              key={enrollment.course._id}
              course={enrollment.course}
              hideLike={true}   // 🔹 Hide stars/likes here
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProgress;
