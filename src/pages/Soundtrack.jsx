import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { useMusic } from '@/lib/MusicContext';
import {
  PAPER_BG, INK, MUTED, MUTED_2, EYEBROW, PAPERS, SEALS, EASE, SERIF, SANS, RECORD_BG, enter,
} from '@/components/paperTheme';

// Sleeve and record-label colours for each song row
const SLEEVES = PAPERS.slice(0, 3);
const LABELS = SEALS.slice(0, 3);

export default function Soundtrack() {
  const navigate = useNavigate();
  const { songs, startPlaylist } = useMusic();
  const [picking, setPicking] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('bushy_meme_unlocked') !== 'true') {
      navigate(createPageUrl('Index'), { replace: true });
    }
  }, [navigate]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pickSong = (index) => {
    if (picking != null) return;
    playTapSound();
    // Start inside the tap so iOS allows playback, navigate once the record is out
    startPlaylist(index);
    setPicking(index);
    timer.current = setTimeout(() => navigate(createPageUrl('Years')), 1150);
  };

  const skip = () => {
    playTapSound();
    navigate(createPageUrl('Years'));
  };

  return (
    <motion.div
      {...enter(0, 0.5)}
      style={{
        minHeight: '100vh', background: PAPER_BG, color: INK, fontFamily: SANS,
        padding: '84px 24px 40px', boxSizing: 'border-box', overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        {/* Header */}
        <header style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: EYEBROW }}>
            Bushy & Meme
          </p>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 40, lineHeight: 1.05, marginTop: 10 }}>
            Pick Our Soundtrack
          </h1>
          <p style={{ fontSize: 14, color: MUTED, marginTop: 8 }}>
            it plays while you relive our memories 🎧
          </p>
        </header>

        {/* Song rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 34 }}>
          {songs.map((song, index) => {
            const picked = picking === index;
            const label = LABELS[index % 3];
            return (
              <motion.button
                key={song.file}
                {...enter(0.3 + index * 0.1)}
                onClick={() => pickSong(index)}
                style={{
                  position: 'relative', height: 118, width: '100%', padding: 0, border: 'none',
                  background: 'none', cursor: 'pointer', textAlign: 'left', color: INK, fontFamily: SANS,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {/* Record */}
                <div style={{
                  position: 'absolute', left: 30, top: 12, width: 94, height: 94, borderRadius: '50%',
                  background: RECORD_BG, boxShadow: '0 8px 14px -6px rgba(0,0,0,.4)',
                  transform: picked ? 'translateX(250px)' : 'translateX(0)',
                  transition: `transform .5s ${EASE}`,
                }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: picked ? 'l26spin .9s linear infinite' : 'none',
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', background: label,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: PAPER_BG }} />
                    </div>
                  </div>
                </div>

                {/* Sleeve */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 10, background: SLEEVES[index % 3],
                  boxShadow: '0 16px 28px -20px rgba(70,50,90,.55), 0 0 0 1px rgba(80,60,100,.06)',
                  display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px 0 18px',
                  transform: picked ? 'translateX(-14px)' : 'none',
                  transition: `transform .5s ${EASE}`,
                }}>
                  <div style={{
                    width: 82, height: 82, flex: '0 0 82px', borderRadius: 6, background: label,
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: 8,
                    boxSizing: 'border-box', fontFamily: SERIF, fontSize: 34, lineHeight: 1, color: '#fff',
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 21, lineHeight: 1.2, textWrap: 'pretty' }}>
                      {song.title}
                    </h3>
                    <p style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>▸ play this one</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Skip */}
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button
            onClick={skip}
            style={{
              fontFamily: SANS, fontSize: 14, color: MUTED_2, background: 'none', border: 'none',
              padding: '10px 16px', minHeight: 44, cursor: 'pointer',
            }}
          >
            skip for now →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
