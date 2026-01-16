"use client"

import { useEffect, useRef } from "react"

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const starCount = 100

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div")
      star.className = "star"
      star.style.width = Math.random() * 2 + "px"
      star.style.height = star.style.width
      star.style.left = Math.random() * 100 + "%"
      star.style.top = Math.random() * 100 + "%"
      star.style.animationDelay = Math.random() * 3 + "s"
      star.style.opacity = Math.random() * 0.7 + 0.3 + ""
      container.appendChild(star)
    }
  }, [])

  return <div ref={containerRef} className="starfield" />
}
