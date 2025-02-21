"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TechShowcase() {
  return (
    <section className="container px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">
          Technology
        </Badge>
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">State-of-the-Art VAR Technology</h2>
        <p className="text-muted-foreground">
          Our system uses advanced computer vision and AI to provide accurate offside analysis in seconds.
        </p>
      </div>
      <div className="mt-16">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video w-full bg-primary/10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative h-full w-full"
              >
                {/* Replace this with an actual GIF/video of the software in action */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-lg font-semibold text-muted-foreground">Demo Video/GIF Placeholder</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/95 p-4 backdrop-blur">
                  <p className="text-sm font-medium">Watch reftech in action: Semi-automated offside detection</p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

