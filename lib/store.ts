import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Track {
  id: string;
  videoId: string;
  title: string;
  artist: string;
  artistId?: string;
  album?: string;
  duration: number; // seconds
  thumbnail: string;
  thumbnailLarge?: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isExpanded: boolean;
  repeatMode: 'off' | 'all' | 'one';
  shuffleMode: boolean;
  likedTracks: string[];
  
  // Actions
  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  toggleExpanded: () => void;
  toggleLike: (trackId: string) => void;
  setCurrentTime: (time: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  clearQueue: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      queue: [],
      currentIndex: 0,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isExpanded: false,
      repeatMode: 'off',
      shuffleMode: false,
      likedTracks: [],

      playTrack: (track, queue = []) => {
        const newQueue = queue.length > 0 ? queue : [track];
        const index = newQueue.findIndex(t => t.id === track.id);
        
        set({
          currentTrack: track,
          queue: newQueue,
          currentIndex: index >= 0 ? index : 0,
          isPlaying: true,
          currentTime: 0,
          duration: track.duration,
          isExpanded: false, // Start collapsed as mini player
        });
      },

      togglePlay: () => {
        const { isPlaying } = get();
        set({ isPlaying: !isPlaying });
      },

      pause: () => set({ isPlaying: false }),
      resume: () => set({ isPlaying: true }),

      next: () => {
        const { queue, currentIndex, repeatMode } = get();
        let nextIndex = currentIndex + 1;
        
        if (nextIndex >= queue.length) {
          if (repeatMode === 'all') {
            nextIndex = 0;
          } else {
            set({ isPlaying: false });
            return;
          }
        }
        
        const nextTrack = queue[nextIndex];
        set({
          currentTrack: nextTrack,
          currentIndex: nextIndex,
          currentTime: 0,
          isPlaying: true,
        });
      },

      previous: () => {
        const { queue, currentIndex } = get();
        let prevIndex = currentIndex - 1;
        
        if (prevIndex < 0) {
          prevIndex = queue.length - 1;
        }
        
        const prevTrack = queue[prevIndex];
        set({
          currentTrack: prevTrack,
          currentIndex: prevIndex,
          currentTime: 0,
          isPlaying: true,
        });
      },

      seek: (time) => {
        set({ currentTime: time });
      },

      toggleExpanded: () => {
        set((state) => ({ isExpanded: !state.isExpanded }));
      },

      toggleLike: (trackId) => {
        set((state) => {
          const isLiked = state.likedTracks.includes(trackId);
          const newLiked = isLiked
            ? state.likedTracks.filter(id => id !== trackId)
            : [...state.likedTracks, trackId];
          return { likedTracks: newLiked };
        });
      },

      setCurrentTime: (time) => set({ currentTime: time }),

      toggleRepeat: () => {
        const { repeatMode } = get();
        const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
        const currentIdx = modes.indexOf(repeatMode);
        set({ repeatMode: modes[(currentIdx + 1) % 3] });
      },

      toggleShuffle: () => set((state) => ({ shuffleMode: !state.shuffleMode })),

      clearQueue: () => set({ queue: [], currentIndex: 0, currentTrack: null, isPlaying: false }),
    }),
    {
      name: 'kliv-player',
      partialize: (state) => ({
        likedTracks: state.likedTracks,
      }),
    }
  )
);
