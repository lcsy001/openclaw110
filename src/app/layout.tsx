import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenClaw - 开源智能助手框架 | 多平台消息 AI 助手",
  description: "OpenClaw 是一个开源的智能助手框架，支持 Telegram、Discord、WhatsApp、飞书等多平台消息接入，提供技能系统、记忆管理功能，轻松打造个性化 AI 助手。",
  keywords: ["OpenClaw", "智能助手", "AI助手", "AI框架", "开源AI", "人工智能", "AI聊天机器人", "大语言模型", "LLM", "ChatGPT", "智能客服", "对话AI", "Telegram bot", "Discord bot", "多平台消息", "AI开发框架", "开源框架", "AI自动化"],
  openGraph: {
    title: "OpenClaw - 开源智能助手框架",
    description: "轻松打造个性化的 AI 助手，支持多平台消息接入",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" translate="no">
      <head>
        <link rel="alternate" hrefLang="en" href="https://docs.openclaw.ai/en" />
        <link rel="alternate" hrefLang="zh-CN" href="https://docs.openclaw.ai" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
