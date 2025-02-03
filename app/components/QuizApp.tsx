"use client"

import { useReducer, useEffect, useState } from "react"
import StartScreen from "./StartScreen"
import NameEntryScreen from "./NameEntryScreen"
import ResultScreen from "./ResultScreen"
import LeaderboardScreen from "./LeaderboardScreen"
import { fetchQuizData } from "../utils/api"
import { quizReducer, initialState } from "../reducers/quizReducer"
import { motion, AnimatePresence } from "framer-motion"
import QuizNavigator from "./QuizNavigator"
import Background3D from "./Background3D"

export default function QuizApp() {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  const [isClient, setIsClient] = useState(false)
  const [playerName, setPlayerName] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    setIsClient(true)
    const loadQuizData = async () => {
      dispatch({ type: "FETCH_QUIZ_START" })
      try {
        const data = await fetchQuizData()
        if (data && data.questions && data.questions.length > 0) {
          dispatch({ type: "FETCH_QUIZ_SUCCESS", payload: data })
        } else {
          throw new Error("Invalid or empty quiz data structure")
        }
      } catch (error) {
        console.error("Error in loadQuizData:", error)
        let errorMessage = "An unknown error occurred while fetching quiz data"
        if (error instanceof Error) {
          errorMessage = error.message
        }
        dispatch({ type: "FETCH_QUIZ_ERROR", payload: errorMessage })
      }
    }

    loadQuizData()
  }, [])

  const handleNext = () => {
    if (currentQuestionIndex < (state.quizData?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleAnswer = (optionId: number) => {
    dispatch({ type: "ANSWER_QUESTION", payload: optionId.toString() })
  }

  if (!isClient) {
    return null // or a loading indicator
  }

  if (state.error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 border border-red-400 rounded">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{state.error}</p>
        <button
          onClick={() => dispatch({ type: "RESTART_QUIZ" })}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (state.loading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Background3D />
      <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-6 relative">
        <AnimatePresence mode="wait">
          {state.quizState === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StartScreen onStart={() => dispatch({ type: "SHOW_NAME_ENTRY" })} />
            </motion.div>
          )}
          {state.quizState === "nameEntry" && (
            <motion.div
              key="nameEntry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <NameEntryScreen
                onNameSubmit={(name) => {
                  setPlayerName(name)
                  dispatch({ type: "START_QUIZ" })
                }}
              />
            </motion.div>
          )}
          {state.quizState === "question" && state.quizData && (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <QuizNavigator
                quizData={state.quizData}
                currentQuestionIndex={currentQuestionIndex}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}
          {state.quizState === "result" && state.quizData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <ResultScreen
                userAnswers={state.userAnswers}
                questions={state.quizData.questions}
                onRestart={() => dispatch({ type: "RESTART_QUIZ" })}
                onShowLeaderboard={() => dispatch({ type: "SHOW_LEADERBOARD" })}
                score={state.score}
              />
            </motion.div>
          )}
          {state.quizState === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <LeaderboardScreen
                onRestart={() => dispatch({ type: "RESTART_QUIZ" })}
                currentScore={state.score}
                playerName={playerName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

