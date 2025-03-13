import React from "react"
import { Stepper, Step, StepLabel } from "@mui/material"

interface MaterialStepperProps {
  steps: string[]
  activeStep: number // 1-based indexing from your code
}

export function MaterialStepper({ steps, activeStep }: MaterialStepperProps) {
  return (
    <div className="flex justify-center py-2">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root.Mui-active": {
            color: "#9f7aea",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#9f7aea",
          },
          "& .MuiStepIcon-text": {
            fill: "#ffffff",
          },
          "& .MuiStepLabel-label": {
            color: "#ffffff",
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "#ffffff",
          },
          "& .MuiStepLabel-label.Mui-completed": {
            color: "#ffffff",
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
} 