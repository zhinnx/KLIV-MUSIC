import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/AuthProvider";
import { PlayerProvider } from "@/components/PlayerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kliv - Musik Tanpa Batas",
  description: "Dengarkan musik tanpa batas. Legal music streaming.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-[#071014] text-[#e2e2e2] font-sans">
        <AuthProvider>
          <PlayerProvider>
            {children}
            <Toaster position="top-center" richColors closeButton />
          </PlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
