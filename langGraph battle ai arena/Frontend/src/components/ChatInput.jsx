import React from "react";
import { Send } from "lucide-react";

export default function ChatInput({ input, setInput, handleSend }) {
  return (
    <footer className="sticky bottom-0 z-50 px-6 py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto w-full relative group">
        <input
          type="text"
          className="w-full pl-6 pr-14 py-4 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-lg focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all text-[15px]"
          placeholder="Type your problem statement... e.g. 'Write a python script to reverse a string'"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl transition-all active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed"
        >
          <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
        </button>
      </div>
    </footer>
  );
}
