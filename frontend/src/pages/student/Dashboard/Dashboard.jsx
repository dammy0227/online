import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMyProgress } from "../../../features/progress/progressThunks";
import {
  FaArrowLeft,
  FaChartLine,
  FaTrophy,
  FaCheckCircle,
  FaBook,
  FaQuestionCircle,
  FaClock,
  FaCalendar,
  FaSpinner,
  FaExclamationCircle,
  FaStar,
  FaChartBar,
  FaAward,
  FaFire,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const Dashboard = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { progress, loading, error } = useSelector((state) => state.progress);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchMyProgress(courseId));
    }
  }, [dispatch, courseId]);

  const handleBack = () => {
    navigate(`/student/courses/${courseId}`);
  };

  const calculateProgressData = () => {
    if (!progress) return [];
    const total = progress.course?.modules?.length || 0;
    const completed = progress.completedModules?.length || 0;
    return [
      { name: "Completed", value: completed, color: "#10b981" },
      { name: "Pending", value: total - completed, color: "#f59e0b" },
    ];
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-amber-100";
    return "bg-red-100";
  };

  const getPerformanceStatus = () => {
    if (!progress) return "Beginner";
    const avgScore = progress.stats?.averageScore || 0;
    if (avgScore >= 90) return "Expert";
    if (avgScore >= 75) return "Advanced";
    if (avgScore >= 60) return "Intermediate";
    return "Beginner";
  };

  const performanceStatus = getPerformanceStatus();

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-4xl text-amber-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Loading Progress Dashboard</h3>
          <p className="text-gray-500">Fetching your learning statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Progress</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => dispatch(fetchMyProgress(courseId))}
              className="flex-1 px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaChartLine className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Progress Found</h3>
          <p className="text-gray-600 mb-6">Start learning to track your progress.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Start Learning
          </button>
        </div>
      </div>
    );
  }

  const completionPercent = progress.completionPercentage || 0;
  const completedModules = progress.completedModules?.length || 0;
  const totalModules = progress.course?.modules?.length || 0;
  const quizData = calculateProgressData();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <FaArrowLeft />
                <span className="font-medium">Back to Course</span>
              </button>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
              <FaChartLine />
              <span className="font-medium">Progress Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {progress.course?.title || "Course Progress"}
              </h1>
              <p className="text-gray-600">Track your learning progress and quiz performance</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-300">
              <FaCalendar className="text-gray-500" />
              <span className="text-gray-700">Updated: Just now</span>
            </div>
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Progress Overview</h2>
              <div className="flex items-center gap-2">
                <FaChartBar className="text-amber-500" />
                <span className="text-sm text-gray-600">Course Completion</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Module Completion</h3>
                  <p className="text-sm text-gray-600">
                    {completedModules} of {totalModules} modules completed
                  </p>
                </div>
                <span className="text-2xl font-bold text-amber-600">{completionPercent}%</span>
              </div>
              
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            {/* Progress Pie Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={quizData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {quizData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} modules`, 'Count']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Quick Stats</h2>
              <div className="flex items-center gap-2">
                <FaTrophy className="text-amber-500" />
                <span className="text-sm text-gray-600">Performance</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <FaBook className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Score</p>
                    <p className="text-xl font-bold text-gray-800">{progress.score || 0}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 ${getScoreBgColor(progress.score)} rounded-full text-xs font-medium`}>
                    Total
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <FaQuestionCircle className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quizzes Taken</p>
                    <p className="text-xl font-bold text-gray-800">{progress.stats?.quizzesTaken || 0}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Attempts
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <FaStar className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className={`text-xl font-bold ${getScoreColor(progress.stats?.averageScore || 0)}`}>
                      {progress.stats?.averageScore?.toFixed(1) || "0.0"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 ${getScoreBgColor(progress.stats?.averageScore || 0)} rounded-full text-xs font-medium`}>
                    Average
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FaAward className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Performance Level</p>
                    <p className="text-xl font-bold text-gray-800">{performanceStatus}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Level
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quiz Performance Chart */}
        {progress.submittedQuizzes && progress.submittedQuizzes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Quiz Performance</h2>
                <p className="text-gray-600">Detailed breakdown of your quiz scores</p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <FaFire />
                <span className="font-medium">Great progress!</span>
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progress.submittedQuizzes.map((q, i) => ({
                  name: `Quiz ${i + 1}`,
                  score: q.score,
                  fullScore: 10,
                }))}>
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                    }}
                    formatter={(value) => [`${value} points`, 'Score']}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {progress.submittedQuizzes.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index % 2 === 0 ? '#f59e0b' : '#f97316'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Submitted Quizzes */}
        {progress.submittedQuizzes && progress.submittedQuizzes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Submitted Quizzes</h2>
              <span className="px-3 py-1 bg-linear-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-medium">
                {progress.submittedQuizzes.length} quizzes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {progress.submittedQuizzes.map((quiz, index) => (
                <div key={quiz.quiz} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        quiz.score >= 8 ? 'bg-green-100 text-green-700' :
                        quiz.score >= 6 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Quiz {index + 1}</h4>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${getScoreColor(quiz.score)}`}>
                      {quiz.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaClock className="text-gray-400" />
                    <span>Submitted recently</span>
                  </div>
                  <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        quiz.score >= 8 ? 'bg-green-500' :
                        quiz.score >= 6 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(quiz.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Completion Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-8 text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Learning Achievement</h2>
              <p className="text-amber-100 mb-4">
                {completionPercent === 100 
                  ? "🎉 Congratulations! You've completed this course!"
                  : completionPercent >= 70
                  ? "🔥 You're doing great! Keep up the momentum!"
                  : "🚀 Great start! Continue learning to unlock more achievements."}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-300" />
                  <span className="font-medium">{completedModules} modules completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-300" />
                  <span className="font-medium">
                    Avg Score: {progress.stats?.averageScore?.toFixed(1) || "0.0"}
                  </span>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-white text-amber-700 font-bold rounded-lg hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
              >
                {completionPercent === 100 ? "Review Course" : "Continue Learning"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;