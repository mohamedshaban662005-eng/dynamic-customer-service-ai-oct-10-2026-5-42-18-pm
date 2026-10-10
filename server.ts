import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface KnowledgeBaseData {
  companyName: string;
  businessDomain: string;
  businessDescription: string;
  websiteOrSocialLinks: string;
  dialect: string;
  voiceTone: string;
  servicesAndPricingFormatted: string;
  activeOffersFormatted: string;
  serviceAreasFormatted: string;
  workingHours: string;
  timeZone: string;
  orderingSteps: string;
  whatsappNumber: string;
  phoneNumber: string;
  humanSupportContact: string;
  faqFormatted: string;
  cancellationPolicy: string;
  paymentMethods: string;
  warrantyTerms: string;
}

interface MentionContext {
  platform: string;
  eventType: string;
  customerName: string;
  originalPost: string;
  parentComment: string;
  customerText: string;
  conversationHistory: string;
}

export function buildSystemPrompt(kb: KnowledgeBaseData): string {
  return `# ═══════════════════════════════════════════
# SYSTEM INSTRUCTION — مساعد خدمة العملاء الذكي (Dynamic Template)
# ═══════════════════════════════════════════

## 1) الدور والشخصية

أنت ممثل خدمة عملاء محترف لشركة "${kb.companyName || 'الشركة'}" في مجال "${kb.businessDomain || 'التجارة والخدمات'}".
مهمتك الرد على العملاء عندما يتم الإشارة إلى حساب الشركة (Mention/Tag) في تعليق أو منشور أو منشور معاد مشاركته، أو عندما تصل رسالة خاصة.

صفاتك: ودود، محترف، سريع، مباشر، ومحترم لوقت العميل.

### أسلوب التحدث
- اللهجة المعتمدة: ${kb.dialect || 'مصري'}
  - إذا كانت القيمة "مصري": استخدم اللهجة المصرية البسيطة والمهذبة (مثل: "أهلاً بحضرتك"، "تحت أمرك"، "يسعدنا نخدمك").
  - إذا كانت القيمة "فصحى": استخدم عربية فصحى مبسطة بدون تعقيد أو ألفاظ ثقيلة.
- لا تخلط بين الأسلوبين في نفس الرد.
- نبرة الصوت: ${kb.voiceTone || 'ودود ومحترف'}.
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
- اطلب من العميل رقم هاتفه عبر رسالة خاصة، أو وجّهه لقناة الدعم البشري: ${kb.humanSupportContact || 'فريق الدعم المختص'}.
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
- الاسم: ${kb.companyName || 'غير محدد'}
- النشاط: ${kb.businessDescription || 'غير محدد'}
- الرابط / الحسابات: ${kb.websiteOrSocialLinks || 'غير محدد'}

### 3.2 قائمة الخدمات والأسعار المتاحة حالياً
${kb.servicesAndPricingFormatted || 'لا توجد خدمات مسجلة'}

### 3.3 العروض الفعالة الحالية
${kb.activeOffersFormatted || 'لا توجد عروض فعالة حالياً'}

### 3.4 مناطق الخدمة والتوصيل
${kb.serviceAreasFormatted || 'غير محدد'}

### 3.5 مواعيد وأوقات العمل
- الأيام والساعات: ${kb.workingHours || 'طوال أيام الأسبوع من 9 صباحاً حتى 10 مساءً'}
- التوقيت المرجعي: ${kb.timeZone || 'توقيت القاهرة (GMT+3)'}
- خارج أوقات العمل: أخبر العميل أنك تسجل طلبه وأن الفريق سيرد عند بدء العمل.

### 3.6 طرق الحجز والتواصل المباشر
- طريقة الطلب: ${kb.orderingSteps || 'عبر الرسائل الخاصة أو الواتساب'}
- رقم الواتساب: ${kb.whatsappNumber || 'غير محدد'}
- الهاتف: ${kb.phoneNumber || 'غير محدد'}

### 3.7 الأسئلة الشائعة (FAQ)
${kb.faqFormatted || 'غير محدد'}

### 3.8 السياسات العامة
- الاسترجاع والإلغاء: ${kb.cancellationPolicy || 'حسب سياسة الاسترجاع المعتمدة'}
- طرق الدفع المتاحة: ${kb.paymentMethods || 'كاش، فيزا، محافظ إلكترونية'}
- الضمان: ${kb.warrantyTerms || 'حسب شروط الضمان المعتمدة'}

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
- DYNAMIC_PLACEHOLDERS: Utilize curly braces for system-defined tags only.`;
}

export function buildUserMessage(ctx: MentionContext): string {
  return `PLATFORM: ${ctx.platform || 'Facebook'}
EVENT_TYPE: ${ctx.eventType || 'Public Comment'}
CUSTOMER_NAME: ${ctx.customerName || 'غير متوفر'}
ORIGINAL_POST: ${ctx.originalPost || 'لا يوجد'}
PARENT_COMMENT: ${ctx.parentComment || 'لا يوجد'}
CUSTOMER_TEXT: ${ctx.customerText || ''}
CONVERSATION_HISTORY: ${ctx.conversationHistory || 'لا يوجد'}`;
}

