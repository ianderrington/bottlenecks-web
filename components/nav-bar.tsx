"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Contact", href: "#" },
]

export default function NavBar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="relative h-20 w-full">
      {/* Navigation Bar */}
      <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-center bg-white px-6">
        <ul className="flex space-x-12">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "relative text-lg font-medium text-neutral-700 transition-colors duration-300 hover:text-blue-900",
                  activeItem === item.label && "text-blue-900",
                )}
                onMouseEnter={() => setActiveItem(item.label)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Image Reveal Container */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-white/90"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative h-[70vh] w-[70vh] max-w-full"
            >
              <Image src="/images/bird.png" alt="Blue bird illustration" fill className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
