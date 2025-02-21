"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="container px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative rounded-3xl bg-gradient-to-b from-primary/20 to-primary/5 px-6 py-12 md:px-12 md:py-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Start Making Better Decisions Today</h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of fans and professionals using RefTechAI for accurate offside analysis.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/offsides">
              Try Now For Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

