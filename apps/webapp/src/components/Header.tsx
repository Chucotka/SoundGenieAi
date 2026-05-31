"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";

export function Header() {
  const [userName, setUserName] = useState("Музыкальный AI-помощник");

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user?.first_name) {
        setUserName(`Привет, ${user.first_name}!`);
      }
    }
  }, []);

  return (
    <div className="mt-8 mb-6 flex flex-col items-center">
      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(155,109,255,0.2)]">
        <Music className="w-8 h-8 text-accent" />
      </div>
      <h1 className="font-serif text-4xl mb-1 text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink">
        SoundGenie AI
      </h1>
      <p className="text-muted text-sm">{userName}</p>
    </div>
  );
}
