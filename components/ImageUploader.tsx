"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StepCard } from "./StepCard"
import { ModeButton } from "./ModeButton"
import { Play, AlertCircle, Upload, Plus, Settings, Sparkles, Mic2, ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import AnimatedLines from "@/components/AnimatedLines"
import { SemiAutoVARDecisionCard } from "./SemiAutoVARDecisionCard"
import VARBorder from "@/components/VARBorder"


type Point = {
  x: number
  y: number
}

type Line = {
  x1: number
  y1: number
  x2: number
  y2: number
  slope: number | null
}

interface APIResponse {
  vanishing_point: { x: number; y: number }
}

interface VanishingPointResponse {
  x_van: number
  y_van: number
}

// We'll define a small array of bigger, more polished messages
const loadMessages = [
  "VAR CHECK IN PROGRESS -- POSSIBLE OFFSIDES!",
  
]

const ANIMATION_DURATION_MS = 6000

// Smooth fade & slight vertical movement
const fadeVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.8 } },
}

export function ImageUploader() {
  const [image, setImage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [vanishingPoint, setVanishingPoint] = useState<Point | null>(null)
  const [offsideLine, setOffsideLine] = useState<Line | null>(null)
  const [redLine, setRedLine] = useState<Line | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedMode, setSelectedMode] = useState<"manual" | "semi-automated" | null>(null)
  const [draggedEndpoint, setDraggedEndpoint] = useState<{
    lineIndex: number;
    endpoint: "start" | "end";
  } | null>(null)
  const [manualLines, setManualLines] = useState<Line[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  // For our custom "loading" animation
  const [loadStep, setLoadStep] = useState(0)

  // NEW: track direction chosen by user in step 4
  const [directionOfPlay, setDirectionOfPlay] = useState<"left" | "right" | null>(null)

  // NEW: Add userDecision state
  const [userDecision, setUserDecision] = useState<"offside" | "onside" | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      setUploadedFile(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string)
          setError(null)
        }
      }
      reader.readAsDataURL(file)
    },
    [],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  })

  const handleStartSemiAutomated = async () => {
    if (!uploadedFile) return
    
    setIsLoading(true)
    setLoadStep(0)
    setError(null)

    // Force a fixed animation period, e.g. 6s
    setTimeout(() => {
      // End animation & move to next step after it finishes
      setIsLoading(false)
      setCurrentStep(1)  // Moved here instead of inside try
    }, ANIMATION_DURATION_MS)

    const formData = new FormData()
    formData.append("image", uploadedFile)

    try {
      const response = await axios.post<APIResponse>(
        "https://thevarhub-api.onrender.com/get-vanishingpoint",
        formData
      )
      if (response.data?.vanishing_point) {
        const { x, y } = response.data.vanishing_point
        setVanishingPoint({ x, y })
        setOffsideLine({
          x1: x,
          y1: y,
          x2: x + 100,
          y2: y,
          slope: 0,
        })
        toast({
          title: "Image Analyzed",
          description: "Vanishing point detected. Adjust the blue line as needed.",
        })
      } else {
        throw new Error("Unexpected response format")
      }
    } catch (error) {
      setError("Failed to analyze the image. Please try again.")
      toast({
        title: "Error",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      })
    }

    // Do not call setIsLoading(false) or setCurrentStep(1) here;
    // we handle both inside the setTimeout above.
  }

  const handleReset = () => {
    setImage(null)
    setUploadedFile(null)
    setVanishingPoint(null)
    setOffsideLine(null)
    setRedLine(null)
    setError(null)
    setCurrentStep(0)
    setSelectedMode(null)
    setIsLoading(false)
    setUserDecision(null)
    setDirectionOfPlay(null)
  }

  const handleNextStep = async () => {
    if (selectedMode === "manual" && currentStep === 1) {
      if (manualLines.length < 2) {
        toast({
          title: "Not enough lines",
          description: "Please draw at least 2 lines to calculate the vanishing point.",
          variant: "destructive"
        })
        return
      }

      setIsLoading(true)
      try {
        const response = await axios.post<VanishingPointResponse>(
          "https://reftech-manual-api.onrender.com/vanishing-point",
          manualLines.map(line => ({
            ...line,
            slope: (line.y2 - line.y1) / (line.x2 - line.x1)  // Calculate slope for each line
          }))
        )

        if (response.data) {
          setVanishingPoint({
            x: response.data.x_van,
            y: response.data.y_van
          })
          
          // Remove manual lines after step 1 is done
          setManualLines([])

          // Draw a new line from the vanishing point to canvas center
          const canvas = canvasRef.current
          setOffsideLine({
            x1: response.data.x_van,
            y1: response.data.y_van,
            x2: response.data.x_van + 100,
            y2: response.data.y_van,
            slope: 0
          })

          toast({
            title: "Vanishing Point Calculated",
            description: "Vanishing point has been calculated from your calibration lines.",
          })

          setCurrentStep(2)
        }
      } catch (error) {
        console.error("Error calculating vanishing point:", error)
        toast({
          title: "Error",
          description: "Failed to calculate vanishing point. Please try again.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      if (currentStep < 5) {
        if (currentStep === 1) {
          setRedLine(offsideLine)
        }
        setCurrentStep((prev) => prev + 1)
      }
    }
  }

  const getButtonText = (step: number) => {
    if (selectedMode === "semi-automated" && step === 5) {
      return "Final Decision"
    }

    switch (step) {
      case 1:
        return "Next Step"
      case 2:
        return "Next Step"
      case 3:
        return "Next Step"
      
      default:
        return "Next Step"
    }
  }

  const getCurrentMode = (step: number) => {
    switch (step) {
      case 1:
        return { mode: "DRAWING LINES", color: "blue" }
      case 2:
        return { mode: "DRAWING LINES", color: "red" }
      case 3:
        return { mode: "DECISION REVIEW", color: "purple" }
      case 4:
        return { mode: "FINAL CHECK", color: "green" }
      case 5:
        return { mode: "COMPLETE", color: "teal" }
      default:
        return { mode: "LOADING...", color: "yellow" }
    }
  }

  const drawLineWithEndpoints = (
    ctx: CanvasRenderingContext2D,
    line: Line,
    color: string
  ) => {
    const { x1, y1, x2, y2 } = line
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    const endpointRadius = 6
    ctx.fillStyle = color

    ctx.beginPath()
    ctx.arc(x1, y1, endpointRadius, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(x2, y2, endpointRadius, 0, 2 * Math.PI)
    ctx.fill()
  }

  const drawExtendedLine = (ctx: CanvasRenderingContext2D, line: Line, color: string) => {
    const { x1, y1, x2, y2 } = line
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const canvas = ctx.canvas
    const lineLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)

    ctx.beginPath()
    ctx.moveTo(
      x1 - Math.cos(angle) * lineLength,
      y1 - Math.sin(angle) * lineLength
    )
    ctx.lineTo(
      x2 + Math.cos(angle) * lineLength,
      y2 + Math.sin(angle) * lineLength
    )
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.stroke()
  }

  const drawImageAndLines = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx || !image) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Draw manual lines in step 1
      if (selectedMode === "manual" && currentStep === 1) {
        manualLines.forEach(line => {
          drawLineWithEndpoints(ctx, line, "green")
        })
      }

      // Draw the offside line in step 2 (if it exists)
      if (selectedMode === "manual" && currentStep === 2 && offsideLine) {
        drawExtendedLine(ctx, offsideLine, "blue")
      }

      if (selectedMode === "manual") {
        // During step 2, draw the line from vanishing point to canvas center
        if (currentStep === 2 && offsideLine) {
          drawExtendedLine(ctx, offsideLine, "blue")
        }
      } else {
        if ((currentStep === 1 || currentStep >= 3) && offsideLine) {
          drawExtendedLine(ctx, offsideLine, "blue")
        }
        if ((currentStep === 2 || currentStep >= 3) && redLine) {
          drawExtendedLine(ctx, redLine, "red")
        }
      }

      // Once we've drawn lines, if we're at step 4 in semi-auto mode,
      // fill one side of offsideLine with grey depending on direction.
      if (selectedMode === "semi-automated" && (currentStep === 4 || currentStep === 3) && offsideLine) {
        ctx.save()
        ctx.beginPath()

        // We'll build a polygon that covers either the left or right side of the line.
        const offset = 5000 // Large offset to cover full canvas
        const dx = offsideLine.x2 - offsideLine.x1
        const dy = offsideLine.y2 - offsideLine.y1

        // Move along the offsideLine first
        ctx.moveTo(offsideLine.x1, offsideLine.y1)
        ctx.lineTo(offsideLine.x2, offsideLine.y2)

        // If the user selected left or right, flip which side gets covered
        if (directionOfPlay === "left") {
          ctx.lineTo(offsideLine.x2 - dy * offset, offsideLine.y2 + dx * offset)
          ctx.lineTo(offsideLine.x1 - dy * offset, offsideLine.y1 + dx * offset)
        } else if (directionOfPlay === "right") {
          ctx.lineTo(offsideLine.x2 + dy * offset, offsideLine.y2 - dx * offset)
          ctx.lineTo(offsideLine.x1 + dy * offset, offsideLine.y1 - dx * offset)
        }

        ctx.closePath()
        ctx.fillStyle = "rgba(128, 128, 128, 0.7)"
        ctx.fill()
        ctx.restore()
      }
    }
    img.src = image
  }, [image, offsideLine, redLine, currentStep, selectedMode, manualLines, directionOfPlay])

  useEffect(() => {
    if (image && canvasRef.current) {
      drawImageAndLines()
    }
  }, [image, offsideLine, redLine, currentStep, drawImageAndLines])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isLoading) {
      // Reset to the first message
      setLoadStep(0)
      interval = setInterval(() => {
        setLoadStep((prev) => {
          // Cycle every ~2 seconds
          if (prev < loadMessages.length - 1) {
            return prev + 1
          } else {
            return 0
          }
        })
      }, 2000)
    } else {
      // If not loading, ensure we clean up
      setLoadStep(0)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLoading])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedMode === "semi-automated" && currentStep >= 3) {
      return
    }

    if (selectedMode === "manual") {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = ((e.clientX - rect.left) * canvas.width) / rect.width
      const y = ((e.clientY - rect.top) * canvas.height) / rect.height

      const isNear = (px: number, py: number, radius = 10) => {
        return Math.hypot(px - x, py - y) <= radius
      }

      // Check all manual lines for nearby endpoints
      for (let i = 0; i < manualLines.length; i++) {
        const line = manualLines[i]
        if (isNear(line.x1, line.y1)) {
          setDraggedEndpoint({ lineIndex: i, endpoint: "start" })
          break
        } else if (isNear(line.x2, line.y2)) {
          setDraggedEndpoint({ lineIndex: i, endpoint: "end" })
          break
        }
      }
    }

    setIsDragging(true)
    handleMouseMove(e)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return

    if (selectedMode === "manual" && draggedEndpoint && currentStep === 1) {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = ((e.clientX - rect.left) * canvas.width) / rect.width
      const y = ((e.clientY - rect.top) * canvas.height) / rect.height

      setManualLines(prev => {
        return prev.map((line, index) => {
          if (index === draggedEndpoint.lineIndex) {
            return draggedEndpoint.endpoint === "start"
              ? { ...line, x1: x, y1: y }
              : { ...line, x2: x, y2: y }
          }
          return line
        })
      })
      return
    }

    if ((selectedMode === "semi-automated" && vanishingPoint) || (selectedMode === "manual" && currentStep === 2)) {
      const canvas = canvasRef.current
      
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const mouseX = ((e.clientX - rect.left) * canvas.width) / rect.width
      const mouseY = ((e.clientY - rect.top) * canvas.height) / rect.height

      if (currentStep === 1) {
        
        updateOffsideLine(mouseX, mouseY)
      } else if (currentStep === 2 && selectedMode === "semi-automated") {
        
        updateRedLine(mouseX, mouseY)
      } else if (currentStep === 2 && selectedMode === "manual") {
        updateOffsideLine(mouseX, mouseY)
        
      }
    }

    if (isDragging && selectedMode === "manual" && currentStep === 2 && draggedEndpoint) {
      if (!vanishingPoint || !offsideLine || !canvasRef.current) return
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      const mouseX = ((e.clientX - rect.left) * canvas.width) / rect.width
      const mouseY = ((e.clientY - rect.top) * canvas.height) / rect.height
      const dx = mouseX - vanishingPoint.x
      const dy = mouseY - vanishingPoint.y
      const angle = Math.atan2(dy, dx)
      const lineLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)

      setOffsideLine({
        ...offsideLine,
        x2: vanishingPoint.x + Math.cos(angle) * lineLength,
        y2: vanishingPoint.y + Math.sin(angle) * lineLength,
        slope: Math.tan(angle),
      })
    }
  }

  const updateOffsideLine = (mouseX: number, mouseY: number) => {
    if (!vanishingPoint || !offsideLine) return
    const canvas = canvasRef.current
    if (!canvas) return
    const dx = mouseX - vanishingPoint.x
    const dy = mouseY - vanishingPoint.y
    const angle = Math.atan2(dy, dx)
    const lineLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)

    setOffsideLine(prev => {
      if (!prev) return null
      return {
        ...prev,
        x2: vanishingPoint.x + Math.cos(angle) * lineLength,
        y2: vanishingPoint.y + Math.sin(angle) * lineLength,
        slope: Math.tan(angle),
      }
    })
  }

  const updateRedLine = (x: number, y: number) => {
    if (!vanishingPoint || !canvasRef.current) return
    const canvas = canvasRef.current
    const dx = x - vanishingPoint.x
    const dy = y - vanishingPoint.y
    const angle = Math.atan2(dy, dx)
    const lineLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)

    setRedLine((prev) => {
      if (!prev) return null
      return {
        ...prev,
        x2: vanishingPoint.x + Math.cos(angle) * lineLength,
        y2: vanishingPoint.y + Math.sin(angle) * lineLength,
        slope: Math.tan(angle),
      }
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDraggedEndpoint(null)
  }

  // NEW: Modify these direction handlers to jump straight to step 5
  const handleDirectionLeft = () => {
    setDirectionOfPlay("left")

    console.log('currentStep', currentStep)
    // Instead of currentStep + 1, jump directly to step 5
    //setCurrentStep(currentStep + 1)
  }

  const handleDirectionRight = () => {
    setDirectionOfPlay("right")
    console.log('currentStep', currentStep)
    // Instead of currentStep + 1, jump directly to step 5
    //setCurrentStep(currentStep + 1)
  }

  // NEW: A function to figure out if it's offside or onside:
  const handleFinalDecision = () => {
    if (!offsideLine || !redLine || !directionOfPlay) {
      return
    }

    // For simplicity, compare minimal x for each line
    // (or flip logic for directionOfPlay === 'right'):
    const defenderX = Math.min(offsideLine.x1, offsideLine.x2)
    const attackerX = Math.min(redLine.x1, redLine.x2)

    let isOffside = false
    if (directionOfPlay === "left") {
      // If attacker is further left (smaller x) than defender => offside
      isOffside = attackerX < defenderX
    } else {
      // If attacker is further right (bigger x) than defender => offside
      const defenderRight = Math.max(offsideLine.x1, offsideLine.x2)
      const attackerRight = Math.max(redLine.x1, redLine.x2)
      isOffside = attackerRight > defenderRight
    }

    // Keep the logic that sets userDecision so the decision card appears
    setUserDecision(isOffside ? "offside" : "onside")
  }

  // Finally, we style the "Final Decision" button specially if we're at step 5 in semi-auto:
  const isFinalDecisionStep =
    selectedMode === "semi-automated" && currentStep === 5

  return (
    <div className="flex min-h-screen pt-16">
      <main className="flex-1 p-6 space-y-4">
        
        <div className="flex items-center justify-between">
          <ModeButton {...getCurrentMode(currentStep)} showPulsingCircle />
          {selectedMode && (
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={!(selectedMode === "manual" && currentStep === 1)}
                onClick={() => {
                  const newLine: Line = {
                    x1: 120,
                    y1: 120,
                    x2: 320,
                    y2: 135,
                    slope: 0,
                  }
                  setManualLines((prev) => [...prev, newLine])
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                // Use a unique class to highlight final decision
                className={isFinalDecisionStep ? "bg-red-600 hover:bg-red-700 text-white" : ""}
                onClick={handleNextStep}
                disabled={selectedMode === "semi-automated" && currentStep === 4}
              >
                {getButtonText(currentStep)}
              </Button>
            </div>
          )}
        </div>

        <Card className="border shadow-lg">
          <CardContent className="p-0">
            {/* Dropzone interface (no image) */}
            {!image && !isLoading && !error && (
              <div
                {...getRootProps()}
                className={`relative aspect-video max-w-full flex flex-col items-center justify-center border-2
                  border-dashed rounded-xl transition-colors cursor-pointer ${
                    isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground"
                  }`}
              >
                <input {...getInputProps()} className="hidden" />
                <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold mb-2">Drag & drop here, or click to select</p>
                <p className="text-sm text-muted-foreground">JPG, PNG, GIF (max 10MB)</p>
              </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="relative aspect-video max-w-full flex flex-col items-center justify-center bg-background/80 backdrop-blur rounded-xl text-center p-8">
                <VARBorder />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={loadStep}
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={cn(
                      "flex flex-col items-center text-white relative z-10", 
                      loadStep === 0 ? "font-bold font-mono text-3xl" : "font-bold text-xl italic"
                    )}
                  >
                    
                    {loadStep > 0}
                    {loadMessages[loadStep]}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Error Overlay */}
            {error && (
              <div className="relative aspect-video max-w-full flex flex-col items-center justify-center bg-background/80 backdrop-blur rounded-xl text-center p-8">
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <p className="text-lg font-semibold text-destructive">{error}</p>
                <Button className="mt-4" onClick={handleReset}>
                  Try Again
                </Button>
              </div>
            )}

            {/* Gradient border only if an image is present */}
            {image && !isLoading && !error && (
              <div className="relative p-[3px] overflow-hidden rounded-xl aspect-video max-w-full">
                <div className="pointer-events-none absolute inset-0 
                                rounded-xl bg-gradient-to-r 
                                from-blue-500 via-purple-500 to-teal-500 
                                animate-gradient-bg" 
                />
                <div className="relative z-10 bg-background rounded-xl w-full h-full">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-pointer rounded-xl"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  />

                  {selectedMode === "semi-automated" && currentStep === 4 && userDecision && (
                    <SemiAutoVARDecisionCard decision={userDecision} />
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

      
      </main>
      <aside className="w-80 p-6 bg-background/50 backdrop-blur-sm border-l border-border/50 space-y-6">
        {!image && (
          <StepCard stepNumber={1} title="Upload Image" isActive={!image}>
            <p className="text-sm text-muted-foreground mb-4">
              Start by uploading an image of the offside situation.
            </p>
          </StepCard>
        )}

        {image && !selectedMode && (
          <>
            <StepCard
              icon={<Settings className="h-4 w-4" />}
              title="Manual VAR Mode"
             
              
            >
              <p className="text-sm text-muted-foreground mb-4">
                Human-guided line drawing for maximum accuracy. 
              </p>
              <Button
                variant="default"
                onClick={() => {
                  setSelectedMode("manual")
                  setManualLines([{
                    x1: 100,
                    y1: 100,
                    x2: 300,
                    y2: 115,
                    slope: 0
                  }])
                  setCurrentStep(0)
                  handleNextStep()
                }}
              >
                Try For Free
              </Button>
            </StepCard>
            <StepCard
              icon={<Sparkles className="h-4 w-4 animate-spin-slow text-yellow-400" />}
              title="Semi-Automated VAR"
              
              isActive
            >
              <p className="text-sm font-semibold mb-2">
                Get premium, AI-assisted offside detection for just <span className="text-yellow-200">$2.99/month</span>!
              </p>
              <p className="text-xs text-white/90 mb-4">
                Our AI offside algorithm uses modern computer vision techniques to save you time and draw lines for you.
              </p>
              <Button
                className="bg-black/70 hover:bg-black text-white px-6 py-3
                           font-bold rounded-lg transform transition-transform
                           hover:scale-105"
                onClick={async () => {
                  setSelectedMode("semi-automated")
                  await handleStartSemiAutomated()
                }}
              >
                Admin Test
              </Button>
            </StepCard>
          </>
        )}

        {image && selectedMode === "manual" && (
          <>
            {/* Center the Directions heading */}
            <h2 className="text-xl font-bold umb-4 text-center">Directions</h2>
            <StepCard
              stepNumber={1}
              title="Calibrate Field Lines"
              isActive={currentStep === 1}
              completed={currentStep > 1}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Draw a line along a known field marking. Drag the endpoints to position the line accurately.
              </p>
            </StepCard>
            <StepCard
              stepNumber={2}
              title="Vanishing Point Applied"
              isActive={currentStep === 2}
              completed={currentStep > 2}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Your calibration lines have been cleared from the image. The vanishing point is now available.
              </p>
            </StepCard>
            <StepCard
              stepNumber={3}
              title="Choose Direction of Play"
              isActive={currentStep === 3}
              completed={currentStep > 3}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Select the direction the play is moving:
              </p>
              <div className="flex gap-4">
                <Button variant="outline"  onClick={handleDirectionLeft} disabled={currentStep !== 3}>
                  <ArrowLeft className="mr-2" /> Left
                </Button>
                <Button variant="outline" onClick={handleDirectionRight} disabled={currentStep !== 3}>
                  Right <ArrowRight className="ml-2" />
                </Button>
              </div>
            </StepCard>
            <StepCard
              stepNumber={4}
              title="Filler Step"
              isActive={currentStep === 4}
            >
              <p className="text-sm text-muted-foreground mb-4">
                More functionalities coming soon...
              </p>
            </StepCard>
          </>
        )}

        {image && selectedMode === "semi-automated" && (
          <>
            {/* Center the Directions heading */}
            <h2 className="text-xl font-bold mb-4 text-center">Directions</h2>
            <StepCard
              stepNumber={1}
              title="Upload Image"
              isActive={!vanishingPoint}
              completed={!!vanishingPoint}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Waiting for or analyzing image...
              </p>
            </StepCard>
            <StepCard
              stepNumber={2}
              title="Adjust Blue Line"
              isActive={currentStep === 1}
              completed={currentStep > 1}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Mark the deepest defender with a blue line. Click & drag to reposition.
              </p>
            </StepCard>
            <StepCard
              stepNumber={3}
              title="Adjust Red Line"
              isActive={currentStep === 2}
              completed={currentStep > 2}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Mark the attacker with a red line. Click & drag to reposition.
              </p>
            </StepCard>
            <StepCard
              stepNumber={4}
              title="Choose Direction of Play"
              isActive={currentStep === 3}
              completed={currentStep > 3}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Select the direction the play is moving:
              </p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleDirectionLeft} disabled={currentStep !== 3}>
                  <ArrowLeft className="mr-2" /> Left
                </Button>
                <Button variant="outline" onClick={handleDirectionRight} disabled={currentStep !== 3}>
                  Right <ArrowRight className="ml-2" />
                </Button>
              </div>
            </StepCard>
            <StepCard
              stepNumber={5}
              title="Make The Call"
              isActive={currentStep === 4}
            >
              <div className="flex gap-4">
                <Button 
                  className="bg-red-600 text-white hover:bg-red-700" 
                  disabled={currentStep !== 4}
                  onClick={() => setUserDecision("offside")}
                >
                  OFFSIDE
                </Button>
                <Button 
                  className="bg-green-600 text-white hover:bg-green-700"
                  disabled={currentStep !== 4}
                  onClick={() => setUserDecision("onside")}
                >
                  ONSIDE
                </Button>
              </div>
            </StepCard>
          </>
        )}
      </aside>
    </div>
  )
}

