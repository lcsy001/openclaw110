import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "OpenClaw - Open Source AI Assistant Framework | Multi-Platform Messaging",
  description: "OpenClaw is an open-source AI assistant framework with multi-platform messaging (Telegram, Discord, WhatsApp, Feishu), skill system, and memory management. Build your personalized AI assistant easily.",
  keywords: ["OpenClaw", "AI Assistant", "AI Framework", "Open Source AI", "Artificial Intelligence", "AI Chatbot", "LLM", "Large Language Model", "ChatGPT", "AI Customer Service", "Conversational AI", "AI Development Framework", "Open Source Framework", "Telegram bot", "Discord bot", "Multi-platform messaging", "AI automation"],
  openGraph: {
    title: "OpenClaw - Open Source AI Assistant Framework",
    description: "Build personalized AI assistants with multi-platform messaging support",
    type: "website",
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no">
      <head>
        <link rel="alternate" hrefLang="en" href="https://docs.openclaw.ai/en" />
        <link rel="alternate" hrefLang="zh-CN" href="https://docs.openclaw.ai" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
