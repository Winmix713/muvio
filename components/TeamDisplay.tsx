import type React from "react"
import { Shield, Star } from "lucide-react"
import type { Team, TeamFormItem } from "@/lib/types"

type TeamFormProps = {
  form?: TeamFormItem[]
}

type TeamDisplayProps = {
  team?: Team
  type: "home" | "away"
}

const formLabels: Record<TeamFormItem, string> = {
  W: "Win",
  D: "Draw",
  L: "Loss",
  G: "Goal",
  Y: "Yellow Card",
  V: "Victory",
}

const formColors: Record<TeamFormItem, string> = {
  W: "bg-sports-green/20 text-sports-green",
  D: "bg-sports-accent/20 text-sports-accent",
  L: "bg-red-500/20 text-red-400",
  G: "bg-sports-blue/20 text-sports-blue",
  Y: "bg-sports-accent/20 text-sports-accent",
  V: "bg-sports-green/20 text-sports-green",
}

export const TeamForm: React.FC<TeamFormProps> = ({ form }) => {
  if (!form || form.length === 0) return null

  return (
    <div className="flex gap-0.5 mt-2">
      {form.map((item, index) => (
        <span
          key={index}
          className={`text-[10px] font-medium px-1 rounded ${formColors[item]}`}
          title={formLabels[item]}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team, type }) => {
  if (!team) {
    return (
      <div className="text-gray-400 flex flex-col items-center gap-2">
        <Star className="w-8 h-8 opacity-40" />
        <span className="text-xs">Select {type} team</span>
      </div>
    )
  }

  return (
    <div className="text-center transform transition-all duration-300 hover:scale-105">
      <div className="w-16 h-16 mx-auto relative mb-2">
        <img
          src={team.logo || "/placeholder.svg"}
          alt={team.name}
          width={64}
          height={64}
          className="object-contain w-full h-full filter drop-shadow-lg"
        />
      </div>
      <span className="text-white text-sm font-medium">{team.name}</span>
      <TeamForm form={team.form} />
      {team.rank && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-sports-blue/10 px-2 py-0.5 rounded">
          <Shield className="w-3 h-3 text-sports-blue" />
          <span className="text-[10px] font-medium text-sports-blue">{team.rank}</span>
        </div>
      )}
    </div>
  )
}

export default TeamDisplay

