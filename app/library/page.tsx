'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlayerStore, Track } from '@/lib/store';
import BottomNav from '@/components/BottomNav';
import MiniPlayer from '@/components/MiniPlayer';
import { Plus, Search } from 'lucide-react';

const LIKED_TRACKS: Track[] = [
  { id: '1', videoId: 'dQw4w9WgXcQ', title: 'Senja di Ruang Tunggu', artist: 'Nadira Kalis', duration: 222, thumbnail: 'https://picsum.photos/id/1011/300/300' },
  { id: '2', videoId: '3JZ_2q4r0Xw', title: 'Ombak Kecil', artist: 'Studio Lain', duration: 250, thumbnail: 'https://picsum.photos/id/1005/300/300' },
];

const PLAYLISTS = [
  { id: 'p1', title: 'Mood Senja', count: 15, cover: 'https://picsum.photos/id/1011/300/300' },
  { id: 'p2', title: 'Workout Pagi', count: 22, cover: 'https://picsum.photos/id/1005/300/300' },
  { id: 'p3', title: 'Santai Malam', count: 9, cover: 'https://picsum.photos/id/160/300/300' },
  { id: 'p4', title: 'Road Trip', count: 30, cover: 'https://picsum.photos/id/251/300/300' },
];

export default function LibraryPage() {
  const router = useRouter();
  const { likedTracks: likedIds, playTrack } = usePlayerStore();
  const [activeTab, setActiveTab] = useState<'liked' | 'downloaded' | 'top' | 'playlist'>('liked');

  const likedSongs = LIKED_TRACKS; // in real: filter by likedIds

  return (
    <div className="min-h-screen kliv-bg pb-24 max-w-[420px] mx-auto">
      <div className="px-5 pt-5 pb-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-3xl tracking-tight">Pustaka</h1>
          <button className="text-[#C3F400]">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 text-sm">
          {[
            { label: 'Disukai', key: 'liked' },
            { label: 'Download', key: 'downloaded' },
            { label: 'Top Minggu', key: 'top' },
            { label: 'Playlist', key: 'playlist' },
          ].map((tab) => (
            <button 
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-1 rounded-full font-medium transition ${activeTab === tab.key ? 'bg-[#C3F400] text-black' : 'text-[#BFCADC]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on tab */}
        {activeTab === 'liked' && (
          <div>
            <div className="bg-gradient-to-br from-[#263237] to-[#1A2428] rounded-2xl p-5 mb-7 flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center text-4xl bg-[#C3F400]/10 rounded-xl">❤️</div>
              <div>
                <div className="font-bold text-lg">Lagu yang Disukai</div>
                <div className="text-sm text-[#BFCADC]">{likedSongs.length} lagu</div>
              </div>
            </div>

            <div className="space-y-px">
              {likedSongs.map(track => (
                <div key={track.id} onClick={() => playTrack(track, likedSongs)} className="track-row flex gap-3 px-1 py-2.5 rounded-lg cursor-pointer">
                  <img src={track.thumbnail} className="w-12 h-12 rounded-lg" alt="" />
                  <div className="flex-1">
                    <div className="font-medium">{track.title}</div>
                    <div className="text-[#BFCADC] text-sm">{track.artist}</div>
                  </div>
                  <div className="self-center text-xs text-[#BFCADC] font-mono">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'downloaded' && (
          <div className="bg-gradient-to-br from-[#263237] to-[#1A2428] rounded-2xl p-5 mb-7 flex items-center gap-4">
            <div className="text-3xl">⬇︎</div>
            <div>
              <div className="font-bold">Lagu Terunduh</div>
              <div className="text-sm text-[#BFCADC]">12 lagu • 58 MB</div>
              <div className="text-xs mt-1 px-2 inline-block bg-emerald-900/50 text-emerald-400 rounded">Tersedia Offline</div>
            </div>
          </div>
        )}

        {(activeTab === 'top' || activeTab === 'liked') && activeTab !== 'liked' && (
          <div>
            <h3 className="font-semibold mb-3 text-sm tracking-widest">TOP MINGGU INI</h3>
            <div className="flex flex-col gap-2">
              {likedSongs.map((t, i) => (
                <div key={i} onClick={() => playTrack(t, likedSongs)} className="flex gap-3 py-2 px-1 cursor-pointer">
                  <div className="w-8 text-right font-mono text-[#C3F400] self-center pr-1">#{i + 1}</div>
                  <img src={t.thumbnail} className="rounded w-11 h-11" />
                  <div className="flex-1">
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-[#BFCADC]">{t.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'playlist' && (
          <>
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Playlist Kamu</span>
              <button onClick={() => alert('Create playlist (mock)')} className="w-9 h-9 flex items-center justify-center bg-[#C3F400] text-black rounded-full">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {PLAYLISTS.map(pl => (
                <div key={pl.id} onClick={() => router.push(`/playlist/${pl.id}`)} className="cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden mb-2">
                    <img src={pl.cover} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-medium text-sm">{pl.title}</div>
                  <div className="text-xs text-[#BFCADC]">{pl.count} lagu</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNav />
      <MiniPlayer />
    </div>
  );
}
