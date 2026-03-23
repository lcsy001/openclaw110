"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Terminal, Command, Package, GitBranch, Cpu, Globe, Search, Globe2, Image, FileText, MessageSquare, Users, Clock, Layers } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

const cliCommandsEN = [
  { cmd: "openclaw init [name]", desc: "Initialize new workspace" },
  { cmd: "openclaw start", desc: "Start service" },
  { cmd: "openclaw stop", desc: "Stop service" },
  { cmd: "openclaw status", desc: "Check runtime status" },
  { cmd: "openclaw validate", desc: "Validate configuration file" },
  { cmd: "openclaw logs", desc: "View logs" },
];

const cliCommandsZH = [
  { cmd: "openclaw init [name]", desc: "初始化新工作区" },
  { cmd: "openclaw start", desc: "启动服务" },
  { cmd: "openclaw stop", desc: "停止服务" },
  { cmd: "openclaw status", desc: "查看运行状态" },
  { cmd: "openclaw validate", desc: "验证配置文件" },
  { cmd: "openclaw logs", desc: "查看日志" },
];

const gatewayCommandsEN = [
  { cmd: "openclaw gateway status", desc: "Check Gateway status" },
  { cmd: "openclaw gateway start", desc: "Start Gateway" },
  { cmd: "openclaw gateway stop", desc: "Stop Gateway" },
  { cmd: "openclaw gateway restart", desc: "Restart Gateway" },
];

const gatewayCommandsZH = [
  { cmd: "openclaw gateway status", desc: "查看 Gateway 状态" },
  { cmd: "openclaw gateway start", desc: "启动 Gateway" },
  { cmd: "openclaw gateway stop", desc: "停止 Gateway" },
  { cmd: "openclaw gateway restart", desc: "重启 Gateway" },
];

const skillCommandsEN = [
  { cmd: "openclaw skill list", desc: "List installed skills" },
  { cmd: "openclaw skill install <name>", desc: "Install skill" },
  { cmd: "openclaw skill update <name>", desc: "Update skill" },
  { cmd: "openclaw skill remove <name>", desc: "Remove skill" },
];

const skillCommandsZH = [
  { cmd: "openclaw skill list", desc: "列出已安装技能" },
  { cmd: "openclaw skill install <name>", desc: "安装技能" },
  { cmd: "openclaw skill update <name>", desc: "更新技能" },
  { cmd: "openclaw skill remove <name>", desc: "移除技能" },
];

