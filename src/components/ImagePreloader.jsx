import { memories2025 } from './memories';

const preloadedUrls = new Set();

export const preloadImage = (url) => {
  if (!url || preloadedUrls.has(url)) return;
  
  const img = new Image();
  img.src = url;
  preloadedUrls.add(url);
};

export const preloadMonthImages = (monthIndex) => {
  const monthData = memories2025.find(m => m.monthIndex === monthIndex);
  if (!monthData) return;
  
  monthData.memories.forEach(memory => {
    if (memory.photos) {
      memory.photos.forEach(photo => preloadImage(photo));
    }
  });
};

export const preloadRange = (startIndex, count = 1) => {
  for (let i = 0; i < count; i++) {
    preloadMonthImages(startIndex + i);
  }
};
