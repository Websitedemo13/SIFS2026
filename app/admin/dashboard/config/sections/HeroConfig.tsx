"use client";

import React, { useState } from "react";
import { HeroSectionData, CmsSectionProps, HeroSlide } from "@/types/cms";
import { supabase } from "@/lib/supabase";
import { 
  Upload, Palette, Loader2, Trash2, Plus, 
  Monitor, Layers, Type, CheckSquare, Square, Video, Link2, MousePointer2
} from "lucide-react";
import { toast } from "sonner";

export default function HeroConfig({ data, updateData }: CmsSectionProps<HeroSectionData>) {
  const [uploading, setUploading] = useState(false);

  if (!data) return null;

  const patchData = (fields: Partial<HeroSectionData>) => {
    updateData({ ...data, ...fields });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const isVideo = file.type.startsWith('video');
      const fileName = `hero-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;
      const { error } = await supabase.storage.from("sifs-assets").upload(filePath, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("sifs-assets").getPublicUrl(filePath);

      const newSlide: HeroSlide = {
        id: Math.random().toString(36).slice(2),
        type: isVideo ? 'video' : 'image',
        url: publicUrl
      };

      const currentSlides = data.slides || [];
      patchData({ 
        slides: [...currentSlides, newSlide],
        use_carousel: [...currentSlides, newSlide].length > 1
      });
      toast.success("Tải lên thành công!");
    } catch (err: any) {
      toast.error("Lỗi upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeSlide = (id: string) => {
    const newSlides = (data.slides || []).filter(s => s.id !== id);
    patchData({ slides: newSlides, use_carousel: newSlides.length > 1 });
  };

  return (
    <div className="space-y-8 pb-32 text-slate-900 animate-in fade-in duration-700">
      
      {/* SECTION 1: KHO MEDIA */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 italic">
            <Layers size={14} /> 1. Quản lý Ảnh bìa & Video
          </h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.slides?.map((slide) => (
            <div key={slide.id} className="relative group aspect-video rounded-3xl overflow-hidden border border-slate-200 bg-slate-900">
              {slide.type === 'image' ? (
                <img src={slide.url} className="w-full h-full object-cover" alt="slide" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black text-white text-[8px] font-black uppercase italic gap-2">
                  <Video size={16} className="text-secondary opacity-50"/> Video Slide
                </div>
              )}
              <button onClick={() => removeSlide(slide.id)} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                <Trash2 size={12}/>
              </button>
            </div>
          ))}
          <label className={`aspect-video border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer transition-all ${uploading ? 'opacity-50' : 'hover:border-primary'}`}>
            {uploading ? <Loader2 className="animate-spin text-primary" /> : <Plus className="text-slate-300" />}
            <span className="text-[9px] font-black text-slate-400">THÊM MEDIA</span>
            <input type="file" hidden accept="image/*,video/*" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {/* SECTION 2: STYLE */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 italic">
          <Palette size={14} /> 2. Hiển thị & Tương phản
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Đồng hồ', key: 'show_countdown' },
            { label: 'Thẻ Thông tin', key: 'show_info_card' },
            { label: 'Nút chính', key: 'show_cta1' },
            { label: 'Nút phụ', key: 'show_cta2' }
          ].map(item => (
            <div key={item.key} onClick={() => patchData({ [item.key]: !data[item.key as keyof HeroSectionData] })} className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${data[item.key as keyof HeroSectionData] ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-100'}`}>
              <span className={`text-[9px] font-black uppercase ${data[item.key as keyof HeroSectionData] ? 'text-white' : 'text-slate-400'}`}>{item.label}</span>
              {data[item.key as keyof HeroSectionData] ? <CheckSquare size={16} className="text-primary"/> : <Square size={16} className="text-slate-200"/>}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: VĂN BẢN */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 italic">3. Nội dung văn bản</h4>
        <input className="w-full px-6 py-5 rounded-3xl bg-slate-50 text-2xl font-black italic" value={data.title} onChange={e => patchData({ title: e.target.value })} placeholder="TIÊU ĐỀ CHÍNH" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4 p-6 bg-slate-50 rounded-4xl border border-slate-200">
              <span className="text-[10px] font-black uppercase text-slate-400">NỘI DUNG (VI)</span>
              <input className="w-full px-5 py-3 rounded-xl bg-white text-xs font-bold" value={data.subtitle_vi} onChange={e => patchData({ subtitle_vi: e.target.value })} placeholder="Subtitle" />
              <textarea className="w-full px-5 py-3 rounded-xl bg-white text-[10px] italic min-h-20" value={data.tagline_vi} onChange={e => patchData({ tagline_vi: e.target.value })} placeholder="Tagline" />
           </div>
           <div className="space-y-4 p-6 bg-slate-50 rounded-4xl border border-slate-200">
              <span className="text-[10px] font-black uppercase text-slate-400">CONTENT (EN)</span>
              <input className="w-full px-5 py-3 rounded-xl bg-white text-xs font-bold" value={data.subtitle_en} onChange={e => patchData({ subtitle_en: e.target.value })} placeholder="Subtitle" />
              <textarea className="w-full px-5 py-3 rounded-xl bg-white text-[10px] italic min-h-20" value={data.tagline_en} onChange={e => patchData({ tagline_en: e.target.value })} placeholder="Tagline" />
           </div>
        </div>
      </div>

      {/* =========================================================
          SECTION 4: QUẢN LÝ NÚT BẤM & LINK (Cái này Long đang thiếu nè!)
      ========================================================= */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 space-y-8 shadow-sm">
        <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 italic">
          <MousePointer2 size={16} /> 4. Cấu hình Nút bấm & Đường dẫn (CTA)
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CẤU HÌNH NÚT 1: ĐĂNG KÝ GIAN HÀNG */}
          <div className="p-8 bg-red-50/30 rounded-[2.5rem] border border-red-100 space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 italic">
              <Link2 size={14}/> Nút chính (Ví dụ: Đăng ký gian hàng)
            </div>
            <div className="space-y-3">
               <input 
                className="w-full px-6 py-4 bg-white border border-red-50 rounded-2xl text-xs font-bold shadow-sm" 
                value={data.cta1_vi} 
                onChange={e => patchData({ cta1_vi: e.target.value })} 
                placeholder="Tên nút (VI)" 
              />
              <input 
                className="w-full px-6 py-4 bg-white border border-red-100 rounded-2xl text-[10px] font-bold text-red-600 shadow-sm" 
                value={data.cta1_link || ""} 
                onChange={e => patchData({ cta1_link: e.target.value })} 
                placeholder="Dán link vào đây (https://...)" 
              />
            </div>
          </div>

          {/* CẤU HÌNH NÚT 2: TÀI TRỢ NGAY */}
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 italic">
              <Link2 size={14}/> Nút phụ (Ví dụ: Tài trợ ngay)
            </div>
            <div className="space-y-3">
               <input 
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold shadow-sm" 
                value={data.cta2_vi} 
                onChange={e => patchData({ cta2_vi: e.target.value })} 
                placeholder="Tên nút (VI)" 
              />
              <input 
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-600 shadow-sm" 
                value={data.cta2_link || ""} 
                onChange={e => patchData({ cta2_link: e.target.value })} 
                placeholder="Dán link vào đây (https://...)" 
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}