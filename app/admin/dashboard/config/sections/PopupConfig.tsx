//D:\Website\SIFS2026\app\admin\dashboard\config\sections\PopupConfig.tsx
"use client"

import { useState } from "react"
import { PopupSectionData, CmsSectionProps } from "@/types/cms"
import { Upload, Image as ImageIcon, Loader2, Settings2, Power, Clock, ExternalLink, Layout } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function PopupConfig({ data, updateData }: CmsSectionProps<PopupSectionData>) {
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files?.[0]) return
      setUploading(true)
      const file = e.target.files[0]
      const path = `popups/banner-${Date.now()}.png`
      await supabase.storage.from('sifs-images').upload(path, file)
      const { data: { publicUrl } } = supabase.storage.from('sifs-images').getPublicUrl(path)
      
      updateData({ ...data, image_url: publicUrl })
      toast.success("Đã cập nhật ảnh Popup!")
    } catch (err: any) { toast.error(err.message) } finally { setUploading(false) }
  }

  return (
    <div className="space-y-10 pb-24 font-sans text-slate-900">
      {/* 1. TRẠNG THÁI & VỊ TRÍ */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center justify-between border-b border-slate-50 pb-6">
            <h3 className="text-sm font-black uppercase text-primary italic flex items-center gap-2">
                <Settings2 size={18}/> Cấu hình hiển thị
            </h3>
            <button 
                onClick={() => updateData({...data, is_active: !data.is_active})}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black transition-all ${
                    data.is_active ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20" : "bg-slate-100 text-slate-400"
                }`}
            >
                <Power size={14}/> {data.is_active ? "ĐANG BẬT" : "ĐANG TẮT"}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic flex items-center gap-2"><Layout size={12}/> Vị trí</label>
                <select 
                    value={data.position} 
                    onChange={e => updateData({...data, position: e.target.value as any})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-xs font-black outline-none appearance-none"
                >
                    <option value="center">Giữa màn hình (Center)</option>
                    <option value="bottom-right">Góc dưới phải (Small)</option>
                    <option value="bottom-left">Góc dưới trái (Small)</option>
                </select>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic flex items-center gap-2"><Clock size={12}/> Độ trễ (Giây)</label>
                <input type="number" value={data.delay_seconds} onChange={e => updateData({...data, delay_seconds: Number(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-xs font-black" />
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 italic flex items-center gap-2"><Clock size={12}/> Hiện lại sau (Giờ)</label>
                <input type="number" value={data.reappear_hours} onChange={e => updateData({...data, reappear_hours: Number(e.target.value)})} className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-xs font-black" />
            </div>
        </div>
      </div>

      {/* 2. NỘI DUNG POPUP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase text-slate-400 italic flex items-center gap-2"><ImageIcon size={18}/> Banner Popup</h3>
            <label className="aspect-square bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group">
                {data.image_url ? (
                    <img src={data.image_url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                ) : (
                    <div className="text-center text-slate-300">
                        <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Chưa có ảnh</p>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <Upload className="text-white" />
                </div>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}
            </label>
        </div>

        <div className="lg:col-span-7 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase text-slate-400 italic flex items-center gap-2"><ExternalLink size={18}/> Nội dung & Link</h3>
            <div className="space-y-6">
                <input className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl text-xs font-black" value={data.title_vi} onChange={e => updateData({...data, title_vi: e.target.value})} placeholder="Tiêu đề Popup (VI)" />
                <input className="w-full px-8 py-5 bg-slate-50 border-none rounded-2xl text-xs font-black text-blue-600" value={data.title_en} onChange={e => updateData({...data, title_en: e.target.value})} placeholder="Title (EN)" />
                <div className="pt-4 border-t border-slate-50">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Đường dẫn khi nhấn nút (Link)</label>
                    <input className="w-full px-8 py-5 bg-primary/5 border border-primary/10 rounded-2xl text-xs font-bold text-primary" value={data.link} onChange={e => updateData({...data, link: e.target.value})} placeholder="https://..." />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}