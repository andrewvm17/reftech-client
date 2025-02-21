import "./globals.css"
import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import type React from "react" // Import React

 

const inter = Inter({ subsets: ["latin"] })

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata = {
  title: "ref-tech.app",
  description: "Simulate the Video Assisted Review experience",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceGrotesk.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

