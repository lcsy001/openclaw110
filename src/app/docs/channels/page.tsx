"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { MessageCircle, Send, Users, Shield, Zap, MessageSquare, Hash } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function ChannelsPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const channels = [
    { name: "Telegram", icon: "📱", desc: "Fastest setup, simple bot token", descZh: "设置最快，简单 bot token", status: "✅ Recommended" },
    { name: "WhatsApp", icon: "💬", desc: "Most popular, QR pairing required", descZh: "最受欢迎，需要 QR 配对", status: "✅ Supported" },
    { name: "Discord", icon: "🎮", desc: "Servers, channels, and DMs", descZh: "服务器、频道和私信", status: "✅ Supported" },
    { name: "iMessage", icon: "🍎", desc: "BlueBubbles server required", descZh: "需要 BlueBubbles 服务器", status: "✅ Supported" },
    { name: "Feishu", icon: "🏢", desc: "Enterprise chat (飞书)", descZh: "企业通讯", status: "✅ Supported" },
    { name: "Slack", icon: "💼", desc: "Enterprise workspace apps", descZh: "企业工作区应用", status: "🔌 Plugin" },
    { name: "Microsoft Teams", icon: "👥", desc: "Enterprise bot framework", descZh: "企业 bot 框架", status: "🔌 Plugin" },
    { name: "Signal", icon: "🔒", desc: "Privacy-focused messaging", descZh: "注重隐私的通讯", status: "🔌 Plugin" },
    { name: "Mattermost", icon: "🏗️", desc: "Self-hosted enterprise chat", descZh: "自托管企业通讯", status: "🔌 Plugin" },
    { name: "LINE", icon: "📱", desc: "Japan/Thailand popular messenger", descZh: "日本/泰国流行的通讯应用", status: "🔌 Plugin" },
  ];

  return (
    <DocLayout>
      <h1>{lang === "en" ? "Messaging Channels" : "消息通道"}</h1>
      
      <p>{lang === "en"
        ? "OpenClaw can connect to multiple messaging platforms simultaneously. Each channel operates independently."
        : "OpenClaw 可以同时连接多个消息平台。每个通道独立运行。"}
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">{lang === "en" ? "Quick Start" : "快速开始"}</h4>
            <p className="text-blue-800 text-sm mt-1">
              {lang === "en"
                ? "Telegram is usually the fastest to set up - just create a bot and get the token."
                : "Telegram 通常设置最快 - 只需创建一个 bot 并获取 token。"}
            </p>
          </div>
        </div>
      </div>

      <h2>{lang === "en" ? "Supported Channels" : "支持的通道"}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {channels.map((channel, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{channel.icon}</span>
                <h4 className="font-semibold text-slate-900">{channel.name}</h4>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                {channel.status}
              </span>
            </div>
            <p className="text-slate-600 text-sm">
              {lang === "en" ? channel.desc : channel.descZh}
            </p>
          </div>
        ))}
      </div>

      <h2>{lang === "en" ? "Telegram Setup" : "Telegram 设置"}</h2>
      
      <h3>{lang === "en" ? "Step 1: Create a Bot" : "步骤1：创建 Bot"}</h3>
      <p>{lang === "en"
        ? "Chat with @BotFather on Telegram to create a new bot:"
        : "在 Telegram 上与 @BotFather 聊天来创建新 bot："}
      </p>
      <CodeBlock code={`# Send this to @BotFather:
/newbot

# Follow the prompts to name your bot
# You'll get a bot token like: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`} />

      <h3>{lang === "en" ? "Step 2: Configure OpenClaw" : "步骤2：配置 OpenClaw"}</h3>
      <CodeBlock code={`{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR-BOT-TOKEN",
      "allowFrom": ["*"],
      "groups": {
        "*": {
          "requireMention": false
        }
      }
    }
  }
}`} />

      <h3>{lang === "en" ? "Step 3: Start Gateway" : "步骤3：启动 Gateway"}</h3>
      <CodeBlock code="openclaw gateway" />

      <h2>{lang === "en" ? "WhatsApp Setup" : "WhatsApp 设置"}</h2>
      
      <p>{lang === "en"
        ? "WhatsApp requires QR code pairing. Run the following command:"
        : "WhatsApp 需要 QR 码配对。运行以下命令："}
      </p>

      <CodeBlock code={`# Start WhatsApp pairing
openclaw channels login whatsapp

# You'll see a QR code to scan with your phone`} />

      <h2>{lang === "en" ? "Group Chats" : "群聊"}</h2>
      
      <p>{lang === "en"
        ? "Configure how OpenClaw behaves in group chats:"
        : "配置 OpenClaw 在群聊中的行为："}
      </p>

      <CodeBlock code={`{
  "channels": {
    "telegram": {
      "groups": {
        "*": {
          "requireMention": true
        },
        "-100123456789": {
          "requireMention": false
        }
      }
    }
  }
}`} />

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">{lang === "en" ? "Security" : "安全"}</h4>
            <ul className="text-yellow-800 text-sm mt-1 space-y-1">
              <li>• {lang === "en" ? "Use allowFrom to restrict who can message" : "使用 allowFrom 限制谁可以发消息"}</li>
              <li>• {lang === "en" ? "Enable requireMention for groups" : "为群组启用 requireMention"}</li>
              <li>• {lang === "en" ? "Review security settings regularly" : "定期检查安全设置"}</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>{lang === "en" ? "Configuration Options" : "配置选项"}</h2>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full bg-white border border-slate-200 rounded-lg">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900 border-b">Option</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">enabled</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">
                {lang === "en" ? "Enable or disable this channel" : "启用或禁用此通道"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">allowFrom</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">
                {lang === "en" ? "List of allowed users/chats (use * for all)" : "允许的用户/聊天列表（* 表示所有）"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">groups.requireMention</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">
                {lang === "en" ? "Require @mention in groups" : "在群组中需要 @提及"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600">dmPolicy</td>
              <td className="px-4 py-2 text-sm text-slate-600">
                {lang === "en" ? "DM policy: open, allowlist, or deny" : "私信策略：open、allowlist 或 deny"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <a 
          href={lang === "en" ? "/en/docs/configuration" : "/docs/configuration"}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {lang === "en" ? "← Back to Configuration" : "← 返回配置"}
        </a>
      </div>
    </DocLayout>
  );
}
