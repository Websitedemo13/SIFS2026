"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { AdvisorsSectionData } from "@/types/cms"

interface AdvisorsSectionProps {
  language: "vi" | "en"
  data: AdvisorsSectionData | undefined
}

export default function AdvisorsSection({ language, data }: AdvisorsSectionProps) {
  if (!data) return null;

  return (
    <section id="advisors" className="py-32 bg-[#050505] text-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <h2 className="text-5xl md:text-8xl font-black mb-6 font-serif italic uppercase tracking-tighter neon-text">
            {language === "vi" ? data.title_vi : data.title_en}
          </h2>
          {/* Rút gọn data.subtitle nếu bạn đã tách phần partners ra */}
          <p className="text-gray-400 max-w-2xl mx-auto text-lg italic opacity-70">
            {language === "vi" ? data.subtitle_vi : data.subtitle_en}
          </p>
        </motion.div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.advisors?.map((advisor, index) => (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                <img src={advisor.image || "/images/placeholder.jpg"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <Quote className="text-primary opacity-50" size={40} />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{language === "vi" ? advisor.name_vi : advisor.name_en}</h3>
                <p className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic opacity-60 leading-relaxed">
                  {language === "vi" ? advisor.role_vi : advisor.role_en}
                </p>
                <div className="w-10 h-1 bg-primary/20 rounded-full group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                <p className="text-sm text-gray-500 italic leading-relaxed line-clamp-4 group-hover:text-gray-300 transition-colors">
                  {language === "vi" ? advisor.bio_vi : advisor.bio_en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* ĐÃ XÓA PHẦN PARTNERS Ở ĐÂY */}
      </div>
    </section>
  )
}