"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Trophy, Mail, KeyRound, User, UserPlus, Loader2 } from "lucide-react"

type AuthModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Bejelentkezés sikeres!",
        description: "Üdvözöljük újra a WinMix.hu oldalon!",
      })
      setIsLoading(false)
      onOpenChange(false)
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Regisztráció sikeres!",
        description: "Köszönjük, hogy csatlakozott a WinMix.hu közösségéhez!",
      })
      setIsLoading(false)
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-sports-blue to-sports-green p-0.5 mr-2">
              <div className="h-full w-full rounded-lg bg-background flex items-center justify-center">
                <Trophy className="h-5 w-5 text-sports-blue" />
              </div>
            </div>
            <DialogTitle className="text-xl">WinMix.hu</DialogTitle>
          </div>
          <DialogDescription>
            Jelentkezzen be vagy regisztráljon fiókot a predikciók mentéséhez és a ranglistán való részvételhez.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Bejelentkezés</TabsTrigger>
            <TabsTrigger value="register">Regisztráció</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="pelda@email.hu"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Jelszó</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sports-blue to-sports-green hover:from-sports-blue-dark hover:to-sports-green-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Bejelentkezés...
                    </>
                  ) : (
                    "Bejelentkezés"
                  )}
                </Button>
              </DialogFooter>
              <div className="text-center text-sm text-muted-foreground">
                <span>Elfelejtett jelszó?</span>{" "}
                <Button
                  variant="link"
                  className="p-0 text-sports-blue"
                  onClick={() => toast({ title: "Funkció fejlesztés alatt!" })}
                >
                  Visszaállítás
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Név</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Teljes név"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-email"
                    name="email"
                    type="email"
                    placeholder="pelda@email.hu"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Jelszó</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reg-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sports-blue to-sports-green hover:from-sports-blue-dark hover:to-sports-green-dark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Regisztráció...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" /> Regisztráció
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal

