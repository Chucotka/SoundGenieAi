import { Smartphone, Image as ImageIcon, Video, Share2 } from 'lucide-react';

export default function Stories() {
  return (
    <main className="p-4 pt-8 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Создатель Stories</h1>

      <div className="bg-surface rounded-3xl p-6 border border-white/5 mb-6 text-center">
        <div className="w-16 h-16 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-4">
           <Smartphone className="w-8 h-8" />
        </div>
        <h2 className="font-semibold mb-2">Генерация видео</h2>
        <p className="text-sm text-muted mb-4">AI создаст визуальный ряд под ритм вашего ремикса</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
           <button className="bg-bg border border-teal/30 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
             <ImageIcon className="w-4 h-4 text-teal" /> Обложка
           </button>
           <button className="bg-bg border border-white/10 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
             <Video className="w-4 h-4" /> AI Видео
           </button>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full bg-teal text-bg font-semibold py-4 rounded-xl flex items-center justify-center gap-2">
          Сгенерировать Story
        </button>
        <button className="w-full bg-surface border border-white/10 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" /> Поделиться в Telegram
        </button>
      </div>
    </main>
  );
}
