import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart } from "lucide-react";
import { memories2023 } from '@/components/memories2023';

const monthAccents = [
  { dot: 'bg-sky-300', card: 'bg-white/70 border-white/50' },
  { dot: 'bg-purple-300', card: 'bg-white/70 border-white/50' },
  { dot: 'bg-pink-300', card: 'bg-white/70 border-white/50' },
  { dot: 'bg-emerald-300', card: 'bg-white/70 border-white/50' }
];

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

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="px-6 pt-6 pb-2 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", damping: 12 }}
        >
          <Heart className="w-9 h-9 mx-auto text-emerald-300 fill-emerald-100 mb-4" />
        </motion.div>
        <h1 className="text-2xl font-bold text-slate-700 tracking-tight font-serif">
          {memories2023.title}
        </h1>
      </motion.div>

      {/* Month Sections */}
      <div className="px-6 pt-8 space-y-14">
        {memories2023.sections.map((section, si) => {
          const accent = monthAccents[si % 4];
          return (
            <motion.section
              key={si}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", bounce: 0, duration: 0.7 }}
              className="space-y-4"
            >
              {/* Month heading */}
              <div className="flex items-center gap-3 px-2">
                <span className={`w-2.5 h-2.5 rounded-full ${accent.dot}`} />
                <h3 className="text-xl font-bold text-slate-700 tracking-tight">{section.month}</h3>
                <div className="flex-1 h-[1px] bg-slate-300/30 rounded-full" />
              </div>

              {/* Memory cards */}
              <div className="space-y-3">
                {section.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: Math.min(ii * 0.04, 0.3), duration: 0.45, ease: "easeOut" }}
                    className={`${accent.card} backdrop-blur-sm rounded-3xl p-6 shadow-sm border`}
                  >
                    <p className="text-slate-700 leading-relaxed text-[17px] font-serif whitespace-pre-wrap">
                      {item.text}
                    </p>
                    {item.sub && item.sub.map((subText, sj) => (
                      <div key={sj} className="mt-4 ml-3 pl-4 border-l-2 border-slate-200/70">
                        <p className="text-slate-600 leading-relaxed text-[15px] font-serif whitespace-pre-wrap">
                          {subText}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* Finale — 31st December letter */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 px-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
            <h3 className="text-xl font-bold text-slate-700 tracking-tight">{memories2023.finale.month}</h3>
            <div className="flex-1 h-[1px] bg-slate-300/30 rounded-full" />
          </div>

          <div className="bg-gradient-to-br from-rose-50/90 to-purple-50/90 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-sm border border-rose-100/60">
            <p className="text-slate-700 leading-relaxed text-lg font-serif whitespace-pre-wrap">
              {memories2023.finale.letter}
            </p>
            <p className="text-slate-700 leading-relaxed text-lg font-serif mt-6">
              {memories2023.finale.thai}
            </p>
            <p className="text-slate-500 leading-relaxed text-base font-serif mt-6 text-right">
              {memories2023.finale.signature}
            </p>
          </div>
        </motion.section>

        {/* End Navigation */}
        <div className="pb-8 pt-6 space-y-3">
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
