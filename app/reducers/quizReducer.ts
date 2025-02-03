import type { QuizData, UserAnswer } from "../types/quiz"

export type QuizState = {
  quizData: QuizData | null
  currentQuestion: number
  userAnswers: UserAnswer[]
  quizState: "start" | "nameEntry" | "question" | "result" | "leaderboard"
  loading: boolean
  error: string | null
  score: number
  timeLeft: number
  hintsUsed: boolean[]
}

export const initialState: QuizState = {
  quizData: null,
  currentQuestion: 0,
  userAnswers: [],
  quizState: "start",
  loading: false,
  error: null,
  score: 0,
  timeLeft: 30,
  hintsUsed: [],
}

type QuizAction =
  | { type: "FETCH_QUIZ_START" }
  | { type: "FETCH_QUIZ_SUCCESS"; payload: QuizData }
  | { type: "FETCH_QUIZ_ERROR"; payload: string }
  | { type: "SHOW_NAME_ENTRY" }
  | { type: "START_QUIZ" }
  | { type: "ANSWER_QUESTION"; payload: string }
  | { type: "NEXT_QUESTION" }
  | { type: "FINISH_QUIZ" }
  | { type: "RESTART_QUIZ" }
  | { type: "SHOW_LEADERBOARD" }
  | { type: "TICK_TIMER" }
  | { type: "USE_HINT" }

export const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case "FETCH_QUIZ_START":
      return { ...state, loading: true, error: null }
    case "FETCH_QUIZ_SUCCESS":
      return {
        ...state,
        loading: false,
        quizData: action.payload,
        hintsUsed: new Array(action.payload.questions.length).fill(false),
      }
    case "FETCH_QUIZ_ERROR":
      return { ...state, loading: false, error: action.payload }
    case "SHOW_NAME_ENTRY":
      return { ...state, quizState: "nameEntry" }
    case "START_QUIZ":
      return { ...state, quizState: "question", timeLeft: 30 }
    case "ANSWER_QUESTION":
      const isCorrect = state.quizData?.questions[state.currentQuestion].correctAnswer === action.payload
      const newScore = isCorrect ? state.score + 1 : state.score
      const newUserAnswers = [...state.userAnswers, { questionIndex: state.currentQuestion, answer: action.payload }]
      if (state.currentQuestion < (state.quizData?.questions.length ?? 0) - 1) {
        return {
          ...state,
          userAnswers: newUserAnswers,
          currentQuestion: state.currentQuestion + 1,
          score: newScore,
          timeLeft: 30,
        }
      } else {
        return { ...state, userAnswers: newUserAnswers, quizState: "result", score: newScore }
      }
    case "RESTART_QUIZ":
      return {
        ...initialState,
        quizData: state.quizData,
        hintsUsed: new Array(state.quizData?.questions.length ?? 0).fill(false),
      }
    case "SHOW_LEADERBOARD":
      return { ...state, quizState: "leaderboard" }
    case "TICK_TIMER":
      if (state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 }
      } else {
        return state.currentQuestion < (state.quizData?.questions.length ?? 0) - 1
          ? { ...state, currentQuestion: state.currentQuestion + 1, timeLeft: 30 }
          : { ...state, quizState: "result" }
      }
    case "USE_HINT":
      const newHintsUsed = [...state.hintsUsed]
      newHintsUsed[state.currentQuestion] = true
      return { ...state, hintsUsed: newHintsUsed }
    default:
      return state
  }
}

