export type TeamFormItem = "W" | "D" | "L" | "G" | "Y" | "V"

export type Team = {
  id: string
  name: string
  logo: string
  rank?: number
  form?: TeamFormItem[]
}

export type Match = {
  id: number
  time: string
  timeGMT: string
  startsIn: string
  homeTeam?: Team
  awayTeam?: Team
  selectableTeams?: boolean
  date?: string
  score?: {
    home: number
    away: number
  }
}

export type Prediction = {
  matchId: number
  homeTeam: Team
  awayTeam: Team
  prediction: "home" | "draw" | "away"
  createdAt?: Date
}

export type UserStats = {
  totalPredictions: number
  correctPredictions: number
  winRate: number
  points: number
  streak: number
}

export type MatchStatistics = {
  bothTeamsScoredPercentage: number
  averageGoals: {
    average_total_goals: number
    average_home_goals: number
    average_away_goals: number
  }
  homeFormIndex: number
  awayFormIndex: number
  headToHeadStats: {
    home_wins: number
    away_wins: number
    draws: number
    home_win_percentage: number
    away_win_percentage: number
    draw_percentage: number
  }
}

export type MatchPrediction = {
  homeExpectedGoals: number
  awayExpectedGoals: number
  bothTeamsToScoreProb: number
  predictedWinner: "home" | "away" | "draw" | "unknown"
  confidence: number
  modelPredictions: {
    randomForest: string
    poisson: {
      homeGoals: number
      awayGoals: number
    }
    elo: {
      homeWinProb: number
      drawProb: number
      awayWinProb: number
    }
  }
}

export type MatchAnalysis = {
  statistics: MatchStatistics
  prediction: MatchPrediction
}

