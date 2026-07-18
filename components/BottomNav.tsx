'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/search', label: 'Cari', icon: Search },
    { href: '/library', label: 'Pustaka', icon: Library },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#071014] border-t border-[#2F3A3F] pb-safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center px-4 py-1 text-xs transition-all ${
                isActive 
                  ? 'text-[#C3F400]' 
                  : 'text-[#BFCADC] hover:text-[#C3F400]'
              }`}
            >
              <Icon className="w-6 h-6 mb-0.5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
