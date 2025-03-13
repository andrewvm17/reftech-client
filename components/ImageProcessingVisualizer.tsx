"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Code, Layers, Grid, Play, Check } from "lucide-react"

const processingStages = [
  {
    id: "original",
    name: "Original Footage",
    description: "High-definition match footage captured at 120fps",
    color: "from-blue-500 to-purple-500",
    icon: <Play className="w-4 h-4" />,
  },
  {
    id: "edge-detection",
    name: "Edge Detection",
    description: "AI identifies field lines, players, and ball position",
    color: "from-purple-500 to-pink-500",
    icon: <Grid className="w-4 h-4" />,
  },
  {
    id: "player-tracking",
    name: "Pitch Detection",
    description: "Neural networks track player positions in real-time",
    color: "from-pink-500 to-orange-500",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: "offside-analysis",
    name: "Offside Lines",
    description: "Precise calculations determine offside positions",
    color: "from-orange-500 to-yellow-500",
    icon: <Code className="w-4 h-4" />,
  },
  {
    id: "final-decision",
    name: "Check Complete",
    description: "VAR check complete with final decision",
    color: "from-green-500 to-emerald-500",
    icon: <Check className="w-4 h-4" />,
  },
]

export function ImageProcessingVisualizer() {
  const [activeStage, setActiveStage] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance stages every 3 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStage((prev) => (prev === processingStages.length - 1 ? 0 : prev + 1))
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30"></div>
      <div className="relative bg-black rounded-xl overflow-hidden">
        {/* Main visualization area */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          {/* Base image - always visible */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-500"
            style={{ opacity: activeStage === 0 ? 1 : 0 }}
          >
            <Image
              src="/images/offside.png"
              alt="Premier League match footage"
              fill
              className="object-cover"
            />
          </div>

          {/* Edge Detection Stage */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-500"
            style={{ opacity: activeStage === 1 ? 1 : 0 }}
          >
            <Image
              src="/images/slideshow_2.png"
              alt="Edge detection analysis"
              fill
              className="object-cover"
            />
          </div>

          {/* Processing overlays */}
          <div className="absolute inset-0 z-20">
            {/* Stage 2: Player Tracking */}
            <div
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: activeStage === 2 ? 1 : 0 }}
            >
              <div className="absolute inset-0 bg-black/90">
                <Image
                  src="/images/slideshow_3.png"
                  alt="Edge detection analysis"
                  fill
                  className=""
                />
              </div>

              {/* Player tracking boxes */}
              
            </div>

            {/* Stage 3: Offside Analysis */}
            <div
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: activeStage === 3 ? 1 : 0 }}
            >
              <div className="absolute inset-0 bg-black/90">
                <Image
                  src="/images/slideshow_4.png"
                  alt="Edge detection analysis"
                  fill
                  className=""
                />
              </div>

              {/* Offside line */}
             
            </div>

            {/* Stage 4: Final VAR Decision */}
            <div
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: activeStage === 4 ? 1 : 0 }}
            >
              <Image
                src="/images/slideshow_4_final.png"
                alt="VAR check complete"
                fill
                className="object-cover"
              />

              {/* VAR Decision Overlay */}
              
            </div>
          </div>

          {/* Processing stage indicator */}
          <div className="absolute top-4 left-4 z-30 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-md border border-purple-500/30 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <div className="text-xs text-white font-medium">
                Stage {activeStage + 1}: {processingStages[activeStage].name}
              </div>
            </div>
          </div>
        </div>

        {/* Stage indicators */}
        <div className="mt-4 p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-purple-500/20">
          <div className="flex items-center justify-between">
            {processingStages.map((stage, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-300 ${
                  activeStage === index
                    ? "scale-110 text-white"
                    : activeStage > index
                      ? "text-green-400"
                      : "text-gray-500"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    activeStage === index
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse"
                      : activeStage > index
                        ? "bg-green-900/50 border border-green-500"
                        : "bg-gray-900/50 border border-gray-700"
                  }`}
                >
                  {stage.icon}
                </div>
                <span className="text-xs font-medium text-center">{stage.name}</span>
                {activeStage === index && (
                  <div className="mt-1 flex space-x-1">
                    <span className="w-1 h-1 bg-white rounded-full animate-ping"></span>
                    <span className="w-1 h-1 bg-white rounded-full animate-ping animation-delay-300"></span>
                    <span className="w-1 h-1 bg-white rounded-full animate-ping animation-delay-600"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 