import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  height?: number
  width?: number
  priority?: boolean
}

export function Logo({ className = "h-11 w-auto", height = 44, width = 210, priority = false }: LogoProps) {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <Image
        src="/logo.svg"
        alt="Property Passport"
        width={width}
        height={height}
        className="h-full w-auto max-h-full object-contain"
        priority={priority}
      />
    </div>
  )
}

export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}>
      <Image
        src="/logo.svg"
        alt="Property Passport"
        width={100}
        height={32}
        className="h-full w-auto max-w-none object-cover object-left"
      />
    </div>
  )
}
