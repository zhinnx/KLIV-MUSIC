'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { usePlayerStore, Track } from '@/lib/store';
import BottomNav from '@/components/BottomNav';
import MiniPlayer from '@/components/MiniPlayer';
import { ArrowLeft, MoreHorizontal, Play, Lock, Unlock, Shuffle } from 'lucide-react';

const PLAYLIST_TRACKS: Track[] = [
  { id: '1', videoId: 'dQw4w9WgXcQ', title: 'Senja di Ruang Tunggu', artist: 'Nadira Kalis', duration: 222, thumbnail: 'https://picsum.photos/id/1011/300/300' },
  { id: '2', videoId: '3JZ_2q4r0Xw', title: 'Ombak Kecil', artist: 'Studio Lain', duration: 250, thumbnail: 'https://picsum.photos/id/1005/300/300' },
  { id: '3', videoId: '2Vv-BfVoq4g', title: 'Kota Tanpa Nama', artist: 'Bayu Antariksa', duration: 215, thumbnail: 'https://picsum.photos/id/201/300/300' },
  { id: '4', videoId: '9bZkp7q19f0', title: 'Malam Jingga', artist: 'Kanaya Ruatan', duration: 200, thumbnail: 'https://picsum.photos/id/160/300/300' },
];

export default function PlaylistDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { playTrack } = usePlayerStore();

  const [isLocked, setIsLocked] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const playlistName = 'Mood Senja';
  const totalDuration = Math.floor(PLAYLIST_TRACKS.reduce((a, b) => a + b.duration, 0) / 60);

  const handlePlay = (track: Track, index: number) => {
    playTrack(track, PLAYLIST_TRACKS);
    router.push('/player');
  };

  return (
    <div className="min-h-screen kliv-bg pb-24 max-w-[420px] mx-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-2 flex items-center justify-between sticky top-0 z-40 bg-[#071014]/95 backdrop-blur">
        <button onClick={() => router.back()}><ArrowLeft className="w-5 h-5" /></button>
        <span className="text-sm font-medium text-[#BFCADC]">Playlist</span>
        <button onClick={() => setShowMenu(true)}><MoreHorizontal className="w-5 h-5" /></button>
      </div>

      <div className="px-5 pt-2 pb-4">
        {/* Cover + Info */}
        <div className="flex justify-center mb-4">
          <div className="w-[210px] h-[210px] rounded-2xl overflow-hidden shadow-xl relative">
            <img src="https://picsum.photos/id/1011/420/420" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-[27px] font-bold tracking-tight mb-px">{playlistName}</h1>
          <p className="text-[#BFCADC]">{PLAYLIST_TRACKS.length} lagu • {totalDuration} menit</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className="flex items-center gap-1.5 text-sm"
          >
            {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4 text-[#C3F400]" />}
            <span className="text-sm">{isLocked ? 'Terkunci' : 'Dibuka (Reorder)'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="p-2 text-[#BFCADC]"><Shuffle className="w-5 h-5" /></button>
            <button 
              onClick={() => { playTrack(PLAYLIST_TRACKS[0], PLAYLIST_TRACKS); router.push('/player'); }}
              className="w-12 h-12 bg-[#C3F400] rounded-full flex items-center justify-center text-[#071014]"
            >
              <Play className="w-6 h-6 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Track List */}
        <div>
          {PLAYLIST_TRACKS.map((track, index) => (
            <div 
              key={index} 
              onClick={() => handlePlay(track, index)} 
              className="flex items-center gap-3 py-[9px] px-1 rounded-xl cursor-pointer track-row"
            >
              <div className="w-10 text-[#BFCADC] font-mono text-sm text-right pr-1">{index + 1}</div>
              <div className="w-11 h-11 rounded overflow-hidden flex-shrink-0">
                <img src={track.thumbnail} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[15px]">{track.title}</div>
                <div className="text-sm text-[#BFCADC]">{track.artist}</div>
              </div>
              <div className="text-xs font-mono text-[#BFCADC] pr-1">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</div>
              <button className="px-1 text-[#BFCADC]">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sheet Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-[70] flex items-end" onClick={() => setShowMenu(false)}>
          <div className="w-full max-w-[420px] mx-auto bg-[#1A2428] rounded-t-3xl p-2 pb-6" onClick={e => e.stopPropagation()}>
            <div className="h-1 w-9 bg-[#3F484E] mx-auto my-3 rounded-full" />
            <div className="px-2 py-1 text-sm font-semibold text-[#BFCADC]">{playlistName}</div>
            
            {[
              { label: 'Edit Playlist', icon: '✏️' },
              { label: 'Bagikan Playlist', icon: '🔗' },
              { label: 'Upload to Cloud', icon: '☁️' },
              { label: 'Unduh Playlist', icon: '⬇️' },
              { label: 'Hapus Playlist', icon: '🗑️', danger: true },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-[13px] ${item.danger ? 'text-red-400' : ''}`} onClick={() => setShowMenu(false)}>
                <span>{item.icon}</span> <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
      <MiniPlayer />
    </div>
  );
}
