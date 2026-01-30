"use client"

import { motion } from "framer-motion"
import { PartnersSectionData } from "@/types/cms"

export default function PartnersSection({ language, data }: { language: string, data: PartnersSectionData | undefined }) {
  if (!data || !data.groups || data.groups.length === 0) return null;

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {data.groups.map((group, idx) => (
          <motion.div 
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-10"
          >
            {/* Tên nhóm đối tác */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <h3 className="text-[30px] font-black tracking-[0.4em] text-primary uppercase italic">
                {language === "vi" ? group.group_name_vi : group.group_name_en}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Grid Logo */}
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
              {group.brands.map((brand) => (
                <a 
                  key={brand.id}
                  href={brand.website_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative transition-all duration-500"
                >
                  {brand.logo_url ? (
                    <img 
                      src={brand.logo_url} 
                      alt={brand.name} 
                      className="h-12 md:h-16 w-auto object-contain " 
                    />
                  ) : (
                    <span className="text-xl font-black text-white/30 group-hover:text-primary transition-all italic">
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