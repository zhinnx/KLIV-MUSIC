'use client';

import React, { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/lib/store';

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    setCurrentTime, 
    next 
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(Math.floor(audio.currentTime));
      }
    };

    const handleEnded = () => {
      next();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [setCurrentTime, next]);

  // Play / Pause / Load track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Mock stream: Use a sample audio for demo (free public domain music)
    // In real use, we would integrate api-velomusic or yt stream
    const mockStreamUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    if (audio.src !== mockStreamUrl) {
      audio.src = mockStreamUrl;
    }

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }

    // Sync currentTime
    if (Math.abs(audio.currentTime - currentTime) > 1) {
      audio.currentTime = currentTime;
    }
  }, [currentTrack, isPlaying, currentTime]);

  // Update duration when track loads
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      // Use track duration from data if available, else audio.duration
      const duration = usePlayerStore.getState().currentTrack?.duration || Math.floor(audio.duration);
      // Store doesn't have direct setter for duration but we can use the hook in component
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, []);

  return <>{children}</>;
}
