import { Music, Play, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';

export default function Player() {
  return (
    <main className="p-6 pt-12 max-w-md mx-auto flex flex-col items-center h-screen pb-32">
      <div className="w-full aspect-square bg-surface rounded-[2rem] border border-white/10 flex items-center justify-center mb-8 relative overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-gradient-to-br from-pink/20 to-accent/20 opacity-50 mix-blend-overlay"></div>
         <Music className="w-24 h-24 text-white/50" />
      </div>

      <div className="w-full text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Midnight Frequency</h1>
        <p className="text-muted">AI Remix • 145 BPM</p>
      </div>

      <div className="w-full mb-8">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
           <div className="h-full bg-gradient-to-r from-accent to-pink w-1/3 rounded-full"></div>
        </div>
        <div className="flex justify-between text-xs text-muted font-medium">
          <span>1:04</span>
          <span>3:24</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-between px-4">
        <button className="text-muted hover:text-white"><Shuffle className="w-5 h-5" /></button>
        <button className="text-white"><SkipBack className="w-8 h-8" /></button>
        <button className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(155,109,255,0.4)]">
          <Play className="w-8 h-8 fill-current ml-1" />
        </button>
        <button className="text-white"><SkipForward className="w-8 h-8" /></button>
        <button className="text-muted hover:text-white"><Repeat className="w-5 h-5" /></button>
      </div>
    </main>
  );
}
