import React from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { isUnlocked } from '@/lib/gameState';
import { Heart, BookHeart, Camera, CalendarDays, ChevronRight } from "lucide-react";

const years = [
  {
    year: "2023",
    page: "Memories2023",
    subtitle: "where it all started",
    icon: BookHeart,
    gradient: "from-emerald-100/80 to-sky-100/80 border-emerald-200/50",
    iconColor: "text-emerald-400"
  },
  {
    year: "2024",
    page: "Memories2024",
    subtitle: "memories with memee🩵",
    icon: Camera,
    gradient: "from-sky-100/80 to-purple-100/80 border-sky-200/50",
    iconColor: "text-sky-400"
  },
  {
    year: "2025",
    page: "Overview",
    subtitle: "our monthly memory book",
    icon: CalendarDays,
    gradient: "from-purple-100/80 to-pink-100/80 border-purple-200/50",
    iconColor: "text-purple-400"
  }
];

export default function Years() {
  if (!isUnlocked()) {
    return <Navigate to={createPageUrl('Index')} replace />;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-blue-50 pb-12 font-sans flex flex-col"
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
      <header className="pt-16 pb-8 px-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", damping: 12 }}
        >
          <Heart className="w-10 h-10 mx-auto text-rose-300 fill-rose-100 mb-3" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1"
        >
          Bushy & Meme
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold text-slate-700 tracking-tight"
        >
          Our Years Together
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-slate-500 mt-2 font-medium"
        >
          pick a year to relive 💙
        </motion.p>
      </header>

      {/* Year Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col gap-5 px-6 pt-2 relative z-10 max-w-md w-full mx-auto"
      >
        {years.map(({ year, page, subtitle, icon: Icon, gradient, iconColor }, index) => (
          <motion.div
            key={year}
            variants={item}
            animate={{ y: [0, -3, 0] }}
            transition={{
              y: {
                duration: 6 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4
              }
            }}
          >
            <Link to={createPageUrl(page)} onClick={playTapSound}>
              <motion.div
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-3xl shadow-sm border p-6 flex items-center gap-5 group cursor-pointer relative overflow-hidden bg-gradient-to-br ${gradient}`}
              >
                <span className="text-7xl font-bold text-white/40 absolute -top-2 right-3 font-serif select-none pointer-events-none">
                  {year.slice(2)}
                </span>

                <div className="bg-white/60 p-3.5 rounded-2xl shadow-sm shrink-0">
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>

                <div className="relative z-10 flex-1 min-w-0">
                  <h3 className="font-bold text-slate-700 text-2xl tracking-tight">{year}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">{subtitle}</p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center text-xs text-slate-400 font-medium px-6 pt-10 relative z-10"
      >
        3 years down, forever to go 💙
      </motion.p>
    </motion.div>
  );
}
