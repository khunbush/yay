import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';
import BlurImage from '@/components/BlurImage';

export default function MemoryCarousel({ photos, monthName, memIndex }) {
  const scrollContainerRef = useRef(null);
  const isInView = useInView(scrollContainerRef, { margin: "0px 0px -10% 0px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || photos.length <= 1) return;
    const slideWidth = el.scrollWidth / photos.length;
    const index = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(Math.max(0, Math.min(photos.length - 1, index)));
  }, [photos.length]);

  // Reset scroll when out of view so it's fresh when it returns
  useEffect(() => {
    if (!isInView && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'auto' });
      setActiveIndex(0);
    }
  }, [isInView]);

  // Force reset on mount (covers key changes/navigation)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'auto' });
      setActiveIndex(0);
    }
  }, []);

  return (
    <div className="space-y-3">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 px-6 pb-1 no-scrollbar"
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-[85vw] max-w-sm aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-sm border border-white/40 relative bg-white/30"
          >
            <BlurImage
              src={photo}
              alt={`${monthName} memory ${memIndex + 1} photo ${i + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Dots — only when there's something to swipe to */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-1.5" aria-hidden="true">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-5 h-1.5 bg-slate-400/80'
                  : 'w-1.5 h-1.5 bg-slate-300/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
