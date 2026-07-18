'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Music } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

const onboardingSlides = [
  {
    illustration: "🎧",
    headline: "Dengarkan Musik Tanpa Batas",
    subtext: "Ribuan lagu dari berbagai genre, siap menemani harimu.",
  },
  {
    illustration: "🎵",
    headline: "Rekomendasi Sesuai Selera Kamu",
    subtext: "Semakin sering kamu dengar, semakin Kliv mengerti musik favoritmu.",
  },
  {
    illustration: "🌟",
    headline: "Siap Mulai Perjalanan Musikmu?",
    subtext: "Yuk gabung dan rasakan pengalaman mendengarkan musik yang berbeda.",
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const { signInWithGoogle, signInWithGitHub, user } = useAuth();

  // If already logged in, redirect to home
  React.useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowLogin(true);
    }
  };

  const handleSkip = () => {
    setShowLogin(true);
  };

  const handleLogin = async (provider: 'google' | 'github') => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGitHub();
      }
      // Redirect happens via auth state
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login gagal. Coba lagi.');
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen kliv-bg flex items-center justify-center p-6">
        <div className="w-full max-w-[375px] mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Music className="w-8 h-8 text-[#C3F400]" />
              <span className="font-display text-4xl font-bold tracking-tighter text-[#C3F400]">Kliv</span>
            </div>
          </div>

          <div className="text-center mb-10">
            <div className="text-5xl mb-6">👋</div>
            <h1 className="text-3xl font-bold mb-3 tracking-tight">Satu Langkah Lagi</h1>
            <p className="text-[#BFCADC] text-base">Masuk untuk mulai mendengarkan dan menyimpan musik favoritmu.</p>
          </div>

          <div className="space-y-3 mb-8">
            <button 
              onClick={() => handleLogin('google')}
              className="auth-btn-google w-full flex items-center justify-center gap-3 py-4 px-5 rounded-xl font-semibold text-base active:scale-[0.985] transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.34z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Lanjutkan dengan Google
            </button>

            <button 
              onClick={() => handleLogin('github')}
              className="auth-btn-github w-full flex items-center justify-center gap-3 py-4 px-5 rounded-xl font-semibold text-base active:scale-[0.985] transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Lanjutkan dengan GitHub
            </button>
          </div>

          <p className="text-center text-xs text-[#BFCADC]">
            Dengan masuk, kamu menyetujui Syarat &amp; Ketentuan serta Kebijakan Privasi Kliv.
          </p>
        </div>
      </div>
    );
  }

  const slide = onboardingSlides[currentSlide];
  const isLastSlide = currentSlide === onboardingSlides.length - 1;

  return (
    <div className="min-h-screen kliv-bg flex flex-col max-w-[375px] mx-auto relative">
      {/* Skip button */}
      {!isLastSlide && (
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={handleSkip}
            className="text-[#BFCADC] hover:text-[#C3F400] font-medium text-sm px-4 py-1 transition"
          >
            Lewati
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col px-6 pt-16 pb-6">
        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[260px] h-[260px] flex items-center justify-center rounded-3xl border border-[#2F3A3F] bg-[#1A2428]">
            <div className="text-[110px] opacity-90">{slide.illustration}</div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 mb-10 text-left">
          <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight mb-3">
            {slide.headline}
          </h1>
          <p className="text-lg text-[#BFCADC] leading-snug">
            {slide.subtext}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        {/* Dots */}
        <div className="flex items-center gap-2 mb-6 pl-1">
          {onboardingSlides.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide 
                  ? 'w-6 bg-[#C3F400]' 
                  : 'w-2 bg-[#3F484E]'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button 
          onClick={handleNext}
          className="btn-primary w-full py-[17px] rounded-xl flex items-center justify-center gap-2 text-lg font-semibold active:scale-[0.985]"
        >
          {isLastSlide ? 'Mulai' : 'Lanjut'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
