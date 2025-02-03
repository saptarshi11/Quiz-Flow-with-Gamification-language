import type { QuizData } from "../types/quiz"

const mockQuizData: QuizData = {
  questions: [
    {
      id: 1,
      description: "What is the capital of France?",
      options: [
        { id: 1, description: "London", is_correct: false },
        { id: 2, description: "Berlin", is_correct: false },
        { id: 3, description: "Paris", is_correct: true },
        { id: 4, description: "Madrid", is_correct: false },
      ],
      is_correct: false,
      unanswered: true,
      photo_url: null,
    },
    // Add more mock questions here...
  ],
}

export async function fetchQuizData(): Promise<QuizData> {
  try {
    const response = await fetch("https://flow-with-gamification-server.vercel.app/data", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
      throw new Error("Invalid or empty quiz data structure received from API")
    }
    return data
  } catch (error) {
    console.error("Error fetching quiz data:", error)
    if (error instanceof Error) {
      if (error.message === "Failed to fetch" || error.message.includes("NetworkError")) {
        console.warn("API unreachable. Using mock data.")
        return mockQuizData
      }
      throw new Error(`Failed to fetch quiz data: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while fetching quiz data")
    }
  }
}

