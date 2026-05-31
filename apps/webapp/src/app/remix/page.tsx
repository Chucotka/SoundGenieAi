import { Wand2, Zap, Coffee, Sparkles } from 'lucide-react';

export default function Remix() {
  return (
    <main className="p-4 pt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-2">AI Ремикс</h1>
      <p className="text-muted text-sm mb-8">Выберите стиль для генерации</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
         <button className="bg-surface border border-orange/30 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-orange/5 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-orange/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap className="w-8 h-8 text-orange" />
            <span className="font-semibold text-sm">Speed Up</span>
         </button>
         <button className="bg-surface border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors">
            <Coffee className="w-8 h-8 text-teal" />
            <span className="font-semibold text-sm">Chill Lofi</span>
         </button>
         <button className="bg-surface border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors">
            <Sparkles className="w-8 h-8 text-pink" />
            <span className="font-semibold text-sm">Synthwave</span>
         </button>
         <button className="bg-surface border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors">
            <Wand2 className="w-8 h-8 text-accent" />
            <span className="font-semibold text-sm">Custom AI</span>
         </button>
      </div>

      <div className="bg-surface rounded-2xl p-4 border border-white/5">
        <label className="text-sm text-muted font-medium mb-2 block">Свой промпт (опционально)</label>
        <textarea
          className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent/50 min-h-[100px]"
          placeholder="Например: добавь мощный бас и сделай вокал с эхо..."
        ></textarea>
      </div>

      <button className="w-full mt-6 bg-accent text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(155,109,255,0.3)]">
        Создать ремикс (1 кредит)
      </button>
    </main>
  );
}
