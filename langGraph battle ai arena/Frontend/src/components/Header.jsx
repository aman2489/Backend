import React from "react";
import { Bot, Moon, Sun } from "lucide-react";

export default function Header({ isDark, toggleTheme }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-400">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">AI Battle Arena</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dual-Model Evaluation Mode</p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 active:scale-95"
        aria-label="Toggle Theme"
      >
        {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-500" />}
      </button>
    </header>
  );
}
