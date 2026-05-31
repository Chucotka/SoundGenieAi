"use client";

import { useState } from 'react';
import { Smartphone, Image as ImageIcon, Video, Share2, Instagram, Music2, Youtube, Send } from 'lucide-react';

export default function Stories() {
  const [platform, setPlatform] = useState('instagram');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const trackTitle = "Midnight Frequency (Synthwave Remix)";

  const generateCaption = async () => {
    setIsLoading(true);
    try {
      const initData = typeof window !== 'undefined' && window.Telegram?.WebApp?.initData ? window.Telegram.WebApp.initData : '';
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackTitle, platform, initData }),
      });

      if (res.ok) {
        const data = await res.json();
        setCaption(data.caption);
      }
    } catch (error) {
      console.error("Failed to generate caption", error);
    } finally {
      setIsLoading(false);
    }
  };

  const platforms = [
    { id: 'instagram', icon: Instagram, label: 'Insta' },
    { id: 'tiktok', icon: Music2, label: 'TikTok' },
    { id: 'youtube', icon: Youtube, label: 'Shorts' },
    { id: 'telegram', icon: Send, label: 'TG' },
  ];

  return (
    <main className="p-4 pt-8 max-w-md mx-auto pb-32">
      <h1 className="text-2xl font-semibold mb-6">Создатель Stories</h1>

      <div className="bg-surface rounded-3xl p-6 border border-white/5 mb-6 text-center">
        <div className="w-16 h-16 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-4">
           <Smartphone className="w-8 h-8" />
        </div>
        <h2 className="font-semibold mb-2">Генерация видео</h2>
        <p className="text-sm text-muted mb-4">AI создаст визуальный ряд под ритм вашего ремикса</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
           <button className="bg-bg border border-teal/30 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 text-teal">
             <ImageIcon className="w-4 h-4" /> Обложка
           </button>
           <button className="bg-bg border border-white/10 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5">
             <Video className="w-4 h-4" /> AI Видео
           </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Платформа</h2>
        <div className="grid grid-cols-4 gap-2">
          {platforms.map(p => {
            const Icon = p.icon;
            const isActive = platform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`flex flex-col items-center justify-center py-3 rounded-xl border ${isActive ? 'bg-teal/10 border-teal/50 text-teal' : 'bg-surface border-white/5 text-muted hover:bg-white/5'}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">{p.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {caption && (
        <div className="bg-surface rounded-2xl p-4 border border-white/5 mb-6">
          <label className="text-sm text-muted font-medium mb-2 block">Сгенерированная подпись:</label>
          <p className="text-sm">{caption}</p>
        </div>
      )}

      <div className="space-y-4 mt-8">
        <button
          onClick={generateCaption}
          disabled={isLoading}
          className="w-full bg-teal text-bg font-semibold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? 'Генерация...' : 'Сгенерировать Story & Подпись'}
        </button>
        <button className="w-full bg-surface border border-white/10 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" /> Поделиться в Telegram
        </button>
      </div>
    </main>
  );
}
