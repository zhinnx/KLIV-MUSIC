'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { usePlayerStore, Track } from '@/lib/store';
import BottomNav from '@/components/BottomNav';
import MiniPlayer from '@/components/MiniPlayer';
import { Bell, Search } from 'lucide-react';

const MOCK_TRACKS: Track[] = [
  {
    id: '1', videoId: 'dQw4w9WgXcQ',
    title: 'Senja di Ruang Tunggu', artist: 'Nadira Kalis', duration: 222,
    thumbnail: 'https://picsum.photos/id/1011/300/300',
    thumbnailLarge: 'https://picsum.photos/id/1011/600/600',
  },
  {
    id: '2', videoId: '3JZ_2q4r0Xw',
    title: 'Ombak Kecil', artist: 'Studio Lain', duration: 250,
    thumbnail: 'https://picsum.photos/id/1005/300/300',
  },
  {
    id: '3', videoId: '2Vv-BfVoq4g',
    title: 'Kota Tanpa Nama', artist: 'Bayu Antariksa', duration: 215,
    thumbnail: 'https://picsum.photos/id/201/300/300',
  },
  {
    id: '4', videoId: '9bZkp7q19f0',
    title: 'Malam Jingga', artist: 'Kanaya Ruatan', duration: 200,
    thumbnail: 'https://picsum.photos/id/160/300/300',
  },
  {
    id: '5', videoId: 'hT_nvWreIhg',
    title: 'Pulang', artist: 'Studio Lain', duration: 198,
    thumbnail: 'https://picsum.photos/id/251/300/300',
  },
];

const ARTISTS = [
  { id: 'a1', name: 'Nadira Kalis', avatar: 'https://picsum.photos/id/1005/80/80' },
  { id: 'a2', name: 'Bayu Antariksa', avatar: 'https://picsum.photos/id/1009/80/80' },
  { id: 'a3', name: 'Studio Lain', avatar: 'https://picsum.photos/id/201/80/80' },
  { id: 'a4', name: 'Kanaya Ruatan', avatar: 'https://picsum.photos/id/160/80/80' },
  { id: 'a5', name: 'Elang Nirwana', avatar: 'https://picsum.photos/id/251/80/80' },
];

const GENRES = ['Semua', 'Pop', 'Indie', 'Hip-Hop', 'Lo-fi', 'Elektronik', 'Akustik'];

export default function Homepage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { playTrack } = usePlayerStore();
  const [activeGenre, setActiveGenre] = useState('Semua');

  // Redirect to onboarding if not logged in
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/onboarding');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center kliv-bg">
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-6 h-6 bg-[#C3F400] rounded-full"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Raka';

  const handlePlayTrack = (track: Track) => {
    playTrack(track, MOCK_TRACKS);
  };

  return (
    <div className="min-h-screen kliv-bg pb-24 max-w-[420px] mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#071014]/95 backdrop-blur-lg px-5 pt-4 pb-3 border-b border-[#2F3A3F]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 bg-[#C3F400] rounded flex items-center justify-center">
                <span className="text-[#071014] text-sm font-black">K</span>
              </div>
              <span className="font-display text-2xl font-bold tracking-[-1.5px] text-[#C3F400]">Kliv</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-1.5 text-[#BFCADC] hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
            <div 
              onClick={() => router.push('/profile')}
              className="w-8 h-8 rounded-full overflow-hidden border border-[#3F484E] cursor-pointer"
            >
              <img 
                src={user.user_metadata?.avatar_url || `https://picsum.photos/id/1005/32/32`} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          onClick={() => router.push('/search')}
          className="flex items-center gap-3 bg-[#1A2428] border border-[#2F3A3F] rounded-2xl px-4 py-3 text-sm cursor-pointer"
        >
          <Search className="w-4 h-4 text-[#BFCADC]" />
          <span className="text-[#BFCADC]">Cari lagu, artis, atau album...</span>
        </div>
      </header>

      <main className="px-5 pt-5 pb-6">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="font-display text-[27px] leading-[1.05] font-bold tracking-[-1px] mb-1">
            Selamat siang,<br />{userName} 👋
          </h1>
          <p className="text-[#BFCADC]">Yuk, dengarkan sesuatu yang baru hari ini</p>
        </div>

        {/* Genre Chips */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-6 -mx-1 px-1">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`genre-chip px-5 py-[9px] rounded-full text-sm font-medium whitespace-nowrap border border-[#2F3A3F] ${
                activeGenre === genre 
                  ? 'active bg-[#C3F400] text-[#071014] border-[#C3F400]' 
                  : 'text-[#BFCADC]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Continue Listening */}
        <section className="mb-8">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-semibold text-lg">Lanjutkan Mendengarkan</h2>
            <span className="text-[#C3F400] text-sm cursor-pointer" onClick={() => router.push('/library')}>Lihat semua</span>
          </div>

          <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x pb-1 -mx-1 px-1">
            {MOCK_TRACKS.slice(0, 3).map((track, index) => (
              <div 
                key={track.id}
                onClick={() => handlePlayTrack(track)}
                className="shrink-0 w-[168px] snap-start cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden mb-2.5 aspect-square">
                  <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 right-3 w-9 h-9 bg-[#C3F400] rounded-full flex items-center justify-center shadow">
                    <span className="text-[#071014] text-2xl leading-none mt-0.5">▶︎</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-[15px] line-clamp-1">{track.title}</p>
                  <p className="text-sm text-[#BFCADC]">{track.artist}</p>
                  <div className="h-[3px] bg-[#333535] mt-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#C3F400] h-full w-[65%]" style={{ width: `${index === 0 ? 65 : 20}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Artists */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">Artis Populer</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
            {ARTISTS.map((artist) => (
              <div 
                key={artist.id} 
                onClick={() => router.push(`/artist/${artist.id}`)}
                className="flex-shrink-0 flex flex-col items-center w-16 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#3F484E] mb-2">
                  <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-center text-[#BFCADC] line-clamp-2 leading-tight">{artist.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section>
          <h2 className="font-semibold text-lg mb-3">Rilisan Baru</h2>
          <div className="space-y-1">
            {MOCK_TRACKS.slice(1, 4).map((track, idx) => (
              <div 
                key={idx} 
                onClick={() => handlePlayTrack(track)}
                className="track-row flex items-center gap-3.5 px-1 py-2.5 -mx-1 rounded-xl cursor-pointer active:bg-[#1A2428]"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={track.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[15px] truncate">{track.title}</p>
                  <p className="text-sm text-[#BFCADC] truncate">{track.artist}</p>
                </div>
                <div className="text-xs text-[#BFCADC] font-mono px-2">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePlayTrack(track); }}
                  className="w-8 h-8 flex items-center justify-center text-[#C3F400]"
                >
                  ▶
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
      <MiniPlayer />
    </div>
  );
}
