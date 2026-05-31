import { Star, Check } from 'lucide-react';

export default function Premium() {
  return (
    <main className="p-4 pt-8 max-w-md mx-auto">
      <div className="text-center mb-8">
         <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(240,192,96,0.2)]">
            <Star className="w-10 h-10 text-gold fill-current" />
         </div>
         <h1 className="text-2xl font-bold font-serif mb-2">Premium Studio</h1>
         <p className="text-muted text-sm">Раскрой весь потенциал AI</p>
      </div>

      <div className="bg-gradient-to-b from-gold/20 to-surface border border-gold/30 rounded-3xl p-6 relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 bg-gold text-bg text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
           Популярное
        </div>
        <h2 className="text-xl font-bold mb-1">PRO План</h2>
        <div className="text-2xl font-bold mb-6">200 <span className="text-sm font-normal text-muted">Stars / мес</span></div>

        <ul className="space-y-3 mb-8">
           <li className="flex items-start gap-3 text-sm">
             <Check className="w-5 h-5 text-gold flex-shrink-0" />
             <span>50 генераций ремиксов в день</span>
           </li>
           <li className="flex items-start gap-3 text-sm">
             <Check className="w-5 h-5 text-gold flex-shrink-0" />
             <span>Доступ ко всем AI стилям</span>
           </li>
           <li className="flex items-start gap-3 text-sm">
             <Check className="w-5 h-5 text-gold flex-shrink-0" />
             <span>HD экспорт аудио и видео</span>
           </li>
        </ul>

        <button className="w-full bg-gold text-bg font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(240,192,96,0.4)]">
          Оформить подписку
        </button>
      </div>
    </main>
  );
}
