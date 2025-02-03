import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LeaderboardEntry {
  name: string
  score: number
}

interface LeaderboardScreenProps {
  onRestart: () => void
  currentScore: number
  playerName: string
}

export default function LeaderboardScreen({ onRestart, currentScore, playerName }: LeaderboardScreenProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem("quizLeaderboard")
    let updatedLeaderboard = storedLeaderboard ? JSON.parse(storedLeaderboard) : []

    // Add the current player's score
    updatedLeaderboard.push({ name: playerName, score: currentScore })

    // Sort and limit to top 10
    updatedLeaderboard = updatedLeaderboard
      .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score)
      .slice(0, 10)

    setLeaderboard(updatedLeaderboard)
    localStorage.setItem("quizLeaderboard", JSON.stringify(updatedLeaderboard))
  }, [playerName, currentScore])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Leaderboard</h2>
      <AnimatePresence>
        {leaderboard.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
            No scores yet. Be the first to submit your score!
          </motion.p>
        ) : (
          <motion.ul className="space-y-2">
            {leaderboard.map((entry, index) => (
              <motion.li
                key={index}
                className={`flex justify-between items-center p-2 rounded ${
                  entry.name === playerName ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span>{entry.name}</span>
                <span>{entry.score}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button
        onClick={onRestart}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Play Again
      </button>
    </div>
  )
}

