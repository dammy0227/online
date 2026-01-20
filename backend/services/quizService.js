import Quiz from "../models/Quiz.js";

/**
 * Grade a quiz attempt
 * @param {String} quizId - Quiz ID
 * @param {Object} answers - User submitted answers
 * @returns {Object} result { score, total, correctAnswers }
 */
export const gradeQuiz = async (quizId, answers) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("Quiz not found");

  let score = 0;
  const total = quiz.questions.length;
  const correctAnswers = [];

  quiz.questions.forEach((q) => {
    const userAnswer = answers[q._id] ?? "";       
    const correctAnswer = q.correctAnswer ?? "";   

    const isCorrect =
      typeof userAnswer === "string" &&
      typeof correctAnswer === "string" &&
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

    if (isCorrect) score++;

    correctAnswers.push({
      question: q.questionText,
      correct: correctAnswer,
      userAnswer,
      isCorrect,
    });
  });

  return { score, total, correctAnswers };
};
