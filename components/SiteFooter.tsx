"use client"

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 space-y-1">
          <p className="text-sm">
            © 2025 reftech.app. All rights reserved.
          </p>
          <p className="text-sm">
           reftech.app is an independent product and is not affiliated with or endorsed by the USSF, FIFA, UEFA, or any other soccer organization.
          </p>
        </div>
        <div className="flex flex-wrap justify-center space-x-4">
          <Link href="/offsides" className="hover:underline">
            Offsides
          </Link>
          <Link href="/howitworks" className="hover:underline">
            How It Works
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/premium" className="hover:underline">
            Premium
          </Link>
        </div>
      </div>
    </footer>
  )
} 