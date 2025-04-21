"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Trophy, TrendingUp, BarChart3, Percent } from 'lucide-react'

// Store and utilities
import { useAppStore } from "@/lib/store"
import { calculateOdds, formatProbability } from "@/lib/api"
import type { MatchAnalysis } from "@/lib/types"

// UI Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

interface MatchPredictionCardProps {
  homeTeamId: string
  awayTeamId: string
}

const MatchPredictionCard: React.FC<MatchPredictionCardProps> = ({ homeTeamId, awayTeamId }) => {
  // Hooks
  const { toast } = useToast()
  
  // Local state
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null)

  // Global state from store
  const allTeams = useAppStore((state) => state.allTeams)
  const setMatchAnalysis = useAppStore((state) => state.setMatchAnalysis)
  const getMatchAnalysis = useAppStore((state) => state.getMatchAnalysis)

  // Find team data
  const homeTeam = allTeams.find((team) => team.id === homeTeamId)
  const awayTeam = allTeams.find((team) => team.id === awayTeamId)

  /**
   * Fetch match analysis data on component mount or when team IDs change
   */
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!homeTeamId || !awayTeamId) return

      setLoading(true)

      // Check if we already have the analysis in store
      const cachedAnalysis = getMatchAnalysis(homeTeamId, awayTeamId)

      if (cachedAnalysis) {
        setAnalysis(cachedAnalysis)
        setLoading(false)
        return
      }

      try {
        const result = await getMatchAnalysis(homeTeamId, awayTeamId)
        if (result) {
          setAnalysis(result)
          setMatchAnalysis(homeTeamId, awayTeamId, result)
        }
      } catch (error) {
        toast({
          title: "Error fetching prediction",
          description: "Failed to load match prediction data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [homeTeamId, awayTeamId, getMatchAnalysis, setMatchAnalysis, toast])

  // Handle case when teams are not found
  if (!homeTeam || !awayTeam) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-center">Team Not Found</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="glass-card">
      {/* Card header */}
      <CardHeader className="pb-2">
        <CardTitle className="text-center flex items-center justify-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Match Prediction
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          // Loading state
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : analysis ? (
          // Analysis content
          <div className="space-y-4">
            {/* Teams header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src={homeTeam.logo || "/placeholder.svg"} 
                  alt={homeTeam.name} 
                  className="h-6 w-6" 
                />
                <span className="font-medium">{homeTeam.name}</span>
              </div>
              <span>vs</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{awayTeam.name}</span>
                <img 
                  src={awayTeam.logo || "/placeholder.svg"} 
                  alt={awayTeam.name} 
                  className="h-6 w-6" 
                />
              </div>
            </div>

            {/* Match odds */}
            <div className="grid grid-cols-3 gap-2 bg-muted/30 p-3 rounded-lg">
              {/* Home win */}
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Home Win</div>
                <div className="text-lg font-semibold">
                  {calculateOdds(analysis.prediction.modelPredictions.elo.homeWinProb)}
                </div>
                <div className="text-xs text-blue-400">
                  {formatProbability(analysis.prediction.modelPredictions.elo.homeWinProb)}
                </div>
              </div>

              {/* Draw */}
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Draw</div>
                <div className="text-lg font-semibold">
                  {calculateOdds(analysis.prediction.modelPredictions.elo.drawProb)}
                </div>
                <div className="text-xs text-blue-400">
                  {formatProbability(analysis.prediction.modelPredictions.elo.drawProb)}
                </div>
              </div>

              {/* Away win */}
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Away Win</div>
                <div className="text-lg font-semibold">
                  {calculateOdds(analysis.prediction.modelPredictions.elo.awayWinProb)}
                </div>
                <div className="text-xs text-blue-400">
                  {formatProbability(analysis.prediction.modelPredictions.elo.awayWinProb)}
                </div>
              </div>
            </div>

            <Separator />

            {/* AI Prediction */}
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                AI Prediction
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">
                    {analysis.prediction.predictedWinner === "home"
                      ? homeTeam.name
                      : analysis.prediction.predictedWinner === "away"
                        ? awayTeam.name
                        : "Draw"}
                  </span>
                  <span className="text-xs text-blue-400">
                    {(analysis.prediction.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
                <Progress value={analysis.prediction.confidence * 100} className="h-2" />
              </div>
            </div>

            {/* Expected Goals */}
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-400" />
                Expected Goals
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="text-xs text-muted-foreground">{homeTeam.name}</div>
                  <div className="text-lg font-semibold">{analysis.prediction.homeExpectedGoals.toFixed(1)}</div>
                </div>

                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <div className="text-xs text-muted-foreground">{awayTeam.name}</div>
                  <div className="text-lg font-semibold">{analysis.prediction.awayExpectedGoals.toFixed(1)}</div>
                </div>
              </div>
            </div>

            {/* Both Teams to Score */}
            <div className="space-y-2">
              <div className="text-sm font-medium flex items-center gap-2">
                <Percent className="h-4 w-4 text-blue-400" />
                Both Teams to Score
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{analysis.prediction.bothTeamsToScoreProb > 50 ? "Yes" : "No"}</span>
                  <span className="text-xs text-blue-400">{analysis.prediction.bothTeamsToScoreProb.toFixed(0)}%</span>
                </div>
                <Progress value={analysis.prediction.bothTeamsToScoreProb} className="h-2" />
              </div>
            </div>

            {/* Action button */}
            <Button variant="outline" className="w-full mt-2" size="sm">
              View Detailed Analysis
            </Button>
          </div>
        ) : (
          // No data state
          <div className="text-center py-6 text-muted-foreground">
            No prediction data available for this match
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MatchPredictionCard

