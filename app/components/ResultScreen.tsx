import { useState } from "react"
import type { Question, UserAnswer } from "../types/quiz"
import { motion, AnimatePresence } from "framer-motion"

interface ResultScreenProps {
  userAnswers: UserAnswer[]
  questions: Question[]
  onRestart: () => void
  onShowLeaderboard: () => void
  score: number
}

export default function ResultScreen({
  userAnswers,
  questions,
  onRestart,
  onShowLeaderboard,
  score,
}: ResultScreenProps) {
  const [currentReview, setCurrentReview] = useState(0)
  const percentage = (score / questions.length) * 100

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % questions.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + questions.length) % questions.length)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Quiz Results</h2>
      <div className="text-center">
        <p className="text-2xl">
          Your score: {score} out of {questions.length}
        </p>
        <p className="text-xl">Percentage: {percentage.toFixed(2)}%</p>
      </div>
      <div className="border p-4 rounded dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-2">Answer Review</h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <p className="font-medium">{questions[currentReview].question}</p>
            <p className="text-green-600">Correct answer: {questions[currentReview].correctAnswer}</p>
            <p
              className={
                userAnswers[currentReview].answer === questions[currentReview].correctAnswer
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              Your answer: {userAnswers[currentReview].answer}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-4">
          <button
            onClick={prevReview}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Previous
          </button>
          <button
            onClick={nextReview}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={onRestart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Restart Quiz
        </button>
        <button
          onClick={onShowLeaderboard}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          View Leaderboard
        </button>
      </div>
    </div>
  )
}

