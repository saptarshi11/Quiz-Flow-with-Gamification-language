import type React from "react"
import QuestionComponent from "./QuestionComponent"
import { motion } from "framer-motion"

interface Option {
  id: number
  description: string
  is_correct: boolean
}

interface Question {
  id: number
  description: string
  options: Option[]
  is_correct: boolean
  unanswered: boolean
  photo_url: string | null
}

interface QuizData {
  questions: Question[]
}

interface QuizNavigatorProps {
  quizData: QuizData
  currentQuestionIndex: number
  onNext: () => void
  onPrevious: () => void
  onAnswer: (optionId: number) => void
}

const QuizNavigator: React.FC<QuizNavigatorProps> = ({
  quizData,
  currentQuestionIndex,
  onNext,
  onPrevious,
  onAnswer,
}) => {
  const currentQuestion = quizData.questions[currentQuestionIndex]

  return (
    <div className="quiz-navigator space-y-6">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        <QuestionComponent question={currentQuestion} onAnswer={onAnswer} />
      </motion.div>
      <div className="navigation-buttons flex justify-between mt-4">
        <motion.button
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:shadow-md"
        >
          Previous
        </motion.button>
        <motion.button
          onClick={onNext}
          disabled={currentQuestionIndex === quizData.questions.length - 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:shadow-md"
        >
          Next
        </motion.button>
      </div>
    </div>
  )
}

export default QuizNavigator

