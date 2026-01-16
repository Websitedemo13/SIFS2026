"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface AgendaSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Chương Trình Sự Kiện",
    days: [
      {
        date: "06/02/2026",
        events: [
          { time: "09:00 - 09:30", title: "Khai mạc sự kiện", description: "Chào mừng từ ban tổ chức" },
          {
            time: "09:30 - 11:00",
            title: "Seminar 1: AI & Tự Động Hóa",
            description: "Thảo luận về tương lai công nghệ AI",
          },
          { time: "11:00 - 18:00", title: "Trưng bày & Networking", description: "Gặp gỡ các startup và nhà tạo ra" },
        ],
      },
      {
        date: "07/02/2026",
        events: [
          {
            time: "09:00 - 11:00",
            title: "Seminar 2: Nhân Sự Chất Lượng Cao",
            description: "Xây dựng đội ngũ xuất sắc",
          },
          {
            time: "11:00 - 13:00",
            title: "Seminar 3: Sáng Tạo & Design Thinking",
            description: "Đổi mới trong kinh doanh",
          },
          {
            time: "13:00 - 15:00",
            title: "Seminar 4: Huy Động Vốn & Đầu Tư",
            description: "Chiến lược gọi vốn thành công",
          },
          {
            time: "15:30 - 18:00",
            title: 'Chạy bộ "Run for Future"',
            description: "Gây quỹ cho sinh viên khó khăn - Mục tiêu: 50 tỷ VND",
          },
        ],
      },
    ],
  },
  en: {
    title: "Event Agenda",
    days: [
      {
        date: "06/02/2026",
        events: [
          { time: "09:00 - 09:30", title: "Opening Ceremony", description: "Welcome from organizers" },
          {
            time: "09:30 - 11:00",
            title: "Seminar 1: AI & Automation",
            description: "Discussing the future of technology",
          },
          { time: "11:00 - 18:00", title: "Showcase & Networking", description: "Meet startups and innovators" },
        ],
      },
      {
        date: "07/02/2026",
        events: [
          {
            time: "09:00 - 11:00",
            title: "Seminar 2: High-Quality Human Resources",
            description: "Building excellent teams",
          },
          {
            time: "11:00 - 13:00",
            title: "Seminar 3: Innovation & Design Thinking",
            description: "Business innovation",
          },
          {
            time: "13:00 - 15:00",
            title: "Seminar 4: Fundraising & Investment",
            description: "Successful fundraising strategy",
          },
          {
            time: "15:30 - 18:00",
            title: '"Run for Future" Charity Run',
            description: "Fundraising for students in need - Target: 50 billion VND",
          },
        ],
      },
    ],
  },
}

export default function AgendaSection({ language }: AgendaSectionProps) {
  const t = content[language]
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 neon-text font-serif"
        >
          {t.title}
        </motion.h2>

        <div className="flex gap-4 justify-center mb-8">
          {t.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeDay === index ? "bg-primary text-primary-foreground neon-glow" : "glass glass-hover"
              }`}
            >
              {day.date}
            </button>
          ))}
        </div>

        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {t.days[activeDay].events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-lg p-6 glass-hover"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-5 h-5 text-secondary mt-1" />
                </div>
                <div className="flex-grow">
                  <p className="text-secondary font-semibold">{event.time}</p>
                  <h3 className="text-lg font-bold text-foreground mt-1">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
