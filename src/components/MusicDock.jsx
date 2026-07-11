import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useMusic } from '@/lib/MusicContext';
import { playTapSound } from '@/components/SoundUtils';
import { Music, Play, Pause, SkipForward } from "lucide-react";

// Floating mini-player pill shown on every page once a song has been chosen.
// Hidden on the lock screen and the soundtrack picker itself.
const HIDDEN_PATHS = ['/Index', '/Soundtrack'];

export default function MusicDock() {
  const { currentSong, hasStarted, isPlaying, togglePlay, next } = useMusic();
  const location = useLocation();

  const hidden = !hasStarted || !currentSong || HIDDEN_PATHS.includes(location.pathname);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", damping: 18, stiffness: 250 }}
          className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-6"
          data-testid="music-dock"
        >
          <div className="pointer-events-auto flex items-center gap-2 bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-purple-100/50 rounded-full pl-4 pr-2 py-2 max-w-full">
            <motion.div
              animate={isPlaying ? { rotate: [0, 8, -8, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="shrink-0"
            >
              <Music className="w-4 h-4 text-purple-400" />
            </motion.div>

            <span className="text-xs font-medium text-slate-600 truncate max-w-[40vw]">
              {currentSong.title}
            </span>

            <button
              onClick={() => { playTapSound(); togglePlay(); }}
              className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 flex items-center justify-center text-white shadow-sm active:scale-90 transition-transform"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              data-testid="music-toggle"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={() => { playTapSound(); next(); }}
              className="shrink-0 w-9 h-9 rounded-full bg-white/70 border border-slate-200/60 flex items-center justify-center text-slate-500 active:scale-90 transition-transform hover:bg-white"
              aria-label="Next song"
              data-testid="music-next"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
