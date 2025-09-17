import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../../../features/courses/courseThunks";
import { fetchMyProgress } from "../../../features/progress/progressThunks";
import ModuleCard from "./ModuleCard";
import "./CourseDetail.css";

const CourseDetail = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { selectedCourse, loading: courseLoading, error: courseError } = useSelector(
    (state) => state.courses
  );
  const { progress, loading: progressLoading, error: progressError } = useSelector(
    (state) => state.progress
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
      dispatch(fetchMyProgress(courseId));
    }
  }, [dispatch, courseId]);

  if (courseLoading || progressLoading) return <p>Loading course...</p>;
  if (courseError || progressError) return <p className="error">{courseError || progressError}</p>;
  if (!selectedCourse) return <p>Course not found.</p>;

  return (
    <div className="course-detail">
      <div className="course-header">
      </div>

      <h3>Modules</h3>
      {selectedCourse.modules?.length === 0 ? (
        <p>No modules available.</p>
      ) : (
        <div className="module-list">
          {selectedCourse.modules.map((mod) => (
            <ModuleCard
              key={mod._id}
              module={mod}
              courseId={courseId}
              completedModules={progress?.completedModules || []}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
