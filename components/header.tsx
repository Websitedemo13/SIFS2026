"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap, ArrowRight, Globe } from "lucide-react"
import { HeaderSectionData } from "@/types/cms"

interface HeaderProps {
  language: "vi" | "en"
  onLanguageChange: (lang: "vi" | "en") => void
  data: HeaderSectionData | undefined
}

export default function Header({ language, onLanguageChange, data }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!data) return null;

  const nav = language === "vi" 
    ? [
        { label: "Trang Chủ", id: "home" },
        { label: "Chương Trình", id: "agenda" },
        { label: "Gian Hàng", id: "booth-map" },
        { label: "Liên Hệ", id: "contact" },
      ]
    : [
        { label: "Home", id: "home" },
        { label: "Agenda", id: "agenda" },
        { label: "Booth Map", id: "booth-map" },
        { label: "Contact", id: "contact" },
      ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      /* CHUYỂN SANG GLASSMORPHISM TRẮNG */
      className={`fixed top-0 w-full z-[100] transition-all duration-700 font-sans ${
        isScrolled 
        ? "py-4 bg-white/80 backdrop-blur-2xl border-b border-slate-100 shadow-sm" 
        : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* LOGO CMS - Chữ Đen Sắc Nét */}
        <div onClick={() => scrollToSection("home")} className="flex items-center gap-4 cursor-pointer group">
          {data.logo_url ? (
            <img src={data.logo_url} className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" alt="Logo" />
          ) : (
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-white fill-white" size={24} />
            </div>
          )}
          {data.logo_text && (
            <span className="text-2xl md:text-3xl font-black text-slate-900 italic tracking-tighter font-serif uppercase leading-none">
              {data.logo_text}
            </span>
          )}
        </div>

        {/* NAVIGATION - Chuyển sang text-slate-600/90 */}
        <nav className="hidden lg:flex items-center gap-12 text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">
           {nav.map((item, index) => (
             <button key={index} onClick={() => scrollToSection(item.id)} className="hover:text-primary transition-all relative group italic">
               {item.label}
               <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-full" />
             </button>
           ))}
        </nav>

        <div className="hidden lg:flex items-center gap-8">
           {/* Language Switcher - Tone sáng */}
           <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-2xl p-1.5">
             {["vi", "en"].map((l) => (
               <button key={l} onClick={() => onLanguageChange(l as "vi" | "en")}
                 className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                   language === l ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                 }`}>
                 {l}
               </button>
             ))}
           </div>
           
           {/* Nút Đăng Ký - Sắc Nét */}
           <button onClick={() => scrollToSection("contact")} className="px-10 py-4 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:bg-red-700 hover:-translate-y-1 transition-all flex items-center gap-2 italic">
             {language === "vi" ? data.register_text_vi : data.register_text_en}
             <ArrowRight size={16} />
           </button>
        </div>

        {/* Mobile Toggle - Màu tối */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-slate-900 p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU - Nền Trắng */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {nav.map((item, index) => (
                <button key={index} onClick={() => scrollToSection(item.id)} className="text-left text-xl font-black text-slate-900 uppercase italic tracking-tighter border-b border-slate-50 pb-4">
                  {item.label}
                </button>
              ))}
              <div className="flex items-center justify-between pt-4">
                 <div className="flex gap-4">
                    {["vi", "en"].map(l => (
                      <button key={l} onClick={() => onLanguageChange(l as "vi" | "en")} className={`font-black uppercase ${language === l ? "text-primary" : "text-slate-300"}`}>{l}</button>
                    ))}
                 </div>
                 <button onClick={() => scrollToSection("contact")} className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase italic">Register Now</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}