"use client"

import type React from "react"
import { Check } from "lucide-react"
import type { Prediction } from "@/lib/types"
import { cn } from "@/lib/utils"

type PredictionButtonsProps = {
  homeTeamName?: string
  awayTeamName?: string
  selectedPrediction: string | null
  existingPrediction?: Prediction
  onSelectPrediction: (prediction: string) => void
}

const PredictionButtons: React.FC<PredictionButtonsProps> = ({
  homeTeamName = "Home",
  awayTeamName = "Away",
  selectedPrediction,
  existingPrediction,
  onSelectPrediction,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      <button
        className={cn(
          "prediction-btn",
          existingPrediction?.prediction === "home"
            ? "prediction-btn-active"
            : selectedPrediction === "home"
              ? "prediction-btn-active"
              : "prediction-btn-inactive",
        )}
        onClick={() => !existingPrediction && onSelectPrediction("home")}
        disabled={!!existingPrediction}
      >
        {homeTeamName} Win
        {existingPrediction?.prediction === "home" && <Check className="w-3 h-3 text-white inline-block ml-1" />}
      </button>
      <button
        className={cn(
          "prediction-btn",
          existingPrediction?.prediction === "draw"
            ? "prediction-btn-active"
            : selectedPrediction === "draw"
              ? "prediction-btn-active"
              : "prediction-btn-inactive",
        )}
        onClick={() => !existingPrediction && onSelectPrediction("draw")}
        disabled={!!existingPrediction}
      >
        Draw
        {existingPrediction?.prediction === "draw" && <Check className="w-3 h-3 text-white inline-block ml-1" />}
      </button>
      <button
        className={cn(
          "prediction-btn",
          existingPrediction?.prediction === "away"
            ? "prediction-btn-active"
            : selectedPrediction === "away"
              ? "prediction-btn-active"
              : "prediction-btn-inactive",
        )}
        onClick={() => !existingPrediction && onSelectPrediction("away")}
        disabled={!!existingPrediction}
      >
        {awayTeamName} Win
        {existingPrediction?.prediction === "away" && <Check className="w-3 h-3 text-white inline-block ml-1" />}
      </button>
    </div>
  )
}

export default PredictionButtons

