"use client"

import { motion } from "framer-motion"

interface LanguageToggleProps {
  language: "vi" | "en"
  setLanguage: (lang: "vi" | "en") => void
}

export default function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="fixed top-6 right-6 z-50">
      <div className="glass rounded-full p-1 flex gap-1">
        <button
          onClick={() => setLanguage("vi")}
          className={`px-4 py-2 rounded-full transition-all ${
            language === "vi"
              ? "bg-primary text-primary-foreground neon-glow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          VI
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-2 rounded-full transition-all ${
            language === "en"
              ? "bg-primary text-primary-foreground neon-glow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          EN
        </button>
      </div>
    </motion.div>
  )
}
