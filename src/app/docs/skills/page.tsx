"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Puzzle, Wrench, Zap, Package, Plus, Share2 } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

const builtInSkillsEN = [
  {
    name: "weather",
    title: "Weather",
    desc: "Query real-time weather and forecasts for cities worldwide",
    config: `skills:
  - name: weather
    config:
      default_city: "Beijing"
      units: metric  # metric or imperial`,
  },
  {
    name: "web_search",
    title: "Web Search",
    desc: "Enable the assistant to search the internet for latest information",
    config: `skills:
  - name: web_search
    config:
      provider: brave  # brave, google, bing
      api_key: \${SEARCH_API_KEY}`,
  },
  {
    name: "reminder",
    title: "Reminder",
    desc: "Set timed reminders with natural language input",
    config: `skills:
  - name: reminder
    config:
      storage: memory  # memory or database`,
  },
  {
    name: "calculator",
    title: "Calculator",
    desc: "Perform mathematical calculations and unit conversions",
    config: `skills:
  - name: calculator`,
  },
];

const builtInSkillsZH = [
  {
    name: "weather",
    title: "天气查询",
    desc: "查询全球任意城市的实时天气和未来预报",
    config: `skills:
  - name: weather
    config:
      default_city: "北京"
      units: metric  # metric 或 imperial`,
  },
  {
    name: "web_search",
    title: "网络搜索",
    desc: "让助手能够搜索互联网获取最新信息",
    config: `skills:
  - name: web_search
    config:
      provider: brave  # brave, google, bing
      api_key: \${SEARCH_API_KEY}`,
  },
  {
    name: "reminder",
    title: "提醒事项",
    desc: "设置定时提醒，支持自然语言输入",
    config: `skills:
  - name: reminder
    config:
      storage: memory  # memory 或 database`,
  },
  {
    name: "calculator",
    title: "计算器",
    desc: "执行数学计算和单位转换",
    config: `skills:
  - name: calculator`,
  },
];

export default function SkillsPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const builtInSkills = lang === "en" ? builtInSkillsEN : builtInSkillsZH;

  return (
    <DocLayout>
      <h1>{t("skills.title")}</h1>
      
      <p>{t("skills.desc")}</p>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Puzzle className="w-5 h-5" />
          {t("skills.whatIsSkill")}
        </h3>
        <p className="text-purple-100">
          {t("skills.whatIsSkillDesc")}
        </p>
      </div>

      <h2>{t("skills.builtInSkills")}</h2>
      <p>{t("skills.builtInSkillsDesc")}</p>

      <div className="space-y-6 my-8">
        {builtInSkills.map((skill, idx) => (
          <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-slate-900">{skill.title}</h3>
                <code className="text-sm bg-slate-200 px-2 py-1 rounded">{skill.name}</code>
              </div>
              <p className="text-slate-600 text-sm mt-2">{skill.desc}</p>
            </div>
            <div className="p-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">{t("skills.configExample")}：</h4>
              <CodeBlock language="yaml" code={skill.config} />
            </div>
          </div>
        ))}
      </div>

      <h2>{t("skills.useBuiltIn")}</h2>
      <p>{t("skills.useBuiltInDesc")}</p>
      
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`skills:
  # Simple enable (use default config)
  - weather
  - web_search
  - calculator
  
  # With custom config
  - name: reminder
    config:
      storage: memory`} 
      />

      <h2>{t("skills.createCustom")}</h2>
      
      <h3>{t("skills.dirStructure")}</h3>
      <CodeBlock 
        filename="my-skill/"
        code={`my-skill/
├── SKILL.md          # Skill description file (required)
├── index.js          # Skill logic code (optional)
└── package.json      # Dependencies (optional)`} 
      />

      <h3>{t("skills.step1")}</h3>
      <p>{t("skills.step1Desc")}</p>
      
      <CodeBlock 
        filename="SKILL.md"
        code={`# My Skill

## Description
A brief description of what this skill does.

## Tools

### search_news
Tool for searching news

Parameters:
- query: Search keyword (string, required)
- limit: Number of results (number, optional, default: 5)

## Usage
Usage examples:
- "Search for latest AI news"
- "Find today's tech news"`} 
      />

      <h3>{t("skills.step2")}</h3>
      <p>{t("skills.step2Desc")}</p>
      
      <CodeBlock 
        filename="index.js"
        code={`// Skill logic code
module.exports = {
  // Called on initialization
  async init(config) {
    console.log('Skill loaded:', config);
    // Initialize DB connections, API clients, etc.
  },
  
  // Define tool functions
  tools: {
    async search_news({ query, limit = 5 }) {
      // Implement search logic
      const results = await fetchNewsAPI(query, limit);
      return results;
    },
    
    async get_weather({ city }) {
      // Implement weather query
      const weather = await fetchWeatherAPI(city);
      return weather;
    }
  },
  
  // Cleanup resources
  async destroy() {
    console.log('Skill unloaded');
  }
};`} 
      />

      <h3>{t("skills.step3")}</h3>
      <p>{t("skills.step3Desc")}</p>
      
      <CodeBlock 
        language="yaml"
        code={`skills:
  # Local skill
  - ./skills/my-awesome-skill
  
  # Skill with config
  - name: ./skills/my-skill
    config:
      api_key: \${MY_SKILL_API_KEY}`} 
      />

      <h2>{t("skills.bestPractices")}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {t("skills.practice1Title")}
          </h4>
          <p className="text-green-800 text-sm">
            {t("skills.practice1Desc")}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Package className="w-4 h-4" />
            {t("skills.practice2Title")}
          </h4>
          <p className="text-blue-800 text-sm">
            {t("skills.practice2Desc")}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            {t("skills.practice3Title")}
          </h4>
          <p className="text-yellow-800 text-sm">
            {t("skills.practice3Desc")}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            {t("skills.practice4Title")}
          </h4>
          <p className="text-purple-800 text-sm">
            {t("skills.practice4Desc")}
          </p>
        </div>
      </div>

      <h2>{t("skills.shareSkill")}</h2>
      <p>{t("skills.shareSkillDesc")}</p>
      <ul>
        <li><strong>{t("skills.shareOption1")}</strong> - {t("skills.shareOption1Desc")}</li>
        <li><strong>{t("skills.shareOption2")}</strong> - {t("skills.shareOption2Desc")}</li>
        <li><strong>{t("skills.shareOption3")}</strong> - {t("skills.shareOption3Desc")}</li>
      </ul>

      <h2>{t("skills.marketplace")}</h2>
      <p>{t("skills.marketplaceDesc")}</p>
      <ul>
        <li>{t("skills.marketplaceFeature1")}</li>
        <li>{t("skills.marketplaceFeature2")}</li>
        <li>{t("skills.marketplaceFeature3")}</li>
      </ul>
      
      <div className="bg-slate-100 p-6 rounded-xl mt-8 text-center">
        <p className="text-slate-600">
          💡 {t("skills.learnMore")} <a href={lang === "en" ? "/en/docs/tools" : "/docs/tools"} className="text-blue-600 hover:underline">{t("skills.toolsLink")}</a>
        </p>
      </div>
    </DocLayout>
  );
}
