"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Define the props for decision and goal/noGoal (or combine them however you like).
type VARDecisionProps = {
  decision: "offside" | "onside"
}

export function SemiAutoVARDecisionCard({ decision }: VARDecisionProps) {
  // Use color logic strictly for Offside vs. Onside
  const decisionColor = decision === "offside" ? "text-red-500" : "text-green-500"
  const decisionLabel = decision === "offside" ? "Offside" : "Onside"

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none px-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative w-full max-w-sm bg-white text-black pointer-events-auto border border-black rounded-lg shadow-md">
        <CardHeader className=" text-center">
          {/* Top Title */}
          <CardTitle className="font-orbitron text-3xl tracking-wide mb-4">
            VAR CHECK COMPLETE
          </CardTitle>
          {/* Decision Line */}
          <div className="border-t border-black pt-8">
            <span className="font-orbitron text-3xl uppercase tracking-wide">
              DECISION –
            </span>
            <span className={cn("font-orbitron text-3xl font-bold uppercase ml-2", decisionColor)}>
              {decisionLabel}
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-6">
          {/* Bottom Branding */}
          <div className="border-t border-black mt-4 pt-4 flex justify-center items-center gap-3">
            <Image
              src="/images/final_logo.png"
              alt="reftech logo"
              width={48}
              height={48}
            />
            <span className="font-orbitron text-xl font-bold tracking-normal">
              reftech.app
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 