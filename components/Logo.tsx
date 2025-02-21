import Link from "next/link"
import { Monitor, Sparkles } from "lucide-react"

export function Logo2() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative">
        <Monitor className="w-8 h-8 text-primary" />
        <Sparkles className="w-4 h-4 text-primary absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[68%]" />
      </div>
      <span className="text-xl font-bold font-space-grotesk">reftech</span>
      <span className="italic text-sm text-gray-400 ml-1">v1</span>
    </Link>
  )
}

 // Start Generation Here
 export function Logo() {
   return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="font-orbitron text-2xl font-bold tracking-wide">
        reftech
      </span>
    </Link>
   )
 }
