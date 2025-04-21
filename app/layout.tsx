import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "WinMix.hu - Mérkőzés Előrejelzések",
  description: "Teszteld a futball tudásodat, tippelj mérkőzésekre és versenyezz a legjobb helyezésért.",
  openGraph: {
    title: "WinMix.hu - Mérkőzés Előrejelzések",
    description: "Teszteld a futball tudásodat, tippelj mérkőzésekre és versenyezz a legjobb helyezésért.",
    type: "website",
    url: "https://winmix.hu",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hu" className={`${inter.variable} dark`} style={{ colorScheme: "dark" }}>
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6'/%3E%3Cpath d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18'/%3E%3Cpath d='M4 22h16'/%3E%3Cpath d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'/%3E%3Cpath d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'/%3E%3Cpath d='M18 2H6v7a6 6 0 0 0 12 0V2Z'/%3E%3C/svg%3E"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>
            <Toaster />
            <SonnerToaster />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
