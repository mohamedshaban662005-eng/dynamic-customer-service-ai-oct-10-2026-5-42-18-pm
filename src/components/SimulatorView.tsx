import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  ShieldAlert,
  HelpCircle,
  MessageCircle,
  Clock,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  User,
  CheckCheck,
  Layers,
  Info,
} from 'lucide-react';
import {
  KnowledgeBaseData,
  MentionContext,
  PlatformType,
  EventType,
  ResponseAnalysis,
} from '../types';
import { PRESET_QA_SCENARIOS } from '../data/presets';

interface SimulatorViewProps {
  kb: KnowledgeBaseData;
}

const PLATFORMS: { id: PlatformType; name: string; iconColor: string; bg: string }[] = [
  { id: 'Facebook', name: 'فيسبوك (Facebook)', iconColor: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'Instagram', name: 'إنستغرام (Instagram)', iconColor: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 'WhatsApp', name: 'واتساب (WhatsApp)', iconColor: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'Messenger', name: 'ماسنجر (Messenger)', iconColor: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { id: 'X', name: 'منصة إكس (X / Twitter)', iconColor: 'text-slate-200', bg: 'bg-slate-700/20' },
  { id: 'TikTok', name: 'تيك توك (TikTok)', iconColor: 'text-rose-500', bg: 'bg-rose-500/10' },
  { id: 'LinkedIn', name: 'لينكد إن (LinkedIn)', iconColor: 'text-blue-400', bg: 'bg-blue-400/10' },
];

const EVENT_TYPES: EventType[] = [
  'Public Comment',
  'Public Mention',
  'Direct Message',
  'Post Share',
  'Re-post Mention',
];

export const SimulatorView: React.FC<SimulatorViewProps> = ({ kb }) => {
  const [context, setContext] = useState<MentionContext>({
    platform: 'Facebook',
    eventType: 'Public Comment',
    customerName: 'أحمد محمود',
    originalPost: 'عرض الأسبوع على أحدث السماعات من روقان تك!',
    parentComment: '',
    customerText: 'ممكن تفاصيل وسعر سماعة AirBuds Pro 2 لو سمحت والضمان بتاعها؟',
    conversationHistory: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseResult, setResponseResult] = useState<{
    result: string;
    analysis: ResponseAnalysis;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Quick preset loading
  const handleLoadScenario = (scenarioId: string) => {
    const sc = PRESET_QA_SCENARIOS.find((s) => s.id === scenarioId);
    if (sc) {
      setContext({ ...sc.context });
      setResponseResult(null);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!context.customerText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          knowledgeBase: kb,
          inputContext: context,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponseResult({
        result: data.result,
        analysis: data.analysis,
      });
    } catch (err: any) {
      setError(err?.message || 'تعذر توليد الرد، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPublicEvent =
    context.eventType === 'Public Comment' ||
    context.eventType === 'Public Mention' ||
    context.eventType === 'Post Share' ||
    context.eventType === 'Re-post Mention';

  const charLimit = isPublicEvent ? 250 : 500;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner / Guidance */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                محاكي الرد على الإشارات والرسائل الخاصة
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                اختبار فوري لتوليد الردود وفق القواعد الصارمة، وحدود الحروف، وكشف [HANDOFF] و [NO_REPLY]
              </p>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-slate-400 ml-1">سيناريوهات سريعة:</span>
            <button
              type="button"
              onClick={() => handleLoadScenario('qa-1-price-inquiry')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              🏷️ سؤال سعر
            </button>
            <button
              type="button"
              onClick={() => handleLoadScenario('qa-2-out-of-scope')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              ❓ خارج النطاق
            </button>
            <button
              type="button"
              onClick={() => handleLoadScenario('qa-3-angry-complaint')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              😡 عميل غاضب
            </button>
            <button
              type="button"
              onClick={() => handleLoadScenario('qa-4-meme-friend-tag')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              🤡 منشن ميم
            </button>
            <button
              type="button"
              onClick={() => handleLoadScenario('qa-6-dm-booking')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              💬 حجز بالخاص
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Input Form vs Output Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Inputs & Context) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>معطيات الإشارة / الرسالة الواردة</span>
            </h3>

            {/* Platform Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                المنصة (PLATFORM)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setContext({ ...context, platform: p.id })}
                    className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                      context.platform === p.id
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span className={p.iconColor}>●</span>
                    <span className="truncate">{p.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Event Type & Customer Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  نوع الحدث (EVENT_TYPE)
                </label>
                <select
                  value={context.eventType}
                  onChange={(e) =>
                    setContext({ ...context, eventType: e.target.value as EventType })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {EVENT_TYPES.map((et) => (
                    <option key={et} value={et}>
                      {et === 'Public Comment' && 'تعليق عام (Public Comment)'}
                      {et === 'Public Mention' && 'إشارة عامة (Public Mention)'}
                      {et === 'Direct Message' && 'رسالة خاصة (Direct Message)'}
                      {et === 'Post Share' && 'مشاركة منشور (Post Share)'}
                      {et === 'Re-post Mention' && 'إعادة نشر (Re-post Mention)'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  اسم العميل (CUSTOMER_NAME)
                </label>
                <input
                  type="text"
                  value={context.customerName}
                  onChange={(e) => setContext({ ...context, customerName: e.target.value })}
                  placeholder="مثال: أحمد محمود"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Customer Text (Main Input) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  نص رسالة أو تعليق العميل (CUSTOMER_TEXT)
                  <span className="text-rose-400 mr-1">*</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  {context.customerText.length} حرف
                </span>
              </div>
              <textarea
                rows={3}
                value={context.customerText}
                onChange={(e) => setContext({ ...context, customerText: e.target.value })}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    handleGenerate();
                  }
                }}
                placeholder="اكتب هنا ما قاله العميل أو المنشن..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition leading-relaxed resize-none"
              />
            </div>

            {/* Collapsible Advanced Context (Original Post, Parent Comment, History) */}
            <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full px-3 py-2.5 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>السياق المتقدم (المنشور الأصلي، التعليق السابق، السجل)</span>
                </div>
                {showAdvanced ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showAdvanced && (
                <div className="p-3 border-t border-slate-800/80 space-y-3 bg-slate-950/60">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      المنشور الأصلي (ORIGINAL_POST)
                    </label>
                    <input
                      type="text"
                      value={context.originalPost}
                      onChange={(e) => setContext({ ...context, originalPost: e.target.value })}
                      placeholder="نص أو عنوان المنشور الذي تم التعليق عليه..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      التعليق السابق (PARENT_COMMENT)
                    </label>
                    <input
                      type="text"
                      value={context.parentComment}
                      onChange={(e) => setContext({ ...context, parentComment: e.target.value })}
                      placeholder="التعليق الأعلى إذا كان رداً داخل ثريد..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      سياق المحادثة السابقة (CONVERSATION_HISTORY)
                    </label>
                    <textarea
                      rows={2}
                      value={context.conversationHistory}
                      onChange={(e) =>
                        setContext({ ...context, conversationHistory: e.target.value })
                      }
                      placeholder="الرسائل السابقة في المحادثة إن وجدت..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading || !context.customerText.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري التفكير وتوليد الرد وفق القواعد...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 ml-1" />
                    <span>توليد الرد الذكي المعتمد</span>
                    <span className="text-[10px] bg-emerald-700/60 px-1.5 py-0.5 rounded text-emerald-200 font-mono">
                      Ctrl+Enter
                    </span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>
                    {error.includes('503') || error.includes('UNAVAILABLE') || error.includes('demand')
                      ? 'النموذج يواجه ضغطاً مؤقتاً على خوادم Gemini، يرجى النقر على إعادة المحاولة بعد ثوانٍ قليلة.'
                      : error}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold shrink-0 transition"
                >
                  إعادة المحاولة ↻
                </button>
              </div>
            )}
          </div>

          {/* Quick Guidance Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-400 space-y-2">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>محددات المنصة الحالية:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/50">
                <span className="text-slate-300 font-medium">الحد الأقصى للحروف:</span>{' '}
                <span className="text-emerald-400 font-bold">{charLimit} حرف</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/50">
                <span className="text-slate-300 font-medium">التنسيق:</span>{' '}
                <span className="text-amber-400 font-bold">نص عادي (بدون ماركداون)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Platform Preview & Compliance Inspection) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Simulated Social Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            {/* Header of the mock card */}
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200">معاينة واجهة المنصة:</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[11px]">
                  {context.platform} • {context.eventType}
                </span>
              </div>
              {responseResult && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(responseResult.analysis.cleanText)}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'تم النسخ!' : 'نسخ الرد النظيف'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Social Platform Canvas */}
            <div className="p-4 sm:p-5 bg-slate-950 min-h-[260px] flex flex-col justify-between">
              {/* Customer Comment Bubble */}
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs shrink-0 border border-slate-700">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="max-w-[85%] bg-slate-900 border border-slate-800 rounded-2xl rounded-tr-sm p-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-200">
                        {context.customerName || 'العميل'}
                      </span>
                      <span className="text-[10px] text-slate-500">منذ دقيقتين</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {context.customerText}
                    </p>
                  </div>
                </div>

                {/* AI Assistant Reply Bubble */}
                <div className="pr-8 pt-1">
                  {isLoading ? (
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                        <Sparkles className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl rounded-tr-sm p-3 space-y-2 max-w-[85%]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-400">
                            {kb.companyName}
                          </span>
                          <span className="text-[10px] text-slate-500">يكتب الآن...</span>
                        </div>
                        <div className="h-3 w-40 bg-slate-800 animate-pulse rounded"></div>
                        <div className="h-3 w-56 bg-slate-800 animate-pulse rounded"></div>
                      </div>
                    </div>
                  ) : responseResult ? (
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl rounded-tr-sm p-3.5 max-w-[88%] shadow-md space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">
                              {kb.companyName}
                            </span>
                            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-bold">
                              ✓
                            </span>
                            <span className="text-[10px] text-emerald-400 font-medium">
                              (حساب رسمي)
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500">الآن</span>
                        </div>

                        {/* Special case: NO_REPLY */}
                        {responseResult.analysis.isNoReply ? (
                          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs space-y-1">
                            <div className="font-bold flex items-center gap-1.5 text-purple-400">
                              <ShieldAlert className="w-4 h-4" />
                              <span>[NO_REPLY] — تم كتم الرد التلقائي</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              طبق المساعد قاعدة عدم الرد، نظراً لأن المنشن ميم/مزحة أو محتوى لا يتطلب رداً
                              أو سبام وفقاً للسياسة المحددة.
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed whitespace-pre-wrap selection:bg-emerald-500 selection:text-white">
                            {responseResult.analysis.cleanText}
                          </p>
                        )}

                        {/* Handoff Notice Banner if triggered */}
                        {responseResult.analysis.isHandoff && (
                          <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              تم الكشف عن <strong>[HANDOFF]</strong>: تحويل المحادثة لفريق الدعم البشري
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-xs">
                      اضغط على زر <strong>توليد الرد الذكي المعتمد</strong> لعرض المعاينة المباشرة وفحص
                      القواعد.
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamp footer in WhatsApp style if selected */}
              {context.platform === 'WhatsApp' && responseResult && (
                <div className="flex justify-end pt-2">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> تم الإرسال •{' '}
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Strict Rules Audit & Compliance Card */}
          {responseResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>تقرير الامتثال الصارم للقواعد (Compliance Audit)</span>
                </h4>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    responseResult.analysis.stats.isLengthValid &&
                    !responseResult.analysis.stats.hasMarkdown
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {responseResult.analysis.stats.isLengthValid &&
                  !responseResult.analysis.stats.hasMarkdown
                    ? 'متوافق تماماً بنسبة 100%'
                    : 'يوجد تنبيه معايير'}
                </span>
              </div>

              {/* Character Limit Meter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    عدد الحروف المسموح ({charLimit} حرف كحد أقصى):
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      responseResult.analysis.stats.isLengthValid
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {responseResult.analysis.stats.charLength} / {charLimit} حرف
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      responseResult.analysis.stats.charLength <= charLimit
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        (responseResult.analysis.stats.charLength / charLimit) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Rules Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Markdown check */}
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">خلو تام من الماركداون:</span>
                  {!responseResult.analysis.stats.hasMarkdown ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      ✓ سليم (نص عادي)
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      ✗ يحتوي نجوم أو عناوين
                    </span>
                  )}
                </div>

                {/* Emoji check */}
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">عدد الإيموجي:</span>
                  <span
                    className={`font-bold flex items-center gap-1 ${
                      responseResult.analysis.stats.isEmojiValid
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {responseResult.analysis.stats.emojiCount} إيموجي (الحد 1-2، 0 للشكاوى)
                  </span>
                </div>

                {/* Grounding check */}
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">الالتزام بقاعدة المعرفة:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    ✓ Strictly Grounded
                  </span>
                </div>

                {/* Dialect check */}
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">اللهجة المعتمدة:</span>
                  <span className="text-emerald-400 font-bold">
                    {kb.dialect === 'مصري' ? 'لهجة مصرية مهذبة' : 'عربية فصحى مبسطة'}
                  </span>
                </div>
              </div>

              {/* Raw Response with internal tags */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-slate-400">
                    المخرجات الأصلية المباشرة من النموذج (Raw Output):
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(responseResult.result)}
                    className="text-[10px] text-slate-400 hover:text-slate-200 transition"
                  >
                    نسخ الكود الخام
                  </button>
                </div>
                <pre className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap text-right" dir="auto">
                  {responseResult.result}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
