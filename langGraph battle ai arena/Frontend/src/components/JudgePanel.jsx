import React from "react";
import { Trophy, ShieldAlert } from "lucide-react";

export default function JudgePanel({ judge }) {
  if (!judge) return null;
  
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none">
        <Trophy size={120} />
      </div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
          <ShieldAlert size={24} />
        </div>
        <h3 className="text-lg font-bold">Judge Recommendation</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#0a0b10] border border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sol 1 Score</span>
            <span className="text-xl font-bold font-mono text-blue-500">{judge.solution_1_score}<span className="text-sm text-slate-400">/10</span></span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">{judge.solution_1_reasoning}</p>
        </div>

        <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#0a0b10] border border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sol 2 Score</span>
            <span className="text-xl font-bold font-mono text-indigo-500">{judge.solution_2_score}<span className="text-sm text-slate-400">/10</span></span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">{judge.solution_2_reasoning}</p>
        </div>
      </div>
    </div>
  );
}
