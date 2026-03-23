"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Brain, Clock, Database, Users, FileText, Search } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function MemoryPage() {
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
      <h1>{t("memory.title")}</h1>
      
      <p>{t("memory.desc")}</p>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          {t("memory.whyNeedMemory")}
        </h3>
        <p className="text-indigo-100">
          {t("memory.whyNeedMemoryDesc")}
        </p>
      </div>

      <h2>{t("memory.types")}</h2>
      
      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-blue-500" />
            <h3 className="font-semibold text-slate-900">{t("memory.shortTerm")}</h3>
          </div>
          <p className="text-slate-600 mb-4">
            {t("memory.shortTermDesc")}
          </p>
          <CodeBlock 
            language="yaml"
            code={`agents:
  default:
    # Number of conversation rounds to retain
    context_window: 10
    
    # Whether to summarize long conversations
    summarize_threshold: 20`} 
          />
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-purple-500" />
            <h3 className="font-semibold text-slate-900">{t("memory.longTerm")}</h3>
          </div>
          <p className="text-slate-600 mb-4">
            {t("memory.longTermDesc")}
          </p>
          <CodeBlock 
            language="yaml"
            code={`memory:
  enabled: true
  storage: file  # file, sqlite, redis
  path: ./memory
  auto_extract: true`} 
          />
        </div>
      </div>

      <h2>{t("memory.fileStructure")}</h2>
      <p>{t("memory.fileStructureDesc")}</p>
      
      <CodeBlock 
        filename="memory/"
        code={`memory/
├── MEMORY.md           # Core memory (manually maintained)
├── 2026-03-06.md       # Daily logs (auto-generated)
├── 2026-03-05.md
└── embeddings/         # Vector embedding storage
    └── ...`} 
      />

      <h2>{t("memory.longTermMemory")}</h2>
      <p>{t("memory.longTermMemoryDesc")}</p>
      
      <CodeBlock 
        filename="MEMORY.md"
        code={`# User Memory

## Basic Information
- Name: John
- Profession: Software Engineer
- Timezone: America/New_York
- Language: English

## Preferences
- Prefers concise answers
- Likes Python
- Informal tone is okay
- Code style: PEP8

## Important Dates
- Birthday: 1990-05-15
- Project deadline: 2026-04-01

## Ongoing Projects
- OpenClaw tutorial website
- Personal knowledge base

## Tech Stack
- Frontend: React, TypeScript, TailwindCSS
- Backend: Node.js, Python
- Database: PostgreSQL, MongoDB`} 
      />

      <h2>{t("memory.autoExtract")}</h2>
      <p>{t("memory.autoExtractDesc")}</p>
      
      <CodeBlock 
        language="yaml"
        code={`memory:
  auto_extract: true
  extract_topics:
    - personal_info    # Personal information
    - preferences      # Preferences
    - facts            # Factual information
    - todos            # Todo items
    - projects         # Project information`} 
      />

      <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-r-lg">
        <h4 className="font-semibold text-green-900 mb-2">{t("memory.extractExample")}</h4>
        <div className="space-y-2 text-sm text-green-800">
          <p><strong>{t("memory.user")}:</strong> "My name is John, I'm a designer"</p>
          <p><strong>{t("memory.system")}:</strong> {t("memory.extractResult")}</p>
        </div>
      </div>

      <h2>{t("memory.multiAgent")}</h2>
      
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-6 h-6 text-indigo-500" />
        <p className="text-slate-700">
          {t("memory.multiAgentDesc")}
        </p>
      </div>

      <CodeBlock 
        language="yaml"
        code={`agents:
  # General assistant - default
  default:
    model: bailian/kimi-k2.5
    system_prompt: |
      You are a helpful AI assistant, friendly and professional.
      Provide concise and clear answers.
  
  # Code expert - programming related
  coder:
    model: bailian/qwen3-coder-plus
    system_prompt: |
      You are a senior programmer, proficient in multiple programming languages.
      Provide clear, efficient code solutions following best practices.
    skills:
      - github
      - coding-agent
  
  # Creative writer - content creation
  writer:
    model: bailian/qwen3.5-plus
    temperature: 0.9
    system_prompt: |
      You are a creative writing expert with lively and interesting style.
      Good at writing articles, stories, marketing copy.
  
  # Data analyst
  analyst:
    model: bailian/glm-5
    system_prompt: |
      You are a data analysis expert, rigorous and detailed.
      Good at data interpretation, report analysis, trend prediction.`} 
      />

      <h3>{t("memory.switchAgent")}</h3>
      <p>{t("memory.switchAgentDesc")}</p>
      
      <div className="bg-slate-100 p-4 rounded-lg my-4 space-y-2">
        <p><strong>{t("memory.user")}:</strong> <code>@coder help me review this code</code></p>
        <p><strong>{t("memory.assistant")}:</strong> [Switching to coder agent] Sure, let me look at this code...</p>
      </div>

      <h2>{t("memory.search")}</h2>
      <p>{t("memory.searchDesc")}</p>
      
      <CodeBlock code={`# Manual memory search (for development/debugging)
openclaw memory search "user preferences"

# View memory statistics
openclaw memory stats`} />

      <h2>{t("memory.privacy")}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
          <FileText className="w-5 h-5 text-slate-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-900">{t("memory.localStorage")}</h4>
            <p className="text-slate-600 text-sm">{t("memory.localStorageDesc")}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
          <Search className="w-5 h-5 text-slate-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-900">{t("memory.fullControl")}</h4>
            <p className="text-slate-600 text-sm">{t("memory.fullControlDesc")}</p>
          </div>
        </div>
      </div>

      <h2>{t("memory.bestPractices")}</h2>
      <ol className="space-y-3">
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">1</span>
          <div>
            <strong>{t("memory.practice1Title")}</strong> - {t("memory.practice1Desc")}
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">2</span>
          <div>
            <strong>{t("memory.practice2Title")}</strong> - {t("memory.practice2Desc")}
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">3</span>
          <div>
            <strong>{t("memory.practice3Title")}</strong> - {t("memory.practice3Desc")}
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">4</span>
          <div>
            <strong>{t("memory.practice4Title")}</strong> - {t("memory.practice4Desc")}
          </div>
        </li>
      </ol>

      <div className="bg-indigo-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-indigo-900 mb-2">💡 {t("memory.tip")}</h4>
        <p className="text-indigo-800 text-sm">
          {t("memory.tipDesc")}
        </p>
      </div>
    </DocLayout>
  );
}
