import "./globals.css"
import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import type React from "react" // Import React

 

const inter = Inter({ subsets: ["latin"] })

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata = {
  title: "reftech.app | Football Offside Analysis Tool",
  description: "Analyze offside decisions like a professional VAR operator. Free football offside analysis tool for fans, coaches, and referees.",
  keywords: ["football", "soccer", "VAR", "offside", "offside tool", "analysis", "referee", "decision", "VAR analysis", "VAR tool", "VAR analysis tool", "VAR analysis tool for football", "VAR analysis tool for soccer", "VAR analysis tool for referees", "VAR analysis tool for coaches", "VAR analysis tool for fans", "premier league", "football analysis", "football tool", "football offside analysis", "football offside tool", "football offside analysis tool", "football offside tool", "football offside analysis tool", "football offside tool"],
  authors: [{ name: "reftech.app" }],
  openGraph: {
    title: "reftech.app | Football Offside Analysis Tool",
    description: "Analyze offside decisions like a professional VAR operator",
    url: "https://www.reftech.app",
    siteName: "reftech.app",
    //images: [
      //{
      //  url: "/images/og-image.png", // Create this image (1200x630px recommended)
      //  width: 1200,
      //  height: 630,
      //  alt: "reftech.app offside analysis tool",
      //},
    //],
    locale: "en_US",
    type: "website",
  },
  //twitter: {
  //  card: "summary_large_image",
  //  title: "reftech.app | Football Offside Analysis Tool",
  //  description: "Analyze offside decisions like a professional VAR operator",
  //  images: ["/images/twitter-image.png"], // Create this image (1200x600px recommended)
  //},
  icons: {
    icon: [
      { url: "../public/favico.ico" },
      //{ url: "/icon.png", type: "image/png" },
    ],
    //apple: [
      //{ url: "/apple-icon.png", type: "image/png" },
    //],
  },
  //manifest: "/site.webmanifest", // Create this file with your site info
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

