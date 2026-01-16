"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "SIFS 2026",
    subtitle: "Ngày Hội Khởi Nghiệp & Đổi Mới Sáng Tạo",
    tagline: "Mùa Xuân 2026 - Innovation Blooms",
    location: "SIHUB - 123 Trương Định, Quận 3, TP.HCM",
    date: "06/02 - 07/02/2026",
    time: "09:00 - 18:00",
    cta1: "Đăng ký Gian hàng",
    cta2: "Tài trợ ngay",
  },
  en: {
    title: "SIFS 2026",
    subtitle: "Spring Innovation Festival Summit",
    tagline: "Spring 2026 - Innovation Blooms",
    location: "SIHUB - 123 Truong Dinh St., Dist. 3, HCMC",
    date: "06/02 - 07/02/2026",
    time: "09:00 - 18:00",
    cta1: "Register Booth",
    cta2: "Sponsor Now",
  },
}

export default function HeroSection({ language }: HeroSectionProps) {
  const t = content[language]
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date("2026-02-06T00:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 neon-text">{t.title}</h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-secondary mb-2 font-semibold">{t.subtitle}</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-lg text-muted-foreground italic mb-8">{t.tagline}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="my-12">
          <div className="glass rounded-lg p-8 mb-8 neon-glow max-w-2xl mx-auto">
            <p className="text-sm md:text-base text-secondary mb-4">{t.location}</p>
            <p className="text-base md:text-lg text-foreground mb-2">{t.date}</p>
            <p className="text-muted-foreground">{t.time}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="glass rounded-lg p-4 neon-glow">
                <div className="text-2xl md:text-3xl font-bold text-secondary mb-2">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/80 neon-glow transition-all"
          >
            {t.cta1}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass text-secondary rounded-lg font-bold hover:bg-secondary/10 transition-all"
          >
            {t.cta2}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
