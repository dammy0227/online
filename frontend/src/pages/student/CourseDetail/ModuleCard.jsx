import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { completeModule } from "../../../features/modules/moduleThunks";
import { markModuleCompletedLocally } from "../../../features/progress/progressSlice";
import { fetchQuizzesByModule } from "../../../features/quiz/quizThunks";
import "./CourseDetail.css";

const ModuleCard = ({ module, courseId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const completedModules =
    useSelector((state) => state.progress.progress?.completedModules) || [];

  const quizzesByModule = useSelector((state) => state.quiz.moduleQuizzes);
  const moduleQuizzes = useMemo(() => quizzesByModule?.[module._id] || [], [
    quizzesByModule,
    module._id,
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const isCompleted = completedModules.includes(module._id);
  const hasQuiz = moduleQuizzes.length > 0;

  useEffect(() => {
    if (module?._id) {
      dispatch(fetchQuizzesByModule(module._id));
    }
  }, [dispatch, module?._id]);

  const toggleAccordion = () => setIsOpen(!isOpen);

  const handleCompleteModule = async () => {
    if (isCompleted) return;
    dispatch(markModuleCompletedLocally(module._id));
    try {
      await dispatch(completeModule({ moduleId: module._id, courseId })).unwrap();
    } catch (err) {
      console.error("Error completing module:", err);
    }
  };

  const handleTakeQuiz = () => {
    navigate(`/student/courses/${courseId}/module/${module._id}/quiz`);
  };

  return (
    <div className={`module-card ${isCompleted ? "completed" : ""}`}>
      <div className="module-header" onClick={toggleAccordion}>
        <h4>{module.title}</h4>
        <div className="module-header-right">
          {hasQuiz && <span className="quiz-badge">Quiz Available</span>}
          <span className="accordion-arrow">{isOpen ? "▲" : "▼"}</span>
        </div>
      </div>

      {isOpen && (
        <div className="module-content-accordion">
          {module.contentType === "text" && <p>{module.textContent}</p>}
         {module.contentType === "video" && module.contentUrl && (
  <div className="video-wrapper">
    <video
      controls
      preload="metadata"
      className="module-video"
      playsInline
      webkit-playsinline="true"
    >
      <source src={module.contentUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}


          <div className="module-actions">
            <button
              onClick={handleCompleteModule}
              disabled={isCompleted}
              className={`complete-btn ${isCompleted ? "completed" : ""}`}
            >
              {isCompleted ? "✓ Completed" : "Mark Complete"}
            </button>

            {isCompleted && hasQuiz && (
              <button onClick={handleTakeQuiz} className="quiz-btn">
                Take Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
