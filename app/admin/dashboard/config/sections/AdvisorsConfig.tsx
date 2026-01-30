"use client"

import { useState } from "react"
import { AdvisorsSectionData, AdvisorItem, CmsSectionProps } from "@/types/cms"
import { Plus, Trash2, Upload, Users, Image as ImageIcon, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function AdvisorsConfig({ data, updateData }: CmsSectionProps<AdvisorsSectionData>) {
  const [uploadingId, setUploadingId] = useState<string | null>(null)

  // Chỉ tập trung vào advisors
  const safeAdvisors = data.advisors || []

  const addAdvisor = () => {
    const newItem: AdvisorItem = { 
      id: `adv-${Date.now()}`, 
      name_vi: "", 
      name_en: "", 
      role_vi: "", 
      role_en: "", 
      bio_vi: "", 
      bio_en: "", 
      image: "" 
    }
    updateData({ ...data, advisors: [...safeAdvisors, newItem] })
  }

  const updateAdvisor = (id: string, fields: Partial<AdvisorItem>) => {
    const updated = safeAdvisors.map(a => a.id === id ? { ...a, ...fields } : a)
    updateData({ ...data, advisors: updated })
  }

  return (
    <div className="space-y-10 pb-24 font-sans text-slate-900">
      {/* 1. HEADER SECTION */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-black uppercase text-primary italic flex items-center gap-2">
          <Users size={18}/> Nội dung chính Section Cố Vấn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-4">Tiêu đề (VI)</label>
            <input className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-xs font-black" 
              value={data.title_vi || ""} onChange={e => updateData({...data, title_vi: e.target.value})} placeholder="Ban Cố Vấn" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-4">Title (EN)</label>
            <input className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-xs font-black text-blue-600" 
              value={data.title_en || ""} onChange={e => updateData({...data, title_en: e.target.value})} placeholder="Advisory Board" />
          </div>
        </div>
      </div>

      {/* 2. ADVISORS LIST */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-6">
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Danh sách thành viên</h4>
          <button onClick={addAdvisor} className="bg-primary text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            + THÊM CỐ VẤN MỚI
          </button>
        </div>

        {safeAdvisors.map((advisor) => (
          <div key={advisor.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8 group relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Upload Ảnh */}
              <div className="lg:col-span-3">
                <label className="aspect-4/5 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group/img">
                  {advisor.image ? <img src={advisor.image} className="w-full h-full object-cover" /> : <ImageIcon size={40} className="text-slate-200" />}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all">
                    <Upload className="text-white" />
                  </div>
                  <input type="file" className="hidden" onChange={async (e) => {
                    if (!e.target.files?.[0]) return;
                    setUploadingId(advisor.id);
                    const path = `advisors/${Date.now()}.png`;
                    await supabase.storage.from('sifs-images').upload(path, e.target.files[0]);
                    const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path);
                    updateAdvisor(advisor.id, { image: publicUrl });
                    setUploadingId(null);
                  }} />
                  {uploadingId === advisor.id && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}
                </label>
              </div>

              {/* Thông tin */}
              <div className="lg:col-span-9 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input className="px-6 py-4 bg-slate-50 rounded-2xl text-xs font-black" value={advisor.name_vi} onChange={e => updateAdvisor(advisor.id, { name_vi: e.target.value })} placeholder="Tên (VI)" />
                  <input className="px-6 py-4 bg-slate-50 rounded-2xl text-xs font-black text-blue-600" value={advisor.name_en} onChange={e => updateAdvisor(advisor.id, { name_en: e.target.value })} placeholder="Name (EN)" />
                  <input className="px-6 py-4 bg-slate-100 rounded-2xl text-[11px] font-bold italic" value={advisor.role_vi} onChange={e => updateAdvisor(advisor.id, { role_vi: e.target.value })} placeholder="Chức danh (VI)" />
                  <input className="px-6 py-4 bg-slate-100 rounded-2xl text-[11px] font-bold italic text-blue-600" value={advisor.role_en} onChange={e => updateAdvisor(advisor.id, { role_en: e.target.value })} placeholder="Role (EN)" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <textarea className="px-6 py-4 bg-slate-50 rounded-2xl text-[11px] font-medium h-24 italic" value={advisor.bio_vi} onChange={e => updateAdvisor(advisor.id, { bio_vi: e.target.value })} placeholder="Mô tả tiểu sử (VI)..." />
                  <textarea className="px-6 py-4 bg-slate-50 rounded-2xl text-[11px] font-medium h-24 italic text-blue-600" value={advisor.bio_en} onChange={e => updateAdvisor(advisor.id, { bio_en: e.target.value })} placeholder="Bio detail (EN)..." />
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                if(confirm("Xóa cố vấn này?")) {
                  updateData({...data, advisors: safeAdvisors.filter(a => a.id !== advisor.id)});
                }
              }} 
              className="absolute top-6 right-6 p-3 text-slate-200 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}