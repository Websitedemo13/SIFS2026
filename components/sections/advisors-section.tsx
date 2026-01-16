"use client"

import { motion } from "framer-motion"

interface AdvisorsSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Ban Cố Vấn & Đối Tác",
    subtitle: "Các Chuyên Gia Hàng Đầu Đứng Sau SIFS 2026",
    advisors: [
      {
        name: "TS. Phan Huỳnh Anh",
        role: "Chủ tịch Quỹ FFVN\nChủ tịch Smentor\nChuyên gia VCCI",
        image: "/images/advisor-1.jpg",
      },
      {
        name: "Ông Hoàng Cửu Long",
        role: "Phó Giáo Sư - Tiến Sĩ\nGiảng viên Đại học\nKinh tế TP.HCM",
        image: "/images/advisor-2.jpg",
      },
      {
        name: "Ông Đoàn Đức Minh",
        role: "Thạc Sĩ - Nghiên cứu sinh\nGiảng viên Đại học\nWestern Sydney",
        image: "/images/advisor-3.jpg",
      },
      {
        name: "Ông Nguyễn Chí Thành",
        role: "CEO\nSàn Kết nối Kinh doanh\nVABIX",
        image: "/images/advisor-4.jpg",
      },
    ],
    partnersTitle: "Đối Tác Chiến Lược",
    partners: ["SIHUB", "UEH", "Smentor", "VCCI", "UFM", "HUIT", "Vietnam Records"],
  },
  en: {
    title: "Advisory Board & Partners",
    subtitle: "Leading Experts Behind SIFS 2026",
    advisors: [
      {
        name: "Dr. Phan Huỳnh Anh",
        role: "Chairman of FFVN Fund\nChairman of Smentor\nVCCI Expert",
        image: "/images/advisor-1.jpg",
      },
      {
        name: "Mr. Hoàng Cửu Long",
        role: "Associate Professor - PhD\nLecturer at University\nof Economics HCMC",
        image: "/images/advisor-2.jpg",
      },
      {
        name: "Mr. Đoàn Đức Minh",
        role: "Master - Researcher\nLecturer at Western\nSydney University",
        image: "/images/advisor-3.jpg",
      },
      {
        name: "Mr. Nguyễn Chí Thành",
        role: "CEO\nBusiness Connection\nPlatform VABIX",
        image: "/images/advisor-4.jpg",
      },
    ],
    partnersTitle: "Strategic Partners",
    partners: ["SIHUB", "UEH", "Smentor", "VCCI", "UFM", "HUIT", "Vietnam Records"],
  },
}

export default function AdvisorsSection({ language }: AdvisorsSectionProps) {
  const t = content[language]

  return (
    <section id="advisors" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Advisors */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2 neon-text font-serif">{t.title}</h2>
          <p className="text-lg text-muted-foreground italic">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.advisors.map((advisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-lg overflow-hidden glass-hover group"
            >
              <div className="relative h-48 bg-gradient-to-b from-primary to-secondary overflow-hidden">
                <img
                  src={advisor.image || "/placeholder.svg"}
                  alt={advisor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-primary mb-2">{advisor.name}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{advisor.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partners Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-border"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">{t.partnersTitle}</h3>
          <div className="flex gap-8 overflow-x-auto pb-4 justify-center flex-wrap">
            {t.partners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass px-6 py-3 rounded-lg whitespace-nowrap font-semibold text-secondary"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
