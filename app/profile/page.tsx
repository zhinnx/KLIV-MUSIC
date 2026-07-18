'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import BottomNav from '@/components/BottomNav';
import MiniPlayer from '@/components/MiniPlayer';
import { Settings, MessageCircle, Info, LogOut } from 'lucide-react';
import { usePlayerStore } from '@/lib/store';

export default function ProfilePage() {
  const { user, loading, signOut, signInWithGoogle, signInWithGitHub } = useAuth();
  const router = useRouter();
  const { likedTracks } = usePlayerStore();

  if (loading) {
    return <div className="min-h-screen kliv-bg flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    // Show logged out state
    return (
      <div className="min-h-screen kliv-bg pb-20 max-w-[420px] mx-auto">
        <div className="px-6 pt-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[#C3F400] text-4xl">♪</span>
              <span className="font-display text-4xl font-bold tracking-tighter text-[#C3F400]">Kliv</span>
            </div>
          </div>

          <div className="text-6xl mb-7">👋</div>
          <h1 className="text-2xl font-bold mb-3">Masuk untuk pengalaman lebih personal</h1>
          <p className="text-[#BFCADC] mb-8">Simpan playlist, lihat statistik, dan nikmati fitur Kliv sepenuhnya.</p>

          <div className="space-y-3">
            <button 
              onClick={async () => {
                try {
                  await signInWithGoogle();
                } catch (e) {
                  alert('Login Google gagal. Coba lagi.');
                }
              }}
              className="w-full bg-white text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.34z"/>
              </svg>
              Lanjutkan dengan Google
            </button>
            <button 
              onClick={async () => {
                try {
                  await signInWithGitHub();
                } catch (e) {
                  alert('Login GitHub gagal. Coba lagi.');
                }
              }}
              className="auth-btn-github w-full font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Lanjutkan dengan GitHub
            </button>
          </div>

          <p className="mt-10 text-xs text-[#BFCADC]">Dengan masuk, kamu menyetujui Syarat &amp; Ketentuan serta Kebijakan Privasi Kliv.</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const userEmail = user.email || '';
  const avatar = user.user_metadata?.avatar_url || `https://picsum.photos/id/1005/80/80`;

  const handleSignOut = async () => {
    await signOut();
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen kliv-bg pb-24 max-w-[420px] mx-auto">
      <div className="px-5 pt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-[#3F484E]">
              <img src={avatar} alt={userName} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-bold text-2xl tracking-tight">{userName}</h1>
              <p className="text-sm text-[#BFCADC]">{userEmail}</p>
            </div>
          </div>
          <button onClick={() => router.push('/profile/settings')} className="p-2.5 text-[#BFCADC]">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          <div className="kliv-surface p-4 rounded-2xl border border-[#2F3A3F]">
            <div className="text-xs text-[#BFCADC] mb-1">Level &amp; EXP</div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-3xl font-bold">12</span>
                <span className="text-xs ml-1 text-[#BFCADC]">Level</span>
              </div>
              <span className="text-xs font-mono">740/1000</span>
            </div>
            <div className="h-1.5 bg-[#333535] rounded-full overflow-hidden">
              <div className="bg-[#C3F400] w-[74%] h-full rounded-full" />
            </div>
          </div>

          <div className="kliv-surface p-4 rounded-2xl border border-[#2F3A3F]">
            <div className="text-xs text-[#BFCADC] mb-1">Rate by Time</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">18h</div>
                <div className="text-xs text-[#BFCADC]">minggu ini</div>
              </div>
              <div className="flex gap-[3px] items-end h-8">
                {[4, 3, 6, 5, 2, 7, 5].map((h, i) => (
                  <div key={i} className="bg-[#C3F400]/90 w-[5px] rounded" style={{ height: `${h * 3}px` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="flex justify-between text-sm mb-7 px-1">
          <div>
            <span className="font-bold">{likedTracks.length}</span> <span className="text-[#BFCADC]">lagu</span>
          </div>
          <div>
            <span className="font-bold">42</span> <span className="text-[#BFCADC]">playlist</span>
          </div>
          <div>
            <span className="font-bold">Indie</span> <span className="text-[#BFCADC]">favorit</span>
          </div>
        </div>

        {/* Menu */}
        <div className="kliv-surface rounded-2xl divide-y divide-[#2F3A3F] text-sm border border-[#2F3A3F]">
          <div 
            onClick={() => router.push('/profile/settings')}
            className="flex items-center justify-between px-4 py-[15px] cursor-pointer hover:bg-[#263237]"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-[#BFCADC]" />
              <span>Settings</span>
            </div>
            <span className="text-[#BFCADC]">›</span>
          </div>

          <div className="flex items-center justify-between px-4 py-[15px] cursor-pointer hover:bg-[#263237]">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-[#BFCADC]" />
              <span>Feedback</span>
            </div>
            <span className="text-[#BFCADC]">›</span>
          </div>

          <div className="flex items-center justify-between px-4 py-[15px]">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-[#BFCADC]" />
              <span>Versi Aplikasi</span>
            </div>
            <span className="font-mono text-[#BFCADC]">v1.0.0</span>
          </div>

          <div 
            onClick={handleSignOut}
            className="flex items-center justify-between px-4 py-[15px] text-red-400 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
      <MiniPlayer />
    </div>
  );
}
