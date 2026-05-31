"use client";

import Link from "next/link";
import { Music, Search, Headphones, Repeat, Smartphone, Star, SkipBack, SkipForward, Pause } from "lucide-react";
import { Header } from "@/components/Header";

export default function Home() {
  const handleCardTap = () => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <main className="p-4 flex flex-col items-center max-w-md mx-auto">
      <Header />

      {/* Mini Player */}
      <Link href="/player" className="w-full" onClick={handleCardTap}>
        <div className="w-full bg-surface rounded-3xl p-4 flex items-center justify-between mb-8 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pink/20 rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-pink" />
            </div>
            <div>
              <h3 className="font-semibold text-[15px]">Midnight Frequency</h3>
              <p className="text-muted text-[13px]">AI Remix • 3:24</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted">
             <SkipBack className="w-5 h-5" />
             <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
                <Pause className="w-5 h-5 fill-current" />
             </div>
             <SkipForward className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Grid Menu */}
      <div className="w-full mb-6">
        <h2 className="text-xs font-semibold text-muted tracking-wider mb-4 uppercase">Возможности</h2>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/search" onClick={handleCardTap} className="bg-surface rounded-3xl p-5 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <Search className="w-6 h-6 text-accent mb-8 relative z-10" />
            <h3 className="font-semibold text-lg relative z-10">Поиск</h3>
            <p className="text-muted text-sm relative z-10">Умный AI-поиск музыки</p>
          </Link>

          <Link href="/player" onClick={handleCardTap} className="bg-surface rounded-3xl p-5 border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-pink/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <Headphones className="w-6 h-6 text-pink mb-8 relative z-10" />
            <h3 className="font-semibold text-lg relative z-10">Плеер</h3>
            <p className="text-muted text-sm relative z-10">Студия воспроизведения</p>
          </Link>

          <Link href="/remix" onClick={handleCardTap} className="bg-surface rounded-3xl p-5 border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <Repeat className="w-6 h-6 text-orange mb-8 relative z-10" />
            <h3 className="font-semibold text-lg relative z-10">Ремикс</h3>
            <p className="text-muted text-sm relative z-10">AI фабрика ремиксов</p>
          </Link>

          <Link href="/stories" onClick={handleCardTap} className="bg-surface rounded-3xl p-5 border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-teal/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <Smartphone className="w-6 h-6 text-teal mb-8 relative z-10" />
            <h3 className="font-semibold text-lg relative z-10">Stories</h3>
            <p className="text-muted text-sm relative z-10">Контент для соцсетей</p>
          </Link>
        </div>
      </div>

      {/* List Menu */}
      <div className="w-full space-y-3">
        <Link href="/library" onClick={handleCardTap} className="w-full bg-surface rounded-2xl p-4 flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl">📚</div>
            <div>
              <h3 className="font-semibold text-[15px]">Мои творения</h3>
              <p className="text-muted text-[13px]">Библиотека ремиксов</p>
            </div>
          </div>
          <div className="text-muted">›</div>
        </Link>

        <Link href="/feed" onClick={handleCardTap} className="w-full bg-surface rounded-2xl p-4 flex items-center justify-between border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl">🔥</div>
            <div>
              <h3 className="font-semibold text-[15px]">Социальная лента</h3>
              <p className="text-muted text-[13px]">Ремиксы сообщества</p>
            </div>
          </div>
          <div className="text-muted">›</div>
        </Link>

        <Link href="/premium" onClick={handleCardTap} className="w-full bg-surface rounded-2xl p-4 flex items-center justify-between border border-gold/20 shadow-[0_0_15px_rgba(240,192,96,0.1)] mt-2">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold shadow-[0_0_10px_rgba(240,192,96,0.3)]">
                <Star className="w-5 h-5 fill-current" />
             </div>
            <div>
              <h3 className="font-semibold text-[15px] text-gold">Premium Studio</h3>
              <p className="text-gold/60 text-[13px]">Pro & Creator планы</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full border border-gold/30 text-gold text-xs font-semibold tracking-wide">
             PRO
          </div>
        </Link>
      </div>
    </main>
  );
}
