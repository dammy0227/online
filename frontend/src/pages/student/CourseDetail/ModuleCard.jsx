import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { completeModule } from "../../../features/modules/moduleThunks";
import { markModuleCompletedLocally } from "../../../features/progress/progressSlice";
import { fetchQuizzesByModule } from "../../../features/quiz/quizThunks";
import {
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaRegCircle,
  FaPlayCircle,
  FaBook,
  FaClock,
  FaQuestionCircle,
  FaVideo,
  FaFileAlt,
  FaSpinner,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ModuleCard = ({ module, courseId, index, completedModules = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizzesByModule = useSelector((state) => state.quiz.moduleQuizzes);
  const { loading: quizLoading } = useSelector((state) => state.quiz);

  const moduleQuizzes = useMemo(() => quizzesByModule?.[module._id] || [], [
    quizzesByModule,
    module._id,
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [completing, setCompleting] = useState(false);
  const isCompleted = completedModules.includes(module._id);
  const hasQuiz = moduleQuizzes.length > 0;

  useEffect(() => {
    if (module?._id && !quizzesByModule?.[module._id]) {
      dispatch(fetchQuizzesByModule(module._id));
    }
  }, [dispatch, module?._id, quizzesByModule]);

  const toggleAccordion = (e) => {
    if (e.target.closest('button')) return;
    setIsOpen(!isOpen);
  };

  const handleCompleteModule = async (e) => {
    e.stopPropagation();
    if (isCompleted) return;
    
    setCompleting(true);
    dispatch(markModuleCompletedLocally(module._id));
    try {
      await dispatch(completeModule({ moduleId: module._id, courseId })).unwrap();
    } catch (err) {
      console.error("Error completing module:", err);
    } finally {
      setCompleting(false);
    }
  };

  const handleTakeQuiz = (e) => {
    e.stopPropagation();
    navigate(`/student/courses/${courseId}/module/${module._id}/quiz`);
  };

  const handleViewProgress = (e) => {
    e.stopPropagation();
    navigate(`/student/courses/${courseId}/progress`);
  };

  const getContentIcon = () => {
    switch (module.contentType) {
      case "video": return <FaVideo className="text-red-500" />;
      case "text": return <FaFileAlt className="text-blue-500" />;
      default: return <FaBook className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 mb-4 ${
        isCompleted ? 'border-amber-100 bg-amber-50/30' : ''
      }`}
    >
      {/* Module Header */}
      <div 
        onClick={toggleAccordion}
        className={`p-5 cursor-pointer transition-all duration-200 ${
          isOpen ? 'bg-linear-to-r from-amber-50 to-orange-50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Module Number and Status */}
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isCompleted 
                ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white' 
                : 'bg-linear-to-r from-amber-500 to-orange-500 text-white'
            }`}>
              {isCompleted ? (
                <FaCheckCircle className="text-lg" />
              ) : (
                <span className="font-bold">{index}</span>
              )}
            </div>
            
            {/* Module Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className={`text-lg font-semibold ${
                  isCompleted ? 'text-amber-700' : 'text-gray-800'
                }`}>
                  {module.title}
                </h3>
                {isCompleted && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-linear-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                    <FaCheckCircle className="text-xs" />
                    Completed
                  </span>
                )}
              </div>
              
              {/* Module Metadata */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  {getContentIcon()}
                  <span className="capitalize">{module.contentType || 'Content'}</span>
                </div>
                {module.duration && (
                  <div className="flex items-center gap-1">
                    <FaClock className="text-gray-400" />
                    <span>{module.duration}</span>
                  </div>
                )}
                {hasQuiz && (
                  <div className="flex items-center gap-1">
                    <FaQuestionCircle className="text-amber-500" />
                    <span className="text-amber-600 font-medium">Has Quiz</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {hasQuiz && quizLoading && (
              <FaSpinner className="animate-spin text-amber-500" />
            )}
            {hasQuiz && !isCompleted && (
              <span className="px-3 py-1 bg-linear-to-r from-amber-100 to-orange-100 text-amber-700 text-sm font-medium rounded-full border border-amber-200">
                Quiz Available
              </span>
            )}
            <button className="p-2 hover:bg-amber-100 rounded-lg transition-colors">
              {isOpen ? (
                <FaChevronUp className="text-amber-600" />
              ) : (
                <FaChevronDown className="text-amber-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              {/* Content Area */}
              <div className="mb-6">
                {module.contentType === "text" && module.textContent ? (
                  <div className="prose prose-sm max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {module.textContent}
                  </div>
                ) : module.contentType === "video" && module.contentUrl ? (
                  <div className="relative rounded-xl overflow-hidden bg-black">
                    <video
                      controls
                      preload="metadata"
                      className="w-full max-h-96 object-contain"
                      playsInline
                      webkit-playsinline="true"
                    >
                      <source src={module.contentUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                      <FaPlayCircle className="inline mr-2" />
                      Click to play
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaBook className="text-4xl mx-auto mb-3 text-gray-300" />
                    <p>No content available for this module.</p>
                  </div>
                )}
              </div>

              {/* Module Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleCompleteModule}
                    disabled={isCompleted || completing}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
                      isCompleted
                        ? 'bg-linear-to-r from-amber-100 to-orange-100 text-amber-700 cursor-default'
                        : 'bg-linear-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                    } ${completing ? 'opacity-70 cursor-wait' : ''}`}
                  >
                    {completing ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Marking...</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <FaCheckCircle />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        <span>Mark Complete</span>
                      </>
                    )}
                  </button>

                  {hasQuiz && isCompleted && (
                    <button
                      onClick={handleTakeQuiz}
                      className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                    >
                      <FaQuestionCircle />
                      <span>Take Quiz</span>
                      <FaArrowRight className="text-sm" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleViewProgress}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <FaChartLine />
                    <span className="text-sm font-medium">View Progress</span>
                  </button>
                  
                  {hasQuiz && !isCompleted && (
                    <div className="text-sm text-amber-600 font-medium">
                      Complete module to unlock quiz
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              {module.description && (
                <div className="mt-4 p-3 bg-linear-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                  <h4 className="text-sm font-semibold text-amber-800 mb-1">Module Overview</h4>
                  <p className="text-sm text-amber-700">{module.description}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModuleCard;