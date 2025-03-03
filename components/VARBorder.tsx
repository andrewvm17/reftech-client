"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function VARBorder() {
  const [isAnimating] = useState(true)

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="relative aspect-video w-full max-w-2xl">
        <svg className="size-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clockwise path from top center */}
          <path
            d="M 200 50 L 350 50 L 350 250 L 200 250"
            stroke="white"
            strokeWidth="8"
            className={`${isAnimating ? "animate-[drawClockwise_2s_ease-out_forwards]" : ""}`}
            style={{
              strokeDasharray: 600,
              strokeDashoffset: isAnimating ? 0 : 600,
              transformOrigin: "200px 50px",
            }}
          />
          {/* Counter-clockwise path from top center */}
          <path
            d="M 200 50 L 50 50 L 50 250 L 200 250"
            stroke="white"
            strokeWidth="8"
            className={`${isAnimating ? "animate-[drawCounterClockwise_2s_ease-out_forwards]" : ""}`}
            style={{
              strokeDasharray: 600,
              strokeDashoffset: isAnimating ? 0 : 600,
              transformOrigin: "200px 50px",
            }}
          />
        </svg>
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="animate-pulse text-2xl font-bold tracking-widest text-white">VAR CHECK</span>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes drawClockwise {
          0% {
            stroke-dashoffset: 600;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes drawCounterClockwise {
          0% {
            stroke-dashoffset: 600;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        
      `}</style>
    </div>
  )
} 