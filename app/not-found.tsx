"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sports-blue/15 via-sports-green/5 to-transparent z-0 pointer-events-none"></div>

      <div className="text-center relative z-10 px-4 py-10 max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 overflow-hidden rounded-xl bg-gradient-to-br from-sports-blue to-sports-green p-1">
            <div className="h-full w-full rounded-lg bg-background flex items-center justify-center">
              <Trophy className="h-8 w-8 text-sports-blue" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-400 mb-8">Hoppá! Az oldal nem található</p>

        <Link href="/" passHref>
          <Button className="bg-sports-blue hover:bg-sports-blue-dark text-white font-medium">
            Vissza a főoldalra
          </Button>
        </Link>
      </div>

      <footer className="py-6 border-t border-white/5 backdrop-blur-sm w-full absolute bottom-0">
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

