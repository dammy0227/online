// src/pages/admin/ManageQuizzes.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBook,
  FaQuestionCircle,
  FaSearch,
  FaFilter,
  FaSort,
  FaTimes,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import {
  addQuizThunk,
  updateQuizThunk,
  deleteQuizThunk,
  fetchAllQuizzes,
} from "../../../features/quiz/quizThunks";
import { getAllModulesThunk } from "../../../features/modules/moduleThunks";
import { clearQuizState } from "../../../features/quiz/quizSlice";

const ManageQuizzes = () => {
  const dispatch = useDispatch();
  const { quizzes, error, successMessage, loading } = useSelector((state) => state.quiz);
  const { modules: moduleList, loading: modulesLoading } = useSelector(
    (state) => state.modules
  );

  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "", type: "mcq" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'module', direction: 'asc' });

  // Define helper functions BEFORE using them
  const getModuleForQuiz = (quiz) => {
    if (!quiz) return null;
    if (typeof quiz.module === 'object') return quiz.module;
    return moduleList.find(mod => mod._id === quiz.module);
  };

  const getModuleTitle = (quiz) => {
    const module = getModuleForQuiz(quiz);
    return module?.title || "Unknown Module";
  };

  useEffect(() => {
    dispatch(fetchAllQuizzes());
    dispatch(getAllModulesThunk());
    return () => dispatch(clearQuizState());
  }, [dispatch]);

  // Filter and sort quizzes - now using the defined functions
  const filteredAndSortedQuizzes = quizzes
    ?.filter(quiz => {
      const module = getModuleForQuiz(quiz);
      return (
        module?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.questions?.some(q => 
          q.questionText?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      const moduleA = getModuleForQuiz(a);
      const moduleB = getModuleForQuiz(b);
      
      if (sortConfig.key === 'questions') {
        const aCount = a.questions?.length || 0;
        const bCount = b.questions?.length || 0;
        return sortConfig.direction === 'asc' ? aCount - bCount : bCount - aCount;
      }
      if (sortConfig.key === 'module') {
        const aTitle = moduleA?.title || '';
        const bTitle = moduleB?.title || '';
        return sortConfig.direction === 'asc' 
          ? aTitle.localeCompare(bTitle)
          : bTitle.localeCompare(aTitle);
      }
      return 0;
    });

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Form handlers
  const resetForm = () => {
    setSelectedModuleId("");
    setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswer: "", type: "mcq" }]);
    setEditingQuizId(null);
    setIsModalOpen(false);
  };

  const handleAddQuiz = async () => {
    await dispatch(addQuizThunk({ 
      moduleId: selectedModuleId, 
      quizData: { questions } 
    }));
    dispatch(fetchAllQuizzes());
    resetForm();
  };

  const handleUpdateQuiz = async () => {
    if (!editingQuizId) return;
    await dispatch(updateQuizThunk({ 
      quizId: editingQuizId, 
      quizData: { questions } 
    }));
    dispatch(fetchAllQuizzes());
    resetForm();
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuizId(quiz._id);
    const module = getModuleForQuiz(quiz);
    setSelectedModuleId(module?._id || "");
    setQuestions(
      quiz.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options || (q.type === "mcq" ? ["", "", "", ""] : []),
        correctAnswer: q.correctAnswer,
        type: q.type || "mcq",
      }))
    );
    setIsModalOpen(true);
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await dispatch(deleteQuizThunk(quizId));
      dispatch(fetchAllQuizzes());
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "", type: "mcq" }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const updated = questions.filter((_, i) => i !== index);
      setQuestions(updated);
    }
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-1">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-2xl font-bold bg-gray-700 bg-clip-text text-transparent">
              Quiz Management
            </h1>
            <p className="text-gray-600 mt-2">Create and manage quizzes for your modules</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 max-w-fit p-3 md:px-6 md:py-3  bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <FaPlus />
            New Quiz
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl  border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FaBook className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{quizzes?.length || 0}</h3>
                <p className="text-sm text-gray-600">Total Quizzes</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaQuestionCircle className="text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {quizzes?.reduce((sum, quiz) => sum + (quiz.questions?.length || 0), 0) || 0}
                </h3>
                <p className="text-sm text-gray-600">Total Questions</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl  border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaBook className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {new Set(quizzes?.map(q => getModuleForQuiz(q)?._id).filter(Boolean)).size || 0}
                </h3>
                <p className="text-sm text-gray-600">Modules with Quizzes</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl  border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaQuestionCircle className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {quizzes?.filter(q => (q.questions?.length || 0) > 5).length || 0}
                </h3>
                <p className="text-sm text-gray-600">Large Quizzes (5+ Qs)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search quizzes by module or question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300">
            <FaFilter className="text-gray-500" />
            <span className="text-gray-700">{filteredAndSortedQuizzes?.length} quizzes found</span>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3"
          >
            <FaExclamationCircle className="text-red-500 shrink-0" />
            <span className="text-red-700 font-medium">{error}</span>
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center gap-3"
          >
            <FaCheckCircle className="text-green-500 shrink-0" />
            <span className="text-green-700 font-medium">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingQuizId ? "Edit Quiz" : "Create New Quiz"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  {/* Module Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Module
                    </label>
                    <select
                      value={selectedModuleId}
                      onChange={(e) => setSelectedModuleId(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      disabled={modulesLoading}
                    >
                      <option value="">Select a module</option>
                      {moduleList.map((mod) => (
                        <option key={mod._id} value={mod._id}>
                          {mod.title}
                        </option>
                      ))}
                    </select>
                    {modulesLoading && (
                      <p className="text-sm text-gray-500 mt-2">
                        <FaSpinner className="animate-spin inline mr-2" />
                        Loading modules...
                      </p>
                    )}
                  </div>

                  {/* Questions List */}
                  <div className="space-y-6 mb-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">Questions</h3>
                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <FaPlus />
                        Add Question
                      </button>
                    </div>

                    {questions.map((q, qIdx) => (
                      <motion.div
                        key={qIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 p-5 rounded-xl border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-gray-800">
                            Question {qIdx + 1}
                          </h4>
                          {questions.length > 1 && (
                            <button
                              onClick={() => handleRemoveQuestion(qIdx)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>

                        {/* Question Text */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Question Text
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your question here..."
                            value={q.questionText}
                            onChange={(e) => {
                              const updated = [...questions];
                              updated[qIdx].questionText = e.target.value;
                              setQuestions(updated);
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                          />
                        </div>

                        {/* MCQ Options */}
                        {q.type === "mcq" && (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Options
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {q.options.map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-3">
                                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${q.correctAnswer === opt ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {String.fromCharCode(65 + optIdx)}
                                  </div>
                                  <input
                                    type="text"
                                    placeholder={`Option ${optIdx + 1}`}
                                    value={opt}
                                    onChange={(e) => {
                                      const updated = [...questions];
                                      updated[qIdx].options[optIdx] = e.target.value;
                                      setQuestions(updated);
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Correct Answer */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correct Answer
                          </label>
                          <input
                            type="text"
                            placeholder={q.type === "mcq" ? "Enter correct option letter or text" : "Enter correct answer"}
                            value={q.correctAnswer}
                            onChange={(e) => {
                              const updated = [...questions];
                              updated[qIdx].correctAnswer = e.target.value;
                              setQuestions(updated);
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                          />
                          {q.type === "mcq" && (
                            <p className="text-sm text-gray-500 mt-2">
                              Enter the letter (A, B, C, D) or exact text of the correct option
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={editingQuizId ? handleUpdateQuiz : handleAddQuiz}
                      className="flex-1 px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                      disabled={loading || !selectedModuleId || questions.some(q => !q.questionText.trim())}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          {editingQuizId ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        editingQuizId ? "Update Quiz" : "Create Quiz"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quizzes Table */}
      <div className="bg-white rounded shadow-sm overflow-hidden">
      

        {loading && quizzes?.length === 0 ? (
          <div className="p-12 text-center">
            <FaSpinner className="text-3xl text-amber-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading quizzes...</p>
          </div>
        ) : filteredAndSortedQuizzes?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 text-black">
                <tr>
                  <th 
                    onClick={() => handleSort('module')} 
                    className="py-4 px-6 text-left font-semibold cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FaBook />
                      <span>Module</span>
                      <FaSort className={`text-sm ${sortConfig.key === 'module' ? 'opacity-100' : 'opacity-50'} ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('questions')} 
                    className="py-4 px-6 text-left font-semibold cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FaQuestionCircle />
                      <span>Questions</span>
                      <FaSort className={`text-sm ${sortConfig.key === 'questions' ? 'opacity-100' : 'opacity-50'} ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Sample Questions</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <span>Module Status</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedQuizzes.map((quiz, index) => (
                  <motion.tr
                    key={quiz._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <h4 className="font-semibold text-gray-800">{getModuleTitle(quiz)}</h4>
                       
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${(quiz.questions?.length || 0) > 5 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        <FaQuestionCircle className="text-xs" />
                        <span className="font-semibold">{quiz.questions?.length || 0}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        {quiz.questions?.slice(0, 2).map((q, i) => (
                          <p key={i} className="text-sm text-gray-600 truncate max-w-xs">
                            {i + 1}. {q.questionText || "No question text"}
                          </p>
                        ))}
                        {(quiz.questions?.length || 0) > 2 && (
                          <p className="text-xs text-gray-500">
                            +{(quiz.questions?.length || 0) - 2} more questions
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        <FaBook className="text-xs" />
                        <span className="text-sm font-medium">Active Module</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditQuiz(quiz)}
                          className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
                          title="Edit quiz"
                        >
                          <FaEdit />
                          
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz._id)}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                          title="Delete quiz"
                        >
                          <FaTrash />
                          
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center border-t border-gray-200">
            <FaQuestionCircle className="text-4xl text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No quizzes found</h4>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first quiz to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2 mx-auto"
              >
                <FaPlus /> Create Quiz
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageQuizzes;