import React, { useState } from 'react';
import {
  BookOpen,
  Building2,
  DollarSign,
  Tag,
  MapPin,
  Clock,
  PhoneCall,
  HelpCircle,
  FileCheck2,
  Save,
  RotateCcw,
  Sparkles,
  Download,
  Upload,
} from 'lucide-react';
import { KnowledgeBaseData } from '../types';
import { BUSINESS_PRESETS } from '../data/presets';

interface KnowledgeBaseViewProps {
  kb: KnowledgeBaseData;
  onUpdateKb: (newKb: KnowledgeBaseData) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ kb, onUpdateKb }) => {
  const [formData, setFormData] = useState<KnowledgeBaseData>({ ...kb });
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [savedNotification, setSavedNotification] = useState(false);

  const handleChange = (field: keyof KnowledgeBaseData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateKb(formData);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const handleResetToPreset = (presetId: string) => {
    const preset = BUSINESS_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setFormData({ ...preset.data });
      onUpdateKb({ ...preset.data });
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 2500);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${formData.companyName || 'knowledge_base'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setFormData({ ...parsed });
          onUpdateKb({ ...parsed });
        } catch {
          alert('ملف غير صالح، يرجى التأكد من صيغة JSON.');
        }
      };
    }
  };

  const sections = [
    { id: 'profile', title: '3.1 نبذة ونبرة النشاط', icon: Building2 },
    { id: 'services', title: '3.2 الخدمات والأسعار', icon: DollarSign },
    { id: 'offers', title: '3.3 العروض الفعالة', icon: Tag },
    { id: 'areas', title: '3.4 مناطق الخدمة والتوصيل', icon: MapPin },
    { id: 'hours', title: '3.5 مواعيد وأوقات العمل', icon: Clock },
    { id: 'contact', title: '3.6 طرق الحجز والتواصل والدعم', icon: PhoneCall },
    { id: 'faq', title: '3.7 الأسئلة الشائعة (FAQ)', icon: HelpCircle },
    { id: 'policies', title: '3.8 السياسات العامة والضمان', icon: FileCheck2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              قاعدة المعرفة الديناميكية (Knowledge Base)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              المصدر الحصري والوحيد الذي يستقي منه المساعد إجاباته. ما لم يُذكر هنا لن يخمنه الذكاء الاصطناعي.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer border border-slate-700 transition">
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>استيراد JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            type="button"
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>تصدير JSON</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ التعديلات</span>
          </button>
        </div>
      </div>

      {savedNotification && (
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-semibold flex items-center justify-between">
          <span>✓ تم حفظ وتحديث قاعدة المعرفة بنجاح وتفعيلها في محاكي الردود والبرومبت!</span>
        </div>
      )}

      {/* Main Layout: Side tabs + Form content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Navigation Tabs */}
        <div className="md:col-span-4 lg:col-span-3 space-y-1">
          <div className="text-xs font-semibold text-slate-400 px-3 py-1.5">أقسام قاعدة المعرفة:</div>
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-right transition ${
                  activeSection === sec.id
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{sec.title}</span>
              </button>
            );
          })}

          {/* Quick preset loader */}
          <div className="pt-4 px-2 space-y-2 border-t border-slate-800/80 mt-4">
            <span className="text-[11px] text-slate-500 font-medium">استعادة نموذج جاهز:</span>
            <div className="flex flex-col gap-1.5">
              {BUSINESS_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleResetToPreset(p.id)}
                  className="text-right text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition truncate"
                >
                  ⚡ {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="md:col-span-8 lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
          {/* Section 1: Profile & Tone */}
          {activeSection === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>3.1 نبذة عن النشاط والشخصية والنبرة</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    اسم الشركة / النشاط (companyName)
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    اللهجة المعتمدة (dialect)
                  </label>
                  <select
                    value={formData.dialect}
                    onChange={(e) => handleChange('dialect', e.target.value as 'مصري' | 'فصحى')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="مصري">لهجة مصرية بسيطة ومهذبة (أهلاً بحضرتك، تحت أمرك)</option>
                    <option value="فصحى">عربية فصحى مبسطة بدون تعقيد</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    مجال النشاط (businessDomain)
                  </label>
                  <input
                    type="text"
                    value={formData.businessDomain}
                    onChange={(e) => handleChange('businessDomain', e.target.value)}
                    placeholder="مثال: بيع الإلكترونيات وملحقات الهواتف الذكية"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    نبرة الصوت (voiceTone)
                  </label>
                  <input
                    type="text"
                    value={formData.voiceTone}
                    onChange={(e) => handleChange('voiceTone', e.target.value)}
                    placeholder="مثال: ودود، محترف، سريع، ومحترم لوقت العميل"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  وصف تفصيلي للنشاط (businessDescription)
                </label>
                <textarea
                  rows={3}
                  value={formData.businessDescription}
                  onChange={(e) => handleChange('businessDescription', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  الرابط / الحسابات الرسمية (websiteOrSocialLinks)
                </label>
                <input
                  type="text"
                  value={formData.websiteOrSocialLinks}
                  onChange={(e) => handleChange('websiteOrSocialLinks', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Section 2: Services & Pricing */}
          {activeSection === 'services' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>3.2 قائمة الخدمات والأسعار المتاحة حالياً</span>
              </h3>
              <p className="text-xs text-slate-400">
                القاعدة الصارمة: أي خدمة أو سعر غير مذكور هنا، سيعتبره المساعد خارج النطاق ويقوم بعمل تحويل [HANDOFF].
              </p>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  الخدمات والأسعار المنسقة (servicesAndPricingFormatted)
                </label>
                <textarea
                  rows={8}
                  value={formData.servicesAndPricingFormatted}
                  onChange={(e) => handleChange('servicesAndPricingFormatted', e.target.value)}
                  placeholder="- سماعة AirBuds Pro: بسعر 1,450 جنيه..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {/* Section 3: Active Offers */}
          {activeSection === 'offers' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Tag className="w-4 h-4 text-emerald-400" />
                <span>3.3 العروض الفعالة الحالية (activeOffersFormatted)</span>
              </h3>
              <p className="text-xs text-slate-400">
                أكواد الخصم، عروض الشحن المجاني، والهدايا المتاحة فقط في الوقت الحالي.
              </p>
              <div>
                <textarea
                  rows={6}
                  value={formData.activeOffersFormatted}
                  onChange={(e) => handleChange('activeOffersFormatted', e.target.value)}
                  placeholder="- كود خصم [SUMMER10] يمنح خصم 10%..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {/* Section 4: Service Areas */}
          {activeSection === 'areas' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>3.4 مناطق الخدمة والتوصيل (serviceAreasFormatted)</span>
              </h3>
              <p className="text-xs text-slate-400">
                المحافظات، المدن، مدة التوصيل وتكلفة الشحن. إن سأل العميل عن منطقة غير موجودة فسيتم توجيهه للدعم.
              </p>
              <div>
                <textarea
                  rows={6}
                  value={formData.serviceAreasFormatted}
                  onChange={(e) => handleChange('serviceAreasFormatted', e.target.value)}
                  placeholder="- القاهرة والجيزة: توصيل خلال 24-48 ساعة..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {/* Section 5: Hours */}
          {activeSection === 'hours' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>3.5 مواعيد وأوقات العمل والتوقيت المرجعي</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    الأيام والساعات (workingHours)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.workingHours}
                    onChange={(e) => handleChange('workingHours', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    التوقيت المرجعي (timeZone)
                  </label>
                  <input
                    type="text"
                    value={formData.timeZone}
                    onChange={(e) => handleChange('timeZone', e.target.value)}
                    placeholder="مثال: توقيت القاهرة (GMT+3)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Contact & Support */}
          {activeSection === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>3.6 طرق الحجز والتواصل والدعم البشري المعتمد</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    رقم الواتساب (whatsappNumber)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    رقم الهاتف / الخط الساخن (phoneNumber)
                  </label>
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  طريقة وخطوات الطلب (orderingSteps)
                </label>
                <textarea
                  rows={2}
                  value={formData.orderingSteps}
                  onChange={(e) => handleChange('orderingSteps', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 text-amber-400">
                  قناة الدعم البشري للتحويل عند الخروج عن النطاق (humanSupportContact)
                </label>
                <textarea
                  rows={2}
                  value={formData.humanSupportContact}
                  onChange={(e) => handleChange('humanSupportContact', e.target.value)}
                  className="w-full bg-slate-950 border border-amber-500/30 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* Section 7: FAQ */}
          {activeSection === 'faq' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>3.7 الأسئلة الشائعة (faqFormatted)</span>
              </h3>
              <p className="text-xs text-slate-400">
                إجابات نموذجية على أكثر أسئلة العملاء تكراراً (الأصالة، فحص الشحنة، الحجز).
              </p>
              <div>
                <textarea
                  rows={8}
                  value={formData.faqFormatted}
                  onChange={(e) => handleChange('faqFormatted', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {/* Section 8: Policies */}
          {activeSection === 'policies' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>3.8 السياسات العامة (الاسترجاع، الدفع، والضمان)</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  سياسة الاسترجاع والإلغاء (cancellationPolicy)
                </label>
                <textarea
                  rows={2}
                  value={formData.cancellationPolicy}
                  onChange={(e) => handleChange('cancellationPolicy', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  طرق الدفع المتاحة (paymentMethods)
                </label>
                <textarea
                  rows={2}
                  value={formData.paymentMethods}
                  onChange={(e) => handleChange('paymentMethods', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  شروط الضمان (warrantyTerms)
                </label>
                <textarea
                  rows={2}
                  value={formData.warrantyTerms}
                  onChange={(e) => handleChange('warrantyTerms', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Save button footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتطبيق التغييرات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
