"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

interface BackToTopProps {
  visible: boolean
}

export default function BackToTop({ visible }: BackToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-8 z-40"
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div
            className="absolute -inset-2 rounded-full bg-gradient-to-br from-red-500 via-yellow-400 to-green-500 opacity-40 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.button
            onClick={scrollToTop}
            className="relative p-5 rounded-full glass neon-glow-gold hover:scale-125 transition-all duration-300 flex items-center justify-center group shadow-2xl"
            whileHover={{
              scale: 1.25,
              rotate: 10,
            }}
            whileTap={{ scale: 0.85 }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            aria-label="Back to top"
          >
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-border opacity-50"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-1 rounded-full border-2 border-transparent bg-gradient-to-l from-red-500 via-yellow-300 to-green-500 bg-clip-border opacity-30"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <ChevronUp className="w-8 h-8 text-secondary font-bold drop-shadow-lg" strokeWidth={3} />
            </motion.div>
          </motion.button>

          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              animate={{
                x: [0, Math.cos((i / 5) * Math.PI * 2) * 30, 0],
                y: [0, Math.sin((i / 5) * Math.PI * 2) * 30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
