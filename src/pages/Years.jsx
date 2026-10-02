import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import DaysTogether from '@/components/DaysTogether';
import {
  PAPER_BG, LETTER, INK, MUTED, EYEBROW, MICRO, PAPERS, FLAPS, SEALS,
  SERIF, SANS, MONO, enter, perforated,
} from '@/components/paperTheme';

// Envelope colours run 2023 → 2026 as sage, sky, lilac, rose
const ENVELOPE_ORDER = [3, 2, 1, 0];

const years = [
  { year: "2023", page: "Memories2023" },
  { year: "2024", page: "Memories2024" },
  { year: "2025", page: "Overview" },
  { year: "2026", page: "Overview?year=2026" },
];

const ROW_SHADOW = '0 14px 26px -20px rgba(70,50,90,.55), 0 0 0 1px rgba(80,60,100,.05)';

export default function Years() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('bushy_meme_unlocked') !== 'true') {
      navigate(createPageUrl('Index'), { replace: true });
    }
  }, [navigate]);

  return (
    <motion.div
      {...enter(0, 0.5)}
      style={{
        minHeight: '100vh', background: PAPER_BG, color: INK, fontFamily: SANS,
        padding: '70px 22px 120px', boxSizing: 'border-box', overflowX: 'hidden',
      }}
    >
      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        <p style={{
          textAlign: 'center', fontSize: 12, fontWeight: 600, letterSpacing: '.22em',
          textTransform: 'uppercase', color: EYEBROW,
        }}>
          Bushy & Meme
        </p>

        <DaysTogether />

        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 32, margin: '34px 4px 14px' }}>Memories</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {years.map(({ year, page }, index) => {
            const c = ENVELOPE_ORDER[index];
            const big = year === "2026";
            const seal = big ? 50 : 34;
            return (
              <motion.div key={year} {...enter(0.15 + index * 0.08)}>
                <Link to={createPageUrl(page)} onClick={playTapSound} style={{ display: 'block', WebkitTapHighlightColor: 'transparent' }}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    style={{
                      position: 'relative', height: big ? 150 : 92, borderRadius: 16, background: PAPERS[c],
                      boxShadow: ROW_SHADOW, overflow: 'hidden', color: INK,
                    }}
                  >
                    <div style={{
                      position: 'absolute', left: 0, right: 0, top: 0, height: '58%', background: FLAPS[c],
                      clipPath: 'polygon(0 0,100% 0,50% 100%)',
                    }} />
                    <div style={{
                      position: 'absolute', top: '58%', left: '50%', transform: 'translate(-50%,-50%)',
                      width: seal, height: seal, borderRadius: '50%', background: SEALS[c],
                      boxShadow: 'inset 0 0 0 4px rgba(255,255,255,.22), 0 4px 8px rgba(80,40,60,.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: SERIF, fontSize: big ? 22 : 15, color: '#fff',
                    }}>
                      {year.slice(2)}
                    </div>
                    <h3 style={{
                      position: 'absolute', left: 20, bottom: 12, fontFamily: SERIF, fontWeight: 400,
                      fontSize: big ? 42 : 28, lineHeight: 1,
                    }}>
                      {year}
                    </h3>
                    <span style={{ position: 'absolute', right: 18, bottom: 16, fontSize: 12, fontWeight: 600, color: MUTED }}>
                      {big ? 'new letters ›' : '›'}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}

          {/* Our Map postcard */}
          <motion.div {...enter(0.15 + years.length * 0.08)} style={{ marginTop: 6 }}>
            <Link to={createPageUrl('Countries')} onClick={playTapSound} style={{ display: 'block', WebkitTapHighlightColor: 'transparent' }}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex', gap: 14, alignItems: 'center', padding: 12, borderRadius: 16,
                  background: LETTER, boxShadow: ROW_SHADOW, rotate: 0.8, color: INK,
                }}
              >
                <img
                  src="/textures/map-postcard.png"
                  alt=""
                  width={96}
                  height={72}
                  draggable={false}
                  style={{ width: 96, height: 72, flex: '0 0 96px', borderRadius: 8, objectFit: 'cover', background: '#e4ecf2' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.14em', color: MICRO }}>POSTCARD</div>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, lineHeight: 1.1 }}>Our Map</h3>
                </div>
                <div style={{
                  width: 40, height: 48, flex: '0 0 40px', boxSizing: 'border-box', ...perforated(6, 2),
                  filter: 'drop-shadow(0 2px 3px rgba(70,50,90,.2))', transform: 'rotate(6deg)',
                }}>
                  <div style={{ width: '100%', height: '100%', background: 'oklch(0.82 0.08 60)' }} />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
