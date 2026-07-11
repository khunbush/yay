import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cover2024, memories2024 } from '@/components/memories2024';
import BlurImage from '@/components/BlurImage';
import MemoryCarousel from '@/components/MemoryCarousel';
import { isUnlocked } from '@/lib/gameState';

export default function Memories2024() {
  // Scroll to top on open
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isUnlocked()) {
    return <Navigate to={createPageUrl('Index')} replace />;
  }

  const lastIndex = memories2024.length - 1;

  return (
    <div className="min-h-screen bg-blue-50 pb-32 font-sans">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-blue-50/90 backdrop-blur-xl sticky top-0 z-30 pt-12 pb-4 px-4 flex items-center justify-between"
      >
        <Link to={createPageUrl('Years')} onClick={playTapSound}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 -ml-2 text-slate-600">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-700">Memories with memee🩵</h2>
          <p className="text-xs text-slate-400 font-medium tracking-wide">2024</p>
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </motion.header>

      {/* Cover */}
      {cover2024.photo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="px-6 pt-4"
        >
          <div className="rounded-[2.5rem] overflow-hidden shadow-md border border-white/40 relative aspect-[4/5] bg-white/30">
            <BlurImage src={cover2024.photo} alt="2024 album cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/50 to-transparent pt-16 pb-6 px-6">
              <p className="text-white font-bold text-2xl font-serif drop-shadow">{cover2024.title}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Feed */}
      <div className="space-y-24 pt-16">
        {memories2024.map((spread, spreadIndex) => (
          <motion.div
            key={spreadIndex}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            className="space-y-8 relative"
          >
            {/* Soft Divider */}
            {spreadIndex > 0 && (
              <div className="w-24 h-[1px] bg-slate-300/20 rounded-full mx-auto absolute -top-12 left-0 right-0" />
            )}

            {/* Text Cards */}
            {spread.texts.map((text, ti) => (
              <div key={ti} className="px-6">
                <div className={`backdrop-blur-sm rounded-[2.5rem] p-8 shadow-sm border ${
                  spreadIndex === lastIndex
                    ? 'bg-gradient-to-br from-rose-50/90 to-purple-50/90 border-rose-100/60'
                    : 'bg-white/70 border-white/50'
                }`}>
                  <p className="text-slate-700 leading-relaxed text-lg font-serif whitespace-pre-wrap">
                    {text}
                  </p>
                </div>
              </div>
            ))}

            {/* Photo Carousel */}
            {spread.photos && spread.photos.length > 0 && (
              <MemoryCarousel
                key={`2024-${spreadIndex}`}
                photos={spread.photos}
                monthName={`2024 moment ${spreadIndex + 1}`}
                memIndex={spreadIndex}
              />
            )}
          </motion.div>
        ))}

        {/* End Navigation */}
        <div className="px-6 pb-8 pt-4 space-y-3">
          <p className="text-center text-slate-400 text-sm font-medium">End of 2024 🩵</p>
          <Link to={createPageUrl('Years')} onClick={playTapSound}>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-14 rounded-full bg-gradient-to-r from-sky-300 to-purple-300 text-white font-medium text-lg hover:opacity-90 shadow-lg shadow-purple-100 transition-all border-none"
              >
                Back to Our Years
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Bottom Spacer */}
        <div className="h-24" />
      </div>
    </div>
  );
}
