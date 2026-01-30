"use client"

import { motion } from "framer-motion"
import { PillarsSectionData } from "@/types/cms"
import * as Icons from "lucide-react"

interface PillarsSectionProps {
  language: "vi" | "en"
  data: PillarsSectionData | undefined
}

export default function PillarsSection({ language, data }: PillarsSectionProps) {
  if (!data) return null;

  const title = language === "vi" ? data.title_vi : data.title_en;

  return (
    /* CHUYỂN bg-[#050505] SANG bg-white */
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      {/* Background Decor - Màu xám/vàng cực nhẹ */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Chỉnh size chữ đồng bộ với các phần khác */}
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 font-serif italic mb-6 uppercase tracking-tighter leading-tight">
            {title || "Các Trụ Cột SIFS 2026"}
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full opacity-20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.pillars?.map((pillar, index) => {
            const IconComponent = (Icons as any)[pillar.icon_name || "Cpu"];

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                /* THAY ĐỔI STYLE CARD: Nền xám nhạt, đổ bóng sâu khi hover */
                className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-primary/10 transition-all duration-500"
              >
                {/* Icon Circle - Chuyển từ viền sáng sang khối màu thương hiệu */}
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary group-hover:shadow-primary/30 transition-all duration-500">
                  {IconComponent && (
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  )}
                </div>

                {/* Tên trụ cột - Chuyển sang màu Slate-900 */}
                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {language === "vi" ? pillar.title_vi : pillar.title_en}
                </h3>

                {/* Mô tả - Chữ xám Slate nhẹ nhàng */}
                <p className="text-slate-500 text-[13px] leading-relaxed italic font-medium">
                  {language === "vi" ? pillar.description_vi : pillar.description_en}
                </p>

                {/* Decor line mờ ở chân card */}
                <div className="absolute bottom-6 left-8 w-8 h-1 bg-primary/20 rounded-full group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}