'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlayerStore, Track } from '@/lib/store';
import BottomNav from '@/components/BottomNav';
import MiniPlayer from '@/components/MiniPlayer';
import { ArrowLeft, Search, X } from 'lucide-react';

const MOCK_SEARCH_RESULTS = {
  songs: [
    { id: '1', videoId: 'dQw4w9WgXcQ', title: 'Senja di Ruang Tunggu', artist: 'Nadira Kalis', duration: 222, thumbnail: 'https://picsum.photos/id/1011/300/300' },
    { id: '2', videoId: '3JZ_2q4r0Xw', title: 'Ombak Kecil', artist: 'Studio Lain', duration: 250, thumbnail: 'https://picsum.photos/id/1005/300/300' },
    { id: '6', videoId: 'xyz123', title: 'Menuju Senja', artist: 'Studio Lain', duration: 250, thumbnail: 'https://picsum.photos/id/160/300/300' },
  ] as Track[],
  artists: [
    { id: 'a1', name: 'Nadira Kalis', avatar: 'https://picsum.photos/id/1005/80/80' },
    { id: 'a2', name: 'Studio Lain', avatar: 'https://picsum.photos/id/201/80/80' },
  ],
  playlists: [
    { id: 'p1', title: 'Mix Senja', count: '15 lagu', cover: 'https://picsum.photos/id/1011/300/300' },
  ],
};

export default function SearchPage() {
  const router = useRouter();
  const { playTrack } = usePlayerStore();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Semua' | 'Lagu' | 'Artis' | 'Playlist'>('Semua');
  const [recentSearches, setRecentSearches] = useState(['Nadira Kalis', 'Lo-fi Pagi', 'Ombak Kecil']);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim() && !recentSearches.includes(q.trim())) {
      setRecentSearches(prev => [q.trim(), ...prev].slice(0, 5));
    }
  };

  const filteredSongs = MOCK_SEARCH_RESULTS.songs.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    t.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen kliv-bg pb-24 max-w-[420px] mx-auto">
      <div className="px-5 pt-5">
        {/* Search Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => router.back()} className="text-[#BFCADC]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Cari lagu, artis, atau album..."
              className="w-full bg-[#1A2428] border border-[#2F3A3F] focus:border-[#C3F400] pl-11 py-3.5 rounded-2xl text-sm placeholder:text-[#BFCADC] outline-none"
              autoFocus
            />
            <Search className="absolute left-4 top-4 w-4 h-4 text-[#BFCADC]" />
          </div>
          {query && <button onClick={() => setQuery('')}><X className="w-5 h-5 text-[#BFCADC]" /></button>}
        </div>

        {!query ? (
          /* Empty state */
          <>
            <div className="mb-6">
              <div className="text-xs uppercase text-[#BFCADC] mb-2 font-medium">Pencarian Terakhir</div>
              {recentSearches.map((s, i) => (
                <div key={i} onClick={() => handleSearch(s)} className="flex justify-between items-center py-[9px] px-1 border-b border-[#2F3A3F] last:border-none cursor-pointer">
                  <span>{s}</span>
                  <button onClick={(e) => { e.stopPropagation(); setRecentSearches(prev => prev.filter((_, idx) => idx !== i)); }} className="text-xs text-[#BFCADC]">✕</button>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs uppercase text-[#BFCADC] mb-3 font-medium">Jelajahi Genre</div>
              <div className="grid grid-cols-2 gap-3">
                {['Pop', 'Indie', 'Hip-Hop', 'Lo-fi', 'Elektronik', 'Akustik', 'R&amp;B', 'Jazz'].map((g, i) => (
                  <div key={i} className="py-3 px-5 rounded-2xl text-sm font-medium border border-[#2F3A3F] bg-[#1A2428]" style={{ background: i % 2 === 0 ? '#263237' : '#1A2428' }}>
                    {g}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-xs uppercase text-[#BFCADC] mb-3 font-medium">Podcast &amp; Artis Trending</div>
              <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                {MOCK_SEARCH_RESULTS.artists.map(a => (
                  <div key={a.id} onClick={() => router.push(`/artist/${a.id}`)} className="flex-shrink-0 w-[70px] cursor-pointer">
                    <img src={a.avatar} className="w-16 h-16 rounded-full mb-1.5" alt="" />
                    <div className="text-xs text-center">{a.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Results state */
          <div>
            {/* Filter tabs */}
            <div className="flex gap-2 mb-5 overflow-x-auto hide-scrollbar">
              {(['Semua', 'Lagu', 'Artis', 'Playlist'] as const).map(f => (
                <button 
                  key={f} 
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${activeFilter === f ? 'bg-[#C3F400] text-[#071014]' : 'bg-[#1A2428] border border-[#2F3A3F]'}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Songs */}
            {(activeFilter === 'Semua' || activeFilter === 'Lagu') && filteredSongs.length > 0 && (
              <div className="mb-7">
                <h3 className="font-semibold mb-2 text-sm tracking-widest">LAGU</h3>
                {filteredSongs.map(track => (
                  <div key={track.id} onClick={() => playTrack(track, filteredSongs)} className="track-row flex gap-3 py-[9px] px-1 rounded-xl cursor-pointer active:bg-[#1A2428]">
                    <img src={track.thumbnail} className="w-[48px] h-[48px] rounded object-cover" />
                    <div className="flex-1">
                      <div className="font-medium">{track.title}</div>
                      <div className="text-[#BFCADC] text-sm">{track.artist}</div>
                    </div>
                    <div className="self-center text-xs text-[#BFCADC]">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Artists */}
            {(activeFilter === 'Semua' || activeFilter === 'Artis') && (
              <div className="mb-7">
                <h3 className="font-semibold mb-2 text-sm tracking-widest">ARTIS</h3>
                <div className="flex gap-4">
                  {MOCK_SEARCH_RESULTS.artists.map(artist => (
                    <div key={artist.id} onClick={() => router.push(`/artist/${artist.id}`)} className="cursor-pointer">
                      <img src={artist.avatar} className="w-16 h-16 rounded-full mb-1" />
                      <div className="text-sm text-center">{artist.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Playlists */}
            {(activeFilter === 'Semua' || activeFilter === 'Playlist') && (
              <div>
                <h3 className="font-semibold mb-2 text-sm tracking-widest">PLAYLIST</h3>
                <div className="flex gap-3">
                  {MOCK_SEARCH_RESULTS.playlists.map(pl => (
                    <div key={pl.id} onClick={() => router.push(`/playlist/${pl.id}`)} className="w-36 cursor-pointer">
                      <img src={pl.cover} className="rounded-lg mb-1.5 w-full aspect-square object-cover" />
                      <div className="font-medium text-sm">{pl.title}</div>
                      <div className="text-xs text-[#BFCADC]">{pl.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
      <MiniPlayer />
    </div>
  );
}