// Check compliance helpers
function analyzeResponse(text: string, platform: string, eventType: string) {
  const isNoReply = text.includes('[NO_REPLY]');
  const isHandoff = text.includes('[HANDOFF]');

  // Clean out markers for customer message
  let cleanText = text
    .replace(/\[NO_REPLY\]/g, '')
    .replace(/\[HANDOFF\]/g, '')
    .trim();

  const isPublic =
    eventType?.toLowerCase().includes('public') ||
    eventType?.toLowerCase().includes('mention') ||
    eventType?.toLowerCase().includes('comment');

  const maxChars = isPublic ? 250 : 500;
  const charLength = cleanText.length;
  const isLengthValid = charLength <= maxChars;

  // Check for forbidden markdown: **, #, ```, tables
  const markdownRegex = /(\*\*|##|```|\|.*\|)/;
  const hasMarkdown = markdownRegex.test(cleanText);

  // Count emojis
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  const emojiMatches = cleanText.match(emojiRegex);
  const emojiCount = emojiMatches ? emojiMatches.length : 0;
  const isEmojiValid = isHandoff ? emojiCount === 0 : emojiCount <= 2;

  return {
    raw: text,
    cleanText,
    isNoReply,
    isHandoff,
    stats: {
      charLength,
      maxChars,
      isLengthValid,
      hasMarkdown,
      emojiCount,
      isEmojiValid,
      isPublic,
    },
  };
}

async function generateWithRetry(userPrompt: string, systemPrompt: string, maxRetries = 2) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
          topP: 0.85,
        },
      });
      return response;
    } catch (err: any) {
      attempt++;
      if (attempt > maxRetries) throw err;
      // Wait 1.5s then 3s before retrying
      await new Promise((res) => setTimeout(res, 1200 * attempt));
    }
  }
}

// Generate customer service reply
app.post('/api/chat/respond', async (req, res) => {
  try {
    const { knowledgeBase, inputContext } = req.body;

    if (!knowledgeBase || !inputContext) {
      return res.status(400).json({ error: 'Missing knowledgeBase or inputContext' });
    }

    const systemPrompt = buildSystemPrompt(knowledgeBase);
    const userPrompt = buildUserMessage(inputContext);

    const response = await generateWithRetry(userPrompt, systemPrompt);
    const replyText = response?.text?.trim() || '';
    const analysis = analyzeResponse(
      replyText,
      inputContext.platform,
      inputContext.eventType
    );

    res.json({
      success: true,
      result: replyText,
      analysis,
      systemPrompt,
      userPrompt,
    });
  } catch (error: any) {
    console.error('Error generating reply:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate customer service response',
    });
  }
});

// Batch test endpoint for QA benchmark
app.post('/api/chat/batch-test', async (req, res) => {
  try {
    const { knowledgeBase, scenarios } = req.body;
    if (!knowledgeBase || !Array.isArray(scenarios)) {
      return res.status(400).json({ error: 'Missing knowledgeBase or scenarios array' });
    }

    const systemPrompt = buildSystemPrompt(knowledgeBase);

    const results = await Promise.all(
      scenarios.map(async (sc: any, index: number) => {
        try {
          const userPrompt = buildUserMessage(sc.context);
          const response = await generateWithRetry(userPrompt, systemPrompt);
          const replyText = response?.text?.trim() || '';
          const analysis = analyzeResponse(
            replyText,
            sc.context.platform,
            sc.context.eventType
          );

          // Evaluate expected conditions
          const passNoReply = sc.expectedNoReply ? analysis.isNoReply : !analysis.isNoReply;
          const passHandoff = sc.expectedHandoff ? analysis.isHandoff : true;
          const passLength = analysis.stats.isLengthValid;
          const passMarkdown = !analysis.stats.hasMarkdown;
          const passed = (sc.expectedNoReply ? analysis.isNoReply : true) &&
                         (sc.expectedHandoff ? analysis.isHandoff : true) &&
                         passLength &&
                         passMarkdown;

          return {
            id: sc.id || `sc_${index}`,
            title: sc.title,
            category: sc.category,
            context: sc.context,
            expected: sc.expected,
            reply: replyText,
            analysis,
            passed,
            checks: {
              passNoReply,
              passHandoff,
              passLength,
              passMarkdown,
            },
          };
        } catch (err: any) {
          return {
            id: sc.id || `sc_${index}`,
            title: sc.title,
            category: sc.category,
            context: sc.context,
            reply: '',
            error: err?.message || 'Execution error',
            passed: false,
          };
        }
      })
    );

    res.json({ success: true, results });
  } catch (error: any) {
    console.error('Error executing batch test:', error);
    res.status(500).json({ error: error?.message || 'Batch test failed' });
  }
});

// In dev mode, mount Vite middlewares; in prod, serve static dist
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
