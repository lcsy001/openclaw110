"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Users, Split, Shield, MessageSquare, GitBranch, Settings } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function MultiAgentPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const features = [
    { icon: Users, title: "Workspace Isolation", titleZh: "工作空间隔离", desc: "Each workspace has its own sessions and memory", descZh: "每个工作空间有自己的会话和记忆" },
    { icon: GitBranch, title: "Per-Sender Sessions", titleZh: "按发送者会话", desc: "Each user gets their own conversation context", descZh: "每个用户有自己的对话上下文" },
    { icon: Split, title: "Agent Routing", titleZh: "代理路由", desc: "Route messages to different agents based on rules", descZh: "根据规则将消息路由到不同的代理" },
    { icon: Shield, title: "Isolation", titleZh: "隔离", desc: "Prevent cross-workspace data leakage", descZh: "防止跨工作空间数据泄露" },
  ];

  return (
    <DocLayout>
      <h1>{lang === "en" ? "Multi-Agent Routing" : "多代理路由"}</h1>
      
      <p>{lang === "en"
        ? "OpenClaw supports multiple agents with workspace isolation and per-sender sessions."
        : "OpenClaw 支持多个代理，具有工作空间隔离和按发送者会话功能。"}
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">{lang === "en" ? "Use Cases" : "使用场景"}</h4>
            <p className="text-blue-800 text-sm mt-1">
              {lang === "en"
                ? "Multi-agent routing is useful for: separating work/personal contexts, team collaboration with different agents, and isolating sensitive conversations."
                : "多代理路由适用于：分离工作/个人上下文、团队协作使用不同代理、隔离敏感对话。"}
            </p>
          </div>
        </div>
      </div>

      <h2>{lang === "en" ? "Session Modes" : "会话模式"}</h2>
      
      <h3>{lang === "en" ? "Shared Session" : "共享会话"}</h3>
      <p>{lang === "en"
        ? "All users share the same conversation context:"
        : "所有用户共享相同的对话上下文："}</p>
      <CodeBlock code={`{
  "agents": {
    "defaults": {
      "session": {
        "mode": "shared"
      }
    }
  }
}`} />

      <h3>{lang === "en" ? "Per-Sender Session" : "按发送者会话"}</h3>
      <p>{lang === "en"
        ? "Each user gets their own conversation context:"
        : "每个用户有自己的对话上下文："}</p>
      <CodeBlock code={`{
  "agents": {
    "defaults": {
      "session": {
        "mode": "per-sender"
      }
    }
  }
}`} />

      <h3>{lang === "en" ? "Isolated per Workspace" : "按工作空间隔离"}</h3>
      <p>{lang === "en"
        ? "Each workspace has completely isolated sessions:"
        : "每个工作空间有完全隔离的会话："}</p>
      <CodeBlock code={`{
  "agents": {
    "defaults": {
      "session": {
        "mode": "per-workspace"
      }
    }
  }
}`} />

      <h2>{lang === "en" ? "Routing Rules" : "路由规则"}</h2>
      
      <p>{lang === "en"
        ? "Route messages to different agents based on various criteria:"
        : "根据各种条件将消息路由到不同的代理："}</p>

      <CodeBlock code={`{
  "agents": {
    "routing": {
      "rules": [
        {
          "match": {
            "channel": "telegram"
          },
          "agent": "telegram-agent"
        },
        {
          "match": {
            "sender": ["+1555123456", "+1555987654"]
          },
          "agent": "premium-agent"
        },
        {
          "match": {
            "group": "-100123456789"
          },
          "agent": "group-agent"
        }
      ]
    }
  }
}`} />

      <h2>{lang === "en" ? "Agent Configuration" : "代理配置"}</h2>
      
      <p>{lang === "en"
        ? "Configure multiple agents with different settings:"
        : "配置具有不同设置的多个代理："}</p>

      <CodeBlock code={`{
  "agents": {
    "items": {
      "default": {
        "model": {
          "primary": "openai/gpt-4o"
        },
        "session": {
          "mode": "per-sender"
        }
      },
      "premium": {
        "model": {
          "primary": "openai/gpt-4-turbo",
          "fallbacks": ["openai/gpt-4o"]
        },
        "session": {
          "mode": "per-sender"
        }
      },
      "fast": {
        "model": {
          "primary": "openai/gpt-4o-mini"
        },
        "session": {
          "mode": "shared"
        }
      }
    }
  }
}`} />

      <h2>{lang === "en" ? "Workspace Isolation" : "工作空间隔离"}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <feature.icon className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-900">
                {lang === "en" ? feature.title : feature.titleZh}
              </h4>
            </div>
            <p className="text-slate-600 text-sm">
              {lang === "en" ? feature.desc : feature.descZh}
            </p>
          </div>
        ))}
      </div>

      <h3>{lang === "en" ? "Memory Isolation" : "记忆隔离"}</h3>
      <p>{lang === "en"
        ? "Each workspace has its own memory file:"
        : "每个工作空间有自己的记忆文件："}</p>
      <CodeBlock code={`workspace/
├── agent-default/
│   └── memory/
│       └── MEMORY.md
├── team-alpha/
│   └── memory/
│       └── MEMORY.md
└── team-beta/
    └── memory/
        └── MEMORY.md`} />

      <h2>{lang === "en" ? "CLI Commands" : "CLI 命令"}</h2>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full bg-white border border-slate-200 rounded-lg">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900 border-b">Command</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-900 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw sessions list</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">List all sessions</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw sessions kill</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">Terminate a session</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">openclaw agents list</td>
              <td className="px-4 py-2 text-sm text-slate-600 border-b">List configured agents</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-slate-600">openclaw agents switch</td>
              <td className="px-4 py-2 text-sm text-slate-600">Switch to a different agent</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Settings className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">{lang === "en" ? "Note" : "注意"}</h4>
            <p className="text-yellow-800 text-sm mt-1">
              {lang === "en"
                ? "Different session modes have different resource implications. Per-sender mode uses more memory but provides better personalization."
                : "不同的会话模式有不同的资源影响。按发送者模式使用更多内存但提供更好的个性化。"}
            </p>
          </div>
        </div>
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
