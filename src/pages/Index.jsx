import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from "lucide-react";
import { createPageUrl } from '@/utils';
import { playTapSound, playThudSound } from '@/components/SoundUtils';
import { useNavigate } from 'react-router-dom';
import {
  PAPER_BG, LETTER, INK, MUTED_2, MUTED_3, MICRO, DASHED, WAX_ROSE, HINT_BLUE,
  CARD_SHADOW, EASE_ARRAY, SERIF, SANS, MONO, enter,
} from '@/components/paperTheme';

export default function Index() {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSuperHint, setShowSuperHint] = useState(false);
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleUnlock = () => {
    if (isUnlocking) return;
    const cleanedAnswer = answer.trim().toLowerCase();

    if (cleanedAnswer === "avatar") {
      sessionStorage.setItem('bushy_meme_unlocked', 'true');
      setIsUnlocking(true);
      timers.current.push(
        setTimeout(playThudSound, 260),
        setTimeout(() => setLeaving(true), 1100),
        setTimeout(() => {
          navigate(createPageUrl('Soundtrack'));
        }, 1500)
      );
    } else {
      setError(true);
      timers.current.push(setTimeout(() => setError(false), 500));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: PAPER_BG, color: INK, fontFamily: SANS, overflow: 'hidden' }}>
      <motion.div
        animate={leaving ? { opacity: 0, scale: 1.08, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ opacity: { duration: 0.4 }, default: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '96px 30px 40px', boxSizing: 'border-box', maxWidth: 440, margin: '0 auto',
        }}
      >
        {/* Wax seal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: 74, height: 74, borderRadius: '50%', background: WAX_ROSE,
            boxShadow: 'inset 0 0 0 6px rgba(255,255,255,.2), 0 10px 20px -8px rgba(150,50,70,.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'l26pulse 2.5s ease-in-out infinite',
          }}
        >
          <Heart size={30} color="#fff" fill="#fff" strokeWidth={0} />
        </motion.div>

        <motion.h1
          {...enter(0.1, 0.6)}
          style={{
            fontFamily: SERIF, fontWeight: 400, fontSize: 40, lineHeight: 1.05,
            textAlign: 'center', marginTop: 22, letterSpacing: '-.01em',
          }}
        >
          Bushy & Meme 2026
        </motion.h1>

        {/* Letter card */}
        <motion.div {...enter(0.25, 0.6)} style={{ position: 'relative', width: '100%', marginTop: 28 }}>
          <motion.div
            animate={error ? { x: [0, -7, 6, -4, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'relative', backgroundColor: LETTER,
              backgroundImage: 'repeating-linear-gradient(to bottom,transparent 0 33px,rgba(120,100,150,.08) 33px 34px)',
              borderRadius: 8, padding: '26px 24px 30px', boxShadow: CARD_SHADOW, rotate: -1,
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.1em', color: MICRO }}>QUESTION No. 01</div>
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 25, lineHeight: 1.3, marginTop: 10, textWrap: 'pretty' }}>
              What movie did we first watch together?
            </p>
            <input
              type="text"
              placeholder="Type answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="go"
              className="placeholder:text-[#b9aecb]"
              style={{
                width: '100%', marginTop: 22, border: 'none',
                borderBottom: `1.5px dashed ${error ? WAX_ROSE : DASHED}`, borderRadius: 0,
                background: 'transparent', outline: 'none', fontFamily: SERIF, fontSize: 28,
                textAlign: 'center', color: INK, padding: '4px 0 8px', boxSizing: 'border-box',
                transition: 'border-color .2s',
              }}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ textAlign: 'center', marginTop: 12, fontSize: 14, fontWeight: 600, color: WAX_ROSE }}
                >
                  Not quite—try again 💙
                </motion.p>
              )}
            </AnimatePresence>

            {/* Unlock stamp */}
            {isUnlocking && (
              <div style={{
                position: 'absolute', left: '50%', top: '50%', width: 132, height: 132, borderRadius: '50%',
                background: WAX_ROSE,
                boxShadow: 'inset 0 0 0 9px rgba(255,255,255,.18), 0 18px 30px -10px rgba(150,50,70,.6)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff',
                animation: 'l26stamp .55s cubic-bezier(.3,.7,.3,1) both', pointerEvents: 'none',
              }}>
                <Heart size={38} color="#fff" fill="#fff" strokeWidth={0} />
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.2em', marginTop: 6 }}>UNLOCKED</div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Unlock button */}
        <motion.button
          {...enter(0.4, 0.6)}
          whileTap={{ scale: 0.97 }}
          onClick={() => { playTapSound(); handleUnlock(); }}
          style={{
            position: 'relative', width: '100%', height: 56, marginTop: 26, borderRadius: 99, border: 'none',
            background: INK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SANS, fontWeight: 600, fontSize: 17, cursor: 'pointer', overflow: 'hidden',
            boxShadow: '0 14px 26px -14px rgba(59,52,80,.7)', WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: '40%',
            background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)',
            animation: 'l26sheen 3.2s ease-in-out infinite',
          }} />
          <span style={{ position: 'relative' }}>Unlock</span>
        </motion.button>

        {/* Hints */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          marginTop: 18, minHeight: 44,
        }}>
          {!showHint ? (
            <button
              onClick={() => { playTapSound(); setShowHint(true); }}
              style={{
                fontFamily: SANS, fontSize: 13, color: MUTED_2, background: 'none', border: 'none',
                padding: '8px 16px', minHeight: 44, cursor: 'pointer',
              }}
            >
              Show hint
            </button>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: EASE_ARRAY }}
                style={{ position: 'relative', fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: HINT_BLUE }}
              >
                think blue
                <span style={{
                  position: 'absolute', left: 0, bottom: 2, height: 1.5, background: HINT_BLUE,
                  animation: 'l26draw .6s .2s both',
                }} />
              </motion.div>

              {!showSuperHint && (
                <motion.button
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3, ease: EASE_ARRAY }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { playTapSound(); setShowSuperHint(true); }}
                  style={{ background: 'none', border: 'none', padding: '6px 0', cursor: 'pointer', fontFamily: SANS }}
                >
                  <span style={{
                    display: 'block', fontSize: 12, fontWeight: 600, color: MUTED_3,
                    padding: '7px 14px', borderRadius: 99, border: `1px dashed ${DASHED}`,
                  }}>
                    Super hint 🤫
                  </span>
                </motion.button>
              )}

              {showSuperHint && (
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE_ARRAY }}
                  style={{
                    background: LETTER, borderRadius: 6, padding: '14px 18px', rotate: 1.5,
                    boxShadow: '0 12px 24px -16px rgba(70,50,90,.5)',
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                  }}
                >
                  <motion.span
                    animate={{ rotate: [0, 14, -8, 14, 0] }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    style={{ fontSize: 18, display: 'inline-block' }}
                  >
                    👋
                  </motion.span>
                  <div>
                    <p style={{ fontFamily: SERIF, fontSize: 19, lineHeight: 1.3 }}>It's a movie with tall blue aliens...</p>
                    <p style={{ fontSize: 12, color: MUTED_2, marginTop: 3 }}>You know this one! 💙</p>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
