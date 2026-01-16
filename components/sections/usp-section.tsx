"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

interface USPSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Tại Sao Chọn SIFS 2026?",
    subtitle: "Sự Khác Biệt Rõ Ràng Dành cho Nhà Đầu Tư",
    comparison: [
      {
        aspect: "Nội Dung Chương Trình",
        traditional: "Lý thuyết nặng, Khéo léo chung chung",
        sifs: "Thực tiễn & Demo trực tiếp, Định hướng hành động",
      },
      {
        aspect: "Kết Quả & Tác Động",
        traditional: "Kỳ vọng lạc quan",
        sifs: "Kinh doanh thực tế - Gọi vốn thực tế",
      },
      {
        aspect: "Networking",
        traditional: "Gặp mặt chính thức, Bề ngoài sâu sắc",
        sifs: "1:1 Mentoring sâu - Luật, Marketing, Tài chính",
      },
      {
        aspect: "Lợi Ích Dài Hạn",
        traditional: "Các lợi ích hạn chế sau sự kiện",
        sifs: "Kết nối vĩnh viễn & Hỗ trợ liên tục",
      },
    ],
  },
  en: {
    title: "Why Choose SIFS 2026?",
    subtitle: "Clear Difference for Investors",
    comparison: [
      {
        aspect: "Program Content",
        traditional: "Theory-heavy, Generic inspiration",
        sifs: "Hands-on & Real Demos, Action-oriented",
      },
      {
        aspect: "Results & Impact",
        traditional: "Optimistic expectations",
        sifs: "Real Sales - Real Fundraising",
      },
      {
        aspect: "Networking",
        traditional: "Formal meetings, Surface-level",
        sifs: "Deep 1:1 Mentoring - Legal, Marketing, Finance",
      },
      {
        aspect: "Long-term Benefits",
        traditional: "Limited post-event benefits",
        sifs: "Permanent connections & Ongoing support",
      },
    ],
  },
}

export default function USPSection({ language }: USPSectionProps) {
  const t = content[language]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-yellow-50/30 to-orange-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 neon-text font-serif">{t.title}</h2>
          <p className="text-lg text-muted-foreground italic">{t.subtitle}</p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-secondary">
                <th className="text-left py-4 px-6 font-bold text-foreground">
                  {language === "vi" ? "Tiêu Chí" : "Criteria"}
                </th>
                <th className="text-left py-4 px-6 font-bold text-muted-foreground">
                  {language === "vi" ? "Sự Kiện Truyền Thống" : "Traditional Events"}
                </th>
                <th className="text-left py-4 px-6 font-bold text-primary flex items-center gap-2">
                  <span>SIFS 2026</span>
                  <Check className="w-5 h-5" />
                </th>
              </tr>
            </thead>
            <tbody>
              {t.comparison.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-border hover:bg-white/50 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-foreground">{row.aspect}</td>
                  <td className="py-4 px-6 text-muted-foreground flex items-start gap-2">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-primary flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{row.sifs}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
