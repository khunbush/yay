// Soft, gentle tap sound using Web Audio API
// No external assets, no loading time, respects system volume (mostly)
export const playTapSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    // Create context on user interaction (allowed)
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Sound Design: "Soft Mechanical Thock"
    // Inspired by tactile keyboard switches (e.g. Brown/Topre)
    // Triangle wave gives the "plastic/woody" texture
    osc.type = 'triangle';

    // Pitch Sweep: "Tick" (600Hz) down to "Thock" (150Hz)
    // Creates the tactile bump feel
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);

    // Volume Envelope
    // Fast attack (2ms) for crisp contact
    // Quick decay for the tight mechanical feel
    // Lower volume peak (0.08) because triangle waves are louder/buzzier
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) {
    // Fail silently if audio context is blocked or not supported
    console.error("Audio play failed", e);
  }
};
