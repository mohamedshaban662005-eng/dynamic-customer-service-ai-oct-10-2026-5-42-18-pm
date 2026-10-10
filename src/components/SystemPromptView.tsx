import React, { useState } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Sparkles,
  Info,
  Hash,
  Download,
} from 'lucide-react';
import { KnowledgeBaseData } from '../types';
import { compileSystemPrompt } from '../utils/promptBuilder';

interface SystemPromptViewProps {
  kb: KnowledgeBaseData;
}

export const SystemPromptView: React.FC<SystemPromptViewProps> = ({ kb }) => {
  const [copied, setCopied] = useState(false);
  const promptText = compileSystemPrompt(kb);

  const charCount = promptText.length;
  const wordCount = promptText.split(/\s+/).filter(Boolean).length;
  const estimatedTokens = Math.round(charCount / 3.5);

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPrompt = () => {
    const blob = new Blob([promptText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `system_prompt_${kb.companyName || 'customer_service'}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              برومبت النظام الكامل (Compiled System Instruction)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              النص النهائي المترجم لدستور المساعد الذكي مع استبدال كافة المتغيرات الديناميكية بقاعدة المعرفة الحالية.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadPrompt}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل ملف Markdown</span>
          </button>

          <button
            type="button"
            onClick={copyPrompt}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ البرومبت بالكامل'}</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">إجمالي الحروف</div>
          <div className="text-lg font-bold text-white mt-1 font-mono">{charCount.toLocaleString()} حرف</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">عدد الكلمات</div>
          <div className="text-lg font-bold text-white mt-1 font-mono">{wordCount.toLocaleString()} كلمة</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">الرمز المميز التقديري (Tokens)</div>
          <div className="text-lg font-bold text-emerald-400 mt-1 font-mono">~{estimatedTokens.toLocaleString()}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">النموذج المعتمد</div>
          <div className="text-lg font-bold text-teal-400 mt-1">Gemini 3.8 Flash</div>
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span className="text-xs text-slate-400 font-mono mr-2">system_instruction.md</span>
          </div>
          <span className="text-[11px] text-slate-400">UTF-8 • Markdown</span>
        </div>

        <pre className="p-5 text-xs text-slate-200 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-emerald-500 selection:text-white" dir="auto">
          {promptText}
        </pre>
      </div>
    </div>
  );
};
