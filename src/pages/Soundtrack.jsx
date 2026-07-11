import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { useMusic } from '@/lib/MusicContext';
import { isUnlocked } from '@/lib/gameState';
import { Music, Play, ChevronRight, Headphones } from "lucide-react";

const cardColors = [
  "from-sky-100/80 to-blue-100/80 border-sky-200/50",
  "from-purple-100/80 to-violet-100/80 border-purple-200/50",
  "from-pink-100/80 to-rose-100/80 border-pink-200/50",
  "from-emerald-100/80 to-teal-100/80 border-emerald-200/50",
  "from-amber-100/80 to-orange-100/80 border-amber-200/50"
];

export default function Soundtrack() {
  const navigate = useNavigate();
  const { songs, startPlaylist } = useMusic();

  if (!isUnlocked()) {
    return <Navigate to={createPageUrl('Index')} replace />;
  }

  const pickSong = (index) => {
    playTapSound();
    startPlaylist(index);
    navigate(createPageUrl('Years'));
  };

  const skip = () => {
    playTapSound();
    navigate(createPageUrl('Years'));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.35
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 22, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
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
          initial={{ scale: 0.8, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", damping: 12 }}
        >
          <Headphones className="w-10 h-10 mx-auto text-purple-300 mb-3" />
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
          Pick Our Soundtrack
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-slate-500 mt-2 font-medium"
        >
          it plays while you relive our memories 🎧
        </motion.p>
      </header>

      {/* Song Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col gap-4 px-6 pt-2 relative z-10 max-w-md w-full mx-auto"
      >
        {songs.map((song, index) => (
          <motion.div
            key={song.file}
            variants={item}
            animate={{ y: [0, -3, 0] }}
            transition={{
              y: {
                duration: 6 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.35
              }
            }}
          >
            <motion.button
              onClick={() => pickSong(index)}
              whileHover={{
                y: -4,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-full rounded-3xl shadow-sm border p-5 flex items-center gap-4 group cursor-pointer relative overflow-hidden bg-gradient-to-br text-left ${cardColors[index % cardColors.length]}`}
            >
              <span className="text-5xl font-bold text-white/40 absolute -top-1 right-3 font-serif select-none pointer-events-none">
                {index + 1}
              </span>

              <div className="bg-white/60 p-3 rounded-2xl shadow-sm shrink-0">
                <Music className="w-5 h-5 text-slate-500" />
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <h3 className="font-bold text-slate-700 text-lg tracking-tight truncate">{song.title}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Play className="w-3 h-3" /> play this one
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Skip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="text-center pt-10 pb-4 relative z-10"
      >
        <button
          onClick={skip}
          className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors px-4 py-2"
        >
          skip for now →
        </button>
      </motion.div>
    </motion.div>
  );
}
