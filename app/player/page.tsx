'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlayerStore } from '@/lib/store';
import { ChevronDown, MoreHorizontal, Heart, Shuffle, SkipBack, SkipForward, Repeat, List, Mic2, Cast } from 'lucide-react';

export default function FullscreenPlayer() {
  const router = useRouter();
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    togglePlay, 
    next, 
    previous, 
    seek, 
    toggleExpanded, 
    toggleLike, 
    likedTracks,
    toggleRepeat,
    toggleShuffle,
    repeatMode,
    shuffleMode
  } = usePlayerStore();

  const [progress, setProgress] = useState(0);

  if (!currentTrack) {
    return (
      <div className="min-h-screen kliv-bg flex items-center justify-center">
        <div className="text-center">
          <p>No track playing</p>
          <button onClick={() => router.push('/')} className="mt-4 text-[#C3F400]">Back to Home</button>
        </div>
      </div>
    );
  }

  const isLiked = likedTracks.includes(currentTrack.id);

  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(percent * duration);
    seek(newTime);
  };

  return (
    <div className="min-h-screen bg-[#071014] flex flex-col max-w-[420px] mx-auto text-white relative">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-7 pb-4">
        <button onClick={() => { toggleExpanded(); router.back(); }} className="p-1">
          <ChevronDown className="w-7 h-7" />
        </button>
        
        <div className="text-center">
          <div className="text-[10px] tracking-[1px] text-[#BFCADC] uppercase">MEMUTAR DARI PLAYLIST</div>
          <div className="text-sm font-medium mt-px">Mood Senja</div>
        </div>

        <button className="p-1">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Album Art */}
      <div className="px-6 pt-3 pb-6 flex justify-center">
        <div className="relative w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-[#C3F400]/20">
          <img 
            src={currentTrack.thumbnailLarge || currentTrack.thumbnail} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 ring-1 ring-inset ring-[#C3F400]/30" />
        </div>
      </div>

      {/* Song Info */}
      <div className="px-6 flex justify-between items-start mb-4">
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-bold tracking-[-0.5px] leading-tight mb-px">{currentTrack.title}</h1>
          <button 
            onClick={() => router.push(`/artist/${currentTrack.artistId || 'a1'}`)}
            className="text-[#BFCADC] hover:text-[#C3F400] transition text-[15px]"
          >
            {currentTrack.artist}
          </button>
        </div>

        <button 
          onClick={() => toggleLike(currentTrack.id)}
          className="pt-1"
        >
          <Heart className={`w-6 h-6 transition ${isLiked ? 'fill-[#C3F400] text-[#C3F400]' : ''}`} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-2">
        <div 
          onClick={handleSeek}
          className="h-[5px] bg-[#333535] rounded-full cursor-pointer relative"
        >
          <div 
            className="h-full bg-[#C3F400] rounded-full" 
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 -mt-[5px] w-3.5 h-3.5 bg-white rounded-full shadow"
            style={{ left: `calc(${progress}% - 7px)` }}
          />
        </div>

        <div className="flex justify-between text-xs font-mono text-[#BFCADC] mt-1.5 px-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="px-6 flex items-center justify-between mt-3 mb-5">
        <button 
          onClick={toggleShuffle}
          className={`p-2 ${shuffleMode ? 'text-[#C3F400]' : 'text-[#BFCADC]'}`}
        >
          <Shuffle className="w-5 h-5" />
        </button>

        <button onClick={previous} className="p-3 text-[#BFCADC]">
          <SkipBack className="w-8 h-8" />
        </button>

        <button 
          onClick={togglePlay} 
          className="w-[68px] h-[68px] bg-[#C3F400] text-[#071014] rounded-full flex items-center justify-center active:scale-[0.95] transition"
        >
          {isPlaying ? (
            <span className="text-[38px] font-black tracking-tighter">❚❚</span>
          ) : (
            <span className="text-[38px] ml-0.5">▶︎</span>
          )}
        </button>

        <button onClick={next} className="p-3 text-[#BFCADC]">
          <SkipForward className="w-8 h-8" />
        </button>

        <button 
          onClick={toggleRepeat} 
          className={`p-2 ${repeatMode !== 'off' ? 'text-[#C3F400]' : 'text-[#BFCADC]'}`}
        >
          <Repeat className="w-5 h-5" />
          {repeatMode === 'one' && <span className="text-[9px] ml-[-6px]">1</span>}
        </button>
      </div>

      {/* Secondary Controls */}
      <div className="px-6 flex justify-center items-center gap-12 text-[#BFCADC]">
        <button className="flex flex-col items-center gap-1 text-xs">
          <Mic2 className="w-6 h-6" />
          <span className="text-[10px]">Lirik</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-xs">
          <List className="w-6 h-6" />
          <span className="text-[10px]">Antrean</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-xs">
          <Cast className="w-6 h-6" />
          <span className="text-[10px]">Perangkat</span>
        </button>
      </div>

      <div className="flex-1" />

      {/* Mini footer hint */}
      <div className="px-6 pb-6 text-center text-[10px] text-[#BFCADC]/70">
        Tap anywhere above to go back
      </div>
    </div>
  );
}
