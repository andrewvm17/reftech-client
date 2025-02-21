"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Timer, Share2, Sparkles, Award, Download } from "lucide-react"

const features = [
  {
    title: "No expensive cameras required",
    description: "Works with any standard football broadcast.",
    icon: Zap,
    badge: "Pro",
  },
  {
    title: "Instant offside analysis",
    description: "No need to wait for referees to make a call.",
    icon: Zap,
    badge: "Pro",
  },
  {
    title: "Perfect for debates & content creation",
    description: "Football influencers can use our tool to break down plays.",
    icon: Zap,
    badge: "Pro",
  },
  {
    title: "Professional accuracy",
    description: "Uses the same mathematical models as real VAR systems.",
    icon: Zap,
    badge: "Pro",
  },
  {
    title: "Affordable & easy to use",
    description: "No need for technical knowledge.",
    icon: Zap,
    badge: "Pro",
  },
]

export function Features() {
  return (
    <section id="features" className="container px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Everything You Need for VAR Analysis</h2>
        <p className="text-muted-foreground">
          Professional-grade tools for everyone - from passionate fans to professional referees.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="group relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent transition-all group-hover:translate-x-full" />
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <Badge>{feature.badge}</Badge>
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

