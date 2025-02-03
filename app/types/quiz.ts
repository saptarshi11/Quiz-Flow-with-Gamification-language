export interface Question {
  question: string
  options: string[]
  correctAnswer: string
}

export interface QuizData {
  questions: Question[]
}

export interface UserAnswer {
  questionIndex: number
  answer: string
}

export interface LeaderboardEntry {
  name: string
  score: number
}

