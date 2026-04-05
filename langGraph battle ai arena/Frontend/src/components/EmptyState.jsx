import React from "react";
import { Zap } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-4 mt-20">
      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <Zap size={32} />
      </div>
      <p className="text-lg">Send a problem to start the battle...</p>
    </div>
  );
}
