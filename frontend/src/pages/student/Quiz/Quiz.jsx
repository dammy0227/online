import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchQuizzesByModule,
  submitQuizAnswers,
} from "../../../features/quiz/quizThunks";
import { fetchSubmittedQuizzes } from "../../../features/progress/progressThunks";
import "./Quiz.css";

const Quiz = () => {
  const { moduleId, courseId } = useParams();
  const dispatch = useDispatch();

  const { moduleQuizzes, results, loadingFetch, loadingAdd, error } = useSelector(
    (state) => state.quiz
  );
  const { submittedQuizzes, loading: progressLoading } = useSelector(
    (state) => state.progress
  );

  const [answers, setAnswers] = useState({});

  const quizzes = useMemo(() => moduleQuizzes[moduleId] || [], [
    moduleQuizzes,
    moduleId,
  ]);

  const quizzesWithStatus = useMemo(() => {
    return quizzes.map((quiz) => {
      const submission = submittedQuizzes?.find((s) => s.quiz === quiz._id);
      return {
        ...quiz,
        isSubmitted: Boolean(submission),
        score: submission?.score ?? 0,
        details: submission?.details || [],
      };
    });
  }, [quizzes, submittedQuizzes]);

  useEffect(() => {
    if (moduleId) dispatch(fetchQuizzesByModule(moduleId));
    if (courseId) dispatch(fetchSubmittedQuizzes(courseId));
  }, [dispatch, moduleId, courseId]);

  useEffect(() => {
    if (results?.submittedQuizId) {
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        const submittedQuiz = quizzes.find(
          (q) => q._id === results.submittedQuizId
        );
        submittedQuiz?.questions.forEach((q) => delete newAnswers[q._id]);
        return newAnswers;
      });
    }
  }, [results, quizzes]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (quizId) => {
    const quiz = quizzes.find((q) => q._id === quizId);
    if (!quiz) return;

    const quizAnswers = {};
    quiz.questions.forEach((q) => {
      if (answers[q._id] !== undefined && answers[q._id] !== "") {
        quizAnswers[q._id] = answers[q._id];
      }
    });

    if (!Object.keys(quizAnswers).length) {
      alert("Please answer at least one question before submitting!");
      return;
    }

    dispatch(submitQuizAnswers({ quizId, answers: quizAnswers, courseId }));
  };

  if (loadingFetch || progressLoading) return <p>Loading quiz…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!quizzes.length) return <p>No quiz available for this module.</p>;

  return (
    <div className="quiz-page">
      <h2 className="quiz-heading">Module Quiz</h2>

      {quizzesWithStatus.map((quiz) => {
        const hasAnswered = quiz.questions.some((q) => answers[q._id]);
        return (
          <section
            key={quiz._id}
            className={`quiz-card ${quiz.isSubmitted ? "submitted" : ""}`}
          >
            <header className="quiz-card-header">
              <h3>{quiz.title}</h3>
              {quiz.isSubmitted && (
                <p className="score">
                  Score: <strong>{quiz.score}</strong> / {quiz.questions.length}
                </p>
              )}
            </header>

            <div className="quiz-questions">
              {quiz.questions.map((q, idx) => (
                <div key={q._id} className="question">
                  <p>
                    <strong>Q{idx + 1}:</strong> {q.questionText}
                  </p>

                  <div className="options-row">
                    {q.options?.map((opt, i) => (
                      <label key={i} className="option">
                        <input
                          type="radio"
                          name={`q-${quiz._id}-${q._id}`}
                          value={opt}
                          checked={answers[q._id] === opt}
                          onChange={(e) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          disabled={quiz.isSubmitted}
                        />
                        <span className="option-label">{String.fromCharCode(65 + i)}.</span>{" "}
                        {opt}
                      </label>
                    ))}
                  </div>

                  {q.type === "text" && (
                    <input
                      type="text"
                      className="text-answer"
                      value={answers[q._id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(q._id, e.target.value)
                      }
                      disabled={quiz.isSubmitted}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              className="submit-btn"
              onClick={() => handleSubmit(quiz._id)}
              disabled={loadingAdd || quiz.isSubmitted || !hasAnswered}
            >
              {quiz.isSubmitted
                ? "Already Submitted"
                : loadingAdd
                ? "Submitting..."
                : "Submit Quiz"}
            </button>

            {quiz.isSubmitted && quiz.details?.length > 0 && (
              <div className="results">
                <h4>Detailed Results</h4>
                {quiz.details.map((item, idx) => (
                  <div key={idx} className="result-item">
                    <p>
                      Q: {item.question} <br />
                      Your Answer: {item.userAnswer} | Correct: {item.correct} |{" "}
                      {item.isCorrect ? "✅" : "❌"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Quiz;
