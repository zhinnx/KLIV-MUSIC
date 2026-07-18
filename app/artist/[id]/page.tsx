'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { usePlayerStore, Track } from '@/lib/store';
import { ArrowLeft, Play, MoreHorizontal } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import MiniPlayer from '@/components/MiniPlayer';

const ARTIST_DATA: { [key: string]: any } = {
  'a1': {
    name: 'Nadira Kalis',
    subscribers: '1.2M',
    banner: 'https://picsum.photos/id/1005/600/240',
    avatar: 'https://picsum.photos/id/1005/80/80',
    bio: 'Singer-songwriter Indonesia dengan suara yang khas. Dikenal dengan lagu-lagu yang penuh emosi dan cerita.',
    topSongs: [
      { id: '1', videoId: 'dQw4w9WgXcQ', title: 'Senja di Ruang Tunggu', artist: 'Nadira Kalis', duration: 222, thumbnail: 'https://picsum.photos/id/1011/300/300', plays: '2.1M' },
      { id: '10', videoId: 'abc1', title: 'Hujan Bulan Lalu', artist: 'Nadira Kalis', duration: 245, thumbnail: 'https://picsum.photos/id/1005/300/300', plays: '1.8M' },
    ]
  }
};

export default function ArtistPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { playTrack } = usePlayerStore();

  const artistId = params.id || 'a1';
  const artist = ARTIST_DATA[artistId] || ARTIST_DATA['a1'];

  const handlePlaySong = (song: any) => {
    const track: Track = {
      id: song.id,
      videoId: song.videoId,
      title: song.title,
      artist: song.artist,
      duration: song.duration,
      thumbnail: song.thumbnail,
    };
    playTrack(track, artist.topSongs);
    router.push('/player');
  };

  return (
    <div className="min-h-screen kliv-bg pb-24 max-w-[420px] mx-auto">
      {/* Banner */}
      <div className="relative h-[210px]">
        <img src={artist.banner} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#071014]" />
        <button onClick={() => router.back()} className="absolute top-5 left-5 p-2 bg-black/30 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="px-5 -mt-8 relative z-10">
        {/* Artist Info */}
        <div className="mb-4">
          <div className="flex items-end gap-4 mb-2">
            <div>
              <h1 className="font-bold text-4xl tracking-tighter">{artist.name}</h1>
              <div className="text-[#BFCADC]">{artist.subscribers} pendengar bulanan</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button className="px-7 py-[9px] border border-[#C3F400] text-sm font-semibold rounded-full">Ikuti</button>
            <button 
              onClick={() => handlePlaySong(artist.topSongs[0])}
              className="w-12 h-12 bg-[#C3F400] rounded-full flex items-center justify-center text-[#071014]"
            >
              <Play className="ml-0.5" />
            </button>
            <button className="ml-auto p-2"><MoreHorizontal /></button>
          </div>
        </div>

        {/* Popular */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Populer</h3>
          </div>
          <div className="space-y-1">
            {artist.topSongs.map((song: any, index: number) => (
              <div key={index} onClick={() => handlePlaySong(song)} className="flex gap-3 py-2 px-1 rounded-xl cursor-pointer track-row">
                <div className="font-mono w-6 text-[#BFCADC] text-sm text-right">{index + 1}</div>
                <img src={song.thumbnail} className="w-11 h-11 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{song.title}</div>
                  <div className="text-xs text-[#BFCADC]">{song.plays} • {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</div>
                </div>
                <button className="self-center text-[#BFCADC]"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Albums */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Album &amp; EP</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {[{ title: 'Ruang Tunggu', year: '2024' }, { title: 'Senyap', year: '2023' }].map((a, i) => (
              <div key={i} className="w-[130px] flex-shrink-0">
                <img src={i === 0 ? 'https://picsum.photos/id/1011/300/300' : 'https://picsum.photos/id/160/300/300'} className="rounded-xl aspect-square mb-2" />
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-[#BFCADC]">{a.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold mb-2">Tentang Artis</h3>
          <p className="text-[#BFCADC] text-sm leading-relaxed">{artist.bio}</p>
          <button className="text-[#C3F400] text-sm mt-1">Baca Selengkapnya</button>
        </div>
      </div>

      <BottomNav />
      <MiniPlayer />
    </div>
  );
}
