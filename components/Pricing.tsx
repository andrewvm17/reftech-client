"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "Free",
    features: [
      "Manual offside line drawing",
      "Basic image analysis",
      "Unlimited analyses",
      "Community access",
      "Basic support",
    ],
    cta: "Get Started",
    href: "/offsides",
  },
  {
    name: "Premium",
    description: "For serious analysts",
    price: "$9.99",
    features: [
      "Semi-automated line detection",
      "Branded screenshot exports",
      "Priority support",
      "Advanced image processing",
      "Social media sharing kit",
      "Early access to new features",
    ],
    featured: true,
    cta: "Upgrade Now",
    href: "/upgrade",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="container px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">
          Pricing
        </Badge>
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground">Start for free, upgrade for premium features.</p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className={`relative ${tier.featured ? "border-primary shadow-lg shadow-primary/20" : ""}`}>
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Free" && <span className="text-muted-foreground">/month</span>}
                </div>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={tier.featured ? "default" : "outline"}>
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

