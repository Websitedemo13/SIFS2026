"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { HeroSectionData } from "@/types/cms"
import { MapPin, Calendar, Clock } from "lucide-react"

export default function HeroSection({ language, data }: { language: "vi" | "en", data: HeroSectionData | undefined }) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (!data?.target_date) return;
    const targetDate = new Date(data.target_date).getTime()
    const updateCountdown = () => {
      const now = new Date().getTime()
      const diff = targetDate - now
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }
    const interval = setInterval(updateCountdown, 1000)
    updateCountdown()
    return () => clearInterval(interval)
  }, [data?.target_date])

  if (!data) return null;

  const t = {
    subtitle: language === "vi" ? data.subtitle_vi : data.subtitle_en,
    tagline: language === "vi" ? data.tagline_vi : data.tagline_en,
    location: language === "vi" ? data.location_vi : data.location_en,
    cta1: language === "vi" ? data.cta1_vi : data.cta1_en,
    cta2: language === "vi" ? data.cta2_vi : data.cta2_en,
  }

  // Ép màu chữ sang Đen/Xám đậm để nổi bật trên nền trắng
  const textColor = "text-slate-900"; 
  const backgroundMedia = data.slides?.[0]?.url || data.background_image;

  return (
    /* THAY bg-black THÀNH bg-white */
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white py-20 px-4">
      
      {/* LAYER 0: BACKGROUND MEDIA */}
      <div className="absolute inset-0 z-0">
        {data.slides?.[0]?.type === 'video' ? (
          <video src={data.slides[0].url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          backgroundMedia && <img src={backgroundMedia} className="w-full h-full object-cover" alt="bg" />
        )}
        
        {/* SỬA LỚP PHỦ: Thay vì làm tối, ta làm trắng mờ (Light Overlay) */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
        
        {/* LỚP MỜ CHÂN TRANG: Chuyển từ đen sang trắng */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative z-10 w-full max-w-5xl mx-auto text-center ${textColor}`}
      >
        {/* Tiêu đề: Montserrat Bold - Chuyên nghiệp và đạt chuẩn */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <h1
            className="text-6xl md:text-9xl font-black mb-6 tracking-tighter font-sans"
            style={{
              color: '#1a1a1a',
              textShadow: '0 10px 30px rgba(0,0,0,0.05)',
              fontFamily: 'var(--font-montserrat)'
            }}
          >
            {data.title}
          </h1>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] mb-3 text-primary">{t.subtitle}</p>
          <p className="text-lg italic text-slate-500 mb-10">{t.tagline}</p>
        </motion.div>

        {/* Thẻ thông tin Info Card (Bản White Glass) */}
        {data.show_info_card && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="my-10">
            <div className="bg-white/70 rounded-[2.5rem] p-6 md:p-10 border border-slate-200/50 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="text-primary w-6 h-6" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t.location}</span>
              </div>
              <div className="flex flex-col items-center gap-2 border-y md:border-y-0 md:border-x border-slate-100 py-4 md:py-0">
                <Calendar className="text-primary w-6 h-6" />
                <span className="text-sm font-black italic text-slate-800">{data.date_text_vi || "06/02 - 07/02/2026"}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="text-primary w-6 h-6" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{data.time_text_vi || "09:00 - 18:00"}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Countdown (Bản White Shadow) */}
        {data.show_countdown && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-12">
            <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
              {[
                { label: "DAYS", value: countdown.days },
                { label: "HOURS", value: countdown.hours },
                { label: "MINS", value: countdown.minutes },
                { label: "SECS", value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-3xl p-4 md:p-6 border border-slate-100 shadow-xl">
                  <div className="text-3xl md:text-5xl font-black text-primary mb-1 font-serif italic">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 tracking-tighter">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => data.cta1_link && (window.location.href = data.cta1_link)}
            className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase text-sm shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
          >
            {t.cta1}
          </button>
          <button 
            onClick={() => data.cta2_link && (window.location.href = data.cta2_link)}
            className="px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black uppercase text-sm hover:bg-slate-50 transition-all active:scale-95"
          >
            {t.cta2}
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
