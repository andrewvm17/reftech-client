"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { calculateRelativePosition, calculateAbsolutePosition } from "@/utils/canvas-utils"

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

interface ManualCanvasProps {
  imageDataUrl: string
  isLocked: boolean
  onLinesLocked?: (lines: Line[]) => void
}

export function ManualCanvas({
  imageDataUrl,
  isLocked,
  onLinesLocked,
}: ManualCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })
  
  // Store lines in normalized coordinates (0-1) instead of absolute pixels
  const [lines, setLines] = useState<Line[]>([
    // Two sample lines in normalized coordinates
    { x1: 0.3, y1: 0.2, x2: 0.6, y2: 0.5, slope: null },
    { x1: 0.4, y1: 0.4, x2: 0.7, y2: 0.7, slope: null },
  ])

  const [dragging, setDragging] = useState<{
    lineIndex: number
    endpoint: "start" | "end"
  } | null>(null)

  // Load the image and set canvas dimensions
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      imageRef.current = img
      
      const canvas = canvasRef.current
      if (canvas) {
        // Set canvas dimensions based on the container size
        const container = canvas.parentElement
        if (container) {
          const containerWidth = container.clientWidth
          const containerHeight = container.clientHeight || (containerWidth * (img.height / img.width))
          
          // Set the canvas dimensions to match the container
          canvas.width = containerWidth
          canvas.height = containerHeight
          
          setCanvasDimensions({
            width: containerWidth,
            height: containerHeight
          })
          
          // Redraw after setting dimensions
          draw()
        }
      }
    }
    img.src = imageDataUrl
  }, [imageDataUrl])

  // Re-draw canvas whenever lines or lock state changes
  useEffect(() => {
    draw()
  }, [lines, isLocked, canvasDimensions])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw the image to fill the canvas
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)

    // Draw lines using the normalized coordinates converted to canvas pixels
    lines.forEach((line) => {
      // Convert normalized coordinates to canvas pixels
      const startPoint = calculateAbsolutePosition(
        { x: line.x1, y: line.y1 },
        canvas.width,
        canvas.height
      )
      
      const endPoint = calculateAbsolutePosition(
        { x: line.x2, y: line.y2 },
        canvas.width,
        canvas.height
      )
      
      if (!isLocked) {
        // Draw normal green lines
        drawLine(ctx, 
          { x1: startPoint.x, y1: startPoint.y, x2: endPoint.x, y2: endPoint.y, slope: line.slope }, 
          "green", 
          2
        )
        drawHandle(ctx, startPoint.x, startPoint.y)
        drawHandle(ctx, endPoint.x, endPoint.y)
      } else {
        // Draw locked lines - thick, dashed
        ctx.setLineDash([8, 5])
        drawLine(ctx, 
          { x1: startPoint.x, y1: startPoint.y, x2: endPoint.x, y2: endPoint.y, slope: line.slope }, 
          "#00ff00", 
          5
        )
        ctx.setLineDash([])
      }
    })
  }, [lines, isLocked, canvasDimensions])

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    line: Line,
    color: string,
    lineWidth: number
  ) => {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(line.x1, line.y1)
    ctx.lineTo(line.x2, line.y2)
    ctx.stroke()
  }

  const drawHandle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.strokeStyle = "#333333"
    ctx.stroke()
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isLocked) return
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Convert to normalized coordinates (0-1)
    const normalizedPosition = calculateRelativePosition(
      { x: mouseX, y: mouseY },
      canvas.width,
      canvas.height
    )

    // Check if user clicked near an endpoint
    const radius = 15 / Math.max(canvas.width, canvas.height) // Normalize the radius too
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (distance(normalizedPosition.x, normalizedPosition.y, line.x1, line.y1) < radius) {
        setDragging({ lineIndex: i, endpoint: "start" })
        return
      } else if (distance(normalizedPosition.x, normalizedPosition.y, line.x2, line.y2) < radius) {
        setDragging({ lineIndex: i, endpoint: "end" })
        return
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging || isLocked) return
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Convert to normalized coordinates (0-1)
    const normalizedPosition = calculateRelativePosition(
      { x: mouseX, y: mouseY },
      canvas.width,
      canvas.height
    )

    setLines((prev) => {
      const newLines = [...prev]
      const line = { ...newLines[dragging.lineIndex] }
      if (dragging.endpoint === "start") {
        line.x1 = normalizedPosition.x
        line.y1 = normalizedPosition.y
      } else {
        line.x2 = normalizedPosition.x
        line.y2 = normalizedPosition.y
      }
      newLines[dragging.lineIndex] = line
      return newLines
    })
  }

  const handleMouseUp = () => {
    setDragging(null)
  }

  const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  }

  // Function to finalize or "lock" lines
  const lockLines = useCallback(() => {
    if (onLinesLocked) onLinesLocked(lines)
  }, [lines, onLinesLocked])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-crosshair"
      />
    </div>
  )
} 