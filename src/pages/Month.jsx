import React, { useEffect, useRef } from 'react';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from 'sonner';
import { memories2025 } from '@/components/memories';
import MemoryCarousel from '@/components/MemoryCarousel';
import { preloadMonthImages } from '@/components/ImagePreloader';
import { isUnlocked, markMonthViewed, TOTAL_MONTHS } from '@/lib/gameState';
import { completionCelebration } from '@/lib/celebrate';

const parseMonthIndex = (raw) => {
  const parsed = Number.parseInt(raw ?? '0', 10);
  return Number.isInteger(parsed) && parsed >= 0 && parsed < TOTAL_MONTHS ? parsed : null;
};

export default function Month() {
  const [searchParams] = useSearchParams();
  const monthIndex = parseMonthIndex(searchParams.get('index'));
  const endRef = useRef(null);

  // Scroll to top on month change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [monthIndex]);

  // A month only counts as "viewed" once the reader actually reaches the end
  // of it — just opening the URL isn't enough to farm the 12/12 FAQ unlock.
  useEffect(() => {
    if (monthIndex === null || !isUnlocked()) return;
    const el = endRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const { added, count } = markMonthViewed(monthIndex);
      if (!added) return;
      if (count >= TOTAL_MONTHS) {
        completionCelebration();
        toast(`All 12 months! meme's faq is unlocked 🎉`, {
          position: 'bottom-center',
          duration: 4000,
          style: { background: '#1e293b', color: '#fff', borderRadius: '99px', textAlign: 'center' }
        });
      } else {
        toast(`${memories2025.find(m => m.monthIndex === monthIndex)?.monthName} done 💙 (${count}/12)`, {
          position: 'bottom-center',
          style: { background: '#1e293b', color: '#fff', borderRadius: '99px', textAlign: 'center' }
        });
      }
    }, { threshold: 0.1 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [monthIndex]);

  // Preload neighbor months for instant next/prev navigation
  useEffect(() => {
    if (monthIndex === null || !isUnlocked()) return;
    const timeout = setTimeout(() => {
      if (monthIndex < TOTAL_MONTHS - 1) preloadMonthImages(monthIndex + 1);
      if (monthIndex > 0) preloadMonthImages(monthIndex - 1);
    }, 100);
    return () => clearTimeout(timeout);
  }, [monthIndex]);

  if (!isUnlocked()) {
    return <Navigate to={createPageUrl('Index')} replace />;
  }

  const monthData = monthIndex === null
    ? null
    : memories2025.find(m => m.monthIndex === monthIndex);

  // Bad or missing month index — send them back to the grid instead of a blank page
  if (!monthData) {
    return <Navigate to={createPageUrl('Overview')} replace />;
  }

  const prevMonth = monthIndex > 0 ? memories2025.find(m => m.monthIndex === monthIndex - 1) : null;
  const nextMonth = monthIndex < TOTAL_MONTHS - 1 ? memories2025.find(m => m.monthIndex === monthIndex + 1) : null;

  return (
    <div className="min-h-screen bg-blue-50 pb-32 font-sans">
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

        {/* Reaching this sentinel is what marks the month as viewed */}
        <div ref={endRef} className="h-1" aria-hidden="true" />

        {/* Prev / Next Month Navigation */}
        <div className="px-6 pb-8 pt-4 space-y-3">
          <div className="flex gap-3">
            {prevMonth && (
              <Link
                to={`${createPageUrl('Month')}?index=${monthIndex - 1}`}
                onClick={playTapSound}
                className="flex-1"
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-14 rounded-full bg-white/60 border border-white/50 text-slate-600 font-medium text-base hover:bg-white hover:text-slate-800 shadow-sm transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> {prevMonth.monthName}
                  </Button>
                </motion.div>
              </Link>
            )}
            {nextMonth && (
              <Link
                to={`${createPageUrl('Month')}?index=${monthIndex + 1}`}
                onClick={playTapSound}
                className="flex-1"
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-14 rounded-full bg-white/60 border border-white/50 text-slate-600 font-medium text-base hover:bg-white hover:text-slate-800 shadow-sm transition-all"
                  >
                    {nextMonth.monthName} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              </Link>
            )}
          </div>

          {!nextMonth && (
            <div className="space-y-3 pt-2">
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
