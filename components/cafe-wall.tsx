"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function CafeWall() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

  // Create Café Wall illusion
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Draw Café Wall illusion
    const drawCafeWall = () => {
      ctx.fillStyle = "#1e3a8a" // Match the blue-900 background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const tileSize = 30
      const rowHeight = tileSize
      const mortar = 4

      // Draw rows of alternating black and white tiles
      for (let y = 0; y < canvas.height; y += rowHeight + mortar) {
        // Alternate the offset for each row
        const offset = ((y / (rowHeight + mortar)) % 2) * (tileSize / 2)

        // Draw mortar (gray line)
        ctx.fillStyle = "#94a3b8" // slate-400
        ctx.fillRect(0, y - mortar / 2, canvas.width, mortar)

        // Draw tiles
        for (let x = -tileSize; x < canvas.width + tileSize; x += tileSize * 2) {
          ctx.fillStyle = "black"
          ctx.fillRect(x + offset, y, tileSize, rowHeight)

          ctx.fillStyle = "white"
          ctx.fillRect(x + tileSize + offset, y, tileSize, rowHeight)
        }
      }

      // Add a radial gradient overlay to enhance the effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )
      gradient.addColorStop(0, "rgba(30, 58, 138, 0)")
      gradient.addColorStop(1, "rgba(30, 58, 138, 0.3)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    drawCafeWall()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawCafeWall()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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
          <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg">Café Wall Illusion</h1>
          <p className="max-w-2xl text-center text-xl text-white drop-shadow-md">
            Move your cursor to reveal the optical illusion underneath.
          </p>
        </div>
      </div>

      {/* Optical illusion layer */}
      <div className="absolute inset-0 z-20">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Bird image with blend mode */}
        <div className="absolute inset-0 flex items-center justify-center mix-blend-difference">
          <div className="relative h-[80vh] w-[80vh] max-w-full">
            <Image src="/images/bird.png" alt="Woodpecker illustration" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </div>
  )
}
