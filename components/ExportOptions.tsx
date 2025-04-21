"use client"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check, Code } from "lucide-react"

type ExportOptionsProps = {
  onDownload: () => void
  onCopy: () => void
  copied: boolean
}

const ExportOptions = ({ onDownload, onCopy, copied }: ExportOptionsProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="text-lg font-medium mb-4">Exportálási lehetőségek</h3>

        <div className="space-y-3">
          <Button onClick={onDownload} className="w-full" variant="default">
            <Download className="h-4 w-4 mr-2" />
            HTML fájl letöltése
          </Button>

          <Button onClick={onCopy} className="w-full" variant="outline">
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Másolva!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                HTML másolása
              </>
            )}
          </Button>
        </div>
      </div>

      <FeaturesList />
    </div>
  )
}

const FeaturesList = () => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <h3 className="text-lg font-medium mb-4">Új funkciók</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <FeatureItem text="Reszponzív, mobilbarát design" />
        <FeatureItem text="Animációk és interaktív elemek" />
        <FeatureItem text="Beépített JavaScript funkcionalitás" />
        <FeatureItem text="SEO-barát metaadatok" />
        <FeatureItem text="Professzionális felhasználói felület" />
      </ul>
    </div>
  )
}

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2">
    <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
      <Code className="h-3 w-3 text-primary" />
    </div>
    <span>{text}</span>
  </li>
)

export default ExportOptions

