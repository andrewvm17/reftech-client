import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Become the Ultimate VAR Analyst?</h2>
      <p className="text-xl mb-8">Join the RefTechAI community and revolutionize your football watching experience.</p>
      <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
        <Link href="/offsides">Start Your Analysis Now</Link>
      </Button>
    </section>
  )
}

