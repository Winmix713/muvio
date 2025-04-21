"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/Header"
import ExportOptions from "@/components/ExportOptions"
import HtmlPreview from "@/components/HtmlPreview"
import { generateHtmlContent } from "@/lib/htmlGenerator"
import { useAppStore } from "@/lib/store"
import { Trophy } from "lucide-react"

export default function HtmlExportPage() {
  const { toast } = useToast()
  const matches = useAppStore((state) => state.matches)
  const allTeams = useAppStore((state) => state.allTeams)
  const userStats = useAppStore((state) => state.userStats)

  const [htmlContent, setHtmlContent] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generate HTML content
    const content = generateHtmlContent(matches, allTeams, userStats)
    setHtmlContent(content)
    setIsLoading(false)
  }, [matches, allTeams, userStats])

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "winmix-export.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "HTML fájl letöltve",
      description: "A HTML fájl sikeresen letöltve.",
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent)
    setCopied(true)

    toast({
      title: "HTML másolva",
      description: "A HTML tartalom a vágólapra másolva.",
    })

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sports-blue/15 via-sports-green/5 to-transparent z-0 pointer-events-none"></div>

      <Header />

      <main className="container mx-auto px-4 pt-28 md:pt-32 pb-16 relative z-10">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-3">
            HTML <span className="text-sports-blue">Exportálás</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 text-center max-w-2xl mx-auto">
            Exportálja a WinMix.hu tartalmát HTML formátumban, hogy beágyazhassa saját weboldalába.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HtmlPreview htmlContent={htmlContent} />
          </div>

          <div>
            <ExportOptions onDownload={handleDownload} onCopy={handleCopy} copied={copied} />
          </div>
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

            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} WinMix.hu. Minden jog fenntartva.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

