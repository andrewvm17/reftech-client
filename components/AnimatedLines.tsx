"use client"

import { motion } from "framer-motion"

// A helper component to render animated paths
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 5 * position}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <>
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="white"
          strokeWidth={path.width}
          strokeOpacity={0.1 + path.id * 0.03}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </>
  )
}

// This component renders the animated white lines within an absolutely positioned SVG.
export default function AnimatedLines() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        <title>Animated Lines</title>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </svg>
    </div>
  )
} 