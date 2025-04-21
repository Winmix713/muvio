import type React from "react"
import { Clock, Timer } from "lucide-react"

type MatchHeaderProps = {
  id: number
  time: string
  timeGMT: string
  startsIn: string
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ id, time, timeGMT, startsIn }) => {
  return (
    <div className="flex items-center justify-between mb-5 relative">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xs sm:text-sm font-semibold text-sports-blue bg-sports-blue/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
          Match {id}
        </span>
        <div className="px-2 py-0.5 rounded text-xs font-medium bg-sports-blue/20 text-sports-blue">
          <span className="flex items-center gap-1.5">
            <Timer className="w-3 h-3" />
            <span className="hidden sm:inline">Starts in</span> {startsIn}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-sports-blue" />
        <span className="text-xs font-medium text-sports-blue">{timeGMT}</span>
      </div>
    </div>
  )
}

export default MatchHeader

