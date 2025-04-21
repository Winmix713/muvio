"use client"

import type React from "react"
import type { Team } from "@/lib/types"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type TeamSelectorProps = {
  team?: Team
  allTeams: Team[]
  isOpen: boolean
  onToggle: () => void
  onSelect: (team: Team) => void
  type: "home" | "away"
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ team, allTeams, isOpen, onToggle, onSelect, type }) => {
  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-blue-500/10 to-blue-500/10 hover:from-blue-500/20 hover:to-blue-500/20 border border-blue-500/20 rounded-lg text-white transition-all duration-300"
        onClick={onToggle}
      >
        {team ? (
          <div className="flex items-center gap-2">
            <img
              src={team.logo || "/placeholder.svg"}
              alt={team.name}
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            {team.name}
          </div>
        ) : (
          `Select ${type} team`
        )}
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-sports-blue/20 rounded-lg shadow-lg shadow-sports-blue/10 backdrop-blur-sm animate-fade-in-fast">
          <div className="max-h-48 overflow-y-auto py-1">
            {allTeams.map((team) => (
              <button
                key={team.id}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-sports-blue/10 transition-colors duration-200"
                onClick={() => onSelect(team)}
              >
                <img
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                {team.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamSelector

