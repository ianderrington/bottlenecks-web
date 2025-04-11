"use client"

import { useEffect, useRef, useState } from "react"

interface DailyCallFrame {
  join: (options: { url: string }) => void
  destroy: () => void
}

declare global {
  interface Window {
    DailyIframe: {
      createFrame: (options?: any) => DailyCallFrame
    }
  }
}

export default function VideoCall() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const callFrameRef = useRef<DailyCallFrame | null>(null)

  // Load the Daily.co script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@daily-co/daily-js"
    script.crossOrigin = "anonymous"
    script.async = true
    script.onload = () => setIsScriptLoaded(true)

    document.body.appendChild(script)

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script)
    }
  }, [])

  // Initialize the call frame once the script is loaded
  useEffect(() => {
    if (isScriptLoaded && window.DailyIframe && !callFrameRef.current) {
      callFrameRef.current = window.DailyIframe.createFrame({
        showLeaveButton: true,
        iframeStyle: {
          position: "fixed",
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 100,
        },
      })

      callFrameRef.current.join({ url: "https://theorb.daily.co/hello-daily" })
    }

    return () => {
      // Clean up the call frame when component unmounts
      if (callFrameRef.current) {
        callFrameRef.current.destroy()
      }
    }
  }, [isScriptLoaded])

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
        {!isScriptLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <p className="text-white text-xl">Loading video call...</p>
          </div>
        )}
        {/* The Daily.co iframe will be inserted here by their library */}
      </div>
    </div>
  )
}
