import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses, fetchMyCourses } from "../../../features/courses/courseThunks";
import CourseCard from "./CourseCard";
import "./BrowseCourses.css";

const BrowseCourses = () => {
  const dispatch = useDispatch();
  const { allCourses, loading: coursesLoading, error: coursesError } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchMyCourses());
  }, [dispatch]);

  if (coursesLoading) return <p>Loading courses...</p>;
  if (coursesError) return <p className="error">{coursesError}</p>;

  return (
    <div className="browse-courses">
      {allCourses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="course-list">
          {allCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseCourses;
