import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TimerProps {
  duration: number
  onTimeUp: () => void
}

export default function Timer({ duration, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      onTimeUp()
    }
  }, [timeLeft, onTimeUp])

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <motion.div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${(timeLeft / duration) * 100}%` }}
        initial={{ width: "100%" }}
        animate={{ width: `${(timeLeft / duration) * 100}%` }}
        transition={{ duration: 1, ease: "linear" }}
      />
    </div>
  )
}

