import { Flame, Heart, Share, Play } from 'lucide-react';

export default function Feed() {
  return (
    <main className="p-4 pt-8 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-6">
         <Flame className="w-6 h-6 text-orange" />
         <h1 className="text-2xl font-semibold">В тренде</h1>
      </div>

      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-surface rounded-3xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                  <span className="text-sm font-medium">@creator_{i}</span>
               </div>
               <span className="text-xs text-muted">2ч назад</span>
            </div>

            <div className="aspect-video bg-bg rounded-xl mb-4 relative flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-pink/20 mix-blend-overlay"></div>
               <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white relative z-10">
                  <Play className="w-5 h-5 fill-current ml-1" />
               </button>
            </div>

            <h3 className="font-semibold mb-1">Neon Dreams (Synthwave Remix)</h3>
            <p className="text-sm text-muted mb-4">Оригинал: AI Artist</p>

            <div className="flex items-center gap-4 border-t border-white/5 pt-4">
               <button className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-pink">
                  <Heart className="w-5 h-5" /> 1.2k
               </button>
               <button className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent">
                  <Share className="w-5 h-5" /> Поделиться
               </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
