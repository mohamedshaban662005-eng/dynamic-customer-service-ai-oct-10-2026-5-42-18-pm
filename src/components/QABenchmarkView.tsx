import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Filter,
  Layers,
} from 'lucide-react';
import { KnowledgeBaseData, QATestScenario, QATestResult } from '../types';
import { PRESET_QA_SCENARIOS } from '../data/presets';

interface QABenchmarkViewProps {
  kb: KnowledgeBaseData;
}

export const QABenchmarkView: React.FC<QABenchmarkViewProps> = ({ kb }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<QATestResult[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const runAllTests = async () => {
    setIsRunning(true);
    try {
      const res = await fetch('/api/chat/batch-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          knowledgeBase: kb,
          scenarios: PRESET_QA_SCENARIOS,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to run batch test');
      }

      const data = await res.json();
      setResults(data.results);
      if (data.results.length > 0) {
        setExpandedId(data.results[0].id);
      }
    } catch (err: any) {
      alert(err?.message || 'حدث خطأ أثناء تشغيل الاختبارات.');
    } finally {
      setIsRunning(false);
    }
  };

  const totalTests = PRESET_QA_SCENARIOS.length;
  const passedTests = results ? results.filter((r) => r.passed).length : 0;
  const passPercentage = results ? Math.round((passedTests / totalTests) * 100) : 0;

  const filteredScenarios = PRESET_QA_SCENARIOS.filter((sc) => {
    if (filterCategory === 'all') return true;
    return sc.category === filterCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              جناح اختبار الامتثال والجودة (QA Benchmark Suite)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              فحص مؤتمت لجميع سيناريوهات الإشارات والرسائل للتأكد من تطبيق القواعد، علامات [HANDOFF] و [NO_REPLY] وحدود الطول بدقة.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={runAllTests}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition cursor-pointer disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>جاري الفحص المؤتمت (Gemini 3.8 Flash)...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>تشغيل كل الاختبارات الآن</span>
            </>
          )}
        </button>
      </div>

      {/* Benchmark Score Card (if results available) */}
      {results && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">نسبة الامتثال الكلية</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{passPercentage}%</div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 flex items-center justify-center font-bold text-xs text-white">
              {passedTests}/{totalTests}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">حالات النجاح والتوافق</div>
            <div className="text-xl font-bold text-white mt-1 flex items-center gap-2">
              <span className="text-emerald-400">{passedTests} سيناريو ناجح</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">مطابقة تامة لقواعد البرومبت</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">حالات الملاحظات أو الإخفاق</div>
            <div className="text-xl font-bold text-white mt-1 flex items-center gap-2">
              <span className={totalTests - passedTests > 0 ? 'text-rose-400' : 'text-slate-400'}>
                {totalTests - passedTests} سيناريو
              </span>
              {totalTests - passedTests === 0 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400" />
              )}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {totalTests - passedTests === 0 ? 'لا توجد أي مخالفات للقواعد' : 'راجع تفاصيل الاختبار بالأسفل'}
            </div>
          </div>
        </div>
      )}

      {/* Scenario List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-semibold text-slate-300">
            قائمة السيناريوهات المرجعية ({filteredScenarios.length}):
          </div>
        </div>

        {filteredScenarios.map((sc, idx) => {
          const res = results?.find((r) => r.id === sc.id);
          const isExpanded = expandedId === sc.id;

          return (
            <div
              key={sc.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : sc.id)}
                className="px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-mono">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>{sc.title}</span>
                      <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        {sc.context.platform} • {sc.context.eventType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{sc.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {res ? (
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        res.passed
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {res.passed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>ناجح ومتوافق</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>تنبيه معايير</span>
                        </>
                      )}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">جاهز للاختبار</span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-4">
                  {/* Test context */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-semibold">نص العميل الوارد:</span>
                      <p className="text-slate-200 mt-1 font-medium bg-slate-950 p-2 rounded-lg">
                        {sc.context.customerText}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-slate-400 font-semibold">السلوك المتوقع وفق البرومبت:</span>
                      <p className="text-slate-300 mt-1 leading-relaxed">{sc.expectedBehaviorNotes}</p>
                    </div>
                  </div>

                  {/* Test Results if available */}
                  {res && (
                    <div className="space-y-3 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">
                          الرد المولَّد من النموذج (Gemini 3.8 Flash):
                        </span>
                        {res.analysis && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            {res.analysis.stats.charLength} / {res.analysis.stats.maxChars} حرف
                          </span>
                        )}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-100 leading-relaxed font-sans">
                        {res.reply}
                      </div>

                      {/* Rule Checks Breakdown */}
                      {res.checks && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                          <div
                            className={`p-2 rounded-lg border flex items-center justify-between ${
                              res.checks.passNoReply
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                            }`}
                          >
                            <span>شرط [NO_REPLY]:</span>
                            <span className="font-bold">{res.checks.passNoReply ? '✓' : '✗'}</span>
                          </div>

                          <div
                            className={`p-2 rounded-lg border flex items-center justify-between ${
                              res.checks.passHandoff
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                            }`}
                          >
                            <span>شرط [HANDOFF]:</span>
                            <span className="font-bold">{res.checks.passHandoff ? '✓' : '✗'}</span>
                          </div>

                          <div
                            className={`p-2 rounded-lg border flex items-center justify-between ${
                              res.checks.passLength
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                            }`}
                          >
                            <span>حد الحروف:</span>
                            <span className="font-bold">{res.checks.passLength ? '✓' : '✗'}</span>
                          </div>

                          <div
                            className={`p-2 rounded-lg border flex items-center justify-between ${
                              res.checks.passMarkdown
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                            }`}
                          >
                            <span>خلو الماركداون:</span>
                            <span className="font-bold">{res.checks.passMarkdown ? '✓' : '✗'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
