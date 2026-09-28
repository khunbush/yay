import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { Heart } from "lucide-react";

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
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative overflow-hidden rounded-[2.25rem] bg-white/60 backdrop-blur-md border border-white/70 shadow-[0_20px_50px_-20px_rgba(192,132,252,0.35)] px-6 pt-7 pb-6 text-center"
    >
      {/* Soft glow blobs */}
      <div className="absolute -top-16 -left-12 w-48 h-48 rounded-full bg-pink-200/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-10 w-52 h-52 rounded-full bg-sky-200/50 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-6 w-24 h-24 rounded-full bg-purple-200/40 blur-2xl pointer-events-none" />

      {/* Drifting hearts */}
      {[
        { left: "12%", top: "22%", size: "w-3 h-3", delay: 0 },
        { left: "84%", top: "16%", size: "w-2.5 h-2.5", delay: 1.2 },
        { left: "78%", top: "58%", size: "w-3.5 h-3.5", delay: 2.1 },
        { left: "18%", top: "64%", size: "w-2 h-2", delay: 0.7 }
      ].map((h, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: h.left, top: h.top }}
          animate={{ y: [0, -8, 0], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: h.delay }}
        >
          <Heart className={`${h.size} text-pink-300 fill-pink-200`} />
        </motion.div>
      ))}

      <div className="relative z-10">
        <motion.div
          animate={{ scale: [1, 1.12, 1, 1.08, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          className="inline-flex"
        >
          <Heart className="w-7 h-7 text-rose-400 fill-rose-300" />
        </motion.div>

        <div
          className="mt-1 text-[4.5rem] leading-none tabular-nums bg-gradient-to-r from-rose-400 via-purple-400 to-sky-400 bg-clip-text text-transparent select-none"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          {shown.toLocaleString('en-US')}
        </div>

        <p className="mt-2 text-sm font-bold text-slate-600 uppercase tracking-[0.25em]">
          days together
        </p>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          since 20 October 2022
        </p>

        <div className="mt-5 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />

        <div className="mt-4 grid grid-cols-3 gap-2">
          {breakdown.map(({ value, label }) => (
            <div key={label} className="rounded-2xl bg-white/55 border border-white/70 py-2.5">
              <div
                className="text-2xl leading-none text-slate-700 tabular-nums"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {value}
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {label}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-white/80 px-3.5 py-1.5 text-xs font-semibold text-purple-500 shadow-sm"
        >
          {isAnniversary
            ? `happy ${ordinal(stats.anniversaryNumber)} anniversary 🎉💙`
            : `${stats.daysToAnniversary} ${stats.daysToAnniversary === 1 ? "day" : "days"} until our ${ordinal(stats.anniversaryNumber)} anniversary 🎉`}
        </motion.div>
      </div>
    </motion.div>
  );
}
