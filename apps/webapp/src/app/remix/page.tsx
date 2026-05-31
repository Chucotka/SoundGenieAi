"use client";

import { useState, useEffect } from 'react';
import { Wand2, Zap, Coffee, Sparkles } from 'lucide-react';
import { RemixIdea } from '@soundgenie/db';

export default function Remix() {
  const [ideas, setIdeas] = useState<RemixIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const trackTitle = "Midnight Frequency"; // In a real app, this would come from state/params

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const initData = typeof window !== 'undefined' && window.Telegram?.WebApp?.initData ? window.Telegram.WebApp.initData : '';
        const res = await fetch('/api/remix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackTitle, initData }),
        });

        if (res.ok) {
          const data = await res.json();
          setIdeas(data.ideas || []);
        }
      } catch (error) {
        console.error("Failed to fetch remix ideas", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdeas();
  }, [trackTitle]);

  const icons = [Zap, Coffee, Sparkles, Wand2];
  const colors = ["text-orange", "text-teal", "text-pink", "text-accent"];
  const bgs = ["bg-orange/10 border-orange/30", "bg-teal/10 border-teal/30", "bg-pink/10 border-pink/30", "bg-accent/10 border-accent/30"];

  return (
    <main className="p-4 pt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-2">AI Ремикс</h1>
      <p className="text-muted text-sm mb-8">Выберите стиль для генерации: {trackTitle}</p>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 mb-8">
           {[1,2,3,4].map(i => (
             <div key={i} className="animate-pulse bg-surface border border-white/5 h-32 rounded-2xl"></div>
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-8">
           {ideas.slice(0, 4).map((idea, i) => {
             const Icon = icons[i % icons.length];
             const color = colors[i % colors.length];
             const bg = bgs[i % bgs.length];

             return (
               <button key={i} className={`bg-surface border p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors relative overflow-hidden group ${bg.split(' ')[1]}`}>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${bg.split(' ')[0]}`}></div>
                  <Icon className={`w-8 h-8 ${color}`} />
                  <span className="font-semibold text-sm text-center">{idea.style}</span>
               </button>
             )
           })}

           {/* Fallback Custom AI button if we have less than 4 ideas */}
           {ideas.length < 4 && (
             <button className="bg-surface border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors">
                <Wand2 className="w-8 h-8 text-accent" />
                <span className="font-semibold text-sm">Custom AI</span>
             </button>
           )}
        </div>
      )}

      <div className="bg-surface rounded-2xl p-4 border border-white/5">
        <label className="text-sm text-muted font-medium mb-2 block">Свой промпт (опционально)</label>
        <textarea
          className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent/50 min-h-[100px]"
          placeholder="Например: добавь мощный бас и сделай вокал с эхо..."
        ></textarea>
      </div>

      <button className="w-full mt-6 bg-accent text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(155,109,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
        Создать ремикс (1 кредит)
      </button>
    </main>
  );
}
