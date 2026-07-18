'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [audioQuality, setAudioQuality] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [notifications, setNotifications] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  return (
    <div className="min-h-screen kliv-bg pb-10 max-w-[420px] mx-auto">
      <div className="px-5 pt-5">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()}><ArrowLeft className="w-5 h-5" /></button>
          <span className="text-xl font-semibold">Settings</span>
        </div>

        {/* Audio */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-[#BFCADC] mb-2 px-1">AUDIO</div>
          <div className="kliv-surface rounded-2xl p-5 border border-[#2F3A3F]">
            <div className="flex justify-between items-center mb-1.5">
              <div>Kualitas Audio</div>
            </div>
            <div className="flex gap-1 text-xs mt-2">
              {(['Low', 'Medium', 'High'] as const).map(q => (
                <button 
                  key={q}
                  onClick={() => setAudioQuality(q)}
                  className={`flex-1 py-2.5 rounded-xl text-center transition ${audioQuality === q ? 'bg-[#C3F400] text-black font-medium' : 'border border-[#3F484E]'}`}
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-[#BFCADC] mt-2">Kualitas lebih tinggi menggunakan lebih banyak kuota data.</div>
          </div>
        </div>

        {/* Account */}
        <div className="mb-7">
          <div className="text-xs uppercase tracking-widest text-[#BFCADC] mb-2 px-1">AKUN</div>
          <div className="kliv-surface rounded-2xl border border-[#2F3A3F] divide-y divide-[#2F3A3F]">
            <div className="px-4 py-[15px] flex justify-between text-sm">Edit Profil <span className="text-[#BFCADC]">›</span></div>
            <div className="px-4 py-[15px] flex justify-between text-sm">Kelola Perangkat Login <span className="text-[#BFCADC]">›</span></div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-7">
          <div className="text-xs uppercase tracking-widest text-[#BFCADC] mb-2 px-1">PREFERENSI</div>
          <div className="kliv-surface rounded-2xl border border-[#2F3A3F] divide-y divide-[#2F3A3F]">
            <div className="px-4 py-[15px] flex justify-between items-center text-sm">
              Notifikasi 
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only peer" />
                <div className="w-9 h-5 bg-[#333535] rounded-full peer peer-checked:bg-[#C3F400] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>
            <div className="px-4 py-[15px] flex justify-between items-center text-sm">
              Bahasa <span className="text-[#BFCADC]">Indonesia ›</span>
            </div>
            <div className="px-4 py-[15px] flex justify-between items-center text-sm">
              Unduh Otomatis via WiFi
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={autoDownload} onChange={() => setAutoDownload(!autoDownload)} className="sr-only peer" />
                <div className="w-9 h-5 bg-[#333535] rounded-full peer peer-checked:bg-[#C3F400] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Other */}
        <div>
          <div className="text-xs uppercase tracking-widest text-[#BFCADC] mb-2 px-1">LAINNYA</div>
          <div className="kliv-surface rounded-2xl border border-[#2F3A3F] divide-y divide-[#2F3A3F] text-sm">
            <div className="px-4 py-[15px] flex justify-between">Hapus Cache <span className="text-[#BFCADC]">›</span></div>
            <div className="px-4 py-[15px] text-red-400 cursor-pointer">Keluar Akun</div>
          </div>
        </div>
      </div>
    </div>
  );
}
