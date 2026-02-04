"use client"

import { motion } from "framer-motion"
import { USPSectionData } from "@/types/cms"
import { CheckCircle2, XCircle, Zap } from "lucide-react"

export default function USPSection({ language, data }: { language: "vi" | "en", data: USPSectionData | undefined }) {
  if (!data) return null;

  const t = {
    title: language === "vi" ? data.title_vi : data.title_en,
    subtitle: language === "vi" ? data.subtitle_vi : data.subtitle_en,
    aspect: language === "vi" ? "Đặc điểm" : "Aspect",
    traditional: language === "vi" ? "Sự kiện truyền thống" : "Traditional Event",
  }

  return (
    /* CHUYỂN SANG NỀN TRẮNG */
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      {/* Decor Background nhẹ nhàng */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Tiêu đề Montserrat - chuyên nghiệp */}
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 font-sans mb-6 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {t.title || "Lợi thế vượt trội"}
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full opacity-20 mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto italic font-medium">{t.subtitle}</p>
        </motion.div>

        {/* Table Container với Shadow cực sang */}
        <div className="overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.08)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.aspect}</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.traditional}</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <Zap size={14} className="fill-primary animate-pulse"/> SIFS 2026
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.comparison?.map((row, index) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-8">
                      <span className="text-sm md:text-base font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                        {language === "vi" ? row.aspect_vi : row.aspect_en}
                      </span>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-3 text-slate-400 text-sm italic font-medium">
                        <XCircle size={16} className="shrink-0 text-slate-300" />
                        {language === "vi" ? row.traditional_vi : row.traditional_en}
                      </div>
                    </td>
                    <td className="p-8 bg-primary/[0.02] group-hover:bg-primary/[0.05] transition-colors">
                      <div className="flex items-center gap-3 text-slate-900 text-sm md:text-base font-black italic">
                        <CheckCircle2 size={20} className="shrink-0 text-primary" />
                        {language === "vi" ? row.sifs_vi : row.sifs_en}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
