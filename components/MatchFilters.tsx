"use client"

import type React from "react"
import { useState } from "react"
import { Filter, Calendar, Trophy, Search, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

type League = {
  id: string
  name: string
}

const leagues: League[] = [
  { id: "premier-league", name: "Premier League" },
  { id: "laliga", name: "La Liga" },
  { id: "bundesliga", name: "Bundesliga" },
  { id: "seriea", name: "Serie A" },
  { id: "ligue1", name: "Ligue 1" },
]

interface MatchFiltersProps {
  onChange?: (filters: FilterState) => void
  className?: string
}

type FilterState = {
  leagues: string[]
  dateRange: "today" | "tomorrow" | "week" | "all"
  teamSearch: string
}

const MatchFilters = ({ onChange, className = "" }: MatchFiltersProps) => {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    leagues: [],
    dateRange: "today",
    teamSearch: "",
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const handleLeagueChange = (leagueId: string, checked: boolean) => {
    const newLeagues = checked ? [...filters.leagues, leagueId] : filters.leagues.filter((id) => id !== leagueId)

    updateFilters({ ...filters, leagues: newLeagues })
  }

  const handleDateRangeChange = (range: FilterState["dateRange"]) => {
    updateFilters({ ...filters, dateRange: range })
  }

  const handleTeamSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ ...filters, teamSearch: e.target.value })
  }

  const clearFilters = () => {
    const clearedFilters = {
      leagues: [],
      dateRange: "today" as const,
      teamSearch: "",
    }
    updateFilters(clearedFilters)
  }

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters)
    onChange?.(newFilters)

    // Count active filters
    let count = 0
    if (newFilters.leagues.length > 0) count++
    if (newFilters.dateRange !== "today") count++
    if (newFilters.teamSearch) count++

    setActiveFiltersCount(count)
  }

  const dateOptions = [
    { id: "today", label: "Mai nap" },
    { id: "tomorrow", label: "Holnap" },
    { id: "week", label: "Egy hét" },
    { id: "all", label: "Összes" },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 ${activeFiltersCount > 0 ? "filter-active" : ""} ${className}`}
        >
          <Filter className="h-4 w-4" />
          <span>Szűrés</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Mérkőzés szűrők</h4>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters}>
                <X className="h-3.5 w-3.5 mr-1" />
                Szűrők törlése
              </Button>
            )}
          </div>

          <div>
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground mb-2">
              <Search className="h-3.5 w-3.5" />
              Csapat keresése
            </Label>
            <Input
              placeholder="Csapatnév..."
              value={filters.teamSearch}
              onChange={handleTeamSearchChange}
              className="h-8 text-sm"
            />
          </div>

          <Separator />

          <div>
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground mb-2">
              <Calendar className="h-3.5 w-3.5" />
              Időszak
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {dateOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={filters.dateRange === option.id ? "secondary" : "outline"}
                  size="sm"
                  className="justify-start h-8"
                  onClick={() => handleDateRangeChange(option.id as FilterState["dateRange"])}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground mb-2">
              <Trophy className="h-3.5 w-3.5" />
              Bajnokságok
            </Label>
            <div className="space-y-2">
              {leagues.map((league) => (
                <div key={league.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={league.id}
                    checked={filters.leagues.includes(league.id)}
                    onCheckedChange={(checked) => handleLeagueChange(league.id, checked === true)}
                  />
                  <label
                    htmlFor={league.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {league.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-sports-blue hover:bg-sports-blue-dark text-white w-full"
              onClick={() => setOpen(false)}
            >
              Alkalmaz
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MatchFilters

