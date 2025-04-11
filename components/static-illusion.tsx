"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function StaticIllusion() {
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

  // Create static optical illusion pattern
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Draw static optical illusion pattern
    const drawIllusion = () => {
      ctx.fillStyle = "#1e3a8a" // Match the blue-900 background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create a grid illusion (Hermann grid)
      const gridSize = 40
      const dotSize = 4

      // Draw white grid
      ctx.fillStyle = "white"
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          // Draw grid lines
          ctx.fillRect(x - 1, 0, 2, canvas.height)
          ctx.fillRect(0, y - 1, canvas.width, 2)
        }
      }

      // Draw black dots at intersections (creates the illusion)
      ctx.fillStyle = "black"
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize)
        }
      }

      // Add concentric circles for another illusion effect
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4

      for (let radius = maxRadius; radius > 0; radius -= 15) {
        // Alternate colors
        ctx.strokeStyle = radius % 30 === 0 ? "white" : "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    drawIllusion()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawIllusion()
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
          <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg">Optical Illusion</h1>
          <p className="max-w-2xl text-center text-xl text-white drop-shadow-md">
            Move your cursor to reveal the optical illusion underneath.
          </p>
        </div>
      </div>

      {/* Optical illusion layer */}
      <div className="absolute inset-0 z-20">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Bird image with blend mode */}
        <div className="absolute inset-0 flex items-center justify-center mix-blend-exclusion">
          <div className="relative h-[80vh] w-[80vh] max-w-full">
            <Image src="/images/bird.png" alt="Woodpecker illustration" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </div>
  )
}
