'use client';

import React from 'react';
import { usePlayerStore } from '@/lib/store';
import { Play, Pause, ChevronUp } from 'lucide-react';

export default function MiniPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    togglePlay, 
    toggleExpanded 
  } = usePlayerStore();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      onClick={toggleExpanded}
      className="fixed bottom-[64px] left-0 right-0 z-50 mx-auto max-w-[420px] px-3"
    >
      <div className="mini-player rounded-2xl px-3 py-[9px] flex items-center gap-3 shadow-xl cursor-pointer">
        {/* Cover */}
        <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={currentTrack.thumbnail} 
            alt={currentTrack.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0" onClick={(e) => { e.stopPropagation(); toggleExpanded(); }}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 pr-1">
              <div className="font-medium text-[13.5px] truncate leading-none">{currentTrack.title}</div>
              <div className="text-[11px] text-[#BFCADC] truncate mt-0.5">{currentTrack.artist}</div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
              className="w-9 h-9 flex items-center justify-center text-[#C3F400] flex-shrink-0"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Progress + expand */}
        <div className="flex flex-col items-center gap-px pr-1">
          <ChevronUp className="w-3.5 h-3.5 text-[#BFCADC]" />
        </div>
      </div>

      {/* Tiny progress */}
      <div className="h-[2px] bg-[#333535] mx-3 mt-[-1px] rounded-full relative overflow-hidden">
        <div 
          className="absolute h-full bg-[#C3F400]" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
