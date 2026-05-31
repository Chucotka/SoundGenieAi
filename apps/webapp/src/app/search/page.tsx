"use client";

import { useState } from 'react';
import { Search as SearchIcon, Mic, ArrowRight, Music, Play } from 'lucide-react';
import { TrackInfo } from '@soundgenie/db';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<TrackInfo[]>([]);

  const trending = [
    "Грустная песня про расставание",
    "Энергичный бит для тренировки",
    "Chill lofi для учебы"
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const initData = typeof window !== 'undefined' && window.Telegram?.WebApp?.initData ? window.Telegram.WebApp.initData : '';
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, initData }),
      });

      if (!res.ok) {
        if (res.status === 429) throw new Error('Превышен лимит запросов. Попробуйте позже.');
        throw new Error('Ошибка при поиске');
      }

      const data = await res.json();
      setResults(data.tracks || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err) || "Couldn't load results, showing suggestions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-4 pt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Поиск музыки</h1>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-muted" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder="Найти: 'грустная песня из TikTok'"
          className="w-full bg-surface border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-accent/50 transition-colors"
        />
        <button className="absolute inset-y-0 right-4 flex items-center text-muted hover:text-accent transition-colors">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
             <div key={i} className="animate-pulse bg-surface p-3 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                   <div className="h-4 bg-white/10 rounded w-3/4"></div>
                   <div className="h-3 bg-white/5 rounded w-1/2"></div>
                </div>
             </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Результаты</h2>
          {results.map((track, i) => (
             <div key={i} className="bg-surface p-3 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                   <Music className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{track.title}</h3>
                  <p className="text-xs text-muted truncate">{track.artist} • {track.genre}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition">
                   <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
             </div>
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Популярные запросы</h2>
          <div className="space-y-3">
            {trending.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
                className="w-full bg-surface/50 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-surface transition-colors text-left"
              >
                <span className="text-sm">{item}</span>
                <ArrowRight className="w-4 h-4 text-muted" />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
