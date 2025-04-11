"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function SpiralReveal() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spiralRef = useRef<HTMLDivElement>(null)

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

  // Generate spiral SVG path
  const generateSpiralPath = () => {
    const turns = 3 // Number of spiral turns
    const pointCount = 100 // Number of points to create the spiral
    const maxRadius = 150 // Maximum radius of the spiral

    let path = ""

    for (let i = 0; i <= pointCount; i++) {
      const t = i / pointCount
      const angle = turns * 2 * Math.PI * t
      const radius = maxRadius * t
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)

      if (i === 0) {
        path += `M ${x} ${y} `
      } else {
        path += `L ${x} ${y} `
      }
    }

    return path
  }

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* SVG Mask for Spiral */}
      <svg className="absolute -left-[9999px]">
        <defs>
          <mask id="spiralMask">
            <rect width="100%" height="100%" fill="black" />
            <g transform={`translate(${mousePosition.x}, ${mousePosition.y})`}>
              <path d={generateSpiralPath()} fill="white" transform="rotate(0)">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </mask>
        </defs>
      </svg>

      {/* Top layer (visible by default) */}
      <div
        className="absolute inset-0 z-30 bg-blue-900"
        style={{
          mask: isHovering ? "url(#spiralMask)" : "none",
          WebkitMask: isHovering ? "url(#spiralMask)" : "none",
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
          <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg">Spiral Reveal</h1>
          <p className="max-w-2xl text-center text-xl text-white drop-shadow-md">
            Move your cursor to reveal the optical illusion through a spiral.
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
