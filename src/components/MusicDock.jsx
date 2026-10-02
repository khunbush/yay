import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useMusic } from '@/lib/MusicContext';
import { playTapSound } from '@/components/SoundUtils';
import { Play, Pause, SkipForward } from "lucide-react";
import { INK, SEALS, SANS, RECORD_BG, EASE_ARRAY } from '@/components/paperTheme';

// Floating mini-player pill shown on every page once a song has been chosen.
// Hidden on the lock screen, the soundtrack picker, and the map page — that
// one has its own bottom rail the dock would sit on top of.
const HIDDEN_PATHS = ['/Index', '/Soundtrack', '/Countries'];

// 44px tap area around a 36px circle
const dockButton = {
  width: 44, height: 44, flex: '0 0 44px', margin: -4, padding: 0, border: 'none', background: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
};
const dockCircle = {
  width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
};

export default function MusicDock() {
  const { currentSong, currentIndex, hasStarted, isPlaying, togglePlay, next } = useMusic();
  const location = useLocation();

  const hidden = !hasStarted || !currentSong || HIDDEN_PATHS.includes(location.pathname);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.97 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_ARRAY }}
          className="fixed inset-x-0 z-40 flex justify-center pointer-events-none px-4"
          style={{ bottom: 'calc(34px + env(safe-area-inset-bottom, 0px))' }}
          data-testid="music-dock"
        >
          <div
            className="pointer-events-auto"
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px 8px 10px', borderRadius: 99,
              background: 'rgba(255,253,248,.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              boxShadow: '0 16px 30px -14px rgba(70,50,90,.5), 0 0 0 1px rgba(80,60,100,.06)',
              maxWidth: '100%', color: INK, fontFamily: SANS,
            }}
          >
            {/* Mini record */}
            <div style={{
              width: 32, height: 32, flex: '0 0 32px', borderRadius: '50%', background: RECORD_BG,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'l26spin 2.4s linear infinite',
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: SEALS[(currentIndex ?? 0) % 3] }} />
            </div>

            <span style={{
              fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden',
              textOverflow: 'ellipsis', maxWidth: 170, minWidth: 0,
            }}>
              {currentSong.title}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { playTapSound(); togglePlay(); }}
              style={dockButton}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              data-testid="music-toggle"
            >
              <span style={{ ...dockCircle, background: INK, color: '#fff' }}>
                {isPlaying
                  ? <Pause size={15} fill="currentColor" strokeWidth={0} />
                  : <Play size={15} fill="currentColor" strokeWidth={0} style={{ marginLeft: 2 }} />}
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { playTapSound(); next(); }}
              style={dockButton}
              aria-label="Next song"
              data-testid="music-next"
            >
              <span style={{ ...dockCircle, border: '1px solid #e4dccf', color: INK }}>
                <SkipForward size={15} fill="currentColor" strokeWidth={2} />
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
