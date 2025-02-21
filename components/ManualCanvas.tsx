"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

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

  // Example: Keep an array of lines in local state
  const [lines, setLines] = useState<Line[]>([
    // Two sample lines
    { x1: 200, y1: 100, x2: 350, y2: 250, slope: null },
    { x1: 250, y1: 200, x2: 400, y2: 350, slope: null },
  ])

  const [dragging, setDragging] = useState<{
    lineIndex: number
    endpoint: "start" | "end"
  } | null>(null)

  // Re-draw canvas whenever image or lines change
  useEffect(() => {
    draw()
  }, [imageDataUrl, lines, isLocked])

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      // REMOVE or comment out these two lines that force the canvas
      // to the image's exact dimensions:
      // canvas.width = img.width
      // canvas.height = img.height

      // Instead, draw the image so it fills our already "w-full h-full" canvas:
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Draw lines
      lines.forEach((line) => {
        if (!isLocked) {
          // normal green lines
          drawLine(ctx, line, "green", 2)
          drawHandle(ctx, line.x1, line.y1)
          drawHandle(ctx, line.x2, line.y2)
        } else {
          // locked lines - thick, maybe dashed?
          ctx.setLineDash([8, 5])
          drawLine(ctx, line, "#00ff00", 5)
          ctx.setLineDash([])
        }
      })
    }
    img.src = imageDataUrl
  }

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
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    // check if user clicked near an endpoint
    const radius = 15
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (distance(x, y, line.x1, line.y1) < radius) {
        setDragging({ lineIndex: i, endpoint: "start" })
        return
      } else if (distance(x, y, line.x2, line.y2) < radius) {
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
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    setLines((prev) => {
      const newLines = [...prev]
      const line = { ...newLines[dragging.lineIndex] }
      if (dragging.endpoint === "start") {
        line.x1 = x
        line.y1 = y
      } else {
        line.x2 = x
        line.y2 = y
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

  // Example function to finalize or "lock" lines
  const lockLines = useCallback(() => {
    if (onLinesLocked) onLinesLocked(lines)
  }, [lines, onLinesLocked])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-crosshair"
      />
      {/* Example button that locks lines */}
      {/* <Button onClick={lockLines}>Lock Lines</Button> */}
    </div>
  )
} 