import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import { songs } from '@/components/songs';

// One shared <audio> element for the whole app. The SPA never reloads on
// navigation, so a song started on the Soundtrack page keeps playing across
// every page. Auto-advance on 'ended' is allowed by browsers because playback
// on this element was user-initiated.
const MusicContext = createContext(null);

const STORAGE_KEY = 'bushy_meme_song_index';

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const errorStreakRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const stored = parseInt(sessionStorage.getItem(STORAGE_KEY) ?? '', 10);
    return stored >= 0 && stored < songs.length ? stored : 0;
  });
  // After a reload the browser blocks silent resume, so hasStarted only marks
  // that a song was chosen this session — the dock shows a paused pill and one
  // tap resumes.
  const [hasStarted, setHasStarted] = useState(() => sessionStorage.getItem(STORAGE_KEY) !== null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playIndex = useCallback((index) => {
    const audio = audioRef.current;
    if (!audio || songs.length === 0) return;
    const i = ((index % songs.length) + songs.length) % songs.length;
    setCurrentIndex(i);
    setHasStarted(true);
    sessionStorage.setItem(STORAGE_KEY, String(i));
    audio.src = songs[i].file;
    audio.play().catch(() => {
      // Autoplay rejection (e.g. after reload) — stay paused, dock tap resumes
      setIsPlaying(false);
    });
  }, []);

  const startPlaylist = useCallback((index) => {
    errorStreakRef.current = 0;
    playIndex(index);
  }, [playIndex]);

  const next = useCallback(() => {
    playIndex(currentIndex + 1);
  }, [playIndex, currentIndex]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (!audio.src) audio.src = songs[currentIndex]?.file ?? '';
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => { errorStreakRef.current = 0; setIsPlaying(true); };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      // advance through the playlist forever, wrapping at the end
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % songs.length;
        sessionStorage.setItem(STORAGE_KEY, String(nextIndex));
        audio.src = songs[nextIndex].file;
        audio.play().catch(() => setIsPlaying(false));
        return nextIndex;
      });
    };
    const onError = () => {
      // one broken file shouldn't kill the music — skip ahead, but stop
      // after a full lap of failures
      errorStreakRef.current += 1;
      if (errorStreakRef.current >= songs.length) return;
      onEnded();
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const value = {
    songs,
    currentIndex,
    currentSong: songs[currentIndex] ?? null,
    hasStarted,
    isPlaying,
    startPlaylist,
    togglePlay,
    next,
  };

  return (
    <MusicContext.Provider value={value}>
      <audio ref={audioRef} preload="none" style={{ display: 'none' }} data-testid="app-music" />
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
