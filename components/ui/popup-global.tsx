"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight } from "lucide-react"

export default function PopupGlobal({ data, language }: { data: any, language: string }) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    // 1. Kiểm tra xem Admin có đang BẬT popup không
    if (!data?.is_active) {
      console.log("Popup đang tắt trong Admin");
      return;
    }

    // 2. Lấy dữ liệu và ép kiểu về Number để tránh lỗi so sánh string vs number
    const reappHours = Number(data.reappear_hours) || 0;
    const delaySecs = Number(data.delay_seconds) || 0;
    
    const lastShown = localStorage.getItem("popup_last_shown");
    const now = new Date().getTime();
    
    // 3. Tính toán thời gian đã trôi qua (giờ)
    // Nếu chưa từng hiện (lastShown null) thì cho một số rất lớn để luôn thỏa mãn điều kiện
    const hoursPast = lastShown ? (now - parseInt(lastShown)) / (1000 * 60 * 60) : 999999;

    console.log(`Kiểm tra Popup: Đã qua ${hoursPast.toFixed(2)}h / Yêu cầu ${reappHours}h`);

    // 4. Nếu thời gian đã trôi qua lớn hơn hoặc BẰNG yêu cầu (đặc biệt là 0h)
    if (hoursPast >= reappHours) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        console.log("Popup ĐÃ HIỆN!");
      }, delaySecs * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("popup_last_shown", new Date().getTime().toString())
  }

  if (!isVisible || !data) return null;

  // FIX LỖI 2322: Ép kiểu để TypeScript hiểu data.position chắc chắn hợp lệ
  const posClasses: Record<string, string> = {
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'bottom-right': 'bottom-10 right-10',
    'bottom-left': 'bottom-10 left-10'
  }

  const currentPos = data.position || 'center'
  const activeClass = posClasses[currentPos as keyof typeof posClasses] || posClasses.center

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {/* Overlay nếu ở giữa màn hình */}
        {currentPos === 'center' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`fixed ${activeClass} w-[90%] max-w-[450px] pointer-events-auto`}
        >
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/10 relative">
            <button onClick={handleClose} className="absolute top-5 right-5 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all">
              <X size={20} />
            </button>

            {data.image_url && (
              <div className="aspect-square w-full relative">
                <img src={data.image_url} className="w-full h-full object-cover" alt="Promotion" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}

            <div className="p-10 text-center space-y-6 bg-[#050505] text-white">
              <h3 className="text-2xl font-black italic font-serif uppercase tracking-tighter leading-tight">
                {language === "vi" ? data.title_vi : data.title_en}
              </h3>
              <button 
                onClick={() => { if(data.link) window.location.href = data.link }}
                className="w-full py-4 bg-primary text-white font-black uppercase text-[10px] tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-xl shadow-primary/20"
              >
                {language === "vi" ? "KHÁM PHÁ NGAY" : "EXPLORE NOW"} <ArrowRight size={16}/>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}