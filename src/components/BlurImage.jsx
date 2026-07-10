import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function BlurImage({ src, alt, className, ...props }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Unsplash optimization for blur placeholder
  const isUnsplash = src?.includes('images.unsplash.com');
  // Create a tiny thumbnail URL for Unsplash
  const smallSrc = isUnsplash 
    ? src.replace(/w=\d+/, 'w=20').replace(/q=\d+/, 'q=10').replace(/fit=\w+/, 'fit=crop')
    : src; 

  useEffect(() => {
    if (!src) return;
    
    // Check if image is already cached/loaded
    const img = new Image();
    img.src = src;
    
    if (img.complete) {
        setIsLoading(false);
        return;
    }

    setIsLoading(true);
    setError(false);
    
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-slate-100", className)}>
      <AnimatePresence mode="popLayout">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-purple-50"
          >
             {isUnsplash ? (
                <img 
                    src={smallSrc} 
                    alt="" 
                    className="w-full h-full object-cover blur-xl scale-110 opacity-80" 
                />
             ) : (
                <div className="w-full h-full bg-purple-50 animate-pulse flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                   <Loader2 className="w-8 h-8 text-purple-200 animate-spin" />
                </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover block", isLoading ? "opacity-0" : "opacity-100")}
        transition={{ duration: 0.4 }}
        {...props}
      />
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-400 z-20">
            <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs">Image unavailable</span>
        </div>
      )}
    </div>
  );
}
