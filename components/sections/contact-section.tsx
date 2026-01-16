"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, Send, MapPin } from "lucide-react"

interface ContactSectionProps {
  language: "vi" | "en"
}

const content = {
  vi: {
    title: "Liên Hệ & Hợp Tác",
    subtitle: "Kết Nối Với Ban Đối Ngoại - Cơ Hội Vô Hạn Chờ Bạn",
    description:
      "Liên hệ với chúng tôi để tìm hiểu về các cơ hội tài trợ, quảng bá thương hiệu, và hợp tác chiến lược tại SIFS 2026.",
    org: "Ban Tổ Chức Ngày Hội",
    representative: "Đại Diện Ban Đối Ngoại",
    email: "Email",
    phone: "Điện thoại",
    location: "Địa điểm",
    contactForm: "Gửi Yêu Cầu Hợp Tác",
    name: "Họ và Tên",
    organization: "Tổ Chức / Công Ty",
    interest: "Lĩnh Vực Quan Tâm",
    sponsor: "Tài Trợ",
    booth: "Gian Hàng",
    message: "Tin Nhắn",
    send: "Gửi",
    address: "TP. Hồ Chí Minh, Việt Nam",
  },
  en: {
    title: "Contact & Partnership",
    subtitle: "Connect With Our External Relations Team - Unlimited Opportunities Await",
    description:
      "Get in touch with us to learn about sponsorship opportunities, brand promotion, and strategic partnerships at SIFS 2026.",
    org: "Event Organization Committee",
    representative: "External Relations Representative",
    email: "Email",
    phone: "Phone",
    location: "Location",
    contactForm: "Send Partnership Request",
    name: "Full Name",
    organization: "Organization / Company",
    interest: "Area of Interest",
    sponsor: "Sponsorship",
    booth: "Booth",
    message: "Message",
    send: "Send",
    address: "Ho Chi Minh City, Vietnam",
  },
}

export default function ContactSection({ language }: ContactSectionProps) {
  const t = content[language]
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    partnershipType: "",
    interest: "",
    message: "",
  })

  const contacts = [
    {
      name: language === "vi" ? "Ban Tổ Chức" : "Organization Committee",
      email: "sifs.doingoai@gmail.com",
      phone: "+84 86 8158 269",
      icon: Mail,
    },
    {
      name: "Nguyễn Trọng Khoa",
      email: "khoant.sifs@gmail.com",
      phone: "+84 86 5778 765",
      icon: Phone,
    },
  ]

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-transparent via-orange-50/50 to-yellow-50/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4 neon-text font-serif"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            {t.title}
          </motion.h2>
          <p className="text-xl md:text-2xl text-secondary font-semibold mb-3">{t.subtitle}</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.description}</p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Side - Contact Cards with Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden h-64 mb-8 glass-hover shadow-2xl">
              <img
                src="/professional-team-meeting-conference-partnership.jpg"
                alt="Partnership opportunity"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Contact Cards */}
            {contacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-8 neon-glow glass-hover border border-gold/20"
              >
                <h3 className="text-2xl font-bold text-primary mb-6">{contact.name}</h3>
                <div className="space-y-4">
                  <motion.a
                    href={`mailto:${contact.email}`}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <Mail className="w-6 h-6 text-secondary mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.email}</p>
                      <p className="text-secondary font-bold hover:underline">{contact.email}</p>
                    </div>
                  </motion.a>
                  <motion.a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <Phone className="w-6 h-6 text-secondary mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.phone}</p>
                      <p className="text-secondary font-bold hover:underline">{contact.phone}</p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            ))}

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-8 border border-gold/20"
            >
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-secondary mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{t.location}</p>
                  <p className="text-secondary font-bold text-lg">{t.address}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-10 neon-glow glass-hover border border-gold/20 sticky top-32"
          >
            <h3 className="text-3xl font-bold text-primary mb-8">{t.contactForm}</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t.name}</label>
                <input
                  type="text"
                  placeholder={language === "vi" ? "Nhập họ và tên của bạn" : "Enter your full name"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gold/30 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t.organization}</label>
                <input
                  type="text"
                  placeholder={language === "vi" ? "Nhập tên công ty/tổ chức" : "Enter company/organization name"}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gold/30 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {language === "vi" ? "Loại Hợp Tác" : "Partnership Type"}
                </label>
                <select
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gold/30 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                >
                  <option value="">{language === "vi" ? "Chọn loại hợp tác" : "Select partnership type"}</option>
                  <option value="diamond">{language === "vi" ? "Kim Cương" : "Diamond"}</option>
                  <option value="gold">{language === "vi" ? "Vàng" : "Gold"}</option>
                  <option value="silver">{language === "vi" ? "Bạc" : "Silver"}</option>
                  <option value="bronze">{language === "vi" ? "Đồng" : "Bronze"}</option>
                  <option value="booth">{language === "vi" ? "Gian Hàng" : "Booth"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t.interest}</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gold/30 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all"
                >
                  <option value="">{language === "vi" ? "Chọn lĩnh vực" : "Select area"}</option>
                  <option value="sponsor">{t.sponsor}</option>
                  <option value="booth">{t.booth}</option>
                  <option value="media">{language === "vi" ? "Truyền Thông" : "Media"}</option>
                  <option value="other">{language === "vi" ? "Khác" : "Other"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">{t.message}</label>
                <textarea
                  placeholder={
                    language === "vi"
                      ? "Chia sẻ thêm chi tiết về yêu cầu của bạn..."
                      : "Share more details about your request..."
                  }
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gold/30 text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-3 text-lg neon-glow"
              >
                <Send size={20} />
                {t.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
