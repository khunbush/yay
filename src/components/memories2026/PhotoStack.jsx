import React, { useEffect, useRef, useState } from 'react';
import BlurImage from '@/components/BlurImage';
import { playTapSound } from '@/components/SoundUtils';
import { EASE, SERIF, MUTED_2 } from './theme';

const ROTATIONS = [-3, 5, -8, 7];

// A tap-to-shuffle stack of polaroids. `ignoreTap` lets the page skip the tap
// that ends a horizontal swipe.
export default function PhotoStack({ photos, caption, ignoreTap }) {
  const [top, setTop] = useState(0);
  const [flying, setFlying] = useState(false);
  const timer = useRef(null);
  const len = photos.length;

  useEffect(() => () => clearTimeout(timer.current), []);

  const shuffle = () => {
    if (ignoreTap?.() || len < 2 || flying) return;
    playTapSound();
    setFlying(true);
    timer.current = setTimeout(() => {
      setFlying(false);
      setTop((t) => (t + 1) % len);
    }, 240);
  };

  return (
    <div>
      <div onClick={shuffle} style={{ position: 'relative', height: 350, marginTop: 22, cursor: len > 1 ? 'pointer' : 'default' }}>
        {photos.map((src, k) => {
          const pos = (k - top + len) % len;
          const fly = flying && pos === 0;
          return (
            <div
              key={src + k}
              style={{
                position: 'absolute', left: '50%', top: 6, width: 254, height: 312, marginLeft: -127,
                background: '#fff', padding: '12px 12px 46px', boxSizing: 'border-box', borderRadius: 4,
                boxShadow: '0 16px 30px -16px rgba(60,40,80,.5)',
                transform: fly
                  ? 'translate(120%,-24px) rotate(18deg)'
                  : `translate(${pos * 9}px,${pos * 7}px) rotate(${ROTATIONS[pos % 4]}deg)`,
                zIndex: len - pos,
                opacity: pos > 2 ? 0 : 1,
                transition: `transform ${fly ? '.24s' : '.36s'} ${EASE}, opacity .3s`,
              }}
            >
              <BlurImage
                src={src}
                alt={`${caption} photo ${k + 1}`}
                className="w-full h-full"
                draggable={false}
                loading={pos > 2 ? 'lazy' : undefined}
              />
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 13, textAlign: 'center',
                fontFamily: SERIF, fontStyle: 'italic', fontSize: 17, color: '#6b6178',
              }}>
                {caption}
              </div>
            </div>
          );
        })}
      </div>
      {len > 1 && (
        <div style={{ textAlign: 'center', fontSize: 12, color: MUTED_2, marginTop: 4 }}>
          tap to shuffle · {top + 1} / {len}
        </div>
      )}
    </div>
  );
}
