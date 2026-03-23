"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { MessageSquare, Bot, Key, Rocket, CheckCircle, AlertTriangle } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function QuickStartPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  return (
    <DocLayout>
      <h1>{t("quickstart.title")}</h1>
      
      <p>{t("quickstart.desc")}</p>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          {t("quickstart.goal")}
        </h3>
        <p className="text-blue-100">
          {t("quickstart.goalDesc")}
        </p>
      </div>

      <h2>{t("quickstart.step1")}</h2>
      
      <div className="space-y-4 my-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">1</div>
          <div>
            <p className="text-slate-700" dangerouslySetInnerHTML={{ __html: t("quickstart.step1_1") }} />
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">2</div>
          <div>
            <p className="text-slate-700">{t("quickstart.step1_2")}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">3</div>
          <div>
            <p className="text-slate-700">{t("quickstart.step1_3")}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-green-600">4</div>
          <div>
            <p className="text-slate-700"><strong>{t("quickstart.step1_4")}</strong></p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">{t("quickstart.warning")}</h4>
            <p className="text-yellow-800 text-sm mt-1">
              {t("quickstart.warningDesc")}
            </p>
          </div>
        </div>
      </div>

      <h2>{t("quickstart.step2")}</h2>
      <p>{t("quickstart.step2Desc")}</p>
      
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`providers:
  telegram:
    enabled: true
    token: \${TELEGRAM_BOT_TOKEN}

agents:
  default:
    model: openai/gpt-4o-mini
    system_prompt: |
      You are a helpful AI assistant.
      
skills:
  - weather
  - web_search`} 
      />

      <h2>{t("quickstart.step3")}</h2>
      <p>{t("quickstart.step3Desc")}</p>
      
      <CodeBlock 
        filename=".env"
        code={`# Telegram Bot Token (required)
TELEGRAM_BOT_TOKEN=123456789:your_bot_token_here

# OpenAI API Key (if using OpenAI models)
OPENAI_API_KEY=sk-your_openai_key_here

# Anthropic API Key (optional, for Claude models)
ANTHROPIC_API_KEY=sk-your_anthropic_key_here`} 
      />

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            {t("quickstart.getOpenAI")}
          </h4>
          <p className="text-slate-600 text-sm">
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com</a>
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            {t("quickstart.getAnthropic")}
          </h4>
          <p className="text-slate-600 text-sm">
            <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a>
          </p>
        </div>
      </div>

      <h2>{t("quickstart.step4")}</h2>
      <p>{t("quickstart.step4Desc")}</p>
      
      <CodeBlock code="openclaw start" />

      <p>{t("quickstart.step4Success")}</p>
      
      <CodeBlock 
        code={`✓ Config loaded from ./config.yaml
✓ Skills loaded: weather, web_search
✓ Telegram provider connected (@YourBotName)
✓ Agent 'default' ready (model: openai/gpt-4o-mini)
🚀 OpenClaw is running!`} 
      />

      <h2>{t("quickstart.step5")}</h2>
      <p>{t("quickstart.step5Desc")}</p>
      
      <div className="bg-slate-50 p-6 rounded-xl my-6">
        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          {t("quickstart.testExamples")}
        </h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm">You</div>
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700">Hello! What can you do?</div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-slate-700">
              {t("quickstart.botResponse")}
            </div>
          </div>
        </div>
      </div>

      <h3>{t("quickstart.recommendedCommands")}</h3>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{t("quickstart.cmd1")}</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{t("quickstart.cmd2")}</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{t("quickstart.cmd3")}</span>
        </li>
      </ul>

      <h2>{t("quickstart.troubleshooting")}</h2>
      
      <h4>❌ {t("quickstart.issue1")}</h4>
      <div className="bg-red-50 p-4 rounded-lg my-4">
        <p className="text-slate-700 mb-2">{t("quickstart.issue1Fix")}</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>{t("quickstart.issue1_1")}</li>
          <li>{t("quickstart.issue1_2")}</li>
          <li>{t("quickstart.issue1_3")}</li>
        </ul>
      </div>

      <h4>❌ {t("quickstart.issue2")}</h4>
      <div className="bg-red-50 p-4 rounded-lg my-4">
        <p className="text-slate-700 mb-2">{t("quickstart.issue2Fix")}</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>{t("quickstart.issue2_1")}</li>
          <li>{t("quickstart.issue2_2")}</li>
          <li>{t("quickstart.issue2_3")}</li>
        </ul>
      </div>

      <h4>❌ {t("quickstart.issue3")}</h4>
      <div className="bg-red-50 p-4 rounded-lg my-4">
        <p className="text-slate-700 mb-2">{t("quickstart.issue3Fix")}</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>{t("quickstart.issue3_1")}</li>
          <li>{t("quickstart.issue3_2")}</li>
          <li>{t("quickstart.issue3_3")}</li>
        </ul>
      </div>

      <h2>{t("quickstart.nextSteps")}</h2>
      <p>{t("quickstart.nextStepsDesc")}</p>
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <a href={lang === "en" ? "/en/docs/configuration" : "/docs/configuration"} className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
          <h4 className="font-semibold text-slate-900 mb-2">{t("quickstart.card1Title")}</h4>
          <p className="text-slate-600 text-sm">{t("quickstart.card1Desc")}</p>
        </a>
        <a href={lang === "en" ? "/en/docs/skills" : "/docs/skills"} className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
          <h4 className="font-semibold text-slate-900 mb-2">{t("quickstart.card2Title")}</h4>
          <p className="text-slate-600 text-sm">{t("quickstart.card2Desc")}</p>
        </a>
        <a href={lang === "en" ? "/en/docs/memory" : "/docs/memory"} className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
          <h4 className="font-semibold text-slate-900 mb-2">{t("quickstart.card3Title")}</h4>
          <p className="text-slate-600 text-sm">{t("quickstart.card3Desc")}</p>
        </a>
      </div>
    </DocLayout>
  );
}
