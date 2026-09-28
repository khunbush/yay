import { getMemoryYear } from './memoryYears';

const preloadedUrls = new Set();

export const preloadImage = (url) => {
  if (!url || preloadedUrls.has(url)) return;
  
  const img = new Image();
  img.src = url;
  preloadedUrls.add(url);
};

export const preloadMonthImages = (monthIndex, year) => {
  const monthData = getMemoryYear(year).months.find(m => m.monthIndex === monthIndex);
  if (!monthData) return;
  
  monthData.memories.forEach(memory => {
    if (memory.photos) {
      memory.photos.forEach(photo => preloadImage(photo));
    }
  });
};

export const preloadRange = (startIndex, count = 1, year) => {
  for (let i = 0; i < count; i++) {
    preloadMonthImages(startIndex + i, year);
  }
};
