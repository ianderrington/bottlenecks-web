"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ArrowDown,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Linkedin,
  PlusCircle,
  Podcast,
  Radio,
  FileText,
  Users,
} from "lucide-react"

// Main component
export default function BottlenecksHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [navPinned, setNavPinned] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("social")

  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const observatoryRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const focusAreasRef = useRef<HTMLDivElement>(null)
  const hostsRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const newPosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      setMousePosition(newPosition)
    }
  }

  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // Toggle navigation pinning
  const toggleNavPin = () => {
    setNavPinned(!navPinned)
    if (!navPinned) {
      setNavVisible(true)
    }
  }

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 2

      const sections = [
        { id: "home", ref: containerRef },
        { id: "about", ref: aboutRef },
        { id: "focus-areas", ref: focusAreasRef },
        { id: "hosts", ref: hostsRef },
        { id: "community", ref: communityRef },
        { id: "content", ref: contentRef },
        { id: "contact", ref: contactRef },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { id: "about", label: "About", ref: aboutRef },
    { id: "focus-areas", label: "Focus Areas", ref: focusAreasRef },
    { id: "hosts", label: "Hosts", ref: hostsRef },
    { id: "community", label: "Community", ref: communityRef },
    { id: "content", label: "Episodes & Blog", ref: contentRef },
    { id: "contact", label: "Contact", ref: contactRef },
  ]

  // Scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Hosts data
  const hosts = [
    {
      name: "Parnian Barekatain",
      role: "RL & SynBio",
      bio: "Parnian specializes in cosmology and the search for extraterrestrial intelligence. Her research focuses on cosmic bottlenecks to the emergence of life.",
      image: "/images/parnian-barekatain.png",
    },
    {
      name: "James Gray",
      role: "Cognitive Scientist & Host",
      bio: "James studies the limitations of human cognition and how we might overcome them through technology and novel thinking frameworks.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Ian Derrington",
      role: "AI Researcher & Host",
      bio: "Ian explores the boundaries of artificial intelligence and the philosophical implications of creating minds that transcend human limitations.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  // Episodes data
  const episodes = [
    {
      number: "01",
      title: "The Fermi Paradox",
      description:
        "Exploring why we haven't found extraterrestrial life despite the high probability of its existence.",
      duration: "58 min",
      date: "Jan 15, 2025",
    },
    {
      number: "02",
      title: "Consciousness as a Bottleneck",
      description: "Examining how our limited understanding of consciousness constrains scientific progress.",
      duration: "62 min",
      date: "Jan 29, 2025",
    },
    {
      number: "03",
      title: "Energy Transitions",
      description: "Analyzing the challenges in moving from fossil fuels to renewable energy sources.",
      duration: "55 min",
      date: "Feb 12, 2025",
    },
    {
      number: "04",
      title: "Longevity Escape Velocity",
      description: "Discussing the scientific and ethical implications of radical life extension.",
      duration: "67 min",
      date: "Feb 26, 2025",
    },
  ]

  // Blog posts data
  const blogPosts = [
    {
      title: "The Great Filter: Are We Past It?",
      excerpt: "Examining the concept of the Great Filter and humanity's position relative to this cosmic bottleneck.",
      author: "Parnian Barekata",
      date: "Mar 10, 2025",
      readTime: "8 min read",
    },
    {
      title: "Cognitive Limitations as Innovation Catalysts",
      excerpt: "How our mental constraints paradoxically drive creative problem-solving and technological advancement.",
      author: "James Gray",
      date: "Feb 28, 2025",
      readTime: "12 min read",
    },
    {
      title: "Bottlenecks in AI Development",
      excerpt: "Exploring the technical, ethical, and philosophical challenges in advancing artificial intelligence.",
      author: "Ian Derrington",
      date: "Feb 15, 2025",
      readTime: "10 min read",
    },
  ]

  // Focus areas data
  const focusAreas = [
    {
      title: "Imagination & Innovation",
      description: "Understanding constraints on creative thinking and how they limit innovative solutions.",
      questions: ["How do societal norms restrict our ability to innovate?"],
    },
    {
      title: "Talent & Skills",
      description: "Identifying and addressing gaps in skills and talent that hinder progress.",
      questions: ["Which critical skills are currently lacking, and why?"],
    },
    {
      title: "Cultural Bottlenecks",
      description: "Exploring how cultural attitudes shape the adoption and progression of technology.",
      questions: ["How do local traditions and generational views affect technology acceptance?"],
    },
    {
      title: "Technological Bottlenecks",
      description: "Investigating technical barriers slowing essential technological advancements.",
      questions: ["Which existing infrastructures inhibit innovation?"],
    },
    {
      title: "Economy & Market Dynamics",
      description: "Analyzing economic systems and market forces shaping innovation trajectories.",
      questions: ["How do market incentives influence technological development?"],
    },
    {
      title: "Regulatory Bottlenecks",
      description: "Assessing the influence of regulatory environments on innovation speed and feasibility.",
      questions: ["How do regulatory frameworks vary across regions and affect innovation?"],
    },
  ]

  // Connection tabs data
  const connectionTabs = [
    {
      id: "social",
      label: "Social",
      icon: <Users className="w-5 h-5" />,
      content: [
        { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "#" },
        { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "#" },
        { name: "Instagram", icon: <PlusCircle className="w-5 h-5" />, url: "#" },
      ],
    },
    {
      id: "podcasts",
      label: "Podcasts",
      icon: <Podcast className="w-5 h-5" />,
      content: [
        { name: "Apple Podcasts", icon: <Podcast className="w-5 h-5" />, url: "#" },
        { name: "Spotify", icon: <Radio className="w-5 h-5" />, url: "#" },
      ],
    },
    {
      id: "newsletter",
      label: "Newsletter",
      icon: <FileText className="w-5 h-5" />,
      content: [{ name: "Substack", icon: <FileText className="w-5 h-5" />, url: "#" }],
    },
    {
      id: "community",
      label: "Community",
      icon: <Users className="w-5 h-5" />,
      content: [{ name: "Discord", icon: <Users className="w-5 h-5" />, url: "#" }],
    },
  ]

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/observatory-background.png")' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video Call Component */}

        {/* Header */}
        <header
          className={`fixed top-0 z-40 flex w-full items-center justify-between px-10 py-4 transition-all duration-300 ${
            scrolled ? "bg-black/80 backdrop-blur-md" : ""
          }`}
        >
          <div ref={logoRef} className="flex items-center cursor-pointer">
            <div className="relative h-32 w-32">
              <Image
                src="/images/bottlenecks-logo-full.png"
                alt="Bottleneck Institute Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Horizontal navigation for larger screens - only visible when scrolled */}
          {scrolled && (
            <nav className="hidden lg:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className={`text-sm font-medium tracking-wide transition-colors hover:text-amber-400 ${
                        activeSection === item.id ? "text-amber-400" : "text-white"
                      }`}
                      onClick={() => item.ref && scrollToSection(item.ref)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Mobile menu button - only visible when scrolled */}
          {scrolled && (
            <button
              className="z-50 block lg:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </header>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
            >
              <nav>
                <ul className="flex flex-col items-center space-y-8">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`text-2xl tracking-wide transition-colors hover:text-amber-400 ${activeSection === item.id ? "text-amber-400" : "text-white"}`}
                        onClick={() => {
                          setMenuOpen(false)
                          if (item.action) {
                            item.action()
                          } else if (item.ref) {
                            scrollToSection(item.ref)
                          }
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main hero content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[60]">
          <div className="flex flex-col items-center text-center pointer-events-auto px-4">
            <motion.h1
              className="text-6xl font-bold tracking-tight md:text-8xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                textShadow:
                  "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000",
                letterSpacing: "0.05em",
              }}
            >
              BOTTLENECK INSTITUTE
            </motion.h1>
            <motion.div
              className="mt-10 w-full max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white text-black border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 flex-grow"
                />
                <button className="px-6 py-3 bg-white text-black border-2 border-black font-medium rounded-full hover:bg-amber-400 hover:border-amber-400 transition-colors whitespace-nowrap">
                  Sign Up
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - now always visible and black */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[60] flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-black font-medium text-sm mb-2">Scroll to explore</p>
          <ArrowDown className="text-black animate-bounce" size={24} />
        </motion.div>

        {/* Reveal layer (white) */}
        <div
          className="absolute inset-0 z-30 bg-white"
          style={{
            maskImage: isHovering
              ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
              : "none",
            WebkitMaskImage: isHovering
              ? `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, black 100%)`
              : "none",
          }}
        />

        {/* Hidden layer with observatory image */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white">
          <div ref={observatoryRef} className="relative h-[90vh] w-[90vh] max-w-full overflow-hidden rounded-full">
            <Image src="/images/observatory-image.png" alt="Observatory" fill className="object-cover" priority />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 px-6 md:px-10 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Bottleneck Institute</h2>
              <p className="text-lg text-white/80 mb-6">
                At Bottleneck Institute, we explore the hidden barriers causing stagnation across society, technology,
                and innovation. Understanding these bottlenecks enables us to create pathways toward a future of
                abundance, efficiency, and human flourishing.
              </p>
              <p className="text-lg text-white/80">
                We envision a world where humans live fulfilled lives, harmoniously coexisting with technology and
                nature. Our approach is practical, impartial, and driven by actionable insights from diverse
                perspectives.
              </p>
            </div>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
              <Image
                src="/images/observatory-background.png"
                alt="Bottleneck Institute"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section ref={focusAreasRef} className="py-24 px-6 md:px-10 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">Areas of Focus</h2>
          <p className="text-lg text-white/80 mb-12 text-center max-w-4xl mx-auto">
            Our goal is to identify inefficiencies and direct attention toward ideas with the greatest potential for
            transformative impact across these key areas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">{area.title}</h3>
                <p className="text-white/70 mb-6">{area.description}</p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-white/90 italic">{area.questions[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosts Section */}
      <section ref={hostsRef} className="py-24 px-6 md:px-10 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Our Hosts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hosts.map((host, index) => (
              <div
                key={index}
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-colors"
              >
                <div className="relative h-64 w-full">
                  <Image src={host.image || "/placeholder.svg"} alt={host.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-white">{host.name}</h3>
                  <p className="text-white/60 mb-4 text-sm">{host.role}</p>
                  <p className="text-white/70">{host.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect With Us Section - NEW SECTION FOR SOCIAL LINKS */}
      <section className="py-16 px-6 md:px-10 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">Connect With Us</h2>
          <p className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto">
            Follow us on social media, listen to our podcast, subscribe to our newsletter, or join our community to stay
            updated with the latest from Bottleneck Institute.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {connectionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  activeTab === tab.id ? "bg-white text-black font-medium" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {connectionTabs
              .find((tab) => tab.id === activeTab)
              ?.content.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white">{item.name}</h3>
                    <p className="text-white/60 text-sm">Follow us</p>
                  </div>
                  <div className="ml-auto">
                    <ArrowDown className="w-5 h-5 rotate-[-135deg] text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section ref={communityRef} className="py-24 px-6 md:px-10 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join The Movement</h2>
              <p className="text-lg text-white/80 mb-8">
                Engage with our community through insightful blogs, thought-provoking podcasts, and meaningful
                discussions. Together, we can uncover and dismantle the bottlenecks limiting our collective potential.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/80 transition-colors">
                  Join Discord
                </button>
                <button className="px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                  Forum Access
                </button>
                <button className="px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                  Events Calendar
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[400px] w-full rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent z-10"></div>
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Bottleneck Community"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Episodes & Blog Section */}
      <section ref={contentRef} className="py-24 px-6 md:px-10 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Episodes & Blog</h2>

          {/* Episodes */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-8 text-white">Latest Episodes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {episodes.slice(0, 2).map((episode, index) => (
                <div
                  key={index}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors flex"
                >
                  <div className="mr-6 flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-black font-bold text-xl">
                      {episode.number}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">{episode.title}</h4>
                    <p className="text-white/70 mb-4">{episode.description}</p>
                    <div className="flex items-center text-sm text-white/60">
                      <span>{episode.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{episode.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                View All Episodes
              </button>
            </div>
          </div>

          {/* Blog Posts */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-white">From Our Blog</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-colors"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={`/placeholder.svg?height=400&width=600&text=Blog+${index + 1}`}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2 text-white">{post.title}</h4>
                    <p className="text-white/70 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">{post.author}</span>
                      <span className="text-white/50">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                Read More Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 px-6 md:px-10 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
              <p className="text-lg text-white/80 mb-8">
                Have questions, suggestions, or want to collaborate? We'd love to hear from you.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="text-white mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-white/70">contact@bottleneckinstitute.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="text-white mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Location</h4>
                    <p className="text-white/70">1234 Cosmic Way, Universe City, CA 90210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-white mr-4 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Phone</h4>
                    <p className="text-white/70">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-white focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-white focus:outline-none"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-white focus:outline-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/80 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-10 bg-gradient-to-b from-black to-gray-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="relative h-16 w-16 mb-4">
                <Image
                  src="/images/bottlenecks-logo-full.png"
                  alt="Bottleneck Institute Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white/70 mb-6">
                Exploring barriers that shape our future and finding pathways to abundance, efficiency, and human
                flourishing.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <path d="M2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 11.2a5.5 5.5 0 0 1 8 0" />
                    <path d="M6 9.5a8 8 0 0 1 12 0" />
                    <path d="M10 13a3 3 0 0 1 4 0" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Focus Areas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Episodes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Subscribe</h4>
              <p className="text-white/70 mb-4">Stay updated with our latest episodes and articles.</p>
              <form className="space-y-4">
                <input
                  type="email"
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-white focus:outline-none"
                  placeholder="Your email address"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/80 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/50 mb-4 md:mb-0">© 2025 Bottleneck Institute. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
