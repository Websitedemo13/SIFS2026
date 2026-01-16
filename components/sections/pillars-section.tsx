"use client"

import { motion } from "framer-motion"
import { Sparkles, Lightbulb, Users, Heart } from "lucide-react"

interface PillarsSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "4 Trụ Cột",
    pillars: [
      {
        title: "Trưng bày sản phẩm",
        description: "Giới thiệu công nghệ startup đổi mới nhất",
        icon: Sparkles,
      },
      {
        title: "Hội thảo chuyên sâu",
        description: "Học hỏi từ những chuyên gia hàng đầu",
        icon: Lightbulb,
      },
      {
        title: "Kết nối Mentoring 1:1",
        description: "Networking và hướng dẫn cá nhân hóa",
        icon: Users,
      },
      {
        title: "Chạy bộ gây quỹ",
        description: '"Run for Future" - Gây quỹ 50tr+ hỗ trợ sinh viên',
        icon: Heart,
      },
    ],
  },
  en: {
    title: "The 4 Pillars",
    pillars: [
      {
        title: "Product Showcase",
        description: "Discover innovative startup technologies",
        icon: Sparkles,
      },
      {
        title: "Knowledge Workshops",
        description: "Learn from industry leading experts",
        icon: Lightbulb,
      },
      {
        title: "1:1 Mentoring & Networking",
        description: "Connect with mentors one-on-one",
        icon: Users,
      },
      {
        title: "Charity Run",
        description: '"Run for Future" - Raise 50M+ for students',
        icon: Heart,
      },
    ],
  },
}

export default function PillarsSection({ language }: PillarsSectionProps) {
  const t = content[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 neon-text"
        >
          {t.title}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {t.pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div key={index} variants={itemVariants} className="glass rounded-lg p-8 glass-hover group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/40 transition-colors"
                >
                  <Icon className="w-8 h-8 text-secondary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