export default function ToolsPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const cliCommands = lang === "en" ? cliCommandsEN : cliCommandsZH;
  const gatewayCommands = lang === "en" ? gatewayCommandsEN : gatewayCommandsZH;
  const skillCommands = lang === "en" ? skillCommandsEN : skillCommandsZH;

  return (
    <DocLayout>
      <h1>{t("tools.title")}</h1>
      
      <p>{t("tools.desc")}</p>

      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          {t("tools.cliTools")}
        </h3>
        <p className="text-slate-300">
          {t("tools.cliToolsDesc")}
        </p>
      </div>

      <h2>{t("tools.basicCommands")}</h2>
      <div className="bg-slate-50 rounded-xl overflow-hidden my-6">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">{t("tools.command")}</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">{t("tools.description")}</th>
            </tr>
          </thead>
          <tbody>
            {cliCommands.map((item, idx) => (
              <tr key={idx} className="border-t border-slate-200">
                <td className="px-6 py-3 font-mono text-sm text-slate-800">{item.cmd}</td>
                <td className="px-6 py-3 text-slate-600">{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t("tools.advancedUsage")}</h3>
      <CodeBlock 
        code={`# Start with custom config
openclaw start --config config.prod.yaml

# Run in background
openclaw start --daemon

# Debug mode (verbose logs)
openclaw start --debug

# View real-time logs
openclaw logs -f

# Specify log level
openclaw logs --level debug`} 
      />

      <h2>{t("tools.gatewayManagement")}</h2>
      <p>{t("tools.gatewayManagementDesc")}</p>
      
      <div className="bg-slate-50 rounded-xl overflow-hidden my-6">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">{t("tools.command")}</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">{t("tools.description")}</th>
            </tr>
          </thead>
          <tbody>
            {gatewayCommands.map((item, idx) => (
              <tr key={idx} className="border-t border-slate-200">
                <td className="px-6 py-3 font-mono text-sm text-slate-800">{item.cmd}</td>
                <td className="px-6 py-3 text-slate-600">{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{t("tools.skillManagement")}</h2>
      
      <h3>{t("tools.installSkill")}</h3>
      <CodeBlock 
        code={`# Install official skill from npm
openclaw skill install @openclaw/weather

# Install from GitHub
openclaw skill install github:user/repo

# Install from local path
openclaw skill install ./my-custom-skill`} 
      />

      <h3>{t("tools.manageSkills")}</h3>
      <div className="bg-slate-50 rounded-xl overflow-hidden my-6">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">{t("tools.command")}</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">{t("tools.description")}</th>
            </tr>
          </thead>
          <tbody>
            {skillCommands.map((item, idx) => (
              <tr key={idx} className="border-t border-slate-200">
                <td className="px-6 py-3 font-mono text-sm text-slate-800">{item.cmd}</td>
                <td className="px-6 py-3 text-slate-600">{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{t("tools.sessionManagement")}</h2>
      <p>{t("tools.sessionManagementDesc")}</p>
      
      <CodeBlock 
        code={`# List all sessions
openclaw sessions list

# View session details
openclaw sessions info <session-id>

# Send message to session
openclaw sessions send <session-id> "Hello"

# End session
openclaw sessions kill <session-id>`} 
      />

      <h2>{t("tools.subAgents")}</h2>
      <p>{t("tools.subAgentsDesc")}</p>
      
      <CodeBlock 
        code={`# Create sub-agent session for specific task
openclaw subagent spawn --task "Analyze performance bottlenecks of this codebase"

# List active sub-agents
openclaw subagent list

# Send instruction to sub-agent
openclaw subagent steer <id> "Focus on memory usage"

# Terminate sub-agent
openclaw subagent kill <id>`} 
      />

      <h2>{t("tools.apiInterface")}</h2>
      <p>{t("tools.apiInterfaceDesc")}</p>
      
      <h3>{t("tools.sendMessage")}</h3>
      <CodeBlock 
        language="bash"
        code={`curl -X POST http://localhost:3000/api/v1/send \\
  -H "Content-Type: application/json" \\
  -d '{
    "session": "abc123",
    "message": "Hello"
  }'`} 
      />

      <h3>{t("tools.getHistory")}</h3>
      <CodeBlock 
        language="bash"
        code={`curl http://localhost:3000/api/v1/sessions/abc123/history`} 
      />

      <h3>{t("tools.executeSkill")}</h3>
      <CodeBlock 
        language="bash"
        code={`curl -X POST http://localhost:3000/api/v1/skills/weather/execute \\
  -H "Content-Type: application/json" \\
  -d '{
    "city": "Beijing"
  }'`} 
      />

      <h2>{t("tools.builtInTools")}</h2>
      <p>{t("tools.builtInToolsDesc")}</p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            web_search
          </h4>
          <p className="text-slate-600 text-sm">{t("tools.toolWebSearch")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Globe2 className="w-4 h-4" />
            web_fetch
          </h4>
          <p className="text-slate-600 text-sm">{t("tools.toolWebFetch")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Image className="w-4 h-4" />
            browser
          </h4>
          <p className="text-slate-600 text-sm">{t("tools.toolBrowser")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-orange-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            read / write / edit
          </h4>
          <p className="text-slate-600 text-sm">{t("tools.toolFile")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-pink-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            exec / process
          </h4>
          <p className="text-slate-600 text-sm">{t("tools.toolExec")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            message
          </h4>
          <p className="text-slate-600 text-sm">{t("tools.toolMessage")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            sessions_list / sessions_spawn
          </h4>
          <p className="text-slate-600 text-sm">{t("tools.toolSessions")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-teal-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            cron
          </h4>
          <p className="text-slate-600 text-sm">{t("tools.toolCron")}</p>
        </div>
      </div>

      <h3>{t("tools.toolConfig")}</h3>
      <p>{t("tools.toolConfigDesc")}</p>
      <CodeBlock 
        filename="openclaw.json"
        code={`{
  "tools": {
    "allow": ["web_search", "read", "write", "exec"],
    "deny": ["browser"],
    "profile": "coding"
  }
}`} 
      />

      <h3>{t("tools.toolGroups")}</h3>
      <p>{t("tools.toolGroupsDesc")}</p>
      <CodeBlock 
        code={`# Available tool groups
group:fs       → read, write, edit, apply_patch
group:runtime  → exec, bash, process
group:web      → web_search, web_fetch
group:ui       → browser, canvas
group:sessions → sessions_list, sessions_history, sessions_send, sessions_spawn
group:memory   → memory_search, memory_get
group:messaging → message

# Example config
{
  "tools": {
    "allow": ["group:fs", "group:web", "sessions_list"]
  }
}`} 
      />

      <h2>{t("tools.extensionDev")}</h2>
      
      <h3>{t("tools.customProvider")}</h3>
      <p>{t("tools.customProviderDesc")}</p>
      
      <CodeBlock 
        filename="providers/my-provider.js"
        code={`class MyProvider {
  constructor(config) {
    this.config = config;
  }
  
  async connect() {
    // Establish connection
    console.log('Connecting to messaging platform...');
  }
  
  async send(message) {
    // Send message
    await this.api.sendMessage(message);
  }
  
  async onMessage(callback) {
    // Receive messages
    this.api.on('message', callback);
  }
}

module.exports = MyProvider;`} 
      />

      <h3>{t("tools.hookSystem")}</h3>
      <p>{t("tools.hookSystemDesc")}</p>
      
      <CodeBlock 
        filename="hooks.js"
        code={`module.exports = {
  // Before receiving message
  beforeReceive: async (message) => {
    // Filter or modify message
    if (message.text.includes('sensitive')) {
      return null; // Block message
    }
    return message;
  },
  
  // Before sending reply
  beforeSend: async (reply) => {
    // Format reply
    reply.text = reply.text.trim();
    return reply;
  },
  
  // Error handling
  onError: async (error) => {
    // Log or notify
    console.error('Error occurred:', error);
  }
};`} 
      />

      <h2>{t("tools.loopDetection")}</h2>
      <p>{t("tools.loopDetectionDesc")}</p>
      <CodeBlock 
        filename="openclaw.json"
        code={`{
  "tools": {
    "loopDetection": {
      "enabled": true,
      "warningThreshold": 10,
      "criticalThreshold": 20,
      "detectors": {
        "genericRepeat": true,
        "knownPollNoProgress": true,
        "pingPong": true
      }
    }
  }
}`} 
      />

      <h2>{t("tools.pluginPublish")}</h2>
      <p>{t("tools.pluginPublishDesc")}</p>
      
      <CodeBlock 
        filename="my-plugin/"
        code={`my-plugin/
├── package.json       # Plugin metadata
│   {
│     "name": "@yourname/my-plugin",
│     "version": "1.0.0",
│     "main": "index.js"
│   }
├── index.js           # Entry file
├── SKILL.md           # Skill definition (optional)
└── README.md          # Usage documentation`} 
      />

      <h3>{t("tools.publishSteps")}</h3>
      <ol className="space-y-2">
        <li>{t("tools.step1")}</li>
        <li>{t("tools.step2")}</li>
        <li>{t("tools.step3")}</li>
        <li>{t("tools.step4")}</li>
        <li>{t("tools.step5")}</li>
      </ol>

      <h2>{t("tools.clawHub")}</h2>
      <p>{t("tools.clawHubDesc")}</p>
      <CodeBlock 
        code={`# Browse available skills
openclaw hub search

# Install community skill
openclaw hub install weather-plus

# View skill details
openclaw hub info weather-plus`} 
      />

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          {t("tools.joinCommunity")}
        </h4>
        <p className="text-slate-700 text-sm">
          {t("tools.joinCommunityDesc")}
        </p>
      </div>
    </DocLayout>
  );
}
