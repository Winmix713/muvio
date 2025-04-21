import { Trophy, Award, Zap, CheckCircle, BarChart } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const UserStats = () => {
  const userStats = useAppStore((state) => state.userStats)

  const statCards = [
    {
      title: "Total Predictions",
      value: userStats.totalPredictions,
      icon: <CheckCircle className="h-4 w-4 text-blue-400" />,
      bgColor: "from-blue-600/20 to-blue-700/10",
      borderColor: "border-blue-500/20",
      delay: "animate-delay-100",
    },
    {
      title: "Correct Predictions",
      value: userStats.correctPredictions,
      icon: <Award className="h-4 w-4 text-green-400" />,
      bgColor: "from-green-600/20 to-green-700/10",
      borderColor: "border-green-500/20",
      delay: "animate-delay-200",
    },
    {
      title: "Win Rate",
      value: `${userStats.winRate}%`,
      icon: <BarChart className="h-4 w-4 text-purple-400" />,
      bgColor: "from-purple-600/20 to-purple-700/10",
      borderColor: "border-purple-500/20",
      delay: "animate-delay-300",
    },
    {
      title: "Current Streak",
      value: userStats.streak,
      icon: <Zap className="h-4 w-4 text-amber-400" />,
      bgColor: "from-amber-600/20 to-amber-700/10",
      borderColor: "border-amber-500/20",
      delay: "animate-delay-400",
    },
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Your Statistics</h2>

        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-md">
          <Trophy className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">{userStats.points} Points</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={cn(
              "relative rounded-xl bg-gradient-to-br p-4 border backdrop-blur-sm animate-scale-in",
              card.bgColor,
              card.borderColor,
              card.delay,
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-white/70">{card.title}</span>
              {card.icon}
            </div>
            <div className="text-2xl font-bold text-white">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserStats

