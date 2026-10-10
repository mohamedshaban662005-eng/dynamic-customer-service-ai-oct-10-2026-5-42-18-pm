export interface KnowledgeBaseData {
  companyName: string;
  businessDomain: string;
  businessDescription: string;
  websiteOrSocialLinks: string;
  dialect: 'مصري' | 'فصحى';
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

export type PlatformType = 'Facebook' | 'Instagram' | 'WhatsApp' | 'Messenger' | 'X' | 'TikTok' | 'LinkedIn';
export type EventType = 'Public Mention' | 'Public Comment' | 'Direct Message' | 'Post Share' | 'Re-post Mention';

export interface MentionContext {
  platform: PlatformType;
  eventType: EventType;
  customerName: string;
  originalPost: string;
  parentComment: string;
  customerText: string;
  conversationHistory: string;
}

export interface ResponseAnalysis {
  raw: string;
  cleanText: string;
  isNoReply: boolean;
  isHandoff: boolean;
  stats: {
    charLength: number;
    maxChars: number;
    isLengthValid: boolean;
    hasMarkdown: boolean;
    emojiCount: number;
    isEmojiValid: boolean;
    isPublic: boolean;
  };
}

export interface QATestScenario {
  id: string;
  title: string;
  description: string;
  category: 'pricing' | 'out_of_scope' | 'complaint' | 'no_reply' | 'off_hours' | 'offers';
  expectedNoReply: boolean;
  expectedHandoff: boolean;
  context: MentionContext;
  expectedBehaviorNotes: string;
}

export interface QATestResult {
  id: string;
  title: string;
  category: string;
  context: MentionContext;
  reply: string;
  analysis?: ResponseAnalysis;
  passed?: boolean;
  error?: string;
  checks?: {
    passNoReply: boolean;
    passHandoff: boolean;
    passLength: boolean;
    passMarkdown: boolean;
  };
}
