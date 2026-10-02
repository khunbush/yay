import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { playTapSound } from '@/components/SoundUtils';
import { isMonthLocked, yearQuery } from '@/components/memoryYears';
import PhotoStack from './PhotoStack';
import {
  PAPER_BG, INK, MUTED, MUTED_2, MUTED_3, LETTER, EASE, SERIF, SANS, MONO,
  envelopeColors, monthName, openNeighbor, pad2,
} from './theme';

const SWIPE_THRESHOLD = 80;
const SLIDE_DISTANCE = 420;

function PeekPill({ side, opacity, children }) {
  return (
    <div style={{
      position: 'absolute', top: '50%', [side]: 10, transform: 'translateY(-50%)',
      padding: '8px 12px', borderRadius: 99, background: INK, color: '#fff',
      fontFamily: SANS, fontSize: 12, fontWeight: 600, opacity, pointerEvents: 'none',
    }}>
      {children}
    </div>
  );
}

export default function Month2026({ yearData, monthIndex }) {
  const navigate = useNavigate();
  const { year, months } = yearData;
  const monthData = months[monthIndex];
  const { seal } = envelopeColors(monthIndex);
  const overviewUrl = [createPageUrl('Overview'), yearQuery(year)].filter(Boolean).join('?');
  const monthUrl = (index) => `${createPageUrl('Month')}?${[yearQuery(year), `index=${index}`].filter(Boolean).join('&')}`;

  const next = openNeighbor(yearData, monthIndex, 1);
  const prev = openNeighbor(yearData, monthIndex, -1);

  const [dx, setDx] = useState(0);
  const [animated, setAnimated] = useState(true);
  const drag = useRef({ x: null, y: null, active: null });
  const justDragged = useRef(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const slide = (dir) => {
    const target = openNeighbor(yearData, monthIndex, dir);
    if (target == null) return;
    playTapSound();
    setAnimated(true);
    setDx(-dir * SLIDE_DISTANCE);
    later(() => {
      setAnimated(false);
      setDx(dir * SLIDE_DISTANCE);
      navigate(monthUrl(target), { replace: true });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimated(true);
        setDx(0);
      }));
    }, 260);
  };

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, active: null };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (d.x == null) return;
    const mx = e.clientX - d.x;
    const my = e.clientY - d.y;
    if (d.active == null) {
      if (Math.abs(mx) > 10 && Math.abs(mx) > Math.abs(my) * 1.2) {
        d.active = true;
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      } else if (Math.abs(my) > 10) {
        d.active = false;
      }
    }
    if (d.active) {
      const hasNeighbor = openNeighbor(yearData, monthIndex, mx < 0 ? 1 : -1) != null;
      setAnimated(false);
      setDx(hasNeighbor ? mx : mx * 0.25);
    }
  };

  const onPointerUp = () => {
    if (drag.current.active) {
      if (dx < -SWIPE_THRESHOLD && next != null) slide(1);
      else if (dx > SWIPE_THRESHOLD && prev != null) slide(-1);
      else { setAnimated(true); setDx(0); }
      justDragged.current = true;
      later(() => { justDragged.current = false; }, 60);
    }
    drag.current = { x: null, y: null, active: null };
  };

  const caption = `${monthData.monthName.slice(0, 3).toLowerCase()} '${String(year).slice(-2)}`;
  const nextColors = next != null ? envelopeColors(next) : null;

  return (
    <div style={{
      minHeight: '100vh', color: INK, fontFamily: SANS, overflowX: 'hidden',
      backgroundColor: PAPER_BG,
      backgroundImage: 'repeating-linear-gradient(to bottom,transparent 0 31px,rgba(120,100,150,.07) 31px 32px)',
      userSelect: 'none', WebkitUserSelect: 'none',
      animation: `a26in .45s ${EASE} both`,
    }}>
      <style>{`
        ::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '58px 18px 10px',
        background: 'rgba(246,240,231,.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to={overviewUrl}
            onClick={playTapSound}
            aria-label={`Back to ${year}`}
            style={{
              width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: MUTED_3,
            }}
          >
            <ChevronLeft size={22} strokeWidth={2.2} />
          </Link>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: SERIF, fontSize: 28, lineHeight: 1 }}>{monthData.monthName}</div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.16em', color: MUTED_2, marginTop: 3 }}>{year}</div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', border: '1.5px dashed #b2a6c2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(-14deg)', fontFamily: MONO, fontSize: 10, color: MUTED,
          }}>
            No.{pad2(monthIndex + 1)}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 10 }}>
          {months.map((m, i) => (
            <div
              key={m.monthName}
              style={{
                height: 5, borderRadius: 3,
                width: i === monthIndex ? 18 : 5,
                background: i === monthIndex ? INK : isMonthLocked(yearData, i) ? '#ddd5ca' : '#b9aecb',
                transition: 'width .3s, background .3s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Swipe hints */}
      {createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 15, pointerEvents: 'none' }}>
          <div style={{ position: 'relative', height: '100%', maxWidth: 448, margin: '0 auto' }}>
            {prev != null && (
              <PeekPill side="left" opacity={dx > 0 ? Math.min(dx / 90, 1) : 0}>‹ {monthName(prev)}</PeekPill>
            )}
            {next != null && (
              <PeekPill side="right" opacity={dx < 0 ? Math.min(-dx / 90, 1) : 0}>{monthName(next)} ›</PeekPill>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Content */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ touchAction: 'pan-y' }}
      >
        <div style={{
          padding: '14px 22px 120px',
          transform: `translateX(${dx}px)`,
          transition: animated ? `transform .32s ${EASE}` : 'none',
        }}>
          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 24, color: MUTED_3, margin: '4px 4px 18px' }}>
            Dear us,
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {monthData.memories.map((memory, memIndex) => (
              <div key={`${monthIndex}-${memIndex}`}>
                <div style={{
                  position: 'relative', background: LETTER, borderRadius: 6, padding: '26px 24px 28px',
                  boxShadow: '0 16px 30px -22px rgba(70,50,90,.5), 0 0 0 1px rgba(80,60,100,.05)',
                  transform: memIndex % 2 ? 'rotate(.7deg)' : 'rotate(-.7deg)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.08em', color: '#a397b0' }}>
                      No. {pad2(memIndex + 1)}
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', background: seal,
                      boxShadow: 'inset 0 0 0 3px rgba(255,255,255,.22)',
                    }} />
                  </div>
                  <div style={{
                    fontFamily: SERIF, fontSize: 21, lineHeight: 1.5, color: INK,
                    whiteSpace: 'pre-wrap', textWrap: 'pretty', userSelect: 'text', WebkitUserSelect: 'text',
                  }}>
                    {memory.text}
                  </div>
                </div>

                {memory.photos?.length > 0 && (
                  <PhotoStack
                    key={`${monthIndex}-${memIndex}`}
                    photos={memory.photos}
                    caption={caption}
                    ignoreTap={() => justDragged.current}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop: 56 }}>
            {next != null ? (
              <>
                <div
                  onClick={() => slide(1)}
                  style={{
                    position: 'relative', height: 120, borderRadius: 16, background: nextColors.paper,
                    boxShadow: '0 18px 34px -22px rgba(70,50,90,.55)', overflow: 'hidden', cursor: 'pointer',
                  }}
                >
                  <div style={{
                    position: 'absolute', left: 0, right: 0, top: 0, height: 62, background: nextColors.flap,
                    clipPath: 'polygon(0 0,100% 0,50% 100%)',
                  }} />
                  <div style={{
                    position: 'absolute', top: 62, left: '50%', transform: 'translate(-50%,-50%)',
                    width: 36, height: 36, borderRadius: '50%', background: nextColors.seal,
                    boxShadow: 'inset 0 0 0 3px rgba(255,255,255,.22)',
                  }} />
                  <div style={{
                    position: 'absolute', left: 20, bottom: 14, fontSize: 12, fontWeight: 600,
                    letterSpacing: '.14em', textTransform: 'uppercase', color: MUTED,
                  }}>
                    Next letter
                  </div>
                  <div style={{ position: 'absolute', right: 20, bottom: 10, fontFamily: SERIF, fontSize: 28 }}>
                    {monthName(next)} →
                  </div>
                </div>
                <div style={{
                  textAlign: 'center', fontSize: 12, color: MUTED_2, marginTop: 12,
                  animation: 'a26blink 2.4s ease-in-out infinite',
                }}>
                  or swipe ←
                </div>
              </>
            ) : (
              <>
                <div style={{
                  textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: 22,
                  color: MUTED_3, marginBottom: 14,
                }}>
                  {monthIndex < 11 ? 'more coming soon 💙' : `End of ${year} 💙`}
                </div>
                <Link
                  to={overviewUrl}
                  onClick={playTapSound}
                  style={{
                    height: 56, borderRadius: 99, background: INK, color: '#fff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16,
                  }}
                >
                  Back to {year}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
