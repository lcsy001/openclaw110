"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { AlertCircle, CheckCircle, Terminal, Download } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

export default function InstallationPage() {
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
      <h1>{t("install.title")}</h1>
      
      <p>{t("install.desc")}</p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">{t("install.prereq.title")}</h4>
            <p className="text-blue-800 text-sm mt-1">
              {t("install.prereq.desc")} <code>node --version</code>.
            </p>
          </div>
        </div>
      </div>

      <h2>{t("install.requirements")}</h2>
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">{t("install.req.node")}</h4>
          <p className="text-slate-600 text-sm">{t("install.req.nodeDesc")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">{t("install.req.package")}</h4>
          <p className="text-slate-600 text-sm">{t("install.req.packageDesc")}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">{t("install.req.git")}</h4>
          <p className="text-slate-600 text-sm">{t("install.req.gitDesc")}</p>
        </div>
      </div>

      <h2>{t("install.methods")}</h2>
      
      <h3>{t("install.method1.title")}</h3>
      <p>{t("install.method1.desc")}</p>
      
      <CodeBlock code="npm install -g openclaw" />

      <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">{t("install.method1.verify")}</h4>
            <p className="text-green-800 text-sm mt-1">
              {t("install.method1.verifyDesc")}
            </p>
            <CodeBlock code="openclaw --version" />
          </div>
        </div>
      </div>

      <h3>{t("install.method2.title")}</h3>
      <p>{t("install.method2.desc")}</p>
      
      <CodeBlock 
        code={`# Clone the repository
git clone https://github.com/openclaw/openclaw.git

# Navigate to directory
cd openclaw

# Install dependencies
npm install

# Build project
npm run build

# Link to global (optional)
npm link`} 
      />

      <h3>{t("install.method3.title")}</h3>
      <p>{t("install.method3.desc")}</p>
      
      <CodeBlock 
        code={`# Pull the image
docker pull openclaw/openclaw:latest

# Run the container
docker run -d \\
  --name openclaw \\
  -v $(pwd)/workspace:/app/workspace \\
  -p 3000:3000 \\
  openclaw/openclaw:latest`} 
      />

      <h2>{t("install.init.title")}</h2>
      <p>{t("install.init.desc")}</p>
      
      <CodeBlock code="openclaw init my-assistant" />

      <p>{t("install.init.structure")}</p>
      
      <CodeBlock 
        filename="my-assistant/"
        code={`├── config.yaml          # Main configuration file
├── .env                 # Environment variables
├── memory/              # Memory storage directory
│   └── MEMORY.md       # Core memory file
├── skills/              # Custom skills directory
└── workspace/           # Workspace files directory`} 
      />

      <h2>{t("install.env.title")}</h2>
      <p>Edit the <code>.env</code> file and add necessary API keys:</p>
      
      <CodeBlock 
        filename=".env"
        code={`# AI Model API Keys (configure at least one)
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-your-anthropic-key

# Messaging Platform Tokens (configure as needed)
TELEGRAM_BOT_TOKEN=your-telegram-token
DISCORD_BOT_TOKEN=your-discord-token`} 
      />

      <h2>{t("install.start.title")}</h2>
      <p>{t("install.start.desc")}</p>
      
      <CodeBlock code="openclaw start" />

      <div className="bg-slate-900 text-slate-50 p-4 rounded-lg my-6 font-mono text-sm">
        <div className="flex items-center gap-2 mb-2 text-green-400">
          <Terminal className="w-4 h-4" />
          <span>{t("install.terminal")}</span>
        </div>
        <div className="space-y-1">
          <p><span className="text-green-400">✓</span> Config loaded</p>
          <p><span className="text-green-400">✓</span> Skills loaded: weather, web_search</p>
          <p><span className="text-green-400">✓</span> Telegram provider connected</p>
          <p><span className="text-green-400">✓</span> Agent 'default' ready</p>
          <p className="text-blue-400">🚀 OpenClaw is running on http://localhost:3000</p>
        </div>
      </div>

      <h2>{t("install.faq")}</h2>
      
      <h4>{t("install.faq.1.q")}</h4>
      <p>{t("install.faq.1.a")}</p>
      <CodeBlock code="sudo npm install -g openclaw" />

      <h4>{t("install.faq.3.q")}</h4>
      <CodeBlock code="npm update -g openclaw" />

      <h4>{t("install.faq.4.q")}</h4>
      <CodeBlock code="npm uninstall -g openclaw" />

      <h2>{t("install.next")}</h2>
      <p>
        {t("install.next.desc")}
      </p>

      <div className="flex items-center gap-4 mt-8">
        <a 
          href={lang === "en" ? "/en/docs/quickstart" : "/docs/quickstart"}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {t("install.continue")}
          <Download className="w-4 h-4" />
        </a>
      </div>
    </DocLayout>
  );
}
