import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart } from "lucide-react";
import { memories2023 } from '@/components/memories2023';

export default function Memories2023() {
  const navigate = useNavigate();

  // Security check
  useEffect(() => {
    if (sessionStorage.getItem('bushy_meme_unlocked') !== 'true') {
      navigate(createPageUrl('Index'), { replace: true });
    }
  }, [navigate]);

  // Scroll to top on open
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paragraphs = memories2023.text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

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
        <Link to={createPageUrl('Years')} onClick={playTapSound}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 -ml-2 text-slate-600">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-700">{memories2023.subtitle}</h2>
          <p className="text-xs text-slate-400 font-medium tracking-wide">2023</p>
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </motion.header>

      {/* Letter */}
      <div className="px-6 pt-6 space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", damping: 12 }}
          className="text-center"
        >
          <Heart className="w-8 h-8 mx-auto text-emerald-300 fill-emerald-100" />
        </motion.div>

        {paragraphs.map((para, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", bounce: 0, duration: 0.7 }}
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-sm border border-white/50">
              <p className="text-slate-700 leading-relaxed text-lg font-serif whitespace-pre-wrap">
                {para}
              </p>
            </div>
          </motion.div>
        ))}

        {/* End Navigation */}
        <div className="pb-8 pt-10 space-y-3">
          <p className="text-center text-slate-400 text-sm font-medium">the beginning of everything 🌱</p>
          <Link to={createPageUrl('Years')} onClick={playTapSound}>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-14 rounded-full bg-gradient-to-r from-emerald-300 to-sky-300 text-white font-medium text-lg hover:opacity-90 shadow-lg shadow-emerald-100 transition-all border-none"
              >
                Back to Our Years
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
