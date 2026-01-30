"use client"

import { useState } from "react"
import { PartnersSectionData, CmsSectionProps, PartnerGroup, PartnerBrand } from "@/types/cms"
import { Plus, Trash2, Upload, Building2, Link as LinkIcon, Loader2, MoveDown } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function PartnersConfig({ data, updateData }: CmsSectionProps<PartnersSectionData>) {
  const [uploadingId, setUploadingId] = useState<string | null>(null)

  const addGroup = () => {
    const newGroup: PartnerGroup = {
      id: `group-${Date.now()}`,
      group_name_vi: "Nhóm đối tác mới",
      group_name_en: "New Partner Group",
      brands: []
    }
    updateData({ ...data, groups: [...(data.groups || []), newGroup] })
  }

  const addBrand = (groupId: string) => {
    const newBrand: PartnerBrand = {
      id: `brand-${Date.now()}`,
      name: "",
      logo_url: "",
      website_url: ""
    }
    const updatedGroups = data.groups.map(g => 
      g.id === groupId ? { ...g, brands: [...g.brands, newBrand] } : g
    )
    updateData({ ...data, groups: updatedGroups })
  }

  const updateBrand = (groupId: string, brandId: string, fields: Partial<PartnerBrand>) => {
    const updatedGroups = data.groups.map(g => {
      if (g.id === groupId) {
        return { ...g, brands: g.brands.map(b => b.id === brandId ? { ...b, ...fields } : b) }
      }
      return g
    })
    updateData({ ...data, groups: updatedGroups })
  }

  return (
    <div className="space-y-10 pb-24 text-slate-900">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black italic uppercase text-primary flex items-center gap-2">
          <Building2 /> Hệ thống Đối tác & Tài trợ
        </h3>
        <button onClick={addGroup} className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2">
          <Plus size={14}/> Thêm nhóm mới
        </button>
      </div>

      {data.groups?.map((group) => (
        <div key={group.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm space-y-6 relative group">
          <button 
            onClick={() => updateData({...data, groups: data.groups.filter(g => g.id !== group.id)})}
            className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Trash2 size={18}/>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <input 
              className="bg-slate-50 p-4 rounded-xl text-xs font-black uppercase italic border-none focus:ring-2 focus:ring-primary" 
              value={group.group_name_vi} 
              onChange={e => {
                const updated = data.groups.map(g => g.id === group.id ? {...g, group_name_vi: e.target.value} : g)
                updateData({...data, groups: updated})
              }}
            />
            <input 
              className="bg-slate-50 p-4 rounded-xl text-xs font-black uppercase italic border-none text-blue-600" 
              value={group.group_name_en}
              onChange={e => {
                const updated = data.groups.map(g => g.id === group.id ? {...g, group_name_en: e.target.value} : g)
                updateData({...data, groups: updated})
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {group.brands.map((brand) => (
              <div key={brand.id} className="relative p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3 group/brand">
                <label className="aspect-video bg-white rounded-xl border border-dashed border-slate-200 flex items-center justify-center cursor-pointer overflow-hidden relative">
                  {brand.logo_url ? <img src={brand.logo_url} className="object-contain p-2 h-full" /> : <Upload size={16} className="text-slate-300"/>}
                  <input type="file" className="hidden" onChange={async (e) => {
                    if (!e.target.files?.[0]) return;
                    setUploadingId(brand.id);
                    const path = `brands/${Date.now()}.png`;
                    await supabase.storage.from('sifs-images').upload(path, e.target.files[0]);
                    const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path);
                    updateBrand(group.id, brand.id, { logo_url: publicUrl });
                    setUploadingId(null);
                  }} />
                  {uploadingId === brand.id && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={14}/></div>}
                </label>
                
                <input 
                  className="w-full text-[9px] font-black uppercase bg-transparent border-b border-slate-200 focus:border-primary outline-none" 
                  placeholder="Tên đối tác" 
                  value={brand.name}
                  onChange={e => updateBrand(group.id, brand.id, { name: e.target.value })}
                />
                <input 
                  className="w-full text-[9px] text-primary bg-transparent outline-none italic" 
                  placeholder="Website URL" 
                  value={brand.website_url}
                  onChange={e => updateBrand(group.id, brand.id, { website_url: e.target.value })}
                />
                
                <button 
                  onClick={() => {
                    const updated = group.brands.filter(b => b.id !== brand.id)
                    const updatedGroups = data.groups.map(g => g.id === group.id ? {...g, brands: updated} : g)
                    updateData({...data, groups: updatedGroups})
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover/brand:opacity-100 transition-all"
                >
                  <Plus size={10} className="rotate-45" />
                </button>
              </div>
            ))}
            <button 
              onClick={() => addBrand(group.id)}
              className="aspect-video border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300 hover:text-primary hover:border-primary transition-all"
            >
              <Plus size={20}/>
              <span className="text-[8px] font-black uppercase mt-1">Thêm Logo</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}