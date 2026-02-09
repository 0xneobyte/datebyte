"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepCardProps {
  stepNumber: number;
  totalSteps: number;
  children: ReactNode;
}

export default function StepCard({ stepNumber, totalSteps, children }: StepCardProps) {
  const progress = (stepNumber / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Progress Bar */}
      <div className="mb-6 w-full">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-pink-600">
            Step {stepNumber} of {totalSteps}
          </span>
          <span className="text-sm font-semibold text-pink-600">{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-pink-100 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-rose-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      {children}
    </motion.div>
  );
}
