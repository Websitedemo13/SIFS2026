"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Zap, Trophy, ChevronRight } from "lucide-react"
import { AgendaSectionData } from "@/types/cms"

interface AgendaSectionProps {
  language: "vi" | "en"
  data: AgendaSectionData | undefined
}

export default function AgendaSection({ language, data }: AgendaSectionProps) {
  const [activeDay, setActiveDay] = useState(0)
  
  if (!data || !data.days || data.days.length === 0) return null;

  const t = {
    title: language === "vi" ? data.title_vi : data.title_en,
    subtitle: language === "vi" ? "Lịch trình chi tiết sự kiện" : "Detailed event schedule",
  }

  const getIcon = (title: string) => {
    const lowTitle = title.toLowerCase();
    if (lowTitle.includes("khai mạc") || lowTitle.includes("opening")) return <Zap size={16} />;
    if (lowTitle.includes("chạy") || lowTitle.includes("run") || lowTitle.includes("huy động")) return <Trophy size={16} />;
    return <Clock size={16} />;
  }

  return (
    /* CHUYỂN bg-[#050505] SANG bg-white */
    <section id="agenda" className="py-24 px-4 bg-white relative overflow-hidden font-sans scroll-mt-20">
      {/* Decor nền mờ nhẹ */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-4 text-slate-900 font-serif italic uppercase tracking-tighter">
            {t.title}
          </h2>
          <p className="text-slate-400 italic tracking-[0.3em] text-[10px] font-black uppercase opacity-60">{t.subtitle}</p>
        </motion.div>

        {/* Nút chọn Ngày (Tabs Trắng) */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {data.days.map((day, index) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(index)}
              className={`relative px-10 py-5 rounded-2xl transition-all duration-500 overflow-hidden ${
                activeDay === index ? "text-white shadow-xl shadow-primary/20" : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <div className="relative z-10 text-center">
                <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-80">
                  {language === "vi" ? `Ngày 0${index + 1}` : `Day 0${index + 1}`}
                </p>
                <p className="text-lg font-black tracking-tighter italic">{day.date}</p>
              </div>
              {activeDay === index && (
                <motion.div 
                  layoutId="activeTabAgenda" 
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Timeline Content (Đường kẻ màu Slate nhạt) */}
        <div className="relative border-l-2 border-slate-100 ml-4 md:ml-8 pl-8 md:pl-16 space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {data.days[activeDay].events.map((event, index) => {
                const eTitle = language === "vi" ? event.title_vi : event.title_en;
                const eDesc = language === "vi" ? event.desc_vi : event.desc_en;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative mb-12 last:mb-0"
                  >
                    {/* Timeline Dot (Chấm Đỏ SIFS) */}
                    <div className="absolute -left-[41px] md:-left-[73px] top-2 w-5 h-5 rounded-full bg-primary border-4 border-white z-10 shadow-lg shadow-primary/30" />
                    
                    {/* Event Card (Bản White Shadow) */}
                    <div className="bg-slate-50 hover:bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 group relative overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:border-primary/10">
                      
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                        <ChevronRight className="text-primary" />
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-2xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            {getIcon(eTitle)}
                          </div>
                          <span className="text-primary font-black text-sm tracking-[0.2em] uppercase italic">
                            {event.time}
                          </span>
                        </div>
                        <div className="h-[1px] flex-1 bg-slate-200/50 hidden md:block" />
                      </div>
                      
                      <h3 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors duration-500">
                        {eTitle}
                      </h3>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                        {eDesc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}