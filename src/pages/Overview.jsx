import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { preloadRange } from '@/components/ImagePreloader';
import { CalendarDays, ChevronLeft, ChevronRight, Lock, Unlock, Heart } from "lucide-react";
import { toast } from 'sonner';
import { isUnlocked, getViewedMonths, TOTAL_MONTHS } from '@/lib/gameState';

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

export default function Overview() {
  const navigate = useNavigate();
  const [viewedMonths] = useState(() => getViewedMonths());
  const viewedCount = viewedMonths.length;
  const faqReady = viewedCount >= TOTAL_MONTHS;

  useEffect(() => {
    if (!isUnlocked()) return;
    // Preload initial months (Jan, Feb, Mar) for instant access
    const timer = setTimeout(() => {
        preloadRange(0, 3);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isUnlocked()) {
    return <Navigate to={createPageUrl('Index')} replace />;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  const cardColors = [
    "bg-sky-100/60 border-sky-200/50", 
    "bg-purple-100/60 border-purple-200/50", 
    "bg-pink-100/60 border-pink-200/50", 
    "bg-emerald-100/60 border-emerald-200/50"
  ];

  return (
    <motion.div 
      className="min-h-screen bg-blue-50 pb-12 font-sans"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: [
            "linear-gradient(135deg, rgb(239, 246, 255) 0%, rgb(243, 232, 255) 100%)",
            "linear-gradient(135deg, rgb(243, 232, 255) 0%, rgb(254, 242, 242) 100%)",
            "linear-gradient(135deg, rgb(254, 242, 242) 0%, rgb(239, 246, 255) 100%)",
            "linear-gradient(135deg, rgb(239, 246, 255) 0%, rgb(243, 232, 255) 100%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* Header */}
      <header className="bg-blue-50/90 backdrop-blur-xl sticky top-0 z-20 pt-12 pb-6 px-6 relative">
        <div className="flex justify-between items-end">
          <div className="flex items-end gap-2">
            <Link to={createPageUrl('Years')} onClick={playTapSound} className="-ml-2 mb-0.5">
              <motion.div whileTap={{ scale: 0.9 }} className="p-2 rounded-full hover:bg-white/50 transition-colors">
                <ChevronLeft className="w-6 h-6 text-slate-500" />
              </motion.div>
            </Link>
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1"
            >
              Bushy & Meme
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-bold text-slate-700 tracking-tight"
            >
              2025
            </motion.h1>
          </div>
          </div>
          <motion.div
            className="bg-white/50 p-3 rounded-2xl shadow-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 12 }}
            whileTap={{ rotate: [-8, 8, 0] }}
          >
            <CalendarDays className="w-6 h-6 text-slate-500 opacity-80" />
          </motion.div>
        </div>
      </header>

      {/* Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-4 p-6 relative z-10"
      >
        {months.map((month, index) => (
          <motion.div 
            key={month} 
            variants={item}
            animate={{
              y: [0, -3, 0]
            }}
            transition={{
              y: {
                duration: 6 + (index % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3
              }
            }}
          >
            <Link to={`${createPageUrl('Month')}?index=${index}`} onClick={playTapSound}>
              <motion.div 
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  filter: "saturate(1.15) brightness(1.05)"
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`aspect-[3/4] rounded-3xl shadow-sm border p-4 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${cardColors[index % 4]}`}
              >
                <span className="text-4xl font-bold text-white/40 absolute top-2 right-2 font-serif select-none transition-colors">
                  {index + 1}
                </span>

                {/* Viewed badge */}
                {viewedMonths.includes(index) && (
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, delay: 0.4 + index * 0.05 }}
                    className="absolute top-3 left-3 bg-white/70 rounded-full p-1.5 shadow-sm"
                  >
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-300" />
                  </motion.div>
                )}

                <div className="relative z-10 h-full flex flex-col justify-end">
                  <h3 className="font-bold text-slate-700 text-lg">
                    {month.substring(0, 3)}
                  </h3>
                  <motion.p 
                    className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Open <ChevronRight className="w-2 h-2" />
                  </motion.p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Secret Section */}
      <div className="px-6 pb-12 pt-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center space-y-3"
        >
          <motion.p 
            className="text-xs text-slate-400 font-medium tracking-wide"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", damping: 15 }}
          >
            doo everymonth gorn to open this hehhe
          </motion.p>
          
          <motion.button
            whileHover={faqReady ? {
              y: -4,
              boxShadow: "0 20px 35px -5px rgba(192, 132, 252, 0.4)"
            } : {}}
            whileTap={{ scale: faqReady ? 0.97 : 0.98 }}
            animate={faqReady ? {
              scale: [1, 1.02, 1],
              boxShadow: ["0px 10px 15px -3px rgba(192, 132, 252, 0.2)", "0px 15px 25px -5px rgba(192, 132, 252, 0.4)", "0px 10px 15px -3px rgba(192, 132, 252, 0.2)"]
            } : {
              opacity: 1
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => {
              playTapSound();
              if (faqReady) {
                navigate(createPageUrl('SecretFAQ'));
              } else {
                toast(`Keep going 💙 (${viewedCount}/12)`, {
                  position: 'bottom-center',
                  style: {
                    background: '#1e293b',
                    color: '#fff',
                    borderRadius: '99px',
                    textAlign: 'center'
                  }
                });
              }
            }}
            className={`
              w-full h-24 rounded-3xl flex flex-col items-center justify-center gap-2 relative overflow-hidden group cursor-pointer
              ${faqReady
                ? 'bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300'
                : 'bg-slate-100/50 border border-slate-200/50 shadow-inner'
              }
            `}
            style={faqReady ? {
              backgroundSize: "200% 100%",
              animation: "bg-shimmer 3s linear infinite"
            } : {}}
          >
            {/* Background pattern for unlocked state */}
            {faqReady && (
              <div className="absolute inset-0 bg-[url('/textures/cubes.png')] opacity-20 mix-blend-overlay" />
            )}

            <div className="relative z-10 flex items-center gap-2">
              <AnimatePresence mode="wait">
                {faqReady ? (
                  <motion.div
                    key="unlocked"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ 
                      scale: 1, 
                      rotate: 0
                    }}
                    transition={{ type: "spring" }}
                    whileHover={{
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Unlock className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="locked"
                    animate={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Lock className="w-5 h-5 text-slate-300" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className={`text-xl font-bold ${faqReady ? 'text-white' : 'text-slate-400'}`}>
                meme's faq
              </span>
            </div>

            <div className="relative z-10 flex items-center gap-2.5">
              {!faqReady && (
                <div className="w-24 h-1.5 rounded-full bg-slate-200/80 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-300 to-purple-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${(viewedCount / TOTAL_MONTHS) * 100}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                </div>
              )}
              <motion.span
                key={viewedCount}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`text-sm font-medium ${faqReady ? 'text-white/90' : 'text-slate-400/70'}`}
              >
                {viewedCount}/12
              </motion.span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
