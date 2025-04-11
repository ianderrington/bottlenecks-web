"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo } from "react"
import * as THREE from "three"

// Shader for the interactive visualization
const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 mouse;
  varying vec2 vUv;

  // Classic 2D noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Create a grid pattern
    float gridSize = 20.0;
    vec2 grid = fract(uv * gridSize);
    float gridLine = step(0.95, max(grid.x, grid.y));
    
    // Create a noise pattern
    float n = snoise(uv * 3.0 + time * 0.05);
    
    // Create concentric circles
    float dist = length(uv - 0.5) * 2.0;
    float circles = abs(sin(dist * 10.0 - time * 0.2));
    circles = smoothstep(0.5, 0.6, circles);
    
    // Mouse interaction - create a subtle distortion around mouse position
    vec2 mouseUV = mouse / resolution;
    float mouseDist = length(uv - mouseUV);
    float mouseInfluence = smoothstep(0.3, 0.0, mouseDist);
    
    // Combine effects
    float pattern = mix(
      mix(n, circles, 0.5),
      gridLine,
      0.2
    );
    
    // Apply mouse distortion
    pattern = mix(pattern, 1.0 - pattern, mouseInfluence * 0.5);
    
    // Color mapping
    vec3 color1 = vec3(0.1, 0.2, 0.4); // Dark blue
    vec3 color2 = vec3(0.7, 0.8, 1.0); // Light blue
    vec3 color = mix(color1, color2, pattern);
    
    // Add a subtle glow around mouse
    color += vec3(0.1, 0.2, 0.5) * mouseInfluence;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// WebGL visualization component
function WebGLVisualization({ mousePosition }) {
  const mesh = useRef<THREE.Mesh>(null)
  const { size } = useThree()

  // Create shader uniforms
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(size.width, size.height) },
      mouse: { value: new THREE.Vector2(mousePosition.x, mousePosition.y) },
    }),
    [size, mousePosition],
  )

  // Update uniforms on each frame
  useFrame((state) => {
    if (mesh.current) {
      uniforms.time.value = state.clock.getElapsedTime()
      uniforms.mouse.value.set(mousePosition.x, size.height - mousePosition.y)
    }
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
    </mesh>
  )
}

export default function WebGLReveal() {
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
          <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-lg">WebGL Visualization</h1>
          <p className="max-w-2xl text-center text-xl text-white drop-shadow-md">
            Move your cursor to reveal the interactive WebGL visualization.
          </p>
        </div>
      </div>

      {/* WebGL visualization layer */}
      <div className="absolute inset-0 z-20">
        <Canvas className="h-full w-full">
          <WebGLVisualization mousePosition={mousePosition} />
        </Canvas>

        {/* Bird image with blend mode */}
        <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay pointer-events-none">
          <div className="relative h-[80vh] w-[80vh] max-w-full">
            <Image src="/images/bird.png" alt="Woodpecker illustration" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </div>
  )
}
