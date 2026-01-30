"use client"

import { motion } from "framer-motion"
import { PartnersSectionData } from "@/types/cms"

export default function PartnersSection({ language, data }: { language: string, data: PartnersSectionData | undefined }) {
  if (!data || !data.groups || data.groups.length === 0) return null;

  return (
    /* NỀN TRẮNG TINH KHÔI */
    <section className="py-24 bg-white border-t border-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        
        {data.groups.map((group, idx) => (
          <motion.div 
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-16"
          >
            {/* Tên nhóm đối tác - Size chữ 7xl ngang tầm các Section khác */}
            <div className="flex flex-col items-center gap-6">
              <h3 className="text-4xl md:text-7xl font-black text-slate-900 font-serif italic uppercase tracking-tighter text-center leading-tight">
                {language === "vi" ? group.group_name_vi : group.group_name_en}
              </h3>
              <div className="w-20 h-1.5 bg-primary rounded-full opacity-20" />
            </div>

            {/* Grid Logo - Hiện màu gốc cực xịn */}
            <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-16">
              {group.brands.map((brand) => (
                <a 
                  key={brand.id}
                  href={brand.website_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transition-all duration-500"
                >
                  {brand.logo_url ? (
                    <div className="relative p-4 rounded-3xl transition-all duration-500 group-hover:bg-slate-50 group-hover:shadow-xl group-hover:-translate-y-2">
                      <img 
                        src={brand.logo_url} 
                        alt={brand.name} 
                        /* HIỆN MÀU GỐC: Bỏ filter grayscale, chỉ giữ độ sắc nét */
                        className="h-12 md:h-20 w-auto object-contain transition-all duration-500" 
                      />
                    </div>
                  ) : (
                    <span className="text-2xl font-black text-slate-300 group-hover:text-primary transition-all italic uppercase tracking-tighter">
                      {brand.name}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}