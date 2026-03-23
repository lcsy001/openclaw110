"use client";

import DocLayout from "../../../../components/DocLayout";
import CodeBlock from "../../../../components/CodeBlock";
import { Users, Split, Shield, MessageSquare, GitBranch, Settings } from "lucide-react";

export default function MultiAgentPage() {
  const features = [
    { icon: Users, title: "Workspace Isolation", desc: "Each workspace has its own sessions and memory" },
    { icon: GitBranch, title: "Per-Sender Sessions", desc: "Each user gets their own conversation context" },
    { icon: Split, title: "Agent Routing", desc: "Route messages to different agents based on rules" },
    { icon: Shield, title: "Isolation", desc: "Prevent cross-workspace data leakage" },
  ];

  return (
    <DocLayout>
      <h1>Multi-Agent Routing</h1>
      
      <p>OpenClaw supports multiple agents with workspace isolation and per-sender sessions.</p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">Use Cases</h4>
            <p className="text-blue-800 text-sm mt-1">
              Multi-agent routing is useful for: separating work/personal contexts, team collaboration with different agents, and isolating sensitive conversations.
            </p>
          </div>
        </div>
      </div>

      <h2>Session Modes</h2>
      
      <h3>Shared Session</h3>
      <p>All users share the same conversation context:</p>
      <CodeBlock code={`{
  "agents": {
    "defaults": {
      "session": {
        "mode": "shared"
      }
    }
  }
}`} />

      <h3>Per-Sender Session</h3>
      <p>Each user gets their own conversation context:</p>
      <CodeBlock code={`{
  "agents": {
    "defaults": {
      "session": {
        "mode": "per-sender"
      }
    }
  }
}`} />

      <h3>Isolated per Workspace</h3>
      <p>Each workspace has completely isolated sessions:</p>
      <CodeBlock code={`{
  "agents": {
    "defaults": {
      "session": {
        "mode": "per-workspace"
      }
    }
  }
}`} />

      <h2>Routing Rules</h2>
      
      <p>Route messages to different agents based on various criteria:</p>

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

      <h2>Agent Configuration</h2>
      
      <p>Configure multiple agents with different settings:</p>

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

      <h2>Workspace Isolation</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <feature.icon className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-900">
                {feature.title}
              </h4>
            </div>
            <p className="text-slate-600 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      <h3>Memory Isolation</h3>
      <p>Each workspace has its own memory file:</p>
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

      <h2>CLI Commands</h2>
      
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
            <h4 className="font-semibold text-yellow-900">Note</h4>
            <p className="text-yellow-800 text-sm mt-1">
              Different session modes have different resource implications. Per-sender mode uses more memory but provides better personalization.
            </p>
          </div>
        </div>
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
