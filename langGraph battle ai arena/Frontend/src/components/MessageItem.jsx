import React from "react";
import { User, Target } from "lucide-react";
import MarkdownBlock from "./MarkdownBlock";
import JudgePanel from "./JudgePanel";

export default function MessageItem({ msg, isDark }) {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* User Problem Statement */}
      <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#11131c] border border-slate-200 dark:border-slate-800 shadow-sm self-end max-w-4xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
        <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 shrink-0">
          <User size={20} />
        </div>
        <div className="pt-1.5 flex-1 min-w-0">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-1">Problem Statement</h3>
          <p className="text-[15px] leading-relaxed relative z-10">{msg.problem}</p>
        </div>
      </div>

      {/* Bot Responses */}
      {msg.loading ? (
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 self-start ml-2 p-4">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce delay-150"></div>
          <span className="text-sm font-medium ml-2">Evaluating solutions...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full fade-in fill-mode-forwards duration-700">
          {/* Solutions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Solution 1 */}
            <div className="flex flex-col bg-white dark:bg-[#11131c] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-[#0a0b10]">
                <div className="flex items-center gap-2">
                  <Target size={18} className="text-blue-500" />
                  <span className="font-semibold text-sm">Solution 1</span>
                </div>
              </div>
              <div className="p-5 flex-1 overflow-x-auto">
                <MarkdownBlock content={msg.solution_1} isDark={isDark} />
              </div>
            </div>

            {/* Solution 2 */}
            <div className="flex flex-col bg-white dark:bg-[#11131c] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-[#0a0b10]">
                <div className="flex items-center gap-2">
                  <Target size={18} className="text-indigo-500" />
                  <span className="font-semibold text-sm">Solution 2</span>
                </div>
              </div>
              <div className="p-5 flex-1 overflow-x-auto">
                <MarkdownBlock content={msg.solution_2} isDark={isDark} />
              </div>
            </div>
          </div>

          {/* Judge Panel */}
          <JudgePanel judge={msg.judge} />
        </div>
      )}
    </div>
  );
}
