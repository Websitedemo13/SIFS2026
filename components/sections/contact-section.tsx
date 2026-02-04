"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Send, UserCheck, Loader2, User, Smartphone } from "lucide-react"
import { ContactSectionData } from "@/types/cms"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface ContactSectionProps {
  language: "vi" | "en"
  data: ContactSectionData | undefined
}

export default function ContactSection({ language, data }: ContactSectionProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ 
    fullname: "", 
    phone: "", 
    email: "", 
    message: "" 
  })

  if (!data) return null;

  const hasMedia = !!(data.banner_image || data.map_embed_url || (data.contacts && data.contacts.length > 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase.from("contact_submissions").insert([
        { 
          fullname: formData.fullname, 
          phone: formData.phone, 
          email: formData.email, 
          message: formData.message,
          status: 'pending' 
        }
      ])

      if (error) throw error
      
      toast.success(language === "vi" ? "Đã gửi thông tin thành công!" : "Registered successfully!", {
        description: language === "vi" ? "Hẹn gặp lại bạn tại SIFS 2026." : "See you at SIFS 2026.",
        duration: 5000,
      })

      setFormData({ fullname: "", phone: "", email: "", message: "" })

    } catch (error: any) {
      console.error("Lỗi:", error.message)
      toast.error(language === "vi" ? "Có lỗi xảy ra, vui lòng thử lại!" : "Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    /* THAY bg-[#050505] THÀNH bg-white */
    <section id="contact" className="py-32 px-4 bg-white relative overflow-hidden font-sans scroll-mt-20">
      {/* Light Ambient - Đốm sáng đỏ cực mờ trên nền trắng */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <h2 className="text-6xl md:text-9xl font-black font-sans mb-6 text-slate-900 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {language === "vi" ? data.title_vi : data.title_en}
          </h2>
          <p className="text-primary font-black uppercase tracking-[0.4em] italic text-sm md:text-base">
            {language === "vi" ? data.subtitle_vi : data.subtitle_en}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* CỘT TRÁI: INFO & TEAM */}
          {hasMedia && (
            <div className="lg:col-span-5 space-y-8">
              {data.banner_image && (
                <div className="relative rounded-[3rem] overflow-hidden h-72 border border-slate-100 shadow-xl group">
                  <img src={data.banner_image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Banner" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                </div>
              )}

              <div className="space-y-4">
                {data.contacts?.map((person) => (
                  <div key={person.id} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center gap-6 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 transition-all">
                      <UserCheck size={28} />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-black text-xl leading-none mb-2">{person.name}</h4>
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3 italic">{language === "vi" ? person.role_vi : person.role_en}</p>
                      <div className="flex flex-col gap-2 text-sm text-slate-500">
                        <a href={`mailto:${person.email}`} className="flex items-center gap-2 hover:text-primary transition-colors"><Mail size={14}/> {person.email}</a>
                        <a href={`tel:${person.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors"><Phone size={14}/> {person.phone}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {data.map_embed_url && (
                <div className="rounded-[3rem] overflow-hidden h-70 border border-slate-100 bg-slate-50 shadow-xl relative">
                  <iframe src={data.map_embed_url} className="w-full h-full transition-all duration-700" allowFullScreen loading="lazy"></iframe>
                </div>
              )}
            </div>
          )}

          {/* CỘT PHẢI: FORM ĐĂNG KÝ */}
          <div className={`${hasMedia ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3"}`}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="p-12 md:p-16 rounded-[4rem] bg-white border border-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.05)] relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
              
              <h3 className="text-4xl font-black text-slate-900 mb-12 font-sans tracking-tighter" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {language === "vi" ? "Đăng Ký Tham Gia" : "Register Now"}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2"><User size={12}/> Fullname</label>
                    <input required value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 focus:border-primary focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300" placeholder="VD: Nguyễn Văn A" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2"><Smartphone size={12}/> Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 focus:border-primary focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300" placeholder="090..." />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 flex items-center gap-2"><Mail size={12}/> Email Address</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 focus:border-primary focus:bg-white outline-none transition-all font-bold placeholder:text-slate-300" placeholder="nguyenvana@example.com" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Message</label>
                  <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-8 py-5 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-slate-900 focus:border-primary focus:bg-white outline-none transition-all font-medium resize-none placeholder:text-slate-300" placeholder={language === "vi" ? "Lời nhắn của bạn..." : "Your message..."} />
                </div>
                
                <button disabled={loading} className="w-full py-7 bg-primary text-white rounded-3xl font-black uppercase tracking-[0.5em] text-xs shadow-2xl shadow-primary/20 transition-all hover:bg-red-700 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4">
                  {loading ? <Loader2 className="animate-spin"/> : <Send size={20} />} 
                  {language === "vi" ? "GỬI ĐĂNG KÝ" : "SUBMIT REGISTRATION"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
