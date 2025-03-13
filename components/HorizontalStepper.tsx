import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Step {
  title: string
}

interface HorizontalStepperProps {
  steps: Step[]
  currentStep: number
}

/**
 * A simple horizontal stepper that indicates the current step among a list of steps.
 * Responsive enough to shrink on smaller screens.
 */
export function HorizontalStepper({ steps, currentStep }: HorizontalStepperProps) {
  return (
    <div className="w-full px-4 py-2 flex flex-col items-center gap-4">
      <div className="flex justify-center items-center w-full overflow-x-auto">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep
          const isCompleted = index + 1 < currentStep
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center relative px-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <div
                className={cn(
                  "rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium border-2 transition-colors",
                  isCompleted
                    ? "bg-primary text-primary-foreground border-primary"
                    : isActive
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-muted text-foreground/80 border-border"
                )}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-xs text-foreground/80 text-center">
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 right-0 h-0.5 w-16 -translate-y-1/2 bg-border" />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
} 