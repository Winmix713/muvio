"use client"

import type React from "react"
import { cn } from "@/lib/utils"

type PredictionDotsProps = {
  selectedPrediction: string | null
  onSelectPrediction: (prediction: string) => void
}

const PredictionDots: React.FC<PredictionDotsProps> = ({ selectedPrediction, onSelectPrediction }) => {
  return (
    <div className="flex gap-1.5 mt-1">
      <button
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-200",
          selectedPrediction === "home" ? "bg-sports-blue" : "bg-white/20 hover:bg-white/30",
        )}
        onClick={() => onSelectPrediction("home")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelectPrediction("home")
          }
        }}
        tabIndex={0}
        role="radio"
        aria-checked={selectedPrediction === "home"}
        aria-label="Prediction: Home win"
      />
      <button
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-200",
          selectedPrediction === "draw" ? "bg-sports-blue" : "bg-white/20 hover:bg-white/30",
        )}
        onClick={() => onSelectPrediction("draw")}
        aria-label="Predict draw"
      />
      <button
        className={cn(
          "w-2 h-2 rounded-full transition-all duration-200",
          selectedPrediction === "away" ? "bg-sports-blue" : "bg-white/20 hover:bg-white/30",
        )}
        onClick={() => onSelectPrediction("away")}
        aria-label="Predict away win"
      />
    </div>
  )
}

export default PredictionDots

