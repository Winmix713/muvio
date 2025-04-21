"use client"

import { useState, useMemo } from "react"
import { useAppStore } from "@/lib/store" // Assuming this is your Zustand store
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import type { Match } from "@/lib/types"
import TeamSelector from "@/components/TeamSelector"
import TeamDisplay from "@/components/TeamDisplay"
import MatchHeader from "@/components/MatchHeader"
import PredictionButtons from "@/components/PredictionButtons"
import PredictionDots from "@/components/PredictionDots"
import SubmitPredictionButton from "@/components/SubmitPredictionButton"
import MatchPredictionCard from "@/components/MatchPredictionCard"

interface MatchCardProps {
  match: Match
}

const MatchCard = ({ match }: MatchCardProps) => {
  // --- FIX START ---
  // Problem: Selecting multiple values from a Zustand store using an object literal
  // like { ... } inside the selector function creates a new object reference on every render.
  // React's useSyncExternalStore (used internally by Zustand's useStore) compares
  // the snapshot result by reference. If it's a new reference every time,
  // even if the content is the same, it triggers a re-render, potentially leading
  // to an infinite loop if the component's render cycle causes the state access again.
  // Solution: Select each value separately from the store.
  const allTeams = useAppStore((state) => state.allTeams);
  const predictions = useAppStore((state) => state.predictions);
  const addPrediction = useAppStore((state) => state.addPrediction);
  const updateMatch = useAppStore((state) => state.updateMatch);
  // --- FIX END ---

  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPredictionCard, setShowPredictionCard] = useState(false)
  const [isHomeTeamSelectorOpen, setIsHomeTeamSelectorOpen] = useState(false)
  const [isAwayTeamSelectorOpen, setIsAwayTeamSelectorOpen] = useState(false)

  const existingPrediction = useMemo(() => {
    // Ensure predictions is an array before calling find
    if (!Array.isArray(predictions)) {
        console.error("Zustand predictions state is not an array:", predictions);
        return undefined; // Or handle appropriately
    }
    return predictions.find((p) => p.matchId === match.id)
  }, [predictions, match.id]) // Dependency on predictions and match.id

  const canPredict = !!(match.homeTeam && match.awayTeam)

  const handlePrediction = (prediction: string) => {
    setSelectedPrediction(prediction)
  }

  const handleSubmitPrediction = () => {
    if (!selectedPrediction || !match.homeTeam || !match.awayTeam) return

    setIsSubmitting(true)

    // Simulate async action
    setTimeout(() => {
      // Add prediction to store
      addPrediction({
        matchId: match.id,
        homeTeam: match.homeTeam!, // Use non-null assertion after canPredict check
        awayTeam: match.awayTeam!, // Use non-null assertion after canPredict check
        prediction: selectedPrediction as "home" | "draw" | "away",
      })

      // Show toast notification
      toast({
        title: "Tipp elmentve!",
        description: `${match.homeTeam!.name} vs ${match.awayTeam!.name}: ${
          selectedPrediction === "home"
            ? "Hazai győzelem"
            : selectedPrediction === "draw"
            ? "Döntetlen"
            : "Vendég győzelem"
        }`,
      })

      setIsSubmitting(false)
    }, 1000) // Simulate network delay
  }

  const handleSelectTeam = (team: any, type: "home" | "away") => {
    const currentTeam = type === "home" ? match.homeTeam : match.awayTeam
    // Check if the selected team is the same as the current one
    if (currentTeam?.id === team.id) {
      type === "home"
        ? setIsHomeTeamSelectorOpen(false)
        : setIsAwayTeamSelectorOpen(false)
      return // No state update needed
    }

    // Update the match in the store
    updateMatch(match.id, {
      [type === "home" ? "homeTeam" : "awayTeam"]: team,
      // Potentially clear prediction if teams change? Or let user re-predict.
      // For now, just update teams. Clearing prediction might be better UX.
      // selectedPrediction: null, // Uncomment to clear prediction on team change
    })

    // Close the selector
    type === "home"
      ? setIsHomeTeamSelectorOpen(false)
      : setIsAwayTeamSelectorOpen(false)
  }

  const renderTeamSelectors = () => (
    // Only render if selectableTeams is true
    match.selectableTeams && (
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 items-center mb-4 md:mb-6">
        <div className="col-span-1 md:col-span-2">
          <TeamSelector
            team={match.homeTeam}
            allTeams={allTeams} // Pass allTeams prop
            isOpen={isHomeTeamSelectorOpen}
            onToggle={() => setIsHomeTeamSelectorOpen(!isHomeTeamSelectorOpen)}
            onSelect={(team) => handleSelectTeam(team, "home")}
            type="home"
          />
        </div>

        <div className="col-span-1 flex flex-col items-center justify-center py-2 md:py-4">
          <div className="font-bold text-muted-foreground text-lg md:text-xl relative">VS</div>
           {/* Pass prediction dots if selectableTeams allows prediction */}
          {canPredict && (
             <PredictionDots selectedPrediction={selectedPrediction} onSelectPrediction={handlePrediction} />
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <TeamSelector
            team={match.awayTeam}
            allTeams={allTeams} // Pass allTeams prop
            isOpen={isAwayTeamSelectorOpen}
            onToggle={() => setIsAwayTeamSelectorOpen(!isAwayTeamSelectorOpen)}
            onSelect={(team) => handleSelectTeam(team, "away")}
            type="away"
          />
        </div>
      </div>
    )
  )

  const renderTeamDisplay = () => (
    // Only render if selectableTeams is false
    !match.selectableTeams && (
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 gap-4">
        {match.homeTeam && match.awayTeam ? (
          <>
            <div className="w-full md:w-auto">
              <TeamDisplay team={match.homeTeam} type="home" />
            </div>

            <div className="font-bold text-muted-foreground text-lg md:text-xl relative my-2 md:my-0">
              VS
              <span className="hidden md:block absolute h-px w-10 bg-border top-1/2 -left-12"></span>
              <span className="hidden md:block absolute h-px w-10 bg-border top-1/2 -right-12"></span>
            </div>

            <div className="w-full md:w-auto">
              <TeamDisplay team={match.awayTeam} type="away" />
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <div className="font-bold text-muted-foreground text-xl">VS</div>
          </div>
        )}
      </div>
    )
  )

  const renderPredictionToggleButton = () => (
    // Only render if prediction is possible
    canPredict && (
      <button
        className={cn(
          "w-full text-center py-2 text-xs font-medium rounded-lg transition-colors",
          showPredictionCard ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-400 hover:bg-white/10"
        )}
        onClick={() => setShowPredictionCard(!showPredictionCard)}
      >
        {showPredictionCard ? "Elrejtés" : "Előrejelzés megtekintése"}
      </button>
    )
  )

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg">
      <MatchHeader
        id={match.id}
        time={match.time}
        timeGMT={match.timeGMT}
        startsIn={match.startsIn}
      />

      <div className="p-3 md:p-6">
        {/* Render selectors if selectableTeams is true, otherwise render display */}
        {match.selectableTeams ? renderTeamSelectors() : renderTeamDisplay()}

        {canPredict && (
          <>
            <div className="mb-4">
              {renderPredictionToggleButton()}
            </div>

            {showPredictionCard && match.homeTeam && match.awayTeam && ( // Ensure teams exist before rendering prediction card
              <div className="mb-4">
                <MatchPredictionCard
                  homeTeamId={match.homeTeam.id}
                  awayTeamId={match.awayTeam.id}
                />
              </div>
            )}

            <PredictionButtons
              homeTeamName={match.homeTeam?.name}
              awayTeamName={match.awayTeam?.name}
              selectedPrediction={selectedPrediction}
              existingPrediction={existingPrediction}
              onSelectPrediction={handlePrediction}
            />
          </>
        )}
        {/* Optionally add a message if canPredict is false, e.g., match not ready */}
         {!canPredict && (
            <div className="text-center text-sm text-gray-500 py-4">
                Csapatok kiválasztására vár...
            </div>
         )}
      </div>

      {/* Only show submit button if prediction is possible and teams are selected */}
      {canPredict && (
        <SubmitPredictionButton
          canPredict={canPredict} // Redundant but okay
          selectedPrediction={selectedPrediction}
          existingPrediction={!!existingPrediction}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitPrediction}
        />
      )}
    </div>
  )
}

export default MatchCard
