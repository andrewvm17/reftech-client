import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PulsingUploadPromptProps {
  onClick: () => void
  mainText: string
  subText: string
}

export function PulsingUploadPrompt({ onClick, mainText, subText }: PulsingUploadPromptProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
        <Button size="lg" className="relative z-10 w-40 h-40 rounded-full" onClick={onClick}>
          <Upload className="w-16 h-16" />
        </Button>
      </div>
      <p className="mt-8 text-2xl font-semibold text-center">{mainText}</p>
      <p className="mt-2 text-lg text-muted-foreground text-center">{subText}</p>
    </div>
  )
}

