import type { Match, MatchAnalysis, MatchStatistics, MatchPrediction } from "./types"

const API_URL = "https://api.winmix.hu" // Replace with your actual API endpoint

export async function getMatches(params: Record<string, string> = {}): Promise<Match[]> {
  try {
    const queryParams = new URLSearchParams(params).toString()
    const response = await fetch(`${API_URL}/matches?${queryParams}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.matches || []
  } catch (error) {
    console.error("Failed to fetch matches:", error)
    return []
  }
}

export async function getMatchAnalysis(homeTeamId: string, awayTeamId: string): Promise<MatchAnalysis | null> {
  try {
    const response = await fetch(
      `${API_URL}/analysis?home_team=${encodeURIComponent(homeTeamId)}&away_team=${encodeURIComponent(awayTeamId)}`,
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform the data to match our MatchAnalysis type
    if (data.team_analysis && data.prediction) {
      const statistics: MatchStatistics = {
        bothTeamsScoredPercentage: data.team_analysis.both_teams_scored_percentage,
        averageGoals: data.team_analysis.average_goals,
        homeFormIndex: data.team_analysis.home_form_index,
        awayFormIndex: data.team_analysis.away_form_index,
        headToHeadStats: data.team_analysis.head_to_head_stats,
      }

      const prediction: MatchPrediction = {
        homeExpectedGoals: data.prediction.homeExpectedGoals,
        awayExpectedGoals: data.prediction.awayExpectedGoals,
        bothTeamsToScoreProb: data.prediction.bothTeamsToScoreProb,
        predictedWinner: data.prediction.predictedWinner,
        confidence: data.prediction.confidence,
        modelPredictions: data.prediction.modelPredictions,
      }

      return { statistics, prediction }
    }

    return null
  } catch (error) {
    console.error("Failed to fetch match analysis:", error)
    return null
  }
}

// Helper function to calculate odds from probabilities
export function calculateOdds(probability: number): number {
  if (probability <= 0) return 0
  if (probability >= 1) return 1

  // Convert probability to decimal odds (rounded to 2 decimal places)
  return Number.parseFloat((1 / probability).toFixed(2))
}

// Helper function to format the probability as a percentage
export function formatProbability(probability: number): string {
  return `${(probability * 100).toFixed(1)}%`
}

