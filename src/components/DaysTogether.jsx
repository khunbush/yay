import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import {
  LETTER, INK, MUTED_3, MICRO, DAYS_ROSE, FLAPS, SERIF, MONO, enter, perforated,
} from '@/components/paperTheme';

// Perforated stamp tiles for the years / months / days breakdown
const STAMPS = [
  { bg: FLAPS[0], rot: -3 },
  { bg: FLAPS[1], rot: 2 },
  { bg: FLAPS[2], rot: -1.5 },
];

// The day it all started: 20 October 2022 (local time)
const START = { year: 2022, month: 9, day: 20 };
const DAY_MS = 24 * 60 * 60 * 1000;

const ordinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export function togetherStats(now = new Date()) {
  const start = new Date(START.year, START.month, START.day);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // Math.round absorbs the hour lost/gained across daylight-saving changes
  const days = Math.round((today - start) / DAY_MS);

  let years = today.getFullYear() - START.year;
  let months = today.getMonth() - START.month;
  let remDays = today.getDate() - START.day;
  if (remDays < 0) {
    months -= 1;
    remDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let nextAnniversary = new Date(today.getFullYear(), START.month, START.day);
  if (nextAnniversary < today) {
    nextAnniversary = new Date(today.getFullYear() + 1, START.month, START.day);
  }
  const daysToAnniversary = Math.round((nextAnniversary - today) / DAY_MS);
  const anniversaryNumber = nextAnniversary.getFullYear() - START.year;

  return { days, years, months, remDays, daysToAnniversary, anniversaryNumber };
}

export default function DaysTogether() {
  const [stats] = useState(() => togetherStats());
  const [shown, setShown] = useState(0);

  // Count up to today's number
  useEffect(() => {
    const controls = animate(0, stats.days, {
      duration: 1.8,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v))
    });
    return () => controls.stop();
  }, [stats.days]);

  const breakdown = [
    { value: stats.years, label: stats.years === 1 ? "year" : "years" },
    { value: stats.months, label: stats.months === 1 ? "month" : "months" },
    { value: stats.remDays, label: stats.remDays === 1 ? "day" : "days" }
  ];

  const isAnniversary = stats.daysToAnniversary === 0;

  return (
    <motion.div
      {...enter(0.05, 0.6)}
      style={{
        position: 'relative', marginTop: 16, background: LETTER, borderRadius: 24,
        padding: '30px 22px 22px', overflow: 'hidden', textAlign: 'center', color: INK,
        boxShadow: '0 24px 44px -28px rgba(70,50,90,.55), 0 0 0 1px rgba(80,60,100,.05)',
      }}
    >
      {/* Postmark ring and wavy cancellation lines */}
      <div style={{
        position: 'absolute', left: '50%', top: 92, width: 220, height: 220, borderRadius: '50%',
        border: '1.5px dashed rgba(178,166,194,.6)', animation: 'l26ring 40s linear infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: -10, top: 40, width: 120, height: 56, borderRadius: 30,
        background: 'repeating-linear-gradient(to bottom,rgba(178,166,194,.35) 0 1.5px,transparent 1.5px 9px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', fontFamily: MONO, fontSize: 11, letterSpacing: '.16em', color: MICRO }}>
        POSTMARKED 20 · 10 · 2022
      </div>

      <div style={{
        position: 'relative', fontFamily: SERIF, fontSize: 86, lineHeight: 1, marginTop: 14,
        color: DAYS_ROSE, fontVariantNumeric: 'tabular-nums', userSelect: 'none',
      }}>
        {shown.toLocaleString('en-US')}
      </div>

      <p style={{
        position: 'relative', fontSize: 13, fontWeight: 700, letterSpacing: '.26em',
        textTransform: 'uppercase', marginTop: 6,
      }}>
        days together
      </p>

      <div style={{
        position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
        gap: 10, marginTop: 24,
      }}>
        {breakdown.map(({ value, label }, i) => (
          <div
            key={label}
            style={{
              ...perforated(10, 3),
              filter: 'drop-shadow(0 4px 6px rgba(70,50,90,.18))',
              transform: `rotate(${STAMPS[i].rot}deg)`,
            }}
          >
            <div style={{ background: STAMPS[i].bg, padding: '12px 0 10px' }}>
              <div style={{ fontFamily: SERIF, fontSize: 30, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {value}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
                color: MUTED_3, marginTop: 3,
              }}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        style={{
          position: 'relative', display: 'inline-flex', marginTop: 20, padding: '8px 16px',
          borderRadius: 99, background: FLAPS[0], fontSize: 12, fontWeight: 600, color: '#7a5566',
        }}
      >
        {isAnniversary
          ? `happy ${ordinal(stats.anniversaryNumber)} anniversary 🎉💙`
          : `${stats.daysToAnniversary} ${stats.daysToAnniversary === 1 ? "day" : "days"} until our ${ordinal(stats.anniversaryNumber)} anniversary 🎉`}
      </motion.div>
    </motion.div>
  );
}
