"use client"
import React from "react"
import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
}

export default function ThemedCard({ children }: Props) {
  return (
    <motion.section
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative w-full bg-gradient-to-b from-white/90 to-pink-50/70 border border-pink-100 rounded-3xl shadow-2xl p-6 md:p-10"
    >
      <div className="absolute -top-8 left-6 right-6 flex justify-between items-center pointer-events-none">
        <div className="h-2 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full w-1/3 opacity-60" />
        <div className="h-2 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full w-1/3 opacity-60" />
      </div>

      <div className="relative z-10">{children}</div>

      <div className="absolute inset-x-6 bottom-4 h-1 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 opacity-60" />
    </motion.section>
  )
}
