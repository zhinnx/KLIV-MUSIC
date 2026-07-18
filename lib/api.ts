// Simple music API layer for Kliv
// Using mock + direct stream from api-velomusic

export interface Song {
  id: string;
  videoId: string;
  title: string;
  artist: string;
  artistId?: string;
  album?: string;
  duration: number;
  thumbnail: string;
  thumbnailLarge?: string;
}

const STREAM_BASE = "https://api-velomusic-production.up.railway.app";

export function getStreamUrl(videoId: string) {
  return `${STREAM_BASE}/api/stream?url=${encodeURIComponent(videoId)}`;
}

// Mock songs (in production replace with real ytmusic-api calls)
export const MOCK_SONGS: Song[] = [
  {
    id: '1', videoId: 'dQw4w9WgXcQ',
    title: 'Senja di Ruang Tunggu', artist: 'Nadira Kalis', duration: 222,
    thumbnail: 'https://picsum.photos/id/1011/300/300',
    thumbnailLarge: 'https://picsum.photos/id/1011/600/600',
    artistId: 'a1',
  },
  {
    id: '2', videoId: '3JZ_2q4r0Xw',
    title: 'Ombak Kecil', artist: 'Studio Lain', duration: 250,
    thumbnail: 'https://picsum.photos/id/1005/300/300',
    artistId: 'a3',
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
];

export async function searchSongs(query: string): Promise<Song[]> {
  // Mock search
  const q = query.toLowerCase();
  return MOCK_SONGS.filter(s => 
    s.title.toLowerCase().includes(q) || 
    s.artist.toLowerCase().includes(q)
  );
}

export async function getHomeFeeds() {
  return {
    popular: MOCK_SONGS.slice(0, 3),
    recommendations: MOCK_SONGS,
    newReleases: MOCK_SONGS.slice(2),
  };
}

export async function getArtist(id: string) {
  return {
    id,
    name: id === 'a1' ? 'Nadira Kalis' : 'Studio Lain',
    thumbnail: 'https://picsum.photos/id/1005/300/300',
    subscribers: '1.2M',
    topSongs: MOCK_SONGS.slice(0, 3),
  };
}
