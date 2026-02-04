'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// Pre-generated fixed positions to avoid hydration mismatch
const HEARTS = [
  { left: 15, delay: 0, scale: 0.6, duration: 12, color: 'text-pink-300' },
  { left: 25, delay: 1, scale: 0.7, duration: 14, color: 'text-rose-300' },
  { left: 35, delay: 2, scale: 0.5, duration: 16, color: 'text-pink-200/80' },
  { left: 45, delay: 0.5, scale: 0.8, duration: 18, color: 'text-rose-200/80' },
  { left: 55, delay: 1.5, scale: 0.6, duration: 13, color: 'text-pink-300' },
  { left: 65, delay: 2.5, scale: 0.7, duration: 15, color: 'text-rose-300' },
  { left: 75, delay: 0.3, scale: 0.5, duration: 17, color: 'text-pink-200/80' },
  { left: 85, delay: 1.8, scale: 0.75, duration: 14, color: 'text-rose-200/80' },
  { left: 10, delay: 3, scale: 0.6, duration: 16, color: 'text-pink-300' },
  { left: 90, delay: 0.8, scale: 0.65, duration: 12, color: 'text-rose-300' },
]

const HeartBackground = () => {

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {HEARTS.map((h, i) => (
        <motion.div
          key={i}
          className={`${h.color} absolute`} 
          style={{ left: `${h.left}%`, bottom: -40 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -1200, opacity: [0, 0.9, 0] }}
          transition={{ delay: h.delay, duration: h.duration, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ transform: `scale(${h.scale})` }} className="filter blur-sm opacity-90">
            <Heart size={28} fill="currentColor" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default HeartBackground 