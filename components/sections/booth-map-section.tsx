"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"

interface BoothMapSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Sơ Đồ Gian Hàng",
    subtitle: "Bố Cục Không Gian Sự Kiện",
    note: "Lựa chọn gian hàng ưu tiên cho đơn vị đăng ký Early Bird",
    areas: [
      { name: "Khu A", title: "Đổi Mới Sáng Tạo", color: "bg-red-100 border-red-300" },
      { name: "Khu B", title: "Giáo Dục", color: "bg-yellow-100 border-yellow-300" },
      { name: "Khu C", title: "Khởi Nghiệp", color: "bg-green-100 border-green-300" },
      { name: "Khu D", title: "Tài Chính & Đầu Tư", color: "bg-blue-100 border-blue-300" },
    ],
  },
  en: {
    title: "Booth Map",
    subtitle: "Event Space Layout",
    note: "Priority booth selection for early-bird registrations",
    areas: [
      { name: "Area A", title: "Innovation", color: "bg-red-100 border-red-300" },
      { name: "Area B", title: "Education", color: "bg-yellow-100 border-yellow-300" },
      { name: "Area C", title: "Startups", color: "bg-green-100 border-green-300" },
      { name: "Area D", title: "Finance & Investment", color: "bg-blue-100 border-blue-300" },
    ],
  },
}

export default function BoothMapSection({ language }: BoothMapSectionProps) {
  const t = content[language]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-orange-50/30 to-yellow-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 neon-text font-serif">{t.title}</h2>
          <p className="text-lg text-muted-foreground italic">{t.subtitle}</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span>{t.note}</span>
          </div>
        </motion.div>

        {/* Booth Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-8 flex items-center justify-center"
          >
            <svg viewBox="0 0 400 300" className="w-full h-auto max-w-sm">
              {/* Area A */}
              <rect x="20" y="20" width="80" height="120" fill="rgba(239,68,68,0.1)" stroke="#DC143C" strokeWidth="2" />
              <text x="60" y="85" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#DC143C">
                Khu A
              </text>

              {/* Area B */}
              <rect
                x="120"
                y="20"
                width="80"
                height="120"
                fill="rgba(234,179,8,0.1)"
                stroke="#FFD700"
                strokeWidth="2"
              />
              <text x="160" y="85" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#FFD700">
                Khu B
              </text>

              {/* Area C */}
              <rect
                x="220"
                y="20"
                width="80"
                height="120"
                fill="rgba(34,197,94,0.1)"
                stroke="#2E8B57"
                strokeWidth="2"
              />
              <text x="260" y="85" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#2E8B57">
                Khu C
              </text>

              {/* Area D */}
              <rect
                x="320"
                y="20"
                width="60"
                height="120"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              <text x="350" y="85" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#3B82F6">
                Khu D
              </text>

              {/* Stage & VIP Center */}
              <circle
                cx="200"
                cy="220"
                r="60"
                fill="rgba(220,20,60,0.15)"
                stroke="#DC143C"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <text x="200" y="220" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#DC143C">
                {language === "vi" ? "Sân Khấu & VIP" : "Stage & VIP"}
              </text>
            </svg>
          </motion.div>

          {/* Area Details */}
          <div className="space-y-4">
            {t.areas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-lg p-6 glass-hover border-2 ${area.color}`}
              >
                <h3 className="text-xl font-bold text-foreground mb-1">{area.name}</h3>
                <p className="text-muted-foreground">{area.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
