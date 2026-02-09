"use client"
import React from "react"
import { motion } from "framer-motion"

export default function FloatingOrbs() {
  const orbs = [20, 40, 60, 80]
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {orbs.map((left, idx) => (
        <motion.div
          key={idx}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: -60, opacity: [0, 0.5, 0.15] }}
          transition={{ duration: 18 + idx * 4, repeat: Infinity, ease: "linear", delay: idx * 1.2 }}
          style={{ left: `${left}%` }}
          className="absolute bottom-0"
        >
          <div className={`w-36 h-36 rounded-full bg-gradient-to-tr from-pink-50 to-rose-50 opacity-70 blur-xl`} />
        </motion.div>
      ))}
    </div>
  )
}
