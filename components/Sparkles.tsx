"use client"
import React from "react"
import { motion } from "framer-motion"

// Pre-generated fixed positions to avoid hydration mismatch
const SPARKLE_POSITIONS = [
  { left: 12, top: 15, size: 5, delay: 0 },
  { left: 25, top: 35, size: 6, delay: 0.5 },
  { left: 38, top: 22, size: 4, delay: 1 },
  { left: 52, top: 45, size: 7, delay: 1.5 },
  { left: 68, top: 18, size: 5, delay: 2 },
  { left: 81, top: 40, size: 6, delay: 0.3 },
  { left: 15, top: 65, size: 4, delay: 0.8 },
  { left: 45, top: 72, size: 5, delay: 1.2 },
  { left: 72, top: 68, size: 6, delay: 1.8 },
  { left: 88, top: 25, size: 4, delay: 2.2 },
  { left: 35, top: 8, size: 5, delay: 0.6 },
  { left: 62, top: 85, size: 7, delay: 1.4 },
  { left: 92, top: 55, size: 5, delay: 0.9 },
  { left: 8, top: 48, size: 6, delay: 1.6 },
  { left: 78, top: 12, size: 4, delay: 2 },
  { left: 28, top: 80, size: 5, delay: 0.4 },
  { left: 55, top: 28, size: 6, delay: 1.1 },
  { left: 18, top: 92, size: 4, delay: 1.9 },
]

export default function Sparkles({ count = 12 }: { count?: number }) {
  const sparkles = SPARKLE_POSITIONS.slice(0, count)
  
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparkles.map((sparkle, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0.8], opacity: [0, 1, 0] }}
          transition={{ delay: sparkle.delay, duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%` }}
          className="absolute"
        >
          <div
            style={{ width: sparkle.size, height: sparkle.size, borderRadius: 999 }}
            className="bg-rose-200/80 blur-sm opacity-90"
          />
        </motion.div>
      ))}
    </div>
  )
}
