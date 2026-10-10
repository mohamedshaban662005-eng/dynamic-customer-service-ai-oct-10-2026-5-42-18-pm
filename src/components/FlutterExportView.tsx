import React, { useState } from 'react';
import {
  Smartphone,
  Copy,
  Check,
  Download,
  FileCode,
  FolderTree,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface FileItem {
  path: string;
  name: string;
  language: string;
  content: string;
}

export const FlutterExportView: React.FC = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const flutterFiles: FileItem[] = [
    {
      path: 'pubspec.yaml',
      name: 'pubspec.yaml',
      language: 'yaml',
      content: `name: smart_customer_service
description: مساعد خدمة العملاء الذكي لإدارة الإشارات والرسائل الخاصة بالذكاء الاصطناعي
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  google_generative_ai: ^0.4.6
  google_fonts: ^6.2.1
  provider: ^6.1.2
  shared_preferences: ^2.3.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
`,
    },
    {
      path: 'lib/models/knowledge_base.dart',
      name: 'knowledge_base.dart',
      language: 'dart',
      content: `class KnowledgeBase {
  String companyName;
  String businessDomain;
  String businessDescription;
  String websiteOrSocialLinks;
  String dialect; // 'مصري' or 'فصحى'
  String voiceTone;
  String servicesAndPricingFormatted;
  String activeOffersFormatted;
  String serviceAreasFormatted;
  String workingHours;
  String timeZone;
  String orderingSteps;
  String whatsappNumber;
  String phoneNumber;
  String humanSupportContact;
  String faqFormatted;
  String cancellationPolicy;
  String paymentMethods;
  String warrantyTerms;

  KnowledgeBase({
    required this.companyName,
    required this.businessDomain,
    required this.businessDescription,
    required this.websiteOrSocialLinks,
    required this.dialect,
    required this.voiceTone,
    required this.servicesAndPricingFormatted,
    required this.activeOffersFormatted,
    required this.serviceAreasFormatted,
    required this.workingHours,
    required this.timeZone,
    required this.orderingSteps,
    required this.whatsappNumber,
    required this.phoneNumber,
    required this.humanSupportContact,
    required this.faqFormatted,
    required this.cancellationPolicy,
    required this.paymentMethods,
    required this.warrantyTerms,
  });

  factory KnowledgeBase.defaultRoqan() {
    return KnowledgeBase(
      companyName: 'روقان تك',
      businessDomain: 'بيع الإلكترونيات، الساعات الذكية، وسماعات البلوتوث الأصلية وملحقات الهواتف',
      businessDescription: 'متجر متخصص في بيع الإلكترونيات الاستهلاكية وإكسسوارات الموبايل الأصلية بضمان معتمد وتوصيل سريع في مصر.',
      websiteOrSocialLinks: 'https://roqantech.eg | فيسبوك وإنستغرام: @RoqanTechEg',
      dialect: 'مصري',
      voiceTone: 'ودود، محترف، سريع، وخدوم',
      servicesAndPricingFormatted: '''- سماعة AirBuds Pro 2: بسعر 1,450 جنيه (ضمان 12 شهر ضد عيوب الصناعة)
- ساعة Roqan Watch Ultra: بسعر 2,100 جنيه (مقاومة للماء وبطارية 5 أيام)
- شاحن سريع 65W GaN ثلاثي المنافذ: بسعر 650 جنيه
- باور بانك 20,000 مللي أمبير بقوة 22.5W: بسعر 950 جنيه
- جرابات حماية سيليكون أصلية لجميع موديلات الآيفون والسامسونج: 200 جنيه''',
      activeOffersFormatted: '''- كود خصم [SUMMER10] يمنح خصم 10% على أي طلب يتجاوز 2000 جنيه.
- شحن مجاني للطلبات فوق 1,500 جنيه لمحافظتي القاهرة والجيزة فقط.
- اشترِ ساعة Roqan Watch Ultra واحصل على سير إضافي هدية.''',
      serviceAreasFormatted: '''- القاهرة والجيزة: توصيل خلال 24 إلى 48 ساعة (تكلفة الشحن 45 جنيه للطلبات العادية).
- الإسكندرية ومحافظات الدلتا: توصيل خلال 2 إلى 3 أيام عمل (الشحن 60 جنيه).
- محافظات الصعيد والقناة: توصيل خلال 3 إلى 4 أيام عمل (الشحن 75 جنيه).
- لا يوجد شحن دولي خارج مصر حالياً.''',
      workingHours: 'يومياً من السبت إلى الخميس: من 10:00 صباحاً حتى 11:00 مساءً. الجمعة: من 2:00 ظهراً حتى 11:00 مساءً.',
      timeZone: 'توقيت القاهرة (GMT+3)',
      orderingSteps: 'أرسل لنا رسالة على الخاص أو الواتساب متضمنة: اسم المنتج، الاسم ثلاثي، رقم التليفون، والعنوان بالتفصيل.',
      whatsappNumber: '+201098765432',
      phoneNumber: '+20233445566',
      humanSupportContact: 'قسم المتابعة والدعم الفني عبر الواتساب على +201098765432 أو الخط الساخن 19876',
      faqFormatted: '''- هل المنتجات أصلية؟ نعم، جميع منتجاتنا أصلية 100% ومستوردة بضمان رسمي من الوكيل.
- هل يمكن معاينة الأوردر قبل الاستلام؟ نعم متاح فتح الشحنة والتأكد من مطابقة المنتج مع المندوب قبل دفع الحساب.
- متى يصل الأوردر بعد تأكيده؟ خلال 24-48 ساعة داخل القاهرة والجيزة، ومن 2-3 أيام لباقي المحافظات.''',
      cancellationPolicy: 'يمكن إلغاء الطلب مجاناً قبل خروجه مع شركة الشحن. الاسترجاع أو الاستبدال متاح خلال 14 يوماً من الاستلام بشرط بقاء المنتج في حالته وتغليفه الأصلي غير مفتوح.',
      paymentMethods: 'الدفع عند الاستلام (كاش)، أو الدفع المسبق عبر فودافون كاش، إنستاباي (InstaPay)، والبطاقات الائتمانية البنكية.',
      warrantyTerms: 'ضمان استبدال فوري لمدة 14 يوماً ضد عيوب الصناعة، وضمان صيانة معتمد لمدة عام كامل على الساعات والسماعات والشواحن.',
    );
  }

  Map<String, dynamic> toJson() => {
    'companyName': companyName,
    'businessDomain': businessDomain,
    'businessDescription': businessDescription,
    'websiteOrSocialLinks': websiteOrSocialLinks,
    'dialect': dialect,
    'voiceTone': voiceTone,
    'servicesAndPricingFormatted': servicesAndPricingFormatted,
    'activeOffersFormatted': activeOffersFormatted,
    'serviceAreasFormatted': serviceAreasFormatted,
    'workingHours': workingHours,
    'timeZone': timeZone,
    'orderingSteps': orderingSteps,
    'whatsappNumber': whatsappNumber,
    'phoneNumber': phoneNumber,
    'humanSupportContact': humanSupportContact,
    'faqFormatted': faqFormatted,
    'cancellationPolicy': cancellationPolicy,
    'paymentMethods': paymentMethods,
    'warrantyTerms': warrantyTerms,
  };

  factory KnowledgeBase.fromJson(Map<String, dynamic> json) => KnowledgeBase(
    companyName: json['companyName'] ?? '',
    businessDomain: json['businessDomain'] ?? '',
    businessDescription: json['businessDescription'] ?? '',
    websiteOrSocialLinks: json['websiteOrSocialLinks'] ?? '',
    dialect: json['dialect'] ?? 'مصري',
    voiceTone: json['voiceTone'] ?? 'ودود ومحترف',
    servicesAndPricingFormatted: json['servicesAndPricingFormatted'] ?? '',
    activeOffersFormatted: json['activeOffersFormatted'] ?? '',
    serviceAreasFormatted: json['serviceAreasFormatted'] ?? '',
    workingHours: json['workingHours'] ?? '',
    timeZone: json['timeZone'] ?? '',
    orderingSteps: json['orderingSteps'] ?? '',
    whatsappNumber: json['whatsappNumber'] ?? '',
    phoneNumber: json['phoneNumber'] ?? '',
    humanSupportContact: json['humanSupportContact'] ?? '',
    faqFormatted: json['faqFormatted'] ?? '',
    cancellationPolicy: json['cancellationPolicy'] ?? '',
    paymentMethods: json['paymentMethods'] ?? '',
    warrantyTerms: json['warrantyTerms'] ?? '',
  );
}
`,
    },
    {
      path: 'lib/models/mention_context.dart',
      name: 'mention_context.dart',
      language: 'dart',
      content: `class MentionContext {
  String platform;
  String eventType;
  String customerName;
  String originalPost;
  String parentComment;
  String customerText;
  String conversationHistory;

  MentionContext({
    required this.platform,
    required this.eventType,
    required this.customerName,
    required this.originalPost,
    required this.parentComment,
    required this.customerText,
    required this.conversationHistory,
  });

  factory MentionContext.initial() {
    return MentionContext(
      platform: 'Facebook',
      eventType: 'Public Comment',
      customerName: 'أحمد محمود',
      originalPost: 'عرض الأسبوع على أحدث السماعات من روقان تك!',
      parentComment: 'لا يوجد',
      customerText: 'ممكن تفاصيل وسعر سماعة AirBuds Pro 2 لو سمحت والضمان بتاعها؟',
      conversationHistory: 'لا يوجد',
    );
  }
}
`,
    },
    {
      path: 'lib/utils/prompt_builder.dart',
      name: 'prompt_builder.dart',
      language: 'dart',
      content: `import '../models/knowledge_base.dart';
import '../models/mention_context.dart';

class PromptBuilder {
  static String buildSystemPrompt(KnowledgeBase kb) {
    return '''# ═══════════════════════════════════════════
# SYSTEM INSTRUCTION — مساعد خدمة العملاء الذكي (Dynamic Template)
# ═══════════════════════════════════════════

## 1) الدور والشخصية

أنت ممثل خدمة عملاء محترف لشركة "\${kb.companyName}" في مجال "\${kb.businessDomain}".
مهمتك الرد على العملاء عندما يتم الإشارة إلى حساب الشركة (Mention/Tag) في تعليق أو منشور أو منشور معاد مشاركته، أو عندما تصل رسالة خاصة.

صفاتك: ودود، محترف، سريع، مباشر، ومحترم لوقت العميل.

### أسلوب التحدث
- اللهجة المعتمدة: \${kb.dialect}
  - إذا كانت القيمة "مصري": استخدم اللهجة المصرية البسيطة والمهذبة (مثل: "أهلاً بحضرتك"، "تحت أمرك"، "يسعدنا نخدمك").
  - إذا كانت القيمة "فصحى": استخدم عربية فصحى مبسطة بدون تعقيد أو ألفاظ ثقيلة.
- لا تخلط بين الأسلوبين في نفس الرد.
- نبرة الصوت: \${kb.voiceTone}.
- استخدم إيموجي واحداً أو اثنين كحد أقصى في الرد، ولا تستخدمه إطلاقاً مع الشكاوى أو المواقف الجادة.
- خاطب العميل باسمه الأول إن كان متاحاً.

### قواعد التعامل مع الإشارات (Mentions)
- اعتبر كل إشارة طلب مساعدة حقيقياً وردّ عليها، إلا في الحالات المذكورة في قسم "الحالات التي لا يجب الرد عليها".
- كن سريعاً: ابدأ بالإجابة مباشرة دون مقدمات طويلة.
- في التعليقات العامة (Public)، افترض أن الجميع سيقرأ ردك: لا تذكر بيانات شخصية أو تفاصيل حساسة، وانقل أي نقاش خاص إلى الرسائل الخاصة.

---

## 2) قواعد ومعايير الرد

### الهيكل القياسي للرد
1. تحية قصيرة (مرة واحدة فقط، سطر واحد).
2. الإجابة المباشرة عن سؤال العميل أولاً، قبل أي معلومة إضافية.
3. معلومة داعمة واحدة مفيدة إن لزم (سعر، موعد، عرض مرتبط).
4. خطوة تالية واضحة (Call to Action): كيف يطلب الخدمة أو يتواصل أو يحجز.

### قاعدة الالتزام الصارم بقاعدة المعرفة (Strictly Grounded)
- لا تجيب إلا بمعلومات موجودة صراحة في "قاعدة المعرفة" أدناه.
- ممنوع منعاً باتاً تأليف أو تخمين أو استنتاج: أسعار، خصومات، مواعيد، مناطق خدمة، سياسات، أو أي وعود.
- لا تقدّم أي التزام (ضمان، موعد تسليم، استرجاع) غير مذكور في قاعدة المعرفة.
- إذا كانت المعلومة ناقصة أو غير مؤكدة، لا تُكمل من عندك. طبّق قاعدة "خارج النطاق" أدناه.
- لا تذكر أسعار المنافسين ولا تقارن بهم.

### إذا كان السؤال خارج النطاق أو لا تعرف إجابته
- لا تعتذر باستفاضة ولا تختلق إجابة.
- اعترف بلباقة أنك ستحتاج تأكيد المعلومة من الفريق المختص.
- اطلب من العميل رقم هاتفه عبر رسالة خاصة، أو وجّهه لقناة الدعم البشري: \${kb.humanSupportContact}.
- أنهِ ردك بجملة تطمئنه أن أحداً من الفريق سيتواصل معه.
- أضف في نهاية المخرجات علامة داخلية منفصلة: [HANDOFF]

### الشكاوى والعملاء الغاضبين
- ابدأ بتقدير مشكلته بجملة صادقة واحدة (بدون مبالغة في الاعتذار).
- لا تجادل ولا تدافع ولا تحمّل العميل المسؤولية.
- لا تعرض تعويضاً أو حلاً غير موجود في قاعدة المعرفة.
- حوّل الحالة فوراً للدعم البشري واطلب وسيلة تواصل خاصة، وأضف [HANDOFF].

### الحالات التي لا يجب الرد عليها
أرجع النص الحرفي [NO_REPLY] فقط في الحالات التالية:
- إشارة بدون أي سؤال أو طلب (مثل إشارة صديق لصديقه في ميم أو مزحة).
- محتوى مسيء، سبّ، سخرية، أو إعلانات وسبام.
- محتوى سياسي أو ديني أو نقاش جدلي لا علاقة له بالنشاط.
- العميل طلب صراحة عدم التواصل معه.

### حدود الطول (لمنصات التواصل)
- التعليقات العامة (Facebook / Instagram): من 1 إلى 3 جمل، بحد أقصى 250 حرفاً.
- الرسائل الخاصة (Messenger / Instagram DM / WhatsApp): حد أقصى 500 حرف، وفي فقرتين قصيرتين.
- لا تستخدم تنسيقات Markdown (لا نجوم، لا عناوين، لا جداول). استخدم نصاً عادياً فقط.
- القوائم مسموحة فقط عند الضرورة (حتى 3 بنود) باستخدام شرطة "-" أو أرقام بسيطة.
- لا تكرر نفس الجملة أو التحية داخل المحادثة الواحدة.

---

## 3) قاعدة المعرفة الديناميكية (Knowledge Base)

> هذه هي المصدر الوحيد للمعلومات. ما لم يُذكر هنا فهو غير متاح لك.

### 3.1 نبذة عن النشاط
- الاسم: \${kb.companyName}
- النشاط: \${kb.businessDescription}
- الرابط / الحسابات: \${kb.websiteOrSocialLinks}

### 3.2 قائمة الخدمات والأسعار المتاحة حالياً
\${kb.servicesAndPricingFormatted}

### 3.3 العروض الفعالة الحالية
\${kb.activeOffersFormatted}

### 3.4 مناطق الخدمة والتوصيل
\${kb.serviceAreasFormatted}

### 3.5 مواعيد وأوقات العمل
- الأيام والساعات: \${kb.workingHours}
- التوقيت المرجعي: \${kb.timeZone}
- خارج أوقات العمل: أخبر العميل أنك تسجل طلبه وأن الفريق سيرد عند بدء العمل.

### 3.6 طرق الحجز والتواصل المباشر
- طريقة الطلب: \${kb.orderingSteps}
- رقم الواتساب: \${kb.whatsappNumber}
- الهاتف: \${kb.phoneNumber}

### 3.7 الأسئلة الشائعة (FAQ)
\${kb.faqFormatted}

### 3.8 السياسات العامة
- الاسترجاع والإلغاء: \${kb.cancellationPolicy}
- طرق الدفع المتاحة: \${kb.paymentMethods}
- الضمان: \${kb.warrantyTerms}

---

## 4) معالجة الإشارات والسياق (Mention Handling)

ستصلك المدخلات بالحقول التالية:
- PLATFORM: {اسم المنصة}
- EVENT_TYPE: {نوع الحدث}
- CUSTOMER_NAME: {اسم العميل}
- ORIGINAL_POST: {نص المنشور الأصلي}
- PARENT_COMMENT: {التعليق السابق}
- CUSTOMER_TEXT: {رسالة العميل أو التعليق الحالي}
- CONVERSATION_HISTORY: {سياق المحادثة السابقة}

---

## 5) صيغة المخرجات (Output Format)

- أرجع نص الرد النهائي فقط، جاهزاً للنشر، بدون أي شرح أو مقدمة أو علامات اقتباس.
- العلامات الداخلية [HANDOFF] و [NO_REPLY] تُكتب فقط عند الحاجة وفق القواعد أعلاه، وتكون في سطر مستقل في آخر المخرجات (باستثناء [NO_REPLY] التي تُكتب وحدها).
- DYNAMIC_PLACEHOLDERS: Utilize curly braces for system-defined tags only.''';
  }

  static String buildUserMessage(MentionContext ctx) {
    return '''PLATFORM: \${ctx.platform}
EVENT_TYPE: \${ctx.eventType}
CUSTOMER_NAME: \${ctx.customerName}
ORIGINAL_POST: \${ctx.originalPost.isEmpty ? 'لا يوجد' : ctx.originalPost}
PARENT_COMMENT: \${ctx.parentComment.isEmpty ? 'لا يوجد' : ctx.parentComment}
CUSTOMER_TEXT: \${ctx.customerText}
CONVERSATION_HISTORY: \${ctx.conversationHistory.isEmpty ? 'لا يوجد' : ctx.conversationHistory}''';
  }
}
`,
    },
    {
      path: 'lib/services/gemini_service.dart',
      name: 'gemini_service.dart',
      language: 'dart',
      content: `import 'package:google_generative_ai/google_generative_ai.dart';
import '../models/knowledge_base.dart';
import '../models/mention_context.dart';
import '../utils/prompt_builder.dart';

class GeminiCustomerService {
  final String apiKey;
  GeminiCustomerService({required this.apiKey});

  Future<Map<String, dynamic>> generateResponse({
    required KnowledgeBase kb,
    required MentionContext ctx,
  }) async {
    final systemInstruction = PromptBuilder.buildSystemPrompt(kb);
    final userPrompt = PromptBuilder.buildUserMessage(ctx);

    final model = GenerativeModel(
      model: 'gemini-1.5-flash', // أو gemini-3.8-flash عبر REST API
      apiKey: apiKey,
      systemInstruction: Content.system(systemInstruction),
      generationConfig: GenerationConfig(
        temperature: 0.3,
        topP: 0.85,
      ),
    );

    final content = [Content.text(userPrompt)];
    final response = await model.generateContent(content);
    final rawText = response.text?.trim() ?? '';

    // تحليل المخرجات واستخراج الإشارات
    final isNoReply = rawText.contains('[NO_REPLY]');
    final isHandoff = rawText.contains('[HANDOFF]');

    final cleanText = rawText
        .replaceAll('[NO_REPLY]', '')
        .replaceAll('[HANDOFF]', '')
        .trim();

    final isPublic = ctx.eventType.contains('Public') ||
        ctx.eventType.contains('Comment') ||
        ctx.eventType.contains('Mention');

    final maxChars = isPublic ? 250 : 500;
    final isLengthValid = cleanText.length <= maxChars;
    final hasMarkdown = cleanText.contains('**') || cleanText.contains('##');

    return {
      'raw': rawText,
      'clean': cleanText,
      'isNoReply': isNoReply,
      'isHandoff': isHandoff,
      'charLength': cleanText.length,
      'maxChars': maxChars,
      'isLengthValid': isLengthValid,
      'hasMarkdown': hasMarkdown,
    };
  }
}
`,
    },
    {
      path: 'lib/screens/simulator_screen.dart',
      name: 'simulator_screen.dart',
      language: 'dart',
      content: `import 'package:flutter/material.dart';
import '../models/knowledge_base.dart';
import '../models/mention_context.dart';
import '../services/gemini_service.dart';

class SimulatorScreen extends StatefulWidget {
  final KnowledgeBase kb;
  final String geminiApiKey;

  const SimulatorScreen({
    super.key,
    required this.kb,
    required this.geminiApiKey,
  });

  @override
  State<SimulatorScreen> createState() => _SimulatorScreenState();
}

class _SimulatorScreenState extends State<SimulatorScreen> {
  late MentionContext _context;
  final TextEditingController _textController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();

  bool _isLoading = false;
  Map<String, dynamic>? _lastResult;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _context = MentionContext.initial();
    _textController.text = _context.customerText;
    _nameController.text = _context.customerName;
  }

  void _onGenerate() async {
    if (_textController.text.trim().isEmpty) return;
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    _context.customerText = _textController.text.trim();
    _context.customerName = _nameController.text.trim();

    try {
      final service = GeminiCustomerService(apiKey: widget.geminiApiKey);
      final res = await service.generateResponse(kb: widget.kb, ctx: _context);
      setState(() {
        _lastResult = res;
      });
    } catch (e) {
      setState(() {
        _errorMessage = e.toString();
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('محاكي الإشارات والردود الذكية'),
          backgroundColor: const Color(0xFF0F172A),
        ),
        backgroundColor: const Color(0xFF020617),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // اختيار المنصة
              Card(
                color: const Color(0xFF0F172A),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'إعدادات الإشارة أو الرسالة الواردة',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 12),
                      DropdownButtonFormField<String>(
                        value: _context.platform,
                        dropdownColor: const Color(0xFF1E293B),
                        decoration: const InputDecoration(
                          labelText: 'المنصة (PLATFORM)',
                          labelStyle: TextStyle(color: Colors.grey),
                          border: OutlineInputBorder(),
                        ),
                        items: ['Facebook', 'Instagram', 'WhatsApp', 'Messenger', 'X', 'TikTok']
                            .map((p) => DropdownMenuItem(value: p, child: Text(p, style: const TextStyle(color: Colors.white))))
                            .toList(),
                        onChanged: (val) => setState(() => _context.platform = val!),
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        controller: _nameController,
                        style: const TextStyle(color: Colors.white),
                        decoration: const InputDecoration(
                          labelText: 'اسم العميل (CUSTOMER_NAME)',
                          labelStyle: TextStyle(color: Colors.grey),
                          border: OutlineInputBorder(),
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        controller: _textController,
                        maxLines: 3,
                        style: const TextStyle(color: Colors.white),
                        decoration: const InputDecoration(
                          labelText: 'نص العميل (CUSTOMER_TEXT)',
                          labelStyle: TextStyle(color: Colors.grey),
                          border: OutlineInputBorder(),
                        ),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton.icon(
                        onPressed: _isLoading ? null : _onGenerate,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF059669),
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        icon: _isLoading
                            ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                            : const Icon(Icons.send, color: Colors.white),
                        label: Text(_isLoading ? 'جاري التفكير والتوليد...' : 'توليد الرد المعتمد'),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 20),

              // عرض النتيجة
              if (_lastResult != null) ...[
                Card(
                  color: const Color(0xFF0F172A),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('المعاينة والرد الذكي:', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            if (_lastResult!['isHandoff'])
                              const Chip(
                                backgroundColor: Color(0x33F59E0B),
                                label: Text('[HANDOFF] تحويل بشري', style: TextStyle(color: Colors.amber, fontSize: 11)),
                              ),
                            if (_lastResult!['isNoReply'])
                              const Chip(
                                backgroundColor: Color(0x33A855F7),
                                label: Text('[NO_REPLY] كتم الرد', style: TextStyle(color: Colors.purpleAccent, fontSize: 11)),
                              ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFF020617),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: const Color(0xFF10B981)),
                          ),
                          child: SelectableText(
                            _lastResult!['clean'],
                            style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.5),
                          ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Text(
                              'طول النص: \${_lastResult!['charLength']} / \${_lastResult!['maxChars']} حرف',
                              style: TextStyle(
                                color: _lastResult!['isLengthValid'] ? Colors.greenAccent : Colors.redAccent,
                                fontSize: 12,
                              ),
                            ),
                            const Spacer(),
                            Text(
                              _lastResult!['hasMarkdown'] ? '⚠️ يحتوي ماركداون' : '✓ خالي من الماركداون',
                              style: TextStyle(
                                color: _lastResult!['hasMarkdown'] ? Colors.redAccent : Colors.greenAccent,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],

              if (_errorMessage != null) ...[
                Container(
                  margin: const EdgeInsets.only(top: 12),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.red.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.redAccent.withOpacity(0.3)),
                  ),
                  child: Text('خطأ: \$_errorMessage', style: const TextStyle(color: Colors.redAccent)),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
`,
    },
    {
      path: 'lib/screens/knowledge_base_screen.dart',
      name: 'knowledge_base_screen.dart',
      language: 'dart',
      content: `import 'package:flutter/material.dart';
import '../models/knowledge_base.dart';

class KnowledgeBaseScreen extends StatefulWidget {
  final KnowledgeBase kb;
  final Function(KnowledgeBase) onSave;

  const KnowledgeBaseScreen({
    super.key,
    required this.kb,
    required this.onSave,
  });

  @override
  State<KnowledgeBaseScreen> createState() => _KnowledgeBaseScreenState();
}

class _KnowledgeBaseScreenState extends State<KnowledgeBaseScreen> {
  late TextEditingController _companyNameController;
  late TextEditingController _domainController;
  late TextEditingController _servicesController;
  late TextEditingController _offersController;
  late TextEditingController _areasController;
  late TextEditingController _contactController;
  late String _selectedDialect;

  @override
  void initState() {
    super.initState();
    _companyNameController = TextEditingController(text: widget.kb.companyName);
    _domainController = TextEditingController(text: widget.kb.businessDomain);
    _servicesController = TextEditingController(text: widget.kb.servicesAndPricingFormatted);
    _offersController = TextEditingController(text: widget.kb.activeOffersFormatted);
    _areasController = TextEditingController(text: widget.kb.serviceAreasFormatted);
    _contactController = TextEditingController(text: widget.kb.humanSupportContact);
    _selectedDialect = widget.kb.dialect;
  }

  void _save() {
    widget.kb.companyName = _companyNameController.text.trim();
    widget.kb.businessDomain = _domainController.text.trim();
    widget.kb.servicesAndPricingFormatted = _servicesController.text.trim();
    widget.kb.activeOffersFormatted = _offersController.text.trim();
    widget.kb.serviceAreasFormatted = _areasController.text.trim();
    widget.kb.humanSupportContact = _contactController.text.trim();
    widget.kb.dialect = _selectedDialect;

    widget.onSave(widget.kb);

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('تم حفظ وتحديث قاعدة المعرفة بنجاح!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('إدارة قاعدة المعرفة (Knowledge Base)'),
          backgroundColor: const Color(0xFF0F172A),
          actions: [
            IconButton(
              icon: const Icon(Icons.save, color: Color(0xFF10B981)),
              onPressed: _save,
            ),
          ],
        ),
        backgroundColor: const Color(0xFF020617),
        body: ListView(
          padding: const EdgeInsets.all(16.0),
          children: [
            _buildCard('اسم الشركة ونشاطها', [
              TextFormField(
                controller: _companyNameController,
                style: const TextStyle(color: Colors.white),
                decoration: const InputDecoration(labelText: 'اسم الشركة', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _domainController,
                style: const TextStyle(color: Colors.white),
                decoration: const InputDecoration(labelText: 'مجال النشاط', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                value: _selectedDialect,
                dropdownColor: const Color(0xFF1E293B),
                decoration: const InputDecoration(labelText: 'اللهجة المعتمدة', border: OutlineInputBorder()),
                items: const [
                  DropdownMenuItem(value: 'مصري', child: Text('مصري (لهجة مهذبة وبسيطة)', style: TextStyle(color: Colors.white))),
                  DropdownMenuItem(value: 'فصحى', child: Text('فصحى (عربية مبسطة)', style: TextStyle(color: Colors.white))),
                ],
                onChanged: (val) => setState(() => _selectedDialect = val!),
              ),
            ]),
            const SizedBox(height: 16),
            _buildCard('قائمة الخدمات والأسعار المعتمدة', [
              TextFormField(
                controller: _servicesController,
                maxLines: 5,
                style: const TextStyle(color: Colors.white, fontFamily: 'monospace'),
                decoration: const InputDecoration(labelText: 'الخدمات والأسعار', border: OutlineInputBorder()),
              ),
            ]),
            const SizedBox(height: 16),
            _buildCard('العروض الفعالة ومناطق الخدمة', [
              TextFormField(
                controller: _offersController,
                maxLines: 3,
                style: const TextStyle(color: Colors.white),
                decoration: const InputDecoration(labelText: 'العروض الحالية', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _areasController,
                maxLines: 3,
                style: const TextStyle(color: Colors.white),
                decoration: const InputDecoration(labelText: 'مناطق التوصيل والخدمة', border: OutlineInputBorder()),
              ),
            ]),
            const SizedBox(height: 16),
            _buildCard('قناة الدعم البشري للتحويل (Handoff)', [
              TextFormField(
                controller: _contactController,
                style: const TextStyle(color: Colors.white),
                decoration: const InputDecoration(labelText: 'وسيلة تواصل الدعم البشري', border: OutlineInputBorder()),
              ),
            ]),
          ],
        ),
      ),
    );
  }

  Widget _buildCard(String title, List<Widget> children) {
    return Card(
      color: const Color(0xFF0F172A),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 15)),
            const SizedBox(height: 12),
            ...children,
          ],
        ),
      ),
    );
  }
}
`,
    },
    {
      path: 'lib/main.dart',
      name: 'main.dart',
      language: 'dart',
      content: `import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'models/knowledge_base.dart';
import 'screens/simulator_screen.dart';
import 'screens/knowledge_base_screen.dart';

void main() {
  runApp(const SmartCustomerServiceApp());
}

class SmartCustomerServiceApp extends StatefulWidget {
  const SmartCustomerServiceApp({super.key});

  @override
  State<SmartCustomerServiceApp> createState() => _SmartCustomerServiceAppState();
}

class _SmartCustomerServiceAppState extends State<SmartCustomerServiceApp> {
  final KnowledgeBase _kb = KnowledgeBase.defaultRoqan();
  // أدخل مفتاح Gemini API هنا أو احصل عليه من المتغيرات
  final String _apiKey = 'YOUR_GEMINI_API_KEY';
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final screens = [
      SimulatorScreen(kb: _kb, geminiApiKey: _apiKey),
      KnowledgeBaseScreen(kb: _kb, onSave: (updated) => setState(() {})),
    ];

    return MaterialApp(
      title: 'مساعد خدمة العملاء الذكي',
      debugShowCheckedModeBanner: false,
      locale: const Locale('ar', 'EG'),
      supportedLocales: const [
        Locale('ar', 'EG'),
        Locale('en', 'US'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFF10B981),
        scaffoldBackgroundColor: const Color(0xFF020617),
        fontFamily: 'Cairo',
      ),
      home: Directionality(
        textDirection: TextDirection.rtl,
        child: Scaffold(
          body: screens[_currentIndex],
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            backgroundColor: const Color(0xFF0F172A),
            selectedItemColor: const Color(0xFF10B981),
            unselectedItemColor: Colors.grey,
            onTap: (index) => setState(() => _currentIndex = index),
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.chat_bubble_outline),
                activeIcon: Icon(Icons.chat_bubble),
                label: 'المحاكي والإشارات',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.menu_book_outlined),
                activeIcon: Icon(Icons.menu_book),
                label: 'قاعدة المعرفة',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`,
    },
  ];

  const currentFile = flutterFiles[selectedFileIndex];

  const copyFileContent = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (file: FileItem) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllAsText = () => {
    let combined = `# مشروع مساعد خدمة العملاء الذكي بلغة Flutter و Dart\n\n`;
    flutterFiles.forEach((file) => {
      combined += `\n/* ==================== FILE: ${file.path} ==================== */\n\n`;
      combined += file.content;
      combined += `\n\n`;
    });
    const blob = new Blob([combined], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flutter_smart_customer_service_code.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              كود تطبيق الهاتف الكامل (Flutter & Dart Project)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              مشروع فلاتر متكامل جاهز للبناء والتشغيل على أندرويد و iOS، متضمن حزمة google_generative_ai ونموذج قاعدة المعرفة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadAllAsText}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل كامل الملفات في ملف واحد</span>
          </button>

          <button
            type="button"
            onClick={copyFileContent}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ الملف الحالي'}</span>
          </button>
        </div>
      </div>

      {/* Main File Explorer Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* File Tree List */}
        <div className="md:col-span-4 lg:col-span-3 space-y-1 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 px-2 py-1 mb-2">
            <FolderTree className="w-4 h-4 text-blue-400" />
            <span>ملفات المشروع (Flutter Project):</span>
          </div>

          {flutterFiles.map((f, idx) => (
            <button
              key={f.path}
              type="button"
              onClick={() => setSelectedFileIndex(idx)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono text-left transition ${
                selectedFileIndex === idx
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
              dir="ltr"
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-4 h-4 shrink-0 text-slate-400" />
                <span className="truncate">{f.name}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase">{f.language}</span>
            </button>
          ))}

          {/* Quick Instructions */}
          <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 px-1">
            <div className="font-bold text-slate-300">طريقة تشغيل المشروع:</div>
            <div>1. أنشئ مشروع: <code>flutter create my_app</code></div>
            <div>2. استبدل <code>pubspec.yaml</code> وملفات <code>lib/</code></div>
            <div>3. نفذ: <code>flutter pub get</code></div>
            <div>4. شغّل التطبيق: <code>flutter run</code></div>
          </div>
        </div>

        {/* File Content Viewer */}
        <div className="md:col-span-8 lg:col-span-9 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2" dir="ltr">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="font-mono text-slate-300 ml-2 font-bold">{currentFile.path}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => downloadFile(currentFile)}
                className="text-[11px] text-slate-400 hover:text-slate-200 transition"
              >
                تحميل الملف
              </button>
              <span className="text-slate-600">|</span>
              <button
                type="button"
                onClick={copyFileContent}
                className="text-[11px] text-blue-400 hover:text-blue-300 transition"
              >
                {copied ? 'تم النسخ ✓' : 'نسخ النص'}
              </button>
            </div>
          </div>

          <pre
            className="p-5 text-xs text-slate-200 font-mono leading-relaxed overflow-x-auto whitespace-pre selection:bg-blue-500 selection:text-white"
            dir="ltr"
          >
            {currentFile.content}
          </pre>
        </div>
      </div>
    </div>
  );
};
