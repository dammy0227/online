// src/pages/admin/ManageQuizzes.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuizThunk,
  updateQuizThunk,
  deleteQuizThunk,
  fetchAllQuizzes,
} from "../../../features/quiz/quizThunks";
import { getAllModulesThunk } from "../../../features/modules/moduleThunks";
import { clearQuizState } from "../../../features/quiz/quizSlice";

import "./ManageQuizze.css";

const ManageQuizzes = () => {
  const dispatch = useDispatch();
  const { quizzes, error, successMessage } = useSelector((state) => state.quiz);
  const { modules: moduleList, loading: modulesLoading } = useSelector(
    (state) => state.modules
  );

  // Popup state
  const [showForm, setShowForm] = useState(false);
  const [moduleId, setModuleId] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "", type: "mcq" },
  ]);
  const [editingQuizId, setEditingQuizId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllQuizzes());
    dispatch(getAllModulesThunk());
    return () => dispatch(clearQuizState());
  }, [dispatch]);

  const resetForm = () => {
    setModuleId("");
    setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswer: "", type: "mcq" }]);
    setEditingQuizId(null);
    setShowForm(false);
  };

  const getModuleTitle = (module) => {
    if (!module) return "Unknown Module";
    if (typeof module === "object") return module.title;
    return moduleList.find((mod) => mod._id === module)?.title || "Unknown Module";
  };

  // Handlers
  const handleAddQuiz = async () => {
    await dispatch(addQuizThunk({ moduleId, quizData: { questions } }));
    dispatch(fetchAllQuizzes());
    resetForm();
  };

  const handleUpdateQuiz = async () => {
    if (!editingQuizId) return;
    await dispatch(updateQuizThunk({ quizId: editingQuizId, quizData: { questions } }));
    dispatch(fetchAllQuizzes());
    resetForm();
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuizId(quiz._id);
    setModuleId(typeof quiz.module === "object" ? quiz.module._id : quiz.module);
    setQuestions(
      quiz.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options || (q.type === "mcq" ? ["", "", "", ""] : []),
        correctAnswer: q.correctAnswer,
        type: q.type || "mcq",
      }))
    );
    setShowForm(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await dispatch(deleteQuizThunk(quizId));
      dispatch(fetchAllQuizzes());
    }
  };

  return (
    <div className="mq-container">
      <h1 className="mq-title">Manage Quizzes</h1>

      {error && <p className="mq-error">{error}</p>}
      {successMessage && <p className="mq-success">{successMessage}</p>}

      {/* Add Quiz Button */}
      <button onClick={() => setShowForm(true)} className="mq-btn mq-btn-add">
        ➕ Add New Quiz
      </button>

      {/* Popup Form */}
      {showForm && (
        <div className="mq-popup-overlay">
          <div className="mq-popup">
            <h2>{editingQuizId ? "Edit Quiz" : "Add Quiz"}</h2>

            <select
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              className="mq-select"
              disabled={modulesLoading}
            >
              <option value="">Select Module</option>
              {moduleList.map((mod) => (
                <option key={mod._id} value={mod._id}>
                  {mod.title}
                </option>
              ))}
            </select>

            {/* Questions */}
            {questions.map((q, qIdx) => (
              <div key={qIdx} className="mq-question-card">
                <input
                  type="text"
                  placeholder={`Question ${qIdx + 1}`}
                  value={q.questionText}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIdx].questionText = e.target.value;
                    setQuestions(updated);
                  }}
                  className="mq-input"
                />
                {q.type === "mcq" &&
                  q.options.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[qIdx].options[i] = e.target.value;
                        setQuestions(updated);
                      }}
                      className="mq-input"
                    />
                  ))}
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIdx].correctAnswer = e.target.value;
                    setQuestions(updated);
                  }}
                  className="mq-input"
                />
              </div>
            ))}

            <button
              onClick={() =>
                setQuestions([
                  ...questions,
                  { questionText: "", options: ["", "", "", ""], correctAnswer: "", type: "mcq" },
                ])
              }
            >
              ➕ Add Question
            </button>

            <div className="mq-popup-actions">
              {editingQuizId ? (
                <button onClick={handleUpdateQuiz} className="mq-btn mq-btn-update">
                  Update Quiz
                </button>
              ) : (
                <button onClick={handleAddQuiz} className="mq-btn mq-btn-add">
                  Save Quiz
                </button>
              )}
              <button onClick={resetForm} className="mq-btn mq-btn-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table showing module & question count */}
      <h2>Existing Quizzes</h2>
      <table className="mq-quiz-table">
        <thead>
          <tr>
            <th>Module</th>
            <th># Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(quizzes || []).map((quiz) => (
            <tr key={quiz._id}>
              <td>{getModuleTitle(quiz.module)}</td>
              <td>{quiz.questions?.length || 0}</td>
              <td>
                <button
                  className="mq-btn mq-btn-update"
                  onClick={() => handleEditQuiz(quiz)}
                >
                  Edit
                </button>
                <button
                  className="mq-btn mq-btn-delete"
                  onClick={() => handleDeleteQuiz(quiz._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuizzes;
