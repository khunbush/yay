import confetti from 'canvas-confetti';

// Pastel palette matching the app's blue/purple/pink theme
const COLORS = ['#93c5fd', '#c4b5fd', '#f9a8d4', '#fda4af', '#a5f3fc'];

// Gentle burst for the lock-screen unlock moment
export const unlockBurst = () => {
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 32,
    gravity: 0.85,
    scalar: 0.95,
    ticks: 220,
    origin: { y: 0.6 },
    colors: COLORS,
    disableForReducedMotion: true,
  });
};

// Bigger two-sided celebration for completing all 12 months
export const completionCelebration = () => {
  const opts = {
    particleCount: 70,
    spread: 60,
    startVelocity: 45,
    gravity: 0.9,
    ticks: 260,
    colors: COLORS,
    disableForReducedMotion: true,
  };
  confetti({ ...opts, angle: 60, origin: { x: 0, y: 0.75 } });
  confetti({ ...opts, angle: 120, origin: { x: 1, y: 0.75 } });
  setTimeout(() => {
    confetti({ ...opts, particleCount: 50, angle: 90, spread: 100, origin: { x: 0.5, y: 0.7 } });
  }, 350);
};
