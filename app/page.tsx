import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-green-500/5 to-transparent z-0 pointer-events-none"></div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 p-1">
              <div className="h-full w-full rounded-xl bg-background flex items-center justify-center">
                <Trophy className="h-10 w-10 text-blue-400" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            WinMix<span className="text-blue-500">.hu</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Tippelj labdarúgó mérkőzésekre, versenyezz barátaiddal és nyerj értékes díjakat a legjobb előrejelzésekkel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8">
                Irányítópult
              </Button>
            </Link>

            <Link href="/leaderboard">
              <Button size="lg" variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 px-8">
                Ranglista
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-md bg-gradient-to-br from-blue-500 to-green-500 p-0.5">
                <div className="h-full w-full rounded-sm bg-background flex items-center justify-center">
                  <Trophy className="h-3 w-3 text-blue-500" />
                </div>
              </div>
              <span className="text-sm font-medium text-white">
                Win<span className="text-blue-500">Mix.hu</span>
              </span>
            </div>

            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} WinMix.hu. Minden jog fenntartva.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

