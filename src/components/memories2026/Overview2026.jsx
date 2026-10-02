import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { isMonthLocked } from '@/components/memoryYears';
import EnvelopeOpen from './EnvelopeOpen';
import {
  PAPER_BG, INK, MUTED, MUTED_2, EYEBROW, LOCKED_PAPER, LOCKED_FLAP, LOCKED_BORDER,
  EASE, SERIF, SANS, MONO, SEAL_SHADOW, envelopeColors, monthName, pillToast2026,
} from './theme';

const FLAP_CLIP = 'polygon(0 0,100% 0,50% 100%)';

function Envelope({ monthIndex }) {
  const { paper, flap, seal } = envelopeColors(monthIndex);
  return (
    <div style={{
      position: 'relative', aspectRatio: '1.38', borderRadius: 10, background: paper, overflow: 'hidden',
      boxShadow: '0 10px 18px -12px rgba(70,50,90,.55), 0 0 0 1px rgba(80,60,100,.06)',
    }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '60%', background: flap, clipPath: FLAP_CLIP }} />
      <div style={{
        position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 28, height: 28, borderRadius: '50%', background: seal, boxShadow: SEAL_SHADOW,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SERIF, fontSize: 13, color: '#fff',
      }}>
        {monthIndex + 1}
      </div>
    </div>
  );
}

function LockedEnvelope() {
  return (
    <div style={{
      position: 'relative', aspectRatio: '1.38', borderRadius: 10, background: LOCKED_PAPER,
      border: `1.5px dashed ${LOCKED_BORDER}`, boxSizing: 'border-box', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '60%', background: LOCKED_FLAP, clipPath: FLAP_CLIP }} />
      <div style={{
        position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 26, height: 26, borderRadius: '50%', border: '1.5px dashed #c4b9aa', background: LOCKED_PAPER,
      }} />
    </div>
  );
}

export default function Overview2026({ yearData }) {
  const { months } = yearData;
  const [shakeIndex, setShakeIndex] = useState(-1);
  const [openingMonth, setOpeningMonth] = useState(null);
  const shakeTimer = useRef(null);

  useEffect(() => () => clearTimeout(shakeTimer.current), []);

  const openCount = months.filter((m) => m.memories.length > 0).length;

  const tapMonth = (index) => {
    playTapSound();
    if (isMonthLocked(yearData, index)) {
      setShakeIndex(index);
      clearTimeout(shakeTimer.current);
      shakeTimer.current = setTimeout(() => setShakeIndex(-1), 550);
      pillToast2026(`${monthName(index)} coming soon 🔒`);
      return;
    }
    setOpeningMonth(index);
  };

  return (
    <div style={{
      minHeight: '100vh', background: PAPER_BG, color: INK, fontFamily: SANS,
      userSelect: 'none', WebkitUserSelect: 'none',
      animation: `a26in .45s ${EASE} both`,
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '62px 22px 16px',
        background: 'rgba(246,240,231,.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          <Link
            to={createPageUrl('Years')}
            onClick={playTapSound}
            aria-label="Back to years"
            style={{
              width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 0 6px -8px', color: '#6b6178',
            }}
          >
            <ChevronLeft size={22} strokeWidth={2.2} />
          </Link>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: EYEBROW }}>
              Bushy &amp; Meme
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 58, lineHeight: 0.95, marginTop: 2 }}>{yearData.year}</div>
          </div>
        </div>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', border: '1.5px dashed #b2a6c2',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transform: 'rotate(-12deg)', marginBottom: 4, color: MUTED,
        }}>
          <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 500, lineHeight: 1 }}>{openCount}/12</div>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.16em', marginTop: 3 }}>POSTED</div>
        </div>
      </div>

      <div style={{ padding: '2px 24px 14px', fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: MUTED }}>
        a letter for every month
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
        gap: '22px 14px', padding: '4px 22px 120px',
      }}>
        {months.map((m, i) => {
          const locked = isMonthLocked(yearData, i);
          const n = m.memories.length;
          return (
            <div
              key={m.monthName}
              onClick={() => tapMonth(i)}
              style={{ cursor: 'pointer', animation: `a26in .5s ${EASE} ${(0.08 + i * 0.04).toFixed(2)}s both` }}
            >
              <div style={{ animation: `a26float ${(5 + (i % 3) * 0.7).toFixed(1)}s ease-in-out infinite` }}>
                <div style={{ animation: shakeIndex === i ? 'a26shake .5s ease' : 'none' }}>
                  {locked ? <LockedEnvelope /> : <Envelope monthIndex={i} />}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 9, padding: '0 2px' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: locked ? '#b3aabd' : INK }}>{m.monthName.slice(0, 3)}</div>
                <div style={{ fontSize: 11, color: MUTED_2 }}>{locked ? 'soon' : `${n} letter${n > 1 ? 's' : ''}`}</div>
              </div>
            </div>
          );
        })}
      </div>

      {openingMonth != null && (
        <EnvelopeOpen
          year={yearData.year}
          monthIndex={openingMonth}
          memoryCount={months[openingMonth].memories.length}
          onCancel={() => setOpeningMonth(null)}
        />
      )}
    </div>
  );
}
