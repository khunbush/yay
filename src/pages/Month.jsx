import React, { useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getMemoryYear, isMonthLocked, yearQuery } from '@/components/memoryYears';
import MemoryCarousel from '@/components/MemoryCarousel';
import { preloadMonthImages } from '@/components/ImagePreloader';
import Month2026 from '@/components/memories2026/Month2026';

export default function Month() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const monthIndex = parseInt(searchParams.get('index') || '0');
  const yearData = getMemoryYear(searchParams.get('year'));
  const { year, months } = yearData;
  const locked = isMonthLocked(yearData, monthIndex);
  const overviewUrl = [createPageUrl('Overview'), yearQuery(year)].filter(Boolean).join('?');
  const monthUrl = (index) => `${createPageUrl('Month')}?${[yearQuery(year), `index=${index}`].filter(Boolean).join('&')}`;
  const hasNextMonth = monthIndex < 11 && !isMonthLocked(yearData, monthIndex + 1);
  
  // Security check
  useEffect(() => {
    if (sessionStorage.getItem('bushy_meme_unlocked') !== 'true') {
      navigate(createPageUrl('Index'), { replace: true });
    }
  }, [navigate]);

  // Months without memories yet aren't open
  useEffect(() => {
    if (locked) navigate(overviewUrl, { replace: true });
  }, [locked, navigate, overviewUrl]);

  // Scroll to top on month change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [monthIndex]);

  // Track viewed months
  useEffect(() => {
    if (isNaN(monthIndex)) return;
    // Don't record progress for locked visitors (the guard above is about to redirect them)
    if (sessionStorage.getItem('bushy_meme_unlocked') !== 'true') return;

    // Progress only counts toward 2025's meme's faq
    if (yearData.secret) {
      try {
        const viewed = JSON.parse(localStorage.getItem('bushy_meme_viewed_months') || '[]');
        if (!viewed.includes(monthIndex)) {
          const newViewed = [...viewed, monthIndex];
          localStorage.setItem('bushy_meme_viewed_months', JSON.stringify(newViewed));
        }
      } catch (e) {
        console.error("Failed to save progress", e);
      }
    }

    // Preload neighbors
    const timeout = setTimeout(() => {
        if (monthIndex < 11) preloadMonthImages(monthIndex + 1, year);
        if (monthIndex > 0) preloadMonthImages(monthIndex - 1, year);
    }, 100);

    return () => clearTimeout(timeout);
  }, [monthIndex, year, yearData.secret]);

  const monthData = months.find(m => m.monthIndex === monthIndex);
  
  if (!monthData || locked) return null;

  if (year === 2026) return <Month2026 yearData={yearData} monthIndex={monthIndex} />;

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
        <Link to={overviewUrl} onClick={playTapSound}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 -ml-2 text-slate-600">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-700">{monthData.monthName}</h2>
          <p className="text-xs text-slate-400 font-medium tracking-wide">{year}</p>
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
          {hasNextMonth ? (
            <Link to={monthUrl(monthIndex + 1)} onClick={playTapSound}>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full h-14 rounded-full bg-white/60 border border-white/50 text-slate-600 font-medium text-lg hover:bg-white hover:text-slate-800 shadow-sm transition-all"
                >
                  Next: {months[monthIndex + 1]?.monthName} →
                </Button>
              </motion.div>
            </Link>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-slate-400 text-sm font-medium">
                {monthIndex < 11 ? 'more coming soon 💙' : `End of ${year} 💙`}
              </p>
              <Link to={overviewUrl} onClick={playTapSound}>
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full h-14 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 text-white font-medium text-lg hover:opacity-90 shadow-lg shadow-purple-100 transition-all border-none"
                  >
                    Back to {year} Overview
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
