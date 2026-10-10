import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SimulatorView } from './components/SimulatorView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { QABenchmarkView } from './components/QABenchmarkView';
import { SystemPromptView } from './components/SystemPromptView';
import { IntegrationView } from './components/IntegrationView';
import { FlutterExportView } from './components/FlutterExportView';
import { BUSINESS_PRESETS, BusinessPreset } from './data/presets';
import { KnowledgeBaseData } from './types';

export default function App() {
  const [kb, setKb] = useState<KnowledgeBaseData>({ ...BUSINESS_PRESETS[0].data });
  const [activeTab, setActiveTab] = useState<'simulator' | 'kb' | 'qa' | 'prompt' | 'integrations' | 'flutter'>('simulator');

  const handleSelectPreset = (preset: BusinessPreset) => {
    setKb({ ...preset.data });
  };

  const handleDialectChange = (dialect: 'مصري' | 'فصحى') => {
    setKb((prev) => ({ ...prev, dialect }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white" dir="rtl">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        kb={kb}
        onSelectPreset={handleSelectPreset}
        onDialectChange={handleDialectChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'simulator' && <SimulatorView kb={kb} />}
        {activeTab === 'kb' && <KnowledgeBaseView kb={kb} onUpdateKb={setKb} />}
        {activeTab === 'qa' && <QABenchmarkView kb={kb} />}
        {activeTab === 'prompt' && <SystemPromptView kb={kb} />}
        {activeTab === 'integrations' && <IntegrationView kb={kb} />}
        {activeTab === 'flutter' && <FlutterExportView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>مساعد خدمة العملاء الذكي • Dynamic Customer Support AI Architecture</span>
          </div>
          <div className="text-slate-400">
            Powered by Google Gemini 3.8 Flash • Strict Grounding & Handoff Support
          </div>
        </div>
      </footer>
    </div>
  );
}
