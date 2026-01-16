"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// Hoa Mai (Apricot Flowers) Animation Component
export function ApricotFlowers() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [1, 1, 0],
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <span className="inline-block">🌸</span>
        </motion.div>
      ))}
    </div>
  )
}

// Lòng Đèn (Paper Lanterns) Component
export function PaperLanterns() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(i % 4) * 25 + 12.5}%`,
            top: `${Math.floor(i / 4) * 50 + 20}%`,
          }}
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            {/* Lantern glow */}
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500 to-yellow-400 blur-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            {/* Lantern body */}
            <div className="relative w-12 h-16 rounded-lg border-4 border-red-500 bg-gradient-to-b from-red-400 to-red-600 shadow-lg">
              <div className="absolute top-2 left-0 right-0 h-1 bg-yellow-300 opacity-60" />
              <div className="absolute inset-2 flex items-center justify-center">
                <div className="w-full h-full rounded border border-red-300 opacity-50" />
              </div>
              <div className="absolute -top-2 left-4 right-4 h-1 bg-red-800" />
              <div className="absolute -bottom-2 left-1/4 right-1/4 h-2 w-8 bg-red-800 rounded-b" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Bao Lì Xì (Red Envelopes) Component
export function RedEnvelopes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
            rotate: [null, Math.random() * 360 + 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-20 h-12 rounded-md bg-gradient-to-b from-red-500 to-red-700 shadow-lg relative"
            style={{
              perspective: "1000px",
            }}
          >
            {/* Gold stripe */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-yellow-400" />
            {/* Envelope flap */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-gradient-to-b from-red-600 to-red-500 rounded-t clip-path-polygon" />
            {/* Gold character decoration */}
            <div className="absolute inset-0 flex items-center justify-center text-yellow-300 font-bold text-lg opacity-70">
              恭
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

// Combined Tet Decoration Component
export function TetDecorations() {
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    setShowAll(true)
  }, [])

  return (
    <>
      {showAll && (
        <>
          <ApricotFlowers />
          <PaperLanterns />
          <RedEnvelopes />
        </>
      )}
    </>
  )
}
