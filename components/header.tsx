"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link" // Import Link for client-side navigation

export function Header() {
  const landingNavItems = [
    { name: "SDK", href: "/sdk" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Consent", href: "/consent" },
    { name: "Tokenomics", href: "/tokenomics" },
    { name: "Recommendations", href: "/recommendations" },
    { name: "Policies", href: "/policies" },
    { name: "Docs", href: "/docs" },
    { name: "Contracts", href: "/contracts" },
  ]
  
  const appNavItems = [
    { name: "SDK", href: "/sdk" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Consent", href: "/consent" },
    { name: "Tokenomics", href: "/tokenomics" },
    { name: "Recommendations", href: "/recommendations" },
    { name: "Policies", href: "/policies" },
    { name: "Docs", href: "/docs" },
    { name: "Contracts", href: "/contracts" },
  ]
  
  // Determine if we're on the landing page or app pages
  const isLandingPage = typeof window !== "undefined" && window.location.pathname === "/"
  const navItems = isLandingPage ? landingNavItems : appNavItems

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only apply smooth scrolling to landing page section links (starting with #)
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1) // Remove '#' from href
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-foreground text-xl font-semibold hover:text-primary transition-colors">
              🚀 Lightning Protocol
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)} // Add onClick handler
                className="text-[#888888] hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-background border-t border-border text-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-xl font-semibold text-foreground">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)} // Add onClick handler
                    className="text-[#888888] hover:text-foreground justify-start text-lg py-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/dashboard" className="w-full mt-4">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full font-medium shadow-sm">
                    Start Earning
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
