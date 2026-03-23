import type { Metadata } from "next";
import "./globals.css";

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export async function generateMetadata({ params }: { params: { lang?: string } }): Promise<Metadata> {
  const lang = params.lang || "zh";
  const isEnglish = lang === "en";
  
  return {
    title: isEnglish 
      ? "OpenClaw - Open Source AI Assistant Framework | Multi-Platform Messaging AI" 
      : "OpenClaw - 开源智能助手框架 | 多平台消息 AI 助手",
    description: isEnglish
      ? "OpenClaw is an open-source AI assistant framework. Supporting multi-platform messaging (Telegram, Discord, WhatsApp, Feishu), skill systems, and memory management, easily create personalized AI assistants."
      : "OpenClaw 是一个开源的智能助手框架，支持 Telegram、Discord、WhatsApp、飞书等多平台消息接入，提供技能系统、记忆管理功能，轻松打造个性化 AI 助手。",
    keywords: isEnglish
      ? ["OpenClaw", "AI Assistant", "AI Framework", "Open Source AI", "AI", "LLM", "ChatGPT", "Telegram bot", "Discord bot", "Multi-platform Messaging", "AI Development Framework"]
      : ["OpenClaw", "智能助手", "AI助手", "AI框架", "开源AI", "人工智能", "AI聊天机器人", "大语言模型", "LLM", "ChatGPT", "智能客服", "对话AI", "Telegram bot", "Discord bot", "多平台消息", "AI开发框架", "开源框架", "AI自动化"],
    openGraph: {
      title: isEnglish ? "OpenClaw - Open Source AI Assistant Framework" : "OpenClaw - 开源智能助手框架",
      description: isEnglish 
        ? "Easily create personalized AI assistants with multi-platform messaging support" 
        : "轻松打造个性化的 AI 助手，支持多平台消息接入",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang?: string };
}>) {
  const lang = params.lang || "zh";
  
  return (
    <html lang={lang} translate="no">
      <head>
        <link rel="alternate" hrefLang="en" href="https://openclaw110.com/en" />
        <link rel="alternate" hrefLang="zh-CN" href="https://openclaw110.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
