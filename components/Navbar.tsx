"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "./Logo"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
import LoginLogoutButton from "./LoginLogoutButton"
import UserGreetText from "./UserGreetText"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="flex h-16 items-center justify-between px-4">
        <Logo />

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="hidden md:flex items-center gap-6 text-lg">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 font-medium">
              Reftech VAR <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/offsides">Offsides</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/howitworks" className="font-medium">
            How It Works
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <LoginLogoutButton />
        </div>
        
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/90 border-t border-border/50 py-4">
          <div className="flex flex-col items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-medium">
                Reftech VAR <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/offsides">Offsides</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/howitworks" className="font-medium">
              How It Works
            </Link>
            <div className="flex flex-col gap-2">
              <LoginLogoutButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

