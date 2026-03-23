"use client";

import DocLayout from "../../../../components/DocLayout";
import CodeBlock from "../../../../components/CodeBlock";
import { MessageCircle, Send, Users, Shield, Zap, MessageSquare, Hash } from "lucide-react";

export default function ChannelsPage() {
  const channels = [
    { name: "Telegram", icon: "📱", desc: "Fastest setup, simple bot token", status: "✅ Recommended" },
    { name: "WhatsApp", icon: "💬", desc: "Most popular, QR pairing required", status: "✅ Supported" },
    { name: "Discord", icon: "🎮", desc: "Servers, channels, and DMs", status: "✅ Supported" },
    { name: "iMessage", icon: "🍎", desc: "BlueBubbles server required", status: "✅ Supported" },
    { name: "Feishu", icon: "🏢", desc: "Enterprise chat (飞书)", status: "✅ Supported" },
    { name: "Slack", icon: "💼", desc: "Enterprise workspace apps", status: "🔌 Plugin" },
    { name: "Microsoft Teams", icon: "👥", desc: "Enterprise bot framework", status: "🔌 Plugin" },
    { name: "Signal", icon: "🔒", desc: "Privacy-focused messaging", status: "🔌 Plugin" },
    { name: "Mattermost", icon: "🏗️", desc: "Self-hosted enterprise chat", status: "🔌 Plugin" },
    { name: "LINE", icon: "📱", desc: "Japan/Thailand popular messenger", status: "🔌 Plugin" },
  ];

  return (
    <DocLayout>
      <h1>Messaging Channels</h1>
      
      <p>OpenClaw can connect to multiple messaging platforms simultaneously. Each channel operates independently.</p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Quick Start</h4>
            <p className="text-blue-800 text-sm mt-1">
              Telegram is usually the fastest to set up - just create a bot and get the token.
            </p>
          </div>
        </div>
      </div>

      <h2>Supported Channels</h2>
      
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
              {channel.desc}
            </p>
          </div>
        ))}
      </div>

      <h2>Telegram Setup</h2>
      
      <h3>Step 1: Create a Bot</h3>
      <p>Chat with @BotFather on Telegram to create a new bot:</p>
      <CodeBlock code={`# Send this to @BotFather:
/newbot

# Follow the prompts to name your bot
# You'll get a bot token like: 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`} />

      <h3>Step 2: Configure OpenClaw</h3>
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

      <h3>Step 3: Start Gateway</h3>
      <CodeBlock code="openclaw gateway" />

      <h2>WhatsApp Setup</h2>
      
      <p>WhatsApp requires QR code pairing. Run the following command:</p>

      <CodeBlock code={`# Start WhatsApp pairing
openclaw channels login whatsapp

# You'll see a QR code to scan with your phone`} />

      <h2>Group Chats</h2>
      
      <p>Configure how OpenClaw behaves in group chats:</p>

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
            <h4 className="font-semibold text-yellow-900">Security</h4>
            <ul className="text-yellow-800 text-sm mt-1 space-y-1">
              <li>• Use allowFrom to restrict who can message</li>
              <li>• Enable requireMention for groups</li>
              <li>• Review security settings regularly</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Configuration Options</h2>
      
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
              <td className="px-4 py-2 text-sm text-slate-600 border-b">Enable or disable this channel</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">allowFrom</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">List of allowed users/chats (use * for all)</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">groups.requireMention</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">Require @mention in groups</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600">dmPolicy</td>
              <td className="px-4 py-2 text-sm text-slate-600">DM policy: open, allowlist, or deny</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <a 
          href="/en/docs/configuration"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          ← Back to Configuration
        </a>
      </div>
    </DocLayout>
  );
}
