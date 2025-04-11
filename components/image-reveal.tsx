"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"

export default function ImageReveal() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Handle mouse enter/leave
  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top layer (visible by default) */}
      <div
        className="absolute inset-0 z-30 bg-blue-900"
        style={{
          maskImage: isHovering
            ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
            : "none",
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
            : "none",
        }}
      >
        {/* Navigation Bar */}
        <nav className="absolute top-0 z-10 flex h-20 w-full items-center justify-center px-6">
          <ul className="flex space-x-12">
            {["Home", "About", "Projects", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-lg font-medium text-white transition-colors duration-300 hover:text-blue-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8">
          <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg">Hover to Reveal</h1>
          <p className="max-w-2xl text-center text-xl text-white drop-shadow-md">
            Move your cursor around the page to reveal what's underneath.
          </p>
        </div>
      </div>

      {/* Bottom layer with image (revealed on hover) */}
      <div className="absolute inset-0 z-20 bg-blue-900 flex items-center justify-center">
        <div className="relative h-[80vh] w-[80vh] max-w-full">
          <Image src="/images/bird.png" alt="Woodpecker illustration" fill className="object-contain" priority />
        </div>
      </div>
    </div>
  )
}
