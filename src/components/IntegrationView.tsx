import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Code2,
  Layers,
  Terminal,
  Server,
  Zap,
} from 'lucide-react';
import { KnowledgeBaseData } from '../types';

interface IntegrationViewProps {
  kb: KnowledgeBaseData;
}

export const IntegrationView: React.FC<IntegrationViewProps> = ({ kb }) => {
  const [activeSnippet, setActiveSnippet] = useState<'node-meta' | 'node-whatsapp' | 'python-fastapi'>('node-meta');
  const [copied, setCopied] = useState(false);

  const nodeMetaCode = `// Meta Graph API Webhook Handler (Facebook & Instagram Mentions / Comments)
// npm install @google/genai express dotenv
import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

const SYSTEM_INSTRUCTION = \`... (أدخل نص البرومبت المولد هنا) ...\`;

// 1. Meta Webhook Verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 2. Meta Webhook Receiver
app.post('/webhook', async (req, res) => {
  res.sendStatus(200); // Acknowledge Meta immediately

  const entry = req.body.entry?.[0];
  const change = entry?.changes?.[0]?.value;

  if (change?.item === 'comment' && change?.verb === 'add') {
    const commentId = change.comment_id;
    const customerName = change.from?.name || 'العميل';
    const customerMessage = change.message;
    const parentId = change.parent_id;

    // Build standard input payload
    const userPrompt = [
      \`PLATFORM: Facebook\`,
      \`EVENT_TYPE: Public Comment\`,
      \`CUSTOMER_NAME: \${customerName}\`,
      \`ORIGINAL_POST: \${change.post?.name || 'منشور عام'}\`,
      \`PARENT_COMMENT: \${parentId ? 'رد في محادثة' : 'لا يوجد'}\`,
      \`CUSTOMER_TEXT: \${customerMessage}\`,
      \`CONVERSATION_HISTORY: لا يوجد\`
    ].join('\\n');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
        }
      });

      const replyRaw = response.text?.trim() || '';

      // Rule: If [NO_REPLY], do not send any message
      if (replyRaw.includes('[NO_REPLY]')) {
        console.log(\`[Ignored] No reply rule triggered for comment: \${commentId}\`);
        return;
      }

      const isHandoff = replyRaw.includes('[HANDOFF]');
      const cleanReply = replyRaw.replace(/\\[HANDOFF\\]/g, '').trim();

      // Post reply to Facebook / Instagram via Graph API
      await fetch(\`https://graph.facebook.com/v19.0/\${commentId}/comments\`, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${process.env.PAGE_ACCESS_TOKEN}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: cleanReply })
      });

      // If handoff, notify human support team (Slack / CRM / WhatsApp)
      if (isHandoff) {
        await notifyHumanSupport({
          customer: customerName,
          commentId,
          comment: customerMessage,
          botReply: cleanReply
        });
      }
    } catch (err) {
      console.error('Error replying to comment:', err);
    }
  }
});`;

  const nodeWhatsappCode = `// WhatsApp Cloud API Webhook Handler
import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

app.post('/whatsapp-webhook', async (req, res) => {
  res.sendStatus(200);

  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!message || message.type !== 'text') return;

  const fromNumber = message.from;
  const customerText = message.text.body;

  const userPrompt = [
    \`PLATFORM: WhatsApp\`,
    \`EVENT_TYPE: Direct Message\`,
    \`CUSTOMER_NAME: عميل واتساب\`,
    \`ORIGINAL_POST: لا يوجد\`,
    \`PARENT_COMMENT: لا يوجد\`,
    \`CUSTOMER_TEXT: \${customerText}\`,
    \`CONVERSATION_HISTORY: لا يوجد\`
  ].join('\\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: userPrompt,
    config: {
      systemInstruction: process.env.SYSTEM_INSTRUCTION,
      temperature: 0.3,
    }
  });

  const replyRaw = response.text?.trim() || '';
  if (replyRaw.includes('[NO_REPLY]')) return;

  const cleanReply = replyRaw.replace(/\\[HANDOFF\\]/g, '').trim();

  // Send WhatsApp message back
  await fetch(\`https://graph.facebook.com/v19.0/\${process.env.PHONE_NUMBER_ID}/messages\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.WHATSAPP_TOKEN}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: fromNumber,
      text: { body: cleanReply }
    })
  });
});`;

  const pythonFastapiCode = `# Python FastAPI Implementation
# pip install google-genai fastapi uvicorn
from fastapi import FastAPI, Request
from google import genai
import os

app = FastAPI()
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

SYSTEM_INSTRUCTION = """... (نص البرومبت المترجم) ..."""

@app.post("/api/respond")
async def respond(data: dict):
    user_prompt = f"""PLATFORM: {data.get('platform', 'Facebook')}
EVENT_TYPE: {data.get('event_type', 'Public Comment')}
CUSTOMER_NAME: {data.get('customer_name', 'العميل')}
ORIGINAL_POST: {data.get('original_post', 'لا يوجد')}
PARENT_COMMENT: {data.get('parent_comment', 'لا يوجد')}
CUSTOMER_TEXT: {data.get('customer_text', '')}
CONVERSATION_HISTORY: {data.get('conversation_history', 'لا يوجد')}"""

    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=user_prompt,
        config=genai.types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            temperature=0.3
        )
    )

    raw_text = response.text.strip()
    is_no_reply = "[NO_REPLY]" in raw_text
    is_handoff = "[HANDOFF]" in raw_text
    clean_text = raw_text.replace("[HANDOFF]", "").replace("[NO_REPLY]", "").strip()

    return {
        "raw": raw_text,
        "clean_text": clean_text,
        "is_no_reply": is_no_reply,
        "is_handoff": is_handoff
    }`;

  const currentCode =
    activeSnippet === 'node-meta'
      ? nodeMetaCode
      : activeSnippet === 'node-whatsapp'
      ? nodeWhatsappCode
      : pythonFastapiCode;

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              الربط البرمجي والويب هوك (Webhooks & Production Integration)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              أكواد جاهزة للربط مع Meta Graph API (فيسبوك وإنستغرام) و WhatsApp Business API للرد التلقائي على التعليقات والرسائل فور وصولها.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'تم النسخ!' : 'نسخ الكود'}</span>
        </button>
      </div>

      {/* Snippet selector tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveSnippet('node-meta')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition ${
            activeSnippet === 'node-meta'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Node.js / Express — Meta (Facebook & Instagram)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSnippet('node-whatsapp')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition ${
            activeSnippet === 'node-whatsapp'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Node.js / Express — WhatsApp Cloud API</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSnippet('python-fastapi')}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition ${
            activeSnippet === 'python-fastapi'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Python — FastAPI Endpoint</span>
        </button>
      </div>

      {/* Code Display */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{activeSnippet === 'python-fastapi' ? 'main.py' : 'webhook.js'}</span>
          <span>UTF-8</span>
        </div>
        <pre className="p-5 text-xs text-slate-200 font-mono leading-relaxed overflow-x-auto whitespace-pre selection:bg-emerald-500 selection:text-white" dir="ltr">
          {currentCode}
        </pre>
      </div>
    </div>
  );
};
