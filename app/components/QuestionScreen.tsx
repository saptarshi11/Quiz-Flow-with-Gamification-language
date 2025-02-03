import { useState, useEffect } from "react"
import type { Question } from "../types/quiz"
import { motion } from "framer-motion"
import Timer from "./Timer"
import ProgressBar from "./ProgressBar"

interface QuestionScreenProps {
  question: Question
  onAnswer: (answer: string) => void
  currentQuestion: number
  totalQuestions: number
  timeLeft: number
  hintUsed: boolean
  onUseHint: () => void
}

export default function QuestionScreen({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions,
  timeLeft,
  hintUsed,
  onUseHint,
}: QuestionScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  useEffect(() => {
    setSelectedAnswer(null)
  }, [question])

  const handleAnswer = () => {
    if (selectedAnswer !== null) {
      onAnswer(selectedAnswer)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Question {currentQuestion} of {totalQuestions}
        </div>
        <div className="text-lg font-semibold">Time left: {timeLeft}s</div>
      </div>
      <ProgressBar current={currentQuestion} total={totalQuestions} />
      <Timer duration={30} onTimeUp={handleAnswer} />
      <h2 className="text-2xl font-bold">{question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            className={`w-full text-left p-4 rounded ${
              selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleAnswer}
          disabled={selectedAnswer === null}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next Question
        </button>
        <button
          onClick={onUseHint}
          disabled={hintUsed}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Use Hint
        </button>
      </div>
      {hintUsed && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          <strong>Hint:</strong> The correct answer{" "}
          {question.correctAnswer.length > 4 ? "has more than 4 letters" : "has 4 or fewer letters"}.
        </div>
      )}
    </div>
  )
}

