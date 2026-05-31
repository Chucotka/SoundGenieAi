"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Plus, Users, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Главная", href: "/", icon: Home },
    { name: "Поиск", href: "/search", icon: Search },
    { name: "Создать", href: "/remix", icon: Plus, isAccent: true },
    { name: "Лента", href: "/feed", icon: Users },
    { name: "Профиль", href: "/library", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 w-full glass-effect z-50">
      <div className="flex justify-around items-center h-20 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isAccent) {
            return (
              <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center -mt-6">
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] mt-2 text-muted">{item.name}</span>
              </Link>
            );
          }

          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center w-16">
              <Icon
                className={`w-6 h-6 mb-1 ${isActive ? "text-accent" : "text-muted"}`}
              />
              <span
                className={`text-[10px] ${isActive ? "text-accent" : "text-muted"}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
