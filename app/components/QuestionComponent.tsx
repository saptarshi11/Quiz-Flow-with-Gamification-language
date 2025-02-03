import type React from "react"
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

interface QuestionComponentProps {
  question: Question
  onAnswer: (optionId: number) => void
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswer }) => {
  return (
    <div className="question space-y-4">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold text-gray-800 mb-4"
      >
        {question.description}
      </motion.h3>
      <motion.ul className="space-y-2">
        {question.options.map((option, index) => (
          <motion.li
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition duration-300">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.id}
                onChange={() => onAnswer(option.id)}
                className="form-radio text-blue-600 h-5 w-5"
              />
              <span className="text-gray-700">{option.description}</span>
            </label>
          </motion.li>
        ))}
      </motion.ul>
      {question.photo_url && (
        <motion.img
          src={question.photo_url || "/placeholder.svg"}
          alt="Question Image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 max-w-full h-auto rounded-lg shadow-md"
        />
      )}
    </div>
  )
}

export default QuestionComponent

