"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Sparkles, Globe, Zap, PackageCheck } from "lucide-react"

interface BoothGuidelinesProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Quy Định Gian Hàng",
    guidelines: [
      { title: "Giá Early Bird", content: "2.000.000 VND (Đến 30/01/2026)", icon: <Sparkles size={18} /> },
      { title: "Tiêu chuẩn gian hàng", content: "1.5m x 0.5m bao gồm: 1 bàn, 2 ghế, 1 ổ cắm công suất chuẩn.", icon: <PackageCheck size={18} /> },
      { title: "Khu E (Global Partners)", content: "Hỗ trợ riêng cho đối tác quốc tế 24/7 về thủ tục và vận chuyển.", icon: <Globe size={18} /> },
      { title: "Thời gian Setup", content: "14:00 - 21:00 ngày 05/02/2026. Vui lòng có mặt đúng giờ.", icon: <Zap size={18} /> },
    ],
  },
  en: {
    title: "Booth Guidelines",
    guidelines: [
      { title: "Early Bird Price", content: "2,000,000 VND (Until Jan 30, 2026)", icon: <Sparkles size={18} /> },
      { title: "Standard Booth", content: "1.5m x 0.5m: 1 table, 2 chairs, 1 standard power outlet.", icon: <PackageCheck size={18} /> },
      { title: "Zone E (Global)", content: "Special 24/7 support for global partners regarding logistics.", icon: <Globe size={18} /> },
      { title: "Setup Timeline", content: "14:00 - 21:00 Feb 05, 2026. Please be on time.", icon: <Zap size={18} /> },
    ],
  },
}

export default function BoothGuidelinesSection({ language }: BoothGuidelinesProps) {
  const t = content[language]
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    /* NỀN TRẮNG SẠCH SẼ */
    <section id="guidelines" className="py-24 px-4 bg-white font-sans scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        
        {/* Header đồng bộ size chữ với Advisors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 font-serif italic uppercase tracking-tighter mb-4">
            {t.title}
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full opacity-20" />
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {t.guidelines.map((g, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-[2rem] border transition-all duration-500 ${
                openIndex === i 
                ? "border-primary/20 bg-slate-50 shadow-xl shadow-slate-200/50" 
                : "border-slate-100 bg-white hover:border-slate-300"
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                className="w-full px-8 py-7 flex justify-between items-center text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${
                    openIndex === i ? "bg-primary text-white" : "bg-slate-100 text-slate-400 group-hover:text-primary"
                  }`}>
                    {g.icon}
                  </div>
                  <span className={`font-black uppercase tracking-tight text-sm md:text-base ${
                    openIndex === i ? "text-slate-900" : "text-slate-500"
                  }`}>
                    {g.title}
                  </span>
                </div>
                <ChevronDown className={`transition-transform duration-500 text-slate-300 ${
                  openIndex === i ? "rotate-180 text-primary" : ""
                }`} />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 ml-12">
                      <div className="h-[1px] w-full bg-slate-200 mb-6 opacity-50" />
                      <p className="text-slate-500 italic text-sm md:text-base leading-relaxed font-medium">
                        {g.content}
                      </p>
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