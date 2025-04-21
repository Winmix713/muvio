"use client"

import { useState, useEffect } from "react"
import { Award, ArrowUp, ArrowDown, User, Trophy, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
// IDE KELL A JAVÍTÁS: Használd a nagy 'H'-t az import path-ban
import Header from "@/components/Header"

type LeaderboardEntry = {
  id: number
  name: string
  avatar?: string
  rank: number
  previousRank: number
  points: number
  winRate: number
  streak: number
}

const mockLeaderboard: LeaderboardEntry[] = [
  { id: 1, name: "Sportfogadó Pro", rank: 1, previousRank: 1, points: 15200, winRate: 68.5, streak: 7 },
  { id: 2, name: "Profi Tippelő", rank: 2, previousRank: 4, points: 14850, winRate: 72.1, streak: 5 },
  { id: 3, name: "Futball Mester", rank: 3, previousRank: 2, points: 13720, winRate: 65.3, streak: 3 },
  { id: 4, name: "Siker Bajnok", rank: 4, previousRank: 3, points: 12950, winRate: 63.7, streak: 2 },
  { id: 5, name: "Elemző Guru", rank: 5, previousRank: 7, points: 12380, winRate: 61.2, streak: 4 },
  { id: 6, name: "Bajnok Tippelő", rank: 6, previousRank: 5, points: 11760, winRate: 59.8, streak: 0 },
  { id: 7, name: "Foci Szakértő", rank: 7, previousRank: 6, points: 11320, winRate: 58.4, streak: 2 },
  { id: 8, name: "Stratégiai Játékos", rank: 8, previousRank: 10, points: 10980, winRate: 56.2, streak: 3 },
  { id: 9, name: "Elemző Pro", rank: 9, previousRank: 8, points: 10540, winRate: 55.7, streak: 1 },
  { id: 10, name: "Adatfeldolgozó", rank: 10, previousRank: 9, points: 10120, winRate: 53.9, streak: 0 },
  { id: 11, name: "Meccs Mágus", rank: 11, previousRank: 14, points: 9870, winRate: 52.3, streak: 2 },
  { id: 12, name: "Tippelő Bajnok", rank: 12, previousRank: 11, points: 9540, winRate: 51.8, streak: 1 },
  { id: 13, name: "Kockázatos Tippelő", rank: 13, previousRank: 12, points: 9320, winRate: 49.5, streak: 0 },
  { id: 14, name: "Szerencsés Fogadó", rank: 14, previousRank: 13, points: 9150, winRate: 48.7, streak: 1 },
  { id: 15, name: "Kezdő Tippelő", rank: 15, previousRank: 15, points: 8720, winRate: 46.2, streak: 0 },
]

export default function LeaderboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"rank" | "points" | "winRate">("rank")
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(8) // Simulated user rank

  // Simulated loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaderboardData(mockLeaderboard)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort data
  const filteredData = leaderboardData
    .filter((entry) => entry.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "rank") return a.rank - b.rank
      if (sortBy === "points") return b.points - a.points
      return b.winRate - a.winRate
    })

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) return <ArrowUp className="h-4 w-4 text-sports-green" />
    if (current > previous) return <ArrowDown className="h-4 w-4 text-red-500" />
    return <span className="w-4">-</span>
  }

  const getTopRankStyles = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-amber-600 text-black"
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400 text-black"
    if (rank === 3) return "bg-gradient-to-r from-amber-700 to-amber-800 text-white"
    return "bg-white/5"
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sports-blue/15 via-sports-green/5 to-transparent z-0 pointer-events-none" />

      <Header />

      <main className="container mx-auto px-4 pt-28 md:pt-32 pb-16 relative z-10">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-3">
            WinMix <span className="text-sports-blue">Ranglista</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 text-center max-w-2xl mx-auto">
            Nézze meg, hogyan teljesít a többi felhasználóhoz képest! A pontok a sikeres tippek alapján kerülnek
            kiosztásra.
          </p>
        </div>

        {/* Search and filter */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Felhasználó keresése..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={sortBy === "rank" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSortBy("rank")}
              className={`${sortBy !== "rank" ? "bg-white/5 border-white/10" : ""}`}
            >
              <Trophy className="h-4 w-4 mr-1" />
              Helyezés
            </Button>
            <Button
              variant={sortBy === "points" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSortBy("points")}
              className={`${sortBy !== "points" ? "bg-white/5 border-white/10" : ""}`}
            >
              <Award className="h-4 w-4 mr-1" />
              Pontok
            </Button>
            <Button
              variant={sortBy === "winRate" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSortBy("winRate")}
              className={`${sortBy !== "winRate" ? "bg-white/5 border-white/10" : ""}`}
            >
              Találati %
            </Button>
          </div>
        </div>

        {/* Top 3 podium (only show on larger screens) */}
        <div className="hidden md:flex justify-center mb-10">
          <div className="flex items-end space-x-5">
            {/* 2nd Place */}
            {!isLoading && leaderboardData.length > 1 && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center mb-2 border-4 border-background">
                  <span className="text-2xl font-bold text-gray-900">2</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg text-center w-28">
                  <p className="text-white font-bold truncate">{leaderboardData[1].name}</p>
                  <p className="text-sports-blue text-sm">{leaderboardData[1].points} pont</p>
                </div>
                <div className="h-32 w-16 bg-gradient-to-t from-gray-300/80 to-gray-400/30 rounded-t-lg mt-2" />
              </div>
            )}

            {/* 1st Place */}
            {!isLoading && leaderboardData.length > 0 && (
              <div className="flex flex-col items-center">
                <Trophy className="h-8 w-8 text-yellow-400 mb-1" />
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 flex items-center justify-center mb-2 border-4 border-background">
                  <span className="text-3xl font-bold text-yellow-900">1</span>
                </div>
                <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-sm p-3 rounded-lg text-center w-32 border border-yellow-500/30">
                  <p className="text-white font-bold truncate">{leaderboardData[0]?.name}</p>
                  <p className="text-yellow-400 text-sm">{leaderboardData[0]?.points} pont</p>
                </div>
                <div className="h-40 w-20 bg-gradient-to-t from-yellow-400/80 to-amber-600/30 rounded-t-lg mt-2" />
              </div>
            )}

            {/* 3rd Place */}
            {!isLoading && leaderboardData.length > 2 && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 flex items-center justify-center mb-2 border-4 border-background">
                  <span className="text-2xl font-bold text-amber-100">3</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg text-center w-28">
                  <p className="text-white font-bold truncate">{leaderboardData[2].name}</p>
                  <p className="text-sports-blue text-sm">{leaderboardData[2].points} pont</p>
                </div>
                <div className="h-24 w-16 bg-gradient-to-t from-amber-700/80 to-amber-800/30 rounded-t-lg mt-2" />
              </div>
            )}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
          <div className="grid grid-cols-12 gap-2 p-4 bg-white/5 font-medium text-sm text-gray-300">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5 sm:col-span-6">Felhasználó</div>
            <div className="col-span-2 text-right">Pontok</div>
            <div className="col-span-2 text-right hidden sm:block">Találati %</div>
            <div className="col-span-2 text-right">Széria</div>
          </div>

          <div className="divide-y divide-white/5">
            {isLoading
              ? // Loading skeletons
                Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 p-4 items-center">
                      <div className="col-span-1 text-center">
                        <Skeleton className="h-6 w-6 rounded-full mx-auto" />
                      </div>
                      <div className="col-span-5 sm:col-span-6 flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                      <div className="col-span-2 text-right">
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </div>
                      <div className="col-span-2 text-right hidden sm:block">
                        <Skeleton className="h-4 w-12 ml-auto" />
                      </div>
                      <div className="col-span-2 text-right">
                        <Skeleton className="h-4 w-8 ml-auto" />
                      </div>
                    </div>
                  ))
              : // Actual leaderboard data
                filteredData.map((entry) => (
                  <div
                    key={entry.id}
                    className={`grid grid-cols-12 gap-2 p-4 items-center hover:bg-white/5 transition-colors ${
                      currentUserRank === entry.rank ? "bg-sports-blue/10 border-l-4 border-sports-blue" : ""
                    }`}
                  >
                    <div className="col-span-1 text-center flex items-center justify-center">
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-full ${getTopRankStyles(entry.rank)}`}
                      >
                        <span className="text-sm font-bold">{entry.rank}</span>
                      </div>
                      <div className="ml-1">{getRankChange(entry.rank, entry.previousRank)}</div>
                    </div>
                    <div className="col-span-5 sm:col-span-6 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sports-blue to-sports-green flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium truncate">{entry.name}</span>
                      {currentUserRank === entry.rank && (
                        <span className="text-xs bg-sports-blue/20 text-sports-blue px-2 py-0.5 rounded-full ml-2">
                          Te
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 text-right font-bold text-sports-blue">
                      {entry.points.toLocaleString()}
                    </div>
                    <div className="col-span-2 text-right hidden sm:block">{entry.winRate}%</div>
                    <div className="col-span-2 text-right">
                      <div className="inline-flex items-center gap-0.5">
                        {Array.from({ length: Math.min(entry.streak, 5) }).map((_, i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-sports-accent" />
                        ))}
                        {entry.streak > 5 && (
                          <span className="text-xs text-sports-accent ml-1">+{entry.streak - 5}</span>
                        )}
                        {entry.streak === 0 && <span className="text-xs text-gray-500">-</span>}
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {!isLoading && filteredData.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p>Nem található felhasználó a keresési feltételeknek megfelelően</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-md bg-gradient-to-br from-sports-blue to-sports-green p-0.5">
                <div className="h-full w-full rounded-sm bg-background flex items-center justify-center">
                  <Trophy className="h-3 w-3 text-sports-blue" />
                </div>
              </div>
              <span className="text-sm font-medium text-white">
                Win<span className="text-sports-blue">Mix.hu</span>
              </span>
            </div>

            <p className="text-xs text-gray-500">© {new Date().getFullYear()} WinMix.hu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}