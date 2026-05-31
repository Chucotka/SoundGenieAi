import { Music, Play } from 'lucide-react';

export default function Library() {
  return (
    <main className="p-4 pt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Мои творения</h1>

      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface p-3 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
               <Music className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">Midnight Frequency (Remix {i})</h3>
              <p className="text-xs text-muted">Speed Up • 145 BPM</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
               <Play className="w-4 h-4 fill-current ml-0.5" />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
