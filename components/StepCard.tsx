import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type React from "react" // Added import for React
import { CheckCircle } from "lucide-react" // NEW: import check icon

interface StepCardProps {
  icon?: React.ReactNode
  title: string
  isActive: boolean
  children: React.ReactNode
  stepNumber?: number
  completed?: boolean
}

export function StepCard({ icon, title, isActive, children, stepNumber, completed }: StepCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", isActive && "border-primary")}>
      {isActive && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/20 animate-pulse rounded-lg" />
        </div>
      )}
      <div className="relative z-10">
        <CardHeader className="flex flex-row items-center gap-2 p-4">
          {typeof stepNumber === "number" && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-800 font-bold">
              {completed ? (
                <CheckCircle 
                  className="text-green-700" 
                  size={24} 
                />
              ) : (
                stepNumber
              )}
            </div>
          )}
          {icon && <div>{icon}</div>}
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          {children}
        </CardContent>
      </div>
    </Card>
  )
}

