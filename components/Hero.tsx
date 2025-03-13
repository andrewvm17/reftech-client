"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"
import { ImageProcessingVisualizer } from "@/components/ImageProcessingVisualizer"

const users = [
  { name: "Alex", image: "/placeholder.svg?height=32&width=32" },
  { name: "Ben", image: "/placeholder.svg?height=32&width=32" },
  { name: "Charlie", image: "/placeholder.svg?height=32&width=32" },
  { name: "David", image: "/placeholder.svg?height=32&width=32" },
]

export function Hero() {
  return (
    <section className="container px-4 pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">
              <Zap className="mr-1 h-3 w-3" />
              New: Semi-Automated Offside Detection
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Be Your Own
              <span className="block text-primary">VAR Operator</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you're a passionate fan or a professional referee, make and share accurate offside decisions with reftech.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/offsides">
                Try Now For Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">Watch Demo</Link>
            </Button>
          </div>
          <div className="mt-4 inline-flex items-center space-x-2 border border-muted-foreground px-2 py-1 rounded-md">
            <img src="/images/ussf_logo.png" alt="USSF Logo" className="h-6 w-auto" />
            <span className="text-sm text-muted-foreground">Created by a USSF certified referee</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-tight max-w-xs">
            Disclaimer: reftech.app is an independent product and is not affiliated with,
            endorsed, sponsored, or approved by the United States Soccer Federation (USSF).
            All opinions and analyses are solely those of reftech.app and its creators.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-8xl shadow-2xl lg:ml-auto"
        >
          <div className="relative h-full w-full rounded-lg bg-background">
            <ImageProcessingVisualizer />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

