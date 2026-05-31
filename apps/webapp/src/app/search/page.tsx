"use client";

import { useState } from 'react';
import { Search as SearchIcon, Mic, ArrowRight } from 'lucide-react';

export default function Search() {
  const [query, setQuery] = useState('');

  const trending = [
    "Грустная песня про расставание",
    "Энергичный бит для тренировки",
    "Chill lofi для учебы"
  ];

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
          placeholder="Найти: 'грустная песня из TikTok'"
          className="w-full bg-surface border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-accent/50 transition-colors"
        />
        <button className="absolute inset-y-0 right-4 flex items-center text-muted hover:text-accent transition-colors">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Популярные запросы</h2>
        <div className="space-y-3">
          {trending.map((item, i) => (
            <button key={i} onClick={() => setQuery(item)} className="w-full bg-surface/50 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-surface transition-colors text-left">
              <span className="text-sm">{item}</span>
              <ArrowRight className="w-4 h-4 text-muted" />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
