import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { TechShowcase } from "@/components/TechShowcase"
import { Pricing } from "@/components/Pricing"
import { CTA } from "@/components/CTA"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TechShowcase />
        <Pricing />
        <CTA />
      </main>
    </div>
  )
}

