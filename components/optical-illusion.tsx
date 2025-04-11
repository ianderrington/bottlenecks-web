"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function OpticalIllusion() {
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

  // Create optical illusion pattern
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create optical illusion pattern
    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw alternating black and white circles
      const size = 20
      const offset = ((Date.now() / 1000) % 1) * size // Moving effect

      for (let x = -size; x < canvas.width + size; x += size) {
        for (let y = -size; y < canvas.height + size; y += size) {
          const distX = x - canvas.width / 2
          const distY = y - canvas.height / 2
          const dist = Math.sqrt(distX * distX + distY * distY)

          // Create a radial pattern
          const radius = size / 2 - 2
          const phase = Math.sin(dist / 20 - offset * 2) > 0

          ctx.fillStyle = phase ? "black" : "white"
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      requestAnimationFrame(drawPattern)
    }

    drawPattern()

    // Cleanup
    return () => {
      cancelAnimationFrame(0)
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
        <div className="absolute inset-0 flex items-center justify-center mix-blend-difference">
          <div className="relative h-[80vh] w-[80vh] max-w-full">
            <Image src="/images/bird.png" alt="Woodpecker illustration" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </div>
  )
}
