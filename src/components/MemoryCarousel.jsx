import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import BlurImage from '@/components/BlurImage';

export default function MemoryCarousel({ photos, monthName, memIndex }) {
  const scrollContainerRef = useRef(null);
  const isInView = useInView(scrollContainerRef, { margin: "0px 0px -10% 0px" });

  // Reset scroll when out of view so it's fresh when it returns
  useEffect(() => {
    if (!isInView && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [isInView]);

  // Force reset on mount (covers key changes/navigation)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, []);

  return (
    <div 
      ref={scrollContainerRef}
      className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 px-6 pb-4 no-scrollbar"
    >
      {photos.map((photo, i) => (
        <div 
          key={i}
          className="snap-center shrink-0 w-[85vw] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-sm border border-white/40 relative bg-white/30"
        >
          <BlurImage 
            src={photo} 
            alt={`${monthName} memory ${memIndex + 1} photo ${i + 1}`}
          />
        </div>
      ))}
    </div>
  );
}
