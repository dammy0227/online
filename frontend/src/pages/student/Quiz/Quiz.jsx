import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchQuizzesByModule,
  submitQuizAnswers,
} from "../../../features/quiz/quizThunks";
import { fetchSubmittedQuizzes } from "../../../features/progress/progressThunks";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaChartBar,
  FaClock,
  FaBook,
  FaSpinner,
  FaExclamationTriangle,
  FaTrophy,
  FaLightbulb,
  FaCheck,
  FaEye,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Quiz = () => {
  const { moduleId, courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { moduleQuizzes, results, loadingFetch, loadingAdd, error } = useSelector(
    (state) => state.quiz
  );
  const { submittedQuizzes, loading: progressLoading } = useSelector(
    (state) => state.progress
  );

  const [answers, setAnswers] = useState({});
  const [activeTab, setActiveTab] = useState("quiz");

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
        totalQuestions: quiz.questions?.length || 0,
        percentage: submission ? Math.round((submission.score / quiz.questions.length) * 100) : 0,
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

  const handleBack = () => {
    navigate(`/student/courses/${courseId}`);
  };

  const calculateAnsweredCount = (quiz) => {
    return quiz.questions.filter((q) => answers[q._id]).length;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return "bg-green-100";
    if (percentage >= 60) return "bg-amber-100";
    return "bg-red-100";
  };

  if (loadingFetch || progressLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-amber-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Loading Quiz</h3>
          <p className="text-gray-500">Preparing your assessment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-2xl text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Quiz</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizzes.length) {
    return (
      <div className="min-h-screen bg-linear-to-br  from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaQuestionCircle className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Quiz Available</h3>
          <p className="text-gray-600 mb-6">This module doesn't have any quizzes yet.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br mt-10 from-gray-50 to-gray-100">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-0 md:px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4  text-gray-700 hover:text-amber-600 transition-colors"
              >
                <FaArrowLeft />
                <span className="font-medium">Back to Course</span>
              </button>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full">
              <FaBook />
              <span className="font-medium">Module Quiz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Quiz Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl  p-6 mb-8 border border-gray-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaQuestionCircle className="text-white text-xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">
                {quizzes.reduce((sum, q) => sum + (q.questions?.length || 0), 0)}
              </h4>
              <p className="text-sm text-gray-600">Total Questions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaClock className="text-white text-xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">Untimed</h4>
              <p className="text-sm text-gray-600">Take Your Time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheck className="text-white text-xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">
                {quizzesWithStatus.filter(q => q.isSubmitted).length}
              </h4>
              <p className="text-sm text-gray-600">Submitted</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaTrophy className="text-white text-xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-800">
                {quizzesWithStatus.filter(q => q.percentage >= 70).length}
              </h4>
              <p className="text-sm text-gray-600">Passed</p>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "quiz"
                ? "bg-linear-to-r from-amber-500 to-orange-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Take Quiz
          </button>
          <button
            onClick={() => setActiveTab("results")}
            disabled={!quizzesWithStatus.some(q => q.isSubmitted)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "results"
                ? "bg-linear-to-r from-amber-500 to-orange-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            View Results
          </button>
        </div>

        {/* Quiz Cards */}
        {activeTab === "quiz" && quizzesWithStatus.map((quiz) => {
          const hasAnswered = quiz.questions.some((q) => answers[q._id]);
          const isDisabled = quiz.isSubmitted;
          const answeredCount = calculateAnsweredCount(quiz);

          return (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-2xl shadow mb-6 border ${
                isDisabled ? 'border-green-200' : 'border-gray-200'
              } overflow-hidden`}
            >
              {/* Quiz Header */}
              <div className={`p-6 ${
                isDisabled ? 'bg-linear-to-r from-green-50 to-emerald-50' : 'bg-linear-to-r from-amber-50 to-orange-50'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{quiz.title}</h3>
                    <p className="text-gray-600 mt-1">
                      {quiz.questions?.length} questions • {isDisabled ? 'Completed' : 'In Progress'}
                    </p>
                  </div>
                  {isDisabled ? (
                    <div className={`px-4 py-2 ${getScoreBgColor(quiz.percentage)} rounded-full`}>
                      <span className={`font-bold ${getScoreColor(quiz.percentage)}`}>
                        Score: {quiz.score}/{quiz.totalQuestions} ({quiz.percentage}%)
                      </span>
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-white border border-gray-300 rounded-full">
                      <span className="text-sm font-medium text-gray-700">
                        {answeredCount}/{quiz.totalQuestions} answered
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Questions */}
              <div className="p-6">
                <div className="space-y-6">
                  {quiz.questions.map((q, idx) => {
                    const detail = quiz.details.find((d) => d.question === q.questionText);

                    return (
                      <div key={q._id} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isDisabled
                              ? detail?.isCorrect
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-3">{q.questionText}</h4>
                            
                            {/* MCQ Options */}
                            {q.type === "mcq" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options?.map((opt, i) => {
                                  const isSelected = answers[q._id] === opt;
                                  const isCorrect = detail?.isCorrect && detail?.userAnswer === opt;
                                  const isWrong = !detail?.isCorrect && detail?.userAnswer === opt;
                                  const isActualCorrect = detail?.correct === opt;

                                  return (
                                    <label
                                      key={i}
                                      className={`relative cursor-pointer border rounded-xl p-4 transition-all ${
                                        isDisabled
                                          ? isCorrect
                                            ? 'border-green-500 bg-green-50'
                                            : isWrong
                                            ? 'border-red-500 bg-red-50'
                                            : isActualCorrect
                                            ? 'border-green-300 bg-green-50/50'
                                            : 'border-gray-200 bg-gray-50'
                                          : isSelected
                                          ? 'border-amber-500 bg-amber-50'
                                          : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/30'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`q-${quiz._id}-${q._id}`}
                                        value={opt}
                                        checked={isSelected}
                                        onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                                        disabled={isDisabled}
                                        className="sr-only"
                                      />
                                      <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                          isDisabled
                                            ? isCorrect
                                              ? 'border-green-500 bg-green-500 text-white'
                                              : isWrong
                                              ? 'border-red-500 bg-red-500 text-white'
                                              : isActualCorrect
                                              ? 'border-green-500'
                                              : 'border-gray-300'
                                            : isSelected
                                            ? 'border-amber-500 bg-amber-500 text-white'
                                            : 'border-gray-300'
                                        }`}>
                                          {String.fromCharCode(65 + i)}
                                        </div>
                                        <span className="text-gray-800">{opt}</span>
                                      </div>
                                      {isDisabled && (
                                        <div className="absolute top-3 right-3">
                                          {isCorrect && <FaCheckCircle className="text-green-500" />}
                                          {isWrong && <FaTimesCircle className="text-red-500" />}
                                          {isActualCorrect && !isWrong && !isCorrect && (
                                            <FaCheckCircle className="text-green-300" />
                                          )}
                                        </div>
                                      )}
                                    </label>
                                  );
                                })}
                              </div>
                            )}

                            {/* Text Answer */}
                            {q.type === "text" && (
                              <div className="relative">
                                <input
                                  type="text"
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all ${
                                    isDisabled
                                      ? detail?.isCorrect
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-red-500 bg-red-50'
                                      : answers[q._id]
                                      ? 'border-amber-500 bg-amber-50'
                                      : 'border-gray-300 hover:border-amber-300'
                                  }`}
                                  value={answers[q._id] || ""}
                                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                                  disabled={isDisabled}
                                  placeholder="Type your answer here..."
                                />
                                {isDisabled && (
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {detail?.isCorrect ? (
                                      <FaCheckCircle className="text-green-500" />
                                    ) : (
                                      <FaTimesCircle className="text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Explanation */}
                            {isDisabled && !detail?.isCorrect && detail?.correct && (
                              <div className="mt-3 p-3 bg-linear-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                                <div className="flex items-center gap-2 mb-1">
                                  <FaLightbulb className="text-amber-500" />
                                  <span className="text-sm font-medium text-amber-700">Correct Answer:</span>
                                </div>
                                <p className="text-amber-800">{detail.correct}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  {isDisabled ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-green-600">
                        <FaCheckCircle />
                        <span className="font-medium">Quiz submitted successfully!</span>
                      </div>
                      <button
                        onClick={() => setActiveTab("results")}
                        className="flex items-center gap-2 px-4 py-2 text-amber-600 hover:text-amber-700"
                      >
                        <FaEye />
                        <span>View Detailed Results</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {answeredCount === 0 ? "No questions answered yet" :
                         `${answeredCount}/${quiz.totalQuestions} questions answered`}
                      </div>
                      <button
                        onClick={() => handleSubmit(quiz._id)}
                        disabled={loadingAdd || !hasAnswered}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingAdd ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <FaCheck />
                            <span>Submit Quiz</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Results Tab */}
        {activeTab === "results" && quizzesWithStatus.some(q => q.isSubmitted) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow p-6 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Quiz Results</h3>
            <div className="space-y-6">
              {quizzesWithStatus
                .filter(q => q.isSubmitted)
                .map((quiz) => (
                  <div key={quiz._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">{quiz.title}</h4>
                      <div className={`px-4 py-2 ${getScoreBgColor(quiz.percentage)} rounded-full`}>
                        <span className={`font-bold ${getScoreColor(quiz.percentage)}`}>
                          {quiz.score}/{quiz.totalQuestions} ({quiz.percentage}%)
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {quiz.details.map((detail, idx) => (
                        <div key={idx} className={`p-4 rounded-lg ${
                          detail.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}>
                          <div className="flex items-start gap-3">
                            {detail.isCorrect ? (
                              <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                            ) : (
                              <FaTimesCircle className="text-red-500 mt-1 shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{detail.question}</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <span className="text-sm text-gray-600">Your Answer:</span>
                                  <p className={`font-medium ${
                                    detail.isCorrect ? 'text-green-700' : 'text-red-700'
                                  }`}>
                                    {detail.userAnswer}
                                  </p>
                                </div>
                                {!detail.isCorrect && (
                                  <div>
                                    <span className="text-sm text-gray-600">Correct Answer:</span>
                                    <p className="font-medium text-green-700">{detail.correct}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Quiz;