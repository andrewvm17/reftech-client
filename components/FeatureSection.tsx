import { CheckCircle, Share2, Zap } from "lucide-react"

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-purple-400" />,
    title: "Precise Analysis",
    description: "Get frame-perfect offside line detection powered by advanced AI technology.",
  },
  {
    icon: <Share2 className="h-8 w-8 text-purple-400" />,
    title: "Share Your Verdict",
    description: "Easily share your analysis on social media and fuel the debate.",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-400" />,
    title: "Lightning Fast",
    description: "Get results in seconds, perfect for live match discussions and post-game analysis.",
  },
]

export function FeatureSection() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose RefTechAI?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

