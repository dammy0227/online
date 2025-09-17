import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProgress } from "../../../features/progress/progressThunks";
import { useParams } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { progress, loading, error } = useSelector((state) => state.progress);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchMyProgress(courseId));
    }
  }, [dispatch, courseId]);

  if (loading) return <p>Loading progress…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!progress) return <p>No progress found.</p>;

  const completionPercent = progress.completionPercentage || 0;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{progress.course.title}</h1>
        <p>Track your learning progress and quiz performance</p>
      </header>

      {/* Modules Completion */}
      <section className="progress-card">
        <h2>Modules Completion</h2>
        <p>
          Completed: {progress.completedModules.length} /{" "}
          {progress.course.modules.length} modules
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </section>

      {/* Quiz Stats */}
      <section className="stats-card">
        <h2>Quiz Stats</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>Total Score</h3>
            <p>{progress.score}</p>
          </div>
          <div className="stat-item">
            <h3>Quizzes Taken</h3>
            <p>{progress.stats.quizzesTaken}</p>
          </div>
          <div className="stat-item">
            <h3>Average Score</h3>
            <p>{progress.stats.averageScore.toFixed(1)}</p>
          </div>
        </div>
      </section>

      {/* Submitted Quizzes */}
      {progress.submittedQuizzes && progress.submittedQuizzes.length > 0 && (
        <section className="submitted-quizzes-card">
          <h2>Submitted Quizzes</h2>
          <ul>
            {progress.submittedQuizzes.map((q) => (
              <li key={q.quiz}>
                <strong>Quiz {q.quiz}</strong>: Score {q.score}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
