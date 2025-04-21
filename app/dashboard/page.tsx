"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trophy, Timer, Calendar, ChevronLeft, ChevronRight, FileText, User } from "lucide-react"

// Components
import MatchCard from "@/components/MatchCard"
import MatchCardSkeleton from "@/components/MatchCardSkeleton"
import UserStats from "@/components/UserStats"
import ActionsDropdown from "@/components/ActionsDropdown"
import NotificationCenter from "@/components/NotificationCenter"
import MatchFilters from "@/components/MatchFilters"
import AuthModal from "@/components/AuthModal"
import Header from "@/components/Header" // Import the Header component

// Hooks and utilities
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAppStore } from "@/lib/store"

export default function DashboardPage() {
  // Global state from store
  const matches = useAppStore((state) => state.matches)
  const userStats = useAppStore((state) => state.userStats)
  const predictions = useAppStore((state) => state.predictions)

  // Local state
  const [showAnimation, setShowAnimation] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    leagues: [],
    dateRange: "today",
    teamSearch: "",
  })

  // Hooks
  const { toast } = useToast()
  const isMobile = useIsMobile()

  /**
   * Handles filter changes and triggers data reload
   */
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setIsLoading(true)
    // Simulate filter application
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  /**
   * Initial setup and animations
   */
  useEffect(() => {
    // Trigger animations after component mounts
    setShowAnimation(true)

    // Show welcome toast for new users
    if (userStats.totalPredictions === 0) {
      setTimeout(() => {
        toast({
          title: "Üdvözöljük a WinMix.hu oldalon!",
          description: "Készítsen tippeket és nyerjen pontokat!",
          duration: 5000,
        })
      }, 1500)
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [toast, userStats.totalPredictions])

  /**
   * Format date for display based on locale and device
   */
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("hu-HU", {
      weekday: isMobile ? "short" : "long",
      month: isMobile ? "short" : "long",
      day: "numeric",
    })
  }

  /**
   * Change the current date and reload matches
   */
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)

    // Simulate loading when changing date
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sports-blue/15 via-sports-green/5 to-transparent z-0 pointer-events-none"></div>

      {/* Header and modals */}
      <Header />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

      <main className="container mx-auto px-4 pt-28 md:pt-32 pb-16 relative z-10">
        {/* Hero section */}
        <section className="mb-12 md:mb-16">
          <h1
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-3 transition-all duration-700",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Tippelj Labdarúgó <span className="text-sports-blue">Mérkőzésekre</span>
          </h1>
          <p
            className={cn(
              "text-base sm:text-lg text-gray-400 text-center max-w-2xl mx-auto transition-all duration-700 delay-100",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Teszteld futballtudásodat, tippelj mérkőzésekre, és versenyezz a legjobb helyezésért.
          </p>

          <div
            className={cn(
              "flex justify-center mt-6 transition-all duration-700 delay-150",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <Button
              className="bg-sports-blue hover:bg-sports-blue-dark text-white font-medium"
              onClick={() => setAuthModalOpen(true)}
            >
              <User className="mr-2 h-4 w-4" />
              Bejelentkezés / Regisztráció
            </Button>
          </div>
        </section>

        {/* User stats section */}
        <section
          className={cn(
            "mb-10 md:mb-12 transition-all duration-700 delay-200",
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <UserStats />
        </section>

        {/* Action buttons */}
        <section className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div
            className={cn(
              "flex items-center gap-2 transition-all duration-700 delay-300",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <Link href="/html-export">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-white/5 text-sports-blue border-sports-blue/20 hover:bg-sports-blue/10"
              >
                <FileText className="h-4 w-4" />
                HTML Export
              </Button>
            </Link>

            <Link href="/leaderboard">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-white/5 text-sports-green border-sports-green/20 hover:bg-sports-green/10"
              >
                <Trophy className="h-4 w-4" />
                Ranglista
              </Button>
            </Link>

            <NotificationCenter />
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-300",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <ActionsDropdown />
          </div>
        </section>

        {/* Matches header and filters */}
        <section className="mb-8">
          <div
            className={cn(
              "flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-700 delay-300 gap-4 sm:gap-0",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-sports-accent" />
              Mai Mérkőzések
            </h2>

            <div className="flex items-center gap-2">
              {/* Date navigation */}
              <div className="flex items-center bg-muted/50 rounded-lg">
                <button
                  className="p-2 hover:bg-muted/80 rounded-l-lg transition-colors duration-200"
                  onClick={() => changeDate(-1)}
                  aria-label="Previous day"
                >
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>

                <div className="px-3 py-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-sports-blue" />
                  <span className="text-xs font-medium text-white">{formatDate(currentDate)}</span>
                </div>

                <button
                  className="p-2 hover:bg-muted/80 rounded-r-lg transition-colors duration-200"
                  onClick={() => changeDate(1)}
                  aria-label="Next day"
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Timezone indicator */}
              <div className="bg-muted/50 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Timer className="h-4 w-4 text-sports-blue" />
                <span className="text-xs font-medium text-white">GMT</span>
              </div>

              {/* Match filters */}
              <MatchFilters onChange={handleFilterChange} />
            </div>
          </div>
        </section>

        {/* Match cards grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className={cn(
                      "transition-all duration-700",
                      showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    )}
                    style={{
                      transitionDelay: showAnimation ? `${(index + 4) * 100}ms` : "0ms",
                    }}
                  >
                    <MatchCardSkeleton />
                  </div>
                ))
            : matches.map((match, index) => (
                <div
                  key={match.id}
                  className={cn(
                    "transition-all duration-700",
                    showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  )}
                  style={{
                    transitionDelay: showAnimation ? `${(index + 4) * 100}ms` : "0ms",
                  }}
                >
                  <MatchCard match={match} />
                </div>
              ))}
        </section>
      </main>

      {/* Footer */}
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

            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} WinMix.hu. Minden jog fenntartva.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

