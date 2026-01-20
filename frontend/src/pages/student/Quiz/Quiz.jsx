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

  // Merge quizzes with submitted status and details
  const quizzesWithStatus = useMemo(() => {
    return quizzes.map((quiz) => {
      const submission = submittedQuizzes?.find((s) => s.quiz === quiz._id);
      return {
        ...quiz,
        isSubmitted: Boolean(submission),
        score: submission?.score ?? 0,
        details: submission?.details?.map((d) => ({
          ...d,
          isCorrect: Boolean(d.isCorrect),
          userAnswer: d.userAnswer?.trim() ?? "",
          correct: d.correct?.trim() ?? "",
        })) || [],
      };
    });
  }, [quizzes, submittedQuizzes]);

  // Fetch quizzes and submitted quizzes on load
  useEffect(() => {
    if (moduleId) dispatch(fetchQuizzesByModule(moduleId));
    if (courseId) dispatch(fetchSubmittedQuizzes(courseId));
  }, [dispatch, moduleId, courseId]);

  // Clear answers for quizzes just submitted
  useEffect(() => {
    if (results?.submittedQuizId) {
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        const submittedQuiz = quizzes.find((q) => q._id === results.submittedQuizId);
        submittedQuiz?.questions.forEach((q) => delete newAnswers[q._id]);
        return newAnswers;
      });
    }
  }, [results, quizzes]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (quizId) => {
    const quiz = quizzes.find((q) => q._id === quizId);
    if (!quiz) return;

    const quizAnswers = {};
    quiz.questions.forEach((q) => {
      if (answers[q._id] !== undefined && answers[q._id] !== "") {
        quizAnswers[q._id] = answers[q._id].trim();
      }
    });

    if (!Object.keys(quizAnswers).length) {
      alert("Please answer at least one question before submitting!");
      return;
    }

    // Submit answers
    const resultAction = await dispatch(
      submitQuizAnswers({ quizId, answers: quizAnswers, courseId })
    );

    // On success, fetch submitted quizzes to lock inputs
    if (submitQuizAnswers.fulfilled.match(resultAction)) {
      dispatch(fetchSubmittedQuizzes(courseId));
    }
  };

  if (loadingFetch || progressLoading) return <p>Loading quiz…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!quizzes.length) return <p>No quiz available for this module.</p>;

  return (
    <div className="quiz-page">
      <h2 className="quiz-heading">Module Quiz</h2>

      {quizzesWithStatus.map((quiz) => {
        const hasAnswered = quiz.questions.some((q) => answers[q._id]);
        const isDisabled = quiz.isSubmitted;

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
              {quiz.questions.map((q, idx) => {
                const detail = quiz.details.find((d) => d.question === q.questionText);

                return (
                  <div key={q._id} className="question">
                    <p>
                      <strong>Q{idx + 1}:</strong> {q.questionText}
                    </p>

                    {/* MCQ */}
                    {q.type === "mcq" && (
                      <div className="options-row">
                        {q.options?.map((opt, i) => {
                          const isSelected = answers[q._id] === opt;
                          const showResult = isDisabled && isSelected;

                          return (
                            <label key={i} className="option">
                              <input
                                type="radio"
                                name={`q-${quiz._id}-${q._id}`}
                                value={opt}
                                checked={isSelected}
                                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                                disabled={isDisabled}
                              />
                              <span className="option-label">{String.fromCharCode(65 + i)}.</span>{" "}
                              {opt}
                              {showResult && (
                                <span
                                  className={`result-icon ${
                                    detail?.isCorrect ? "correct" : "incorrect"
                                  }`}
                                >
                                  {detail?.isCorrect ? "✅" : "❌"}
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* Text Answer */}
                    {q.type === "text" && (
                      <div className="text-answer-wrapper">
                        <input
                          type="text"
                          className="text-answer"
                          value={answers[q._id] || ""}
                          onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                          disabled={isDisabled}
                        />
                        {isDisabled && detail && (
                          <span
                            className={`result-icon ${
                              detail.isCorrect ? "correct" : "incorrect"
                            }`}
                          >
                            {detail.isCorrect ? "✅" : "❌"}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              className="submit-btn"
              onClick={() => handleSubmit(quiz._id)}
              disabled={loadingAdd || isDisabled || !hasAnswered}
            >
              {isDisabled
                ? "Already Submitted"
                : loadingAdd
                ? "Submitting..."
                : "Submit Quiz"}
            </button>

            {isDisabled && quiz.details?.length > 0 && (
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
