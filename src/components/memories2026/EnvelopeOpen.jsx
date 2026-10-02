import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { yearQuery } from '@/components/memoryYears';
import {
  INK, MUTED, LETTER, EASE, SERIF, SANS, envelopeColors, monthName, memoryCountLabel,
} from './theme';

// Phases: 1 waiting for tap · 2 seal breaks · 3 flap opens · 4 letter rises · 5 zoom out
const SEQUENCE = [
  [300, 3],
  [820, 4],
  [1550, 5],
];
const NAVIGATE_AT = 1900;

export default function EnvelopeOpen({ year, monthIndex, memoryCount, onCancel }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(1);
  const timers = useRef([]);
  const { paper, flap, seal } = envelopeColors(monthIndex);
  const name = monthName(monthIndex);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const breakSeal = (e) => {
    e.stopPropagation();
    if (phase !== 1) return;
    playTapSound();
    setPhase(2);
    SEQUENCE.forEach(([ms, p]) => timers.current.push(setTimeout(() => setPhase(p), ms)));
    timers.current.push(setTimeout(() => {
      navigate(`${createPageUrl('Month')}?${[yearQuery(year), `index=${monthIndex}`].filter(Boolean).join('&')}`);
    }, NAVIGATE_AT));
  };

  const cancel = () => {
    if (phase === 1) onCancel();
  };

  const sealHalf = (side) => ({
    position: 'absolute', inset: 0, borderRadius: '50%', background: seal,
    clipPath: side === 'left' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
    boxShadow: 'inset 0 0 0 5px rgba(255,255,255,.22)',
    transform: phase >= 2
      ? (side === 'left' ? 'translate(-40px,60px) rotate(-55deg)' : 'translate(40px,60px) rotate(55deg)')
      : 'none',
    opacity: phase >= 2 ? 0 : 1,
    transition: 'transform .45s cubic-bezier(.3,.7,.4,1), opacity .45s',
  });

  return createPortal(
    <div
      onClick={cancel}
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        background: 'rgba(246,240,231,.86)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: INK, fontFamily: SANS, userSelect: 'none', WebkitUserSelect: 'none',
        animation: 'a26fade .3s ease both',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        transform: phase >= 5 ? 'scale(1.3) translateY(-30px)' : 'none',
        opacity: phase >= 5 ? 0 : 1,
        transition: 'transform .4s cubic-bezier(.4,0,.2,1), opacity .35s',
      }}>
        <div style={{ fontFamily: SERIF, fontSize: 46, lineHeight: 1, marginBottom: 6 }}>{name}</div>
        <div style={{ opacity: phase === 1 ? 1 : 0, transition: 'opacity .3s', marginBottom: 150 }}>
          <div style={{ fontSize: 13, color: MUTED, animation: 'a26blink 2s ease-in-out infinite' }}>
            tap the seal to open
          </div>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative', width: 300, height: 206, perspective: 900,
            animation: 'a26zoom .5s cubic-bezier(.2,.9,.25,1.15) both',
          }}
        >
          {/* Back panel */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 14, background: flap }} />

          {/* Letter */}
          <div style={{
            position: 'absolute', left: 16, right: 16, top: 14, height: 180, zIndex: 2,
            background: LETTER, borderRadius: 8, boxShadow: '0 6px 14px rgba(70,50,90,.15)',
            padding: 18, boxSizing: 'border-box',
            transform: phase >= 4 ? 'translateY(-132px)' : 'translateY(0)',
            transition: `transform .65s ${EASE}`,
          }}>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 22 }}>Dear us,</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>{memoryCountLabel(memoryCount)} from {name}</div>
            <div style={{ height: 1, background: '#ece4d8', marginTop: 16 }} />
            <div style={{ height: 1, background: '#ece4d8', marginTop: 16, width: '80%' }} />
          </div>

          {/* Front pocket */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 14, background: paper, zIndex: 3,
            clipPath: 'polygon(0 0,50% 54%,100% 0,100% 100%,0 100%)',
            boxShadow: '0 24px 50px -24px rgba(70,50,90,.6)',
          }} />

          {/* Flap */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0, height: '56%',
            transformOrigin: 'top center',
            transform: phase >= 3 ? 'rotateX(180deg)' : 'rotateX(0deg)',
            transition: 'transform .55s cubic-bezier(.4,0,.2,1)',
            zIndex: phase >= 4 ? 1 : 5,
          }}>
            <div style={{
              position: 'absolute', inset: 0, background: flap,
              clipPath: 'polygon(0 0,100% 0,50% 100%)', filter: 'brightness(.97)',
            }} />
          </div>

          {/* Wax seal */}
          <div
            onClick={breakSeal}
            role="button"
            aria-label={`Open ${name}`}
            style={{
              position: 'absolute', top: '56%', left: '50%', width: 64, height: 64, zIndex: 6,
              cursor: 'pointer', animation: 'a26pulse 1.6s ease-in-out infinite',
            }}
          >
            <div style={sealHalf('left')} />
            <div style={sealHalf('right')} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: SERIF, fontSize: 26, color: '#fff',
              opacity: phase >= 2 ? 0 : 1, transition: 'opacity .2s',
            }}>
              {monthIndex + 1}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
