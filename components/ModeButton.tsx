import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ModeButtonProps {
  mode: string
  color: string
  showPulsingCircle?: boolean
}

export function ModeButton({ mode, color, showPulsingCircle }: ModeButtonProps) {
  return (
    <Button
      disabled={false}
      variant="outline"
      className={cn(
        "font-semibold flex items-center gap-2",
        color === "blue" && "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        color === "yellow" && "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        color === "green" && "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        color === "purple" && "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
        color === "indigo" && "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20",
        color === "teal" && "bg-teal-500/10 text-teal-500 hover:bg-teal-500/20",
        color === "red" && "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      )}
    >
      {showPulsingCircle && (
        <div className="relative h-4 w-4">
          <div className="absolute inset-0 rounded-full bg-red-500 opacity-60 animate-ping" />
          <div className="h-4 w-4 rounded-full bg-red-500" />
        </div>
      )}
      {mode}
    </Button>
  )
}

