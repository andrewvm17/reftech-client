import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6 drop-shadow-[1px_4px_0_rgba(0,0,0,1)]">
        By Fans, For Fans. Be Your Own VAR Operator.
      </h1>
      <p className="text-xl mb-8">
        Join the debate, analyze decisions, and become the ultimate armchair referee with RefTechAI
      </p>
      <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
        <Link href="/offsides">Try Offside Analysis (BETA)</Link>
      </Button>
      <div className="mt-12">
        <img
          src="/images/vardemo.png?height=400&width=800"
          alt="RefTechAI in action"
          className="rounded-lg shadow-2xl mx-auto"
        />
        <p className="text-sm mt-2 text-gray-400">
          [Screenshot description: A split-screen view showing a controversial offside decision on the left and
          RefTechAI's analysis overlay on the right, demonstrating the precision of the tool.]
        </p>
      </div>
    </section>
  )
}