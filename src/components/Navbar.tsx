import React from 'react';
import {
  Bot,
  MessageSquare,
  BookOpen,
  CheckCircle2,
  FileCode,
  Share2,
  Building2,
  Sparkles,
  ChevronDown,
  Smartphone,
} from 'lucide-react';
import { BUSINESS_PRESETS, BusinessPreset } from '../data/presets';
import { KnowledgeBaseData } from '../types';

interface NavbarProps {
  activeTab: 'simulator' | 'kb' | 'qa' | 'prompt' | 'integrations' | 'flutter';
  setActiveTab: (tab: 'simulator' | 'kb' | 'qa' | 'prompt' | 'integrations' | 'flutter') => void;
  kb: KnowledgeBaseData;
  onSelectPreset: (preset: BusinessPreset) => void;
  onDialectChange: (dialect: 'مصري' | 'فصحى') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  kb,
  onSelectPreset,
  onDialectChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg text-white tracking-tight">
                  مساعد خدمة العملاء الذكي
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {kb.companyName} • {kb.businessDomain.substring(0, 40)}...
              </p>
            </div>
          </div>

          {/* Business Preset & Dialect Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dialect Switcher */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                type="button"
                onClick={() => onDialectChange('مصري')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  kb.dialect === 'مصري'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="استخدام اللهجة المصرية البسيطة"
              >
                🇪🇬 مصري
              </button>
              <button
                type="button"
                onClick={() => onDialectChange('فصحى')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  kb.dialect === 'فصحى'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="استخدام الفصحى المبسطة"
              >
                🇸🇦 فصحى
              </button>
            </div>

            {/* Business Preset Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 text-xs sm:text-sm text-slate-200 transition-colors"
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span className="font-medium max-w-[120px] sm:max-w-[160px] truncate">
                  {kb.companyName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute left-0 sm:right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-20">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      نماذج أنشطة تجارية جاهزة
                    </div>
                    {BUSINESS_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          onSelectPreset(preset);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-right px-3 py-2.5 text-xs hover:bg-slate-800 flex items-start gap-2.5 transition-colors ${
                          kb.companyName === preset.data.companyName
                            ? 'bg-slate-800/60 text-emerald-400 font-semibold'
                            : 'text-slate-300'
                        }`}
                      >
                        <div className="p-1 rounded-md bg-slate-800 text-emerald-400 shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-slate-100">{preset.name}</div>
                          <div className="text-[11px] text-slate-400">{preset.category}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 space-x-reverse overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/60 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'simulator'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>محاكي الردود والإشارات</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('kb')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'kb'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>إدارة قاعدة المعرفة (Knowledge Base)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('qa')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'qa'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>فحص الجودة والسيناريوهات (QA Suite)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'prompt'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>برومبت النظام الكامل (System Prompt)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('integrations')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'integrations'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>الربط البرمجي (Webhooks & APIs)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('flutter')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === 'flutter'
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold'
                : 'text-slate-400 hover:text-blue-300 hover:bg-slate-800/50'
            }`}
          >
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span>كود فلاتر ودارت (Flutter & Dart)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
