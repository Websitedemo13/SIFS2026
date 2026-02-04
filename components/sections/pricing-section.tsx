"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface PricingSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Gói Tài Trợ",
    tiers: [
      {
        name: "Đồng",
        price: "10Tr",
        benefits: ["Quyền lợi cơ bản", "Logo trên website", "Một gian hàng tiêu chuẩn"],
      },
      {
        name: "Bạc",
        price: "20Tr",
        benefits: ["Quảng bá Social Media", "Booth ưu tiên", "Logo lớn trên backdrop", "Hai gian hàng"],
        highlighted: true,
      },
      {
        name: "Vàng",
        price: "30Tr",
        benefits: [
          "Logo lớn trên backdrop",
          "Gian hàng tiêu chuẩn",
          "Quảng bá mở rộng",
          "2 phút phát biểu khai mạc",
          "Tên gọi đối tác",
        ],
      },
      {
        name: "Kim cương",
        price: "50Tr",
        benefits: [
          "Toàn bộ quyền lợi marketing",
          "Gian hàng VIP & ưu tiên",
          "Truy cập Database Thí sinh",
          "Logo nổi bật",
          "Logo website 1 năm",
        ],
      },
    ],
  },
  en: {
    title: "Sponsorship Packages",
    tiers: [
      {
        name: "Bronze",
        price: "10M",
        benefits: ["Basic benefits", "Logo on website", "Standard booth space"],
      },
      {
        name: "Silver",
        price: "20M",
        benefits: ["Social Media promotion", "Priority booth placement", "Large backdrop logo", "Two booths"],
        highlighted: true,
      },
      {
        name: "Gold",
        price: "30M",
        benefits: [
          "Large backdrop logo",
          "Standard booth space",
          "Extended promotion",
          "2-minute opening speech",
          "Partner recognition",
        ],
      },
      {
        name: "Diamond",
        price: "50M",
        benefits: [
          "Full marketing rights",
          "VIP & priority booth position",
          "Participant database access",
          "Prominent branding",
          "1-year website logo",
        ],
      },
    ],
  },
}

export default function PricingSection({ language }: PricingSectionProps) {
  const t = content[language]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 neon-text font-sans"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg p-6 transition-all ${
                tier.highlighted ? "glass neon-glow ring-2 ring-secondary scale-105" : "glass glass-hover"
              }`}
            >
              <h3 className="text-2xl font-bold text-secondary mb-2">{tier.name}</h3>
              <p className="text-3xl font-bold text-primary mb-6">{tier.price}</p>

              <ul className="space-y-3">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full mt-8 py-3 rounded-lg font-semibold transition-all ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "border border-secondary text-secondary hover:bg-secondary/10"
                }`}
              >
                {language === "vi" ? "Chọn gói này" : "Choose Package"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
