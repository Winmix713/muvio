"use client"

import type React from "react"
import { ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

type SubmitPredictionButtonProps = {
  canPredict: boolean
  selectedPrediction: string | null
  existingPrediction: boolean
  isSubmitting: boolean
  onSubmit: () => void
}

const SubmitPredictionButton: React.FC<SubmitPredictionButtonProps> = ({
  canPredict,
  selectedPrediction,
  existingPrediction,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <div className="pt-6 mt-auto">
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 w-full px-4 py-3",
          "rounded-lg font-medium text-sm transition-all duration-300",
          "relative overflow-hidden",
          canPredict && selectedPrediction && !existingPrediction
            ? "bg-sports-blue hover:bg-sports-blue-dark text-white group"
            : existingPrediction
              ? "bg-sports-green text-white cursor-default"
              : "bg-gray-800 text-gray-400 cursor-not-allowed",
        )}
        disabled={!canPredict || !selectedPrediction || existingPrediction || isSubmitting}
        onClick={onSubmit}
      >
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </span>
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Submitting...
          </>
        ) : (
          <>
            {existingPrediction ? "Prediction Submitted" : "Predict Match"}
            {existingPrediction ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </>
        )}
      </button>
    </div>
  )
}

export default SubmitPredictionButton

