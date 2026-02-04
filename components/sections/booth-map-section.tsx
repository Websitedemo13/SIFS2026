"use client"

import { motion } from "framer-motion"
import { Map as MapIcon, Store, Info, LayoutGrid } from "lucide-react"
import { BoothMapSectionData, BoothArea, BoothItem } from "@/types/cms"

interface BoothMapSectionProps {
  language: "vi" | "en"
  data: BoothMapSectionData | undefined
}

export default function BoothMapSection({ language, data }: BoothMapSectionProps) {
  if (!data || !data.areas) return null

  const t = {
    title: language === "vi" ? data.title_vi : data.title_en,
    instruction: language === "vi" ? "Tra cứu vị trí gian hàng chi tiết bên dưới" : "Find detailed booth locations below",
    boothCount: language === "vi" ? "gian hàng" : "booths",
    empty: language === "vi" ? "Đang cập nhật danh sách..." : "Updating list..."
  }

  return (
    /* CHUYỂN SANG NỀN TRẮNG */
    <section id="booth-map" className="py-24 px-4 bg-white relative overflow-hidden font-sans scroll-mt-20">
      {/* Decorative Glows - Màu nhẹ nhàng hơn cho nền trắng */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Typography Đen sắc nét */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 font-sans uppercase tracking-tighter mb-6" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {t.title}
          </h2>
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <LayoutGrid size={18} className="text-primary" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black">{t.instruction}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* BÊN TRÁI: MASTER MAP (Sticky & Shadow) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 lg:sticky lg:top-32"
          >
            <div className="group relative rounded-[3rem] overflow-hidden border border-slate-100 bg-white p-4 shadow-[0_40px_100px_rgba(0,0,0,0.07)] transition-all duration-700 hover:shadow-[0_50px_120px_rgba(0,0,0,0.12)]">
              <div className="relative overflow-hidden rounded-[2rem]">
                <img 
                  src={data.map_image_url || "/placeholder-map.png"} 
                  alt="SIFS 2026 Floor Plan" 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute bottom-10 left-10 flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-slate-100">
                <MapIcon className="text-primary" size={20} />
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Floor Plan 2026</span>
              </div>
            </div>
          </motion.div>

          {/* BÊN PHẢI: CHI TIẾT DANH SÁCH (Modern White Cards) */}
          <div className="lg:col-span-5 space-y-12 max-h-[900px] overflow-y-auto pr-6 custom-scrollbar pb-10">
            {data.areas.map((zone: BoothArea, index: number) => {
              const zoneName = language === "vi" ? zone.name_vi : zone.name_en
              const zoneDesc = language === "vi" ? zone.description_vi : zone.description_en

              return (
                <div key={zone.id} className="relative group/zone">
                  {/* Header Zone */}
                  <div className="flex items-center gap-6 mb-8">
                    <div 
                      className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center font-black text-2xl italic shadow-sm transition-transform group-hover/zone:scale-110"
                      style={{ 
                        backgroundColor: `${zone.color_code}10`, 
                        color: zone.color_code, 
                        border: `1px solid ${zone.color_code}30` 
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover/zone:text-primary transition-colors">
                        {zoneName}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                        {zone.booths?.length || 0} {t.boothCount}
                      </p>
                    </div>
                  </div>

                  {/* Booths List Container */}
                  <div className="p-10 bg-slate-50/50 rounded-[3rem] border border-slate-100 space-y-8 group-hover/zone:bg-white group-hover/zone:shadow-2xl transition-all duration-500">
                    {/* Description */}
                    {zoneDesc && (
                      <div className="flex gap-4 items-start pb-6 border-b border-slate-200/50">
                        <Info size={18} className="text-primary shrink-0 mt-0.5" />
                        <p className="text-slate-500 text-sm italic leading-relaxed">{zoneDesc}</p>
                      </div>
                    )}

                    {/* Booth Items */}
                    <div className="grid grid-cols-1 gap-4">
                      {zone.booths && zone.booths.length > 0 ? (
                        zone.booths.map((booth: BoothItem) => (
                          <div key={booth.id} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 group/booth hover:border-primary/50 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-5">
                              <span className="w-11 h-11 flex items-center justify-center bg-slate-50 rounded-xl text-[11px] font-black text-slate-900 border border-slate-100 group-hover/booth:bg-primary group-hover/booth:text-white group-hover/booth:border-primary transition-all">
                                {booth.label}
                              </span>
                              <span className="text-[14px] font-bold text-slate-700">
                                {language === "vi" ? booth.name_vi : booth.name_en}
                              </span>
                            </div>
                            <Store size={16} className="text-slate-300 group-hover/booth:text-primary transition-colors" />
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-[10px] text-slate-300 uppercase font-black py-4 italic tracking-widest">{t.empty}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
