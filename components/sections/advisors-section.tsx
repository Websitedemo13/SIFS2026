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
    <section id="advisors" className="py-24 bg-white text-slate-900 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Thu gọn size chữ cho hiện đại */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Giảm từ 9xl xuống tối đa 7xl cho cân đối - Montserrat */}
          <h2 className="text-4xl md:text-7xl font-black mb-6 font-sans uppercase tracking-tighter text-slate-900 leading-tight" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {language === "vi" ? data.title_vi : data.title_en}
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base italic font-medium tracking-wide leading-relaxed">
            {language === "vi" ? data.subtitle_vi : data.subtitle_en}
          </p>
        </motion.div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.advisors?.map((advisor, index) => (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-50 border border-slate-100 rounded-[2.5rem] p-7 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-primary/10 transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container - Aspect ratio gọn gàng hơn */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-7 shadow-sm">
                <img 
                  src={advisor.image || "/images/placeholder.jpg"} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={advisor.name_vi}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <Quote className="text-white opacity-90" size={32} />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {/* Tên - Montserrat Bold */}
                <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors duration-300">
                  {language === "vi" ? advisor.name_vi : advisor.name_en}
                </h3>
                
                {/* Chức danh - Nhỏ gọn, Tracking rộng */}
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.25em] italic leading-relaxed">
                  {language === "vi" ? advisor.role_vi : advisor.role_en}
                </p>
                
                <div className="w-8 h-0.5 bg-slate-200 rounded-full group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                
                {/* Bio - Chữ nhỏ hơn (sm) để không bị thô */}
                <p className="text-[13px] text-slate-500 italic leading-relaxed line-clamp-4 group-hover:text-slate-600 transition-colors">
                  {language === "vi" ? advisor.bio_vi : advisor.bio_en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
