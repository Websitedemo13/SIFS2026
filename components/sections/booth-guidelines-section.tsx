"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface BoothGuidelinesProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Quy Định Gian Hàng",
    guidelines: [
      {
        title: "Giá Gian Hàng Early Bird",
        content: "2.000.000 VND (Thời gian: Đến 30/01/2026)",
      },
      {
        title: "Diện Tích & Tiêu Chuẩn Gian Hàng",
        content: "1.5m x 0.5m bao gồm: Một bàn, 2 ghế, 1 ổ cắm điện, Chiếu sáng chuẩn",
      },
      {
        title: "Thời gian Setup",
        content: "14:00 - 21:00 ngày 05/02/2026. Vui lòng đến đúng giờ để setup gian hàng.",
      },
      {
        title: "Chính sách hủy",
        content: "Nếu hủy trước 30/01/2026 sẽ hoàn lại 50% chi phí. Hủy sau thời hạn không hoàn lại chi phí.",
      },
    ],
  },
  en: {
    title: "Booth Guidelines",
    guidelines: [
      {
        title: "Early Bird Booth Price",
        content: "2,000,000 VND (Valid until 30/01/2026)",
      },
      {
        title: "Booth Size & Standard Equipment",
        content: "1.5m x 0.5m including: One table, 2 chairs, 1 power outlet, Standard lighting",
      },
      {
        title: "Setup Time",
        content: "14:00 - 21:00 on 05/02/2026. Please arrive on time for booth setup.",
      },
      {
        title: "Cancellation Policy",
        content: "Cancellation before 30/01/2026 receives 50% refund. No refunds after deadline.",
      },
    ],
  },
}

export default function BoothGuidelinesSection({ language }: BoothGuidelinesProps) {
  const t = content[language]
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 neon-text font-serif"
        >
          {t.title}
        </motion.h2>

        <div className="space-y-4">
          {t.guidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full glass rounded-lg p-6 flex items-center justify-between glass-hover text-left"
              >
                <h3 className="text-lg font-bold text-foreground">{guideline.title}</h3>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-secondary" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="glass rounded-b-lg p-6 pt-0 text-muted-foreground border-t border-border">
                      {guideline.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
