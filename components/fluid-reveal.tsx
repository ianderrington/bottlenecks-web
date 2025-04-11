"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function FluidReveal() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<SVGSVGElement>(null)

  // Handle mouse movement with some smoothing
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

  // Update the SVG filter on mouse move for fluid effect
  useEffect(() => {
    if (blobRef.current && isHovering) {
      blobRef.current.style.setProperty("--mouse-x", `${mousePosition.x}px`)
      blobRef.current.style.setProperty("--mouse-y", `${mousePosition.y}px`)
    }
  }, [mousePosition, isHovering])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Bar */}
      <nav className="absolute top-0 z-50 flex h-20 w-full items-center justify-center px-6">
        <ul className="flex space-x-12">
          {["Home", "About", "Projects", "Gallery", "Contact"].map((item) => (
            <li key={item}>
              <a href="#" className="text-lg font-medium text-white transition-colors duration-300 hover:text-blue-200">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content overlay */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8">
        <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg">Fluid Reveal</h1>
        <p className="max-w-2xl text-center text-xl text-white drop-shadow-md">
          Move your cursor around to reveal the image with a fluid effect.
        </p>
      </div>

      {/* SVG Filter for Blob Effect */}
      <svg ref={blobRef} className="absolute -left-[9999px] h-0 w-0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="blob"
            />
            <feComposite in="SourceGraphic" in2="blob" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Dark overlay with fluid reveal hole */}
      <div
        className="absolute inset-0 z-20 bg-blue-950 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          maskImage: isHovering
            ? `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 30%, black 70%), 
               radial-gradient(circle 120px at ${mousePosition.x + 30}px ${mousePosition.y - 20}px, transparent 0%, transparent 30%, black 70%), 
               radial-gradient(circle 100px at ${mousePosition.x - 20}px ${mousePosition.y + 30}px, transparent 0%, transparent 30%, black 70%)`
            : "none",
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 30%, black 70%), 
               radial-gradient(circle 120px at ${mousePosition.x + 30}px ${mousePosition.y - 20}px, transparent 0%, transparent 30%, black 70%), 
               radial-gradient(circle 100px at ${mousePosition.x - 20}px ${mousePosition.y + 30}px, transparent 0%, transparent 30%, black 70%)`
            : "none",
          WebkitMaskComposite: "source-in",
          maskComposite: "source-in",
        }}
      />

      {/* Fluid blob reveal */}
      <motion.div
        className="pointer-events-none absolute z-20"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.1,
        }}
        style={{
          width: 300,
          height: 300,
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          background: "transparent",
          opacity: isHovering ? 1 : 0,
          filter: "url(#blob)",
          WebkitMaskImage: "linear-gradient(black, black)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Hidden image */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-full w-full">
          <Image src="/images/bird.png" alt="Blue bird illustration" fill className="object-contain" priority />
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-blue-900" />
    </div>
  )
}
