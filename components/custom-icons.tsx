import type React from "react"

interface IconProps {
  size?: number
  className?: string
}

export const ApplePodcast: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a10 10 0 0 0-10 10c0 .5 0 1 .1 1.5 1.4 1.4 2.9 2 4.9 2 2 0 3.5-.6 4.9-2 .1-.5.1-1 .1-1.5a10 10 0 0 0-10-10Z" />
      <path d="M12 6a6 6 0 0 0-6 6c0 .5 0 1 .1 1.5 1.4 1.4 2.9 2 4.9 2 2 0 3.5-.6 4.9-2 .1-.5.1-1 .1-1.5a6 6 0 0 0-6-6Z" />
      <path d="M12 10a2 2 0 0 0-2 2c0 .5 0 1 .1 1.5 1.4 1.4 2.9 0 3.9 0 .1-.5.1-1 .1-1.5a2 2 0 0 0-2-2Z" />
      <path d="M12 22c-1 0-1-1-1-1v-7c0-.5 0-1 1-1s1 .5 1 1v7s0 1-1 1Z" />
    </svg>
  )
}

export const GooglePodcast: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v20" />
      <path d="M6 8v8" />
      <path d="M18 8v8" />
      <path d="M8 6h8" />
      <path d="M8 18h8" />
      <path d="M20 10h2v4h-2" />
      <path d="M2 10h2v4H2" />
    </svg>
  )
}

export const Spotify: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 11.2a5.5 5.5 0 0 1 8 0" />
      <path d="M6 9.5a8 8 0 0 1 12 0" />
      <path d="M10 13a3 3 0 0 1 4 0" />
    </svg>
  )
}

export const Substack: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4h16" />
      <path d="M4 9h16" />
      <path d="M4 14h16" />
      <path d="M4 19h8" />
    </svg>
  )
}
