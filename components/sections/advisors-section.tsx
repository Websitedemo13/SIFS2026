"use client"

import { motion } from "framer-motion"
import { Users, Building2 } from "lucide-react"

interface AdvisorsSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Ban Cố Vấn & Đối Tác",
    subtitle: "Mạng lưới chuyên gia và liên minh chiến lược bảo chứng cho SIFS 2026",
    advisors: [
      {
        name: "Ông Phan Huỳnh Anh",
        role: "Chủ tịch Quỹ FFVN\nChủ tịch HĐQT Công ty Smentor\nChuyên gia Khởi nghiệp VCCI",
        image: "/images/phan-huynh-anh.jpg", // Bạn hãy thay bằng ảnh thực tế từ máy
      },
      {
        name: "Ông Đoàn Đức Minh",
        role: "Phó Trưởng khoa Du Lịch\nĐại học Kinh tế TP.HCM (UEH)",
        image: "/images/doan-duc-minh.jpg", // Bạn hãy thay bằng ảnh thực tế từ máy
      },
      {
        name: "Bà Phạm Hoàng Minh Khánh",
        role: "Phó Giám đốc Trung tâm Công nghiệp sáng tạo\nCEO Công ty Cổ phần Smar",
        image: "/images/pham-hoang-minh-khanh.jpg", // Bạn hãy thay bằng ảnh thực tế từ máy
      },
      {
        name: "Bà Lê Bảo Ngọc",
        role: "Phó trưởng phòng\nTrung tâm Khởi nghiệp Đổi mới sáng tạo TP.HCM (SIHUB)",
        image: "/images/le-bao-ngoc.jpg", // Bạn hãy thay bằng ảnh thực tế từ máy
      },
    ],
    partnersTitle: "Đối Tác Chiến Lược",
    partners: ["SIHUB", "UEH", "VCCI", "UFM", "HUIT", "Smentor", "VIETKINGS", "VTF"],
  },
  en: {
    title: "Advisory Board & Partners",
    subtitle: "Leading Experts & Strategic Alliances Behind SIFS 2026",
    advisors: [
      {
        name: "Mr. Phan Huynh Anh",
        role: "Chairman of FFVN Fund\nChairman of Smentor\nVCCI Startup Expert",
        image: "/images/phan-huynh-anh.jpg",
      },
      {
        name: "Mr. Doan Duc Minh",
        role: "Vice Dean of Tourism Faculty\nUniversity of Economics HCMC (UEH)",
        image: "/images/doan-duc-minh.jpg",
      },
      {
        name: "Ms. Pham Hoang Minh Khanh",
        role: "Deputy Director of Creative Industry Center\nCEO of Smar",
        image: "/images/pham-hoang-minh-khanh.jpg",
      },
      
      
      
      
      
    ],
    partnersTitle: "Strategic Partners",
    partners: ["SIHUB", "UEH", "VCCI", "UFM", "HUIT", "Smentor", "VIETKINGS", "VTF"],
  },
}

export default function AdvisorsSection({ language }: AdvisorsSectionProps) {
  const t = content[language]

  return (
    <section id="advisors" className="py-24 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-4">
            <Users className="text-[#D4AF37]" size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
            {t.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg italic">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {t.advisors.map((advisor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Photo Frame - Optimized for real photos */}
              <div className="w-full aspect-[4/5] rounded-xl hover:grayscale-0 transition-all duration-500 shadow-2xl">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#D4AF37] mb-2">
                {advisor.name}
              </h3>
              <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">
                {advisor.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex items-center gap-4 justify-center mb-10">
            <Building2 size={24} className="text-gray-500" />
            <h3 className="text-xl font-bold tracking-widest uppercase text-gray-400">
              {t.partnersTitle}
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {t.partners.map((partner, index) => (
              <span 
                key={index}
                className="text-lg md:text-2xl font-black text-white/30 hover:text-white transition-colors cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}