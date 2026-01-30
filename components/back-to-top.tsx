"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { ChevronUp } from "lucide-react"

interface BackToTopProps {
  visible: boolean
}

export default function BackToTop({ visible }: BackToTopProps) {
  const { scrollYProgress } = useScroll()
  
  // Tạo hiệu ứng vòng tròn tiến trình mượt mà
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-10 right-10 z-[60]"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -5 }}
        >
          {/* Vòng tròn tiến trình (Scroll Progress) */}
          <svg className="w-16 h-16 rotate-[-90deg]">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-slate-100"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-primary"
              style={{
                pathLength: scrollYProgress,
              }}
            />
          </svg>

          {/* Nút Back to Top chính */}
          <button
            onClick={scrollToTop}
            className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center text-slate-900 hover:text-primary transition-colors group"
            aria-label="Back to top"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronUp size={24} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
            </motion.div>
          </button>

          {/* Tooltip nhỏ khi hover */}
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg pointer-events-none whitespace-nowrap"
          >
            Top
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}