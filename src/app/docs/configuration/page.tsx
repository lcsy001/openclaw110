"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Settings, Server, Bot, Puzzle, Shield, Database } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

const modelProvidersEN = [
  { name: "openai", models: "gpt-4o, gpt-4o-mini, gpt-4-turbo", desc: "OpenAI Official API" },
  { name: "anthropic", models: "claude-3-5-sonnet, claude-3-opus", desc: "Anthropic Claude" },
  { name: "google", models: "gemini-pro, gemini-ultra", desc: "Google Gemini" },
  { name: "bailian", models: "qwen3.5-plus, kimi-k2.5, glm-5", desc: "Alibaba Cloud Bailian" },
  { name: "local", models: "llama2, mistral, codellama", desc: "Local Models (Ollama)" },
];

const modelProvidersZH = [
  { name: "openai", models: "gpt-4o, gpt-4o-mini, gpt-4-turbo", desc: "OpenAI 官方 API" },
  { name: "anthropic", models: "claude-3-5-sonnet, claude-3-opus", desc: "Anthropic Claude" },
  { name: "google", models: "gemini-pro, gemini-ultra", desc: "Google Gemini" },
  { name: "bailian", models: "qwen3.5-plus, kimi-k2.5, glm-5", desc: "阿里云百炼" },
  { name: "local", models: "llama2, mistral, codellama", desc: "本地模型 (Ollama)" },
];

export default function ConfigurationPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const modelProviders = lang === "en" ? modelProvidersEN : modelProvidersZH;

  return (
    <DocLayout>
      <h1>{t("config.title")}</h1>
      
      <p>{t("config.desc")}</p>

      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          {t("config.configAsCode")}
        </h3>
        <p className="text-cyan-100">
          {t("config.configAsCodeDesc")}
        </p>
      </div>

      <h2>{t("config.fullExample")}</h2>
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`# ============================================
# OpenClaw Configuration File
# ============================================

# Messaging Platform Configuration
providers:
  telegram:
    enabled: true
    token: \${TELEGRAM_BOT_TOKEN}
    
  discord:
    enabled: false
    token: \${DISCORD_BOT_TOKEN}
    
  feishu:
    enabled: true
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}

# AI Agent Configuration
agents:
  default:
    model: bailian/kimi-k2.5
    temperature: 0.7
    max_tokens: 2000
    system_prompt: |
      You are a helpful AI assistant.

# Skills Configuration
skills:
  - weather
  - web_search
  - calculator
  - reminder

# Memory System Configuration
memory:
  enabled: true
  storage: file
  path: ./memory
  auto_extract: true

# Logging Configuration
logging:
  level: info
  file: logs/openclaw.log`} 
      />

      <h2>{t("config.details")}</h2>

      <h3><Server className="w-5 h-5 inline mr-2" />{t("config.providers")}</h3>
      <p>{t("config.providersDesc")}</p>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-slate-900">Telegram</h4>
          <p className="text-slate-600 text-sm mt-1">{t("config.telegramDesc")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
          <h4 className="font-semibold text-slate-900">Discord</h4>
          <p className="text-slate-600 text-sm mt-1">{t("config.discordDesc")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-slate-900">Feishu/Lark</h4>
          <p className="text-slate-600 text-sm mt-1">{t("config.feishuDesc")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-slate-900">WhatsApp</h4>
          <p className="text-slate-600 text-sm mt-1">{t("config.whatsappDesc")}</p>
        </div>
      </div>

      <h3><Bot className="w-5 h-5 inline mr-2" />{t("config.agents")}</h3>
      <p>{t("config.agentsDesc")}</p>
      
      <CodeBlock 
        language="yaml"
        code={`agents:
  default:
    # Model selection, format: provider/model_name
    model: bailian/kimi-k2.5
    
    # Creativity level (0-2), higher = more random
    temperature: 0.7
    
    # Maximum response length
    max_tokens: 2000
    
    # Context window size (conversation history retention rounds)
    context_window: 10
    
    # System prompt, defines assistant role and behavior
    system_prompt: |
      You are OpenClaw assistant, an intelligent and friendly AI.
      You excel at helping users complete various tasks.
      
    # List of enabled skills
    skills:
      - weather
      - web_search`} 
      />

      <h4>{t("config.supportedModels")}</h4>
      <div className="bg-slate-50 rounded-xl overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">{t("config.provider")}</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">{t("config.exampleModels")}</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">{t("config.description")}</th>
            </tr>
          </thead>
          <tbody>
            {modelProviders.map((provider, idx) => (
              <tr key={idx} className="border-t border-slate-200">
                <td className="px-4 py-3 font-mono text-slate-800">{provider.name}</td>
                <td className="px-4 py-3 text-slate-600">{provider.models}</td>
                <td className="px-4 py-3 text-slate-600">{provider.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3><Puzzle className="w-5 h-5 inline mr-2" />{t("config.skills")}</h3>
      <p>{t("config.skillsDesc")}</p>
      
      <CodeBlock 
        language="yaml"
        code={`skills:
  # Simple enable (use default config)
  - weather
  - web_search
  - calculator
  
  # Skill with custom config
  - name: reminder
    config:
      storage: memory
      
  # Locally developed skill
  - ./skills/my-custom-skill`} 
      />

      <h3><Database className="w-5 h-5 inline mr-2" />{t("config.memory")}</h3>
      <CodeBlock 
        language="yaml"
        code={`memory:
  enabled: true
  storage: file           # file, sqlite, redis
  path: ./memory          # storage path
  auto_extract: true      # auto extract key information
  
  # Memory retrieval config
  retrieval:
    max_results: 5
    similarity_threshold: 0.7`} 
      />

      <h3><Shield className="w-5 h-5 inline mr-2" />{t("config.security")}</h3>
      <CodeBlock 
        language="yaml"
        code={`security:
  # List of allowed users (optional)
  allowed_users:
    - user_id_1
    - user_id_2
  
  # Sensitive word filtering
  content_filter:
    enabled: true
    block_list:
      - "sensitive_word_1"
      - "sensitive_word_2"`} 
      />

      <h2>{t("config.envVars")}</h2>
      <p>{t("config.envVarsDesc")}</p>
      
      <CodeBlock 
        filename=".env"
        code={`# AI Model API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
BAILIAN_API_KEY=sk-sp-...

# Messaging Platform Tokens
TELEGRAM_BOT_TOKEN=123456:ABC...
DISCORD_BOT_TOKEN=...
FEISHU_APP_ID=cli_...
FEISHU_APP_SECRET=...

# Other Services
SEARCH_API_KEY=...       # Search skill
WEATHER_API_KEY=...      # Weather skill`} 
      />

      <h2>{t("config.multiEnv")}</h2>
      <p>{t("config.multiEnvDesc")}</p>
      
      <CodeBlock 
        code={`# Development environment
openclaw start --config config.dev.yaml

# Test environment
openclaw start --config config.test.yaml

# Production environment
openclaw start --config config.prod.yaml`} 
      />

      <h2>{t("config.validation")}</h2>
      <p>{t("config.validationDesc")}</p>
      
      <CodeBlock code="openclaw validate" />

      <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-r-lg">
        <h4 className="font-semibold text-green-900 mb-2">✅ {t("config.validationPass")}</h4>
        <p className="text-green-800 text-sm">
          {t("config.validationPassDesc")}
        </p>
      </div>

      <h2>{t("config.hotReload")}</h2>
      <p>{t("config.hotReloadDesc")}</p>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <h4 className="font-semibold text-yellow-900 mb-2">⚠️ {t("config.note")}</h4>
        <p className="text-yellow-800 text-sm">
          {t("config.noteDesc")}
        </p>
      </div>

      <h2>{t("config.templates")}</h2>
      <p>{t("config.templatesDesc")}</p>
      
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">{t("config.template1")}</h4>
          <p className="text-slate-600 text-sm">{t("config.template1Desc")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">{t("config.template2")}</h4>
          <p className="text-slate-600 text-sm">{t("config.template2Desc")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">{t("config.template3")}</h4>
          <p className="text-slate-600 text-sm">{t("config.template3Desc")}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-blue-900 mb-2">💡 {t("config.tips")}</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• {t("config.tip1")}</li>
          <li>• {t("config.tip2")}</li>
          <li>• {t("config.tip3")}</li>
          <li>• {t("config.tip4")}</li>
        </ul>
      </div>
    </DocLayout>
  );
}
