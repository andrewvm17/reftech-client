import "./globals.css"
import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import type React from "react" // Import React
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "reftech.app | Football Offside VAR Tool",
  description: "Analyze offside decisions like a professional VAR operator with our free football offside analysis tool. Make accurate calls just like VAR officials.",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { 
        rel: "mask-icon", 
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5"
      },
    ],
  },
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add canonical URL */}
        <link rel="canonical" href="https://www.reftech.app" />
        
        {/* Direct favicon links with explicit sizes */}
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Additional meta tags for PWA and mobile */}
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Add structured data for better indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "reftech.app",
              "description": "Football offside analysis tool for fans, coaches, and referees",
              "applicationCategory": "SportsApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.className}`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

