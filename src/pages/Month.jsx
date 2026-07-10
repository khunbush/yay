import React, { useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { memories2025 } from '@/components/memories';
import BlurImage from '@/components/BlurImage';
import MemoryCarousel from '@/components/MemoryCarousel';
import { preloadMonthImages } from '@/components/ImagePreloader';

export default function Month() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const monthIndex = parseInt(searchParams.get('index') || '0');
  
  // Security check
  useEffect(() => {
    if (sessionStorage.getItem('bushy_meme_unlocked') !== 'true') {
      navigate(createPageUrl('Index'), { replace: true });
    }
  }, [navigate]);

  // Scroll to top on month change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [monthIndex]);

  // Track viewed months
  useEffect(() => {
    if (isNaN(monthIndex)) return;
    // Don't record progress for locked visitors (the guard above is about to redirect them)
    if (sessionStorage.getItem('bushy_meme_unlocked') !== 'true') return;

    try {
      const viewed = JSON.parse(localStorage.getItem('bushy_meme_viewed_months') || '[]');
      if (!viewed.includes(monthIndex)) {
        const newViewed = [...viewed, monthIndex];
        localStorage.setItem('bushy_meme_viewed_months', JSON.stringify(newViewed));
      }
    } catch (e) {
      console.error("Failed to save progress", e);
    }

    // Preload neighbors
    const timeout = setTimeout(() => {
        if (monthIndex < 11) preloadMonthImages(monthIndex + 1);
        if (monthIndex > 0) preloadMonthImages(monthIndex - 1);
    }, 100);

    return () => clearTimeout(timeout);
  }, [monthIndex]);

  const monthData = memories2025.find(m => m.monthIndex === monthIndex);
  
  if (!monthData) return null;

  return (
    <div className="min-h-screen bg-blue-50 pb-32 font-sans">
      <style>{`
        ::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Sticky Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-blue-50/90 backdrop-blur-xl sticky top-0 z-30 pt-12 pb-4 px-4 flex items-center justify-between"
      >
        <Link to={createPageUrl('Overview')} onClick={playTapSound}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 -ml-2 text-slate-600">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-700">{monthData.monthName}</h2>
          <p className="text-xs text-slate-400 font-medium tracking-wide">2025</p>
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </motion.header>

      {/* Content Feed */}
      <div className="space-y-24 pt-8">
        {monthData.memories.map((memory, memIndex) => (
          <motion.div 
            key={memIndex} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            className="space-y-8 relative"
            >
            {/* Soft Divider */}
            {memIndex > 0 && (
               <div className="w-24 h-[1px] bg-slate-300/20 rounded-full mx-auto absolute -top-12 left-0 right-0" />
            )}
            
            {/* Text Card */}
            <div className="px-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-sm border border-white/50">
                <p className="text-slate-700 leading-relaxed text-lg font-serif whitespace-pre-wrap">
                  {memory.text}
                </p>
              </div>
            </div>

            {/* Photo Carousel */}
            {memory.photos && memory.photos.length > 0 && (
              <MemoryCarousel 
                key={`${monthIndex}-${memIndex}`}
                photos={memory.photos}
                monthName={monthData.monthName}
                memIndex={memIndex}
              />
            )}
          </motion.div>
        ))}
        
        {/* Next Month Navigation */}
        <div className="px-6 pb-8 pt-4">
          {monthIndex < 11 ? (
            <Link to={`${createPageUrl('Month')}?index=${monthIndex + 1}`} onClick={playTapSound}>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full h-14 rounded-full bg-white/60 border border-white/50 text-slate-600 font-medium text-lg hover:bg-white hover:text-slate-800 shadow-sm transition-all"
                >
                  Next: {memories2025[monthIndex + 1]?.monthName} →
                </Button>
              </motion.div>
            </Link>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-slate-400 text-sm font-medium">End of 2025 💙</p>
              <Link to={createPageUrl('Overview')} onClick={playTapSound}>
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full h-14 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 text-white font-medium text-lg hover:opacity-90 shadow-lg shadow-purple-100 transition-all border-none"
                  >
                    Back to 2025 Overview
                  </Button>
                </motion.div>
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Spacer */}
        <div className="h-24" />
      </div>
    </div>
  );
}
