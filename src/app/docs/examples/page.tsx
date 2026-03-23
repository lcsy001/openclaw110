"use client";

import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Lightbulb, Code, Bot, Users, Calendar, Search, Cloud, MessageSquare } from "lucide-react";
import zhTranslations from "../../../components/i18n/zh";
import enTranslations from "../../../components/i18n/en";

const examplesEN = [
  {
    title: "Personal Assistant",
    icon: Bot,
    description: "Build your exclusive AI assistant to manage daily tasks",
    config: `agents:
  default:
    model: bailian/kimi-k2.5
    system_prompt: |
      You are the user's personal assistant. Remember their habits and preferences.
      Proactively remind them of important matters and provide thoughtful suggestions.
      
skills:
  - weather
  - reminder
  - web_search
  - calculator

memory:
  enabled: true
  auto_extract: true`,
    usage: [
      "\"How's the weather today?\" → Auto query local weather",
      "\"Remind me to have a meeting at 3pm tomorrow\" → Set timed reminder",
      "\"Search for React latest version features\" → Web search"
    ]
  },
  {
    title: "Team Collaboration Assistant",
    icon: Users,
    description: "Integrate with enterprise communication tools to improve team efficiency",
    config: `providers:
  feishu:
    enabled: true
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}

agents:
  default:
    model: bailian/qwen3.5-plus
    system_prompt: |
      You are a team assistant, helping team members collaborate.
      Can summarize meeting notes, schedule appointments, query project information.
      
skills:
  - web_search
  - reminder
  - github

security:
  allowed_groups:
    - "Engineering"
    - "Product"`,
    usage: [
      "\"@assistant Summarize today's standup\" → Generate meeting notes",
      "\"@assistant Query project progress\" → Get project status",
      "\"@assistant Plan team building next week\" → Assist with event planning"
    ]
  },
  {
    title: "Developer Assistant",
    icon: Code,
    description: "Programming partner, code review and technical Q&A",
    config: `agents:
  default:
    model: bailian/qwen3-coder-plus
    temperature: 0.3
    system_prompt: |
      You are a senior software engineer, expert in code review and technical design.
      Provide clear, efficient solutions following best practices.
      Use Chinese for code comments.
      
skills:
  - github
  - web_search
  - coding-agent

agents:
  coder:
    model: bailian/qwen3-coder-plus
    system_prompt: |
      Focus on code-related tasks, provide detailed code explanations and optimization suggestions.`,
    usage: [
      "\"Help me review this code\" → Code review and optimization suggestions",
      "\"Explain this regex\" → Detailed technical explanation",
      "\"@coder Refactor this function\" → Switch to code expert agent"
    ]
  },
  {
    title: "Customer Service Bot",
    icon: MessageSquare,
    description: "Auto-reply to common questions, handle customer inquiries",
    config: `agents:
  default:
    model: bailian/glm-5
    system_prompt: |
      You are a customer service assistant, friendly and patient in answering questions.
      If questions are complex, suggest transferring to human support.
      Maintain professional but friendly tone.

providers:
  telegram:
    enabled: true
    token: \${TELEGRAM_BOT_TOKEN}

skills:
  - web_search
  - faq

memory:
  enabled: true
  # Remember customer's historical inquiries`,
    usage: [
      "\"How to get a refund?\" → Answer based on knowledge base",
      "\"Query order status\" → Call order system API",
      "\"Complaint/suggestion\" → Record and transfer to human support"
    ]
  }
];

const examplesZH = [
  {
    title: "个人助理",
    icon: Bot,
    description: "打造你的专属 AI 助手，管理日常事务",
    config: `agents:
  default:
    model: bailian/kimi-k2.5
    system_prompt: |
      你是用户的个人助理，记住用户的习惯和偏好。
      主动提醒重要事项，提供贴心的建议。
      
skills:
  - weather
  - reminder
  - web_search
  - calculator

memory:
  enabled: true
  auto_extract: true`,
    usage: [
      "\"今天天气怎么样？\" → 自动查询当地天气",
      "\"提醒我明天下午3点开会\" → 设置定时提醒",
      "\"帮我搜索 React 最新版本特性\" → 网络搜索"
    ]
  },
  {
    title: "团队协作助手",
    icon: Users,
    description: "集成到企业通讯工具，提升团队效率",
    config: `providers:
  feishu:
    enabled: true
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}

agents:
  default:
    model: bailian/qwen3.5-plus
    system_prompt: |
      你是团队助手，帮助团队成员协作。
      可以总结会议记录、安排日程、查询项目信息。
      
skills:
  - web_search
  - reminder
  - github

security:
  allowed_groups:
    - "研发部"
    - "产品部"`,
    usage: [
      "\"@助手 总结今天的站会内容\" → 生成会议纪要",
      "\"@助手 查询项目进度\" → 获取项目状态",
      "\"@助手 安排下周团队建设\" → 协助活动策划"
    ]
  },
  {
    title: "开发者助手",
    icon: Code,
    description: "编程伙伴，代码审查和技术问答",
    config: `agents:
  default:
    model: bailian/qwen3-coder-plus
    temperature: 0.3
    system_prompt: |
      你是资深开发工程师，擅长代码审查和技术方案设计。
      提供清晰、高效、符合最佳实践的解决方案。
      代码注释使用中文。
      
skills:
  - github
  - web_search
  - coding-agent

agents:
  coder:
    model: bailian/qwen3-coder-plus
    system_prompt: |
      专注于代码相关任务，提供详细的代码解释和优化建议。`,
    usage: [
      "\"帮我 review 这段代码\" → 代码审查和优化建议",
      "\"解释这个正则表达式\" → 详细技术解释",
      "\"@coder 重构这个函数\" → 切换到代码专家代理"
    ]
  },
  {
    title: "智能客服",
    icon: MessageSquare,
    description: "自动回复常见问题，处理客户咨询",
    config: `agents:
  default:
    model: bailian/glm-5
    system_prompt: |
      你是客服助手，友好耐心地回答客户问题。
      如果问题复杂，建议转接人工客服。
      保持专业但亲切的语气。

providers:
  telegram:
    enabled: true
    token: \${TELEGRAM_BOT_TOKEN}

skills:
  - web_search
  - faq

memory:
  enabled: true
  # 记住客户历史咨询记录`,
    usage: [
      "\"如何退款？\" → 根据知识库回答",
      "\"订单状态查询\" → 调用订单系统 API",
      "\"投诉建议\" → 记录并转交人工处理"
    ]
  }
];

export default function ExamplesPage() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  const examples = lang === "en" ? examplesEN : examplesZH;

  return (
    <DocLayout>
      <h1>{t("examples.title")}</h1>
      
      <p>{t("examples.desc")}</p>

      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          {t("examples.inspiration")}
        </h3>
        <p className="text-green-100">
          {t("examples.inspirationDesc")}
        </p>
      </div>

      {examples.map((example, idx) => (
        <div key={idx} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <example.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{example.title}</h2>
              <p className="text-slate-600">{example.description}</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl overflow-hidden my-6">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
              <span className="text-slate-400 text-sm font-mono">config.yaml</span>
              <span className="text-slate-500 text-xs">YAML</span>
            </div>
            <CodeBlock language="yaml" code={example.config} />
          </div>

          <h3 className="font-semibold text-slate-900 mb-3">{t("examples.usageScenario")}</h3>
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            {example.usage.map((usage, usageIdx) => (
              <div key={usageIdx} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                  {usageIdx + 1}
                </span>
                <p className="text-slate-700">{usage}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2>{t("examples.advancedExamples")}</h2>

      <h3>{t("examples.multiAgent")}</h3>
      <p>{t("examples.multiAgentDesc")}</p>
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`agents:
  # General assistant
  default:
    model: bailian/kimi-k2.5
    system_prompt: |
      You are the main assistant, responsible for coordinating task distribution.
      Decide which specialized agent to use based on user needs.
  
  # Code expert
  coder:
    model: bailian/qwen3-coder-plus
    system_prompt: |
      Focus on programming tasks, provide code solutions.
  
  # Writing expert
  writer:
    model: bailian/qwen3.5-plus
    temperature: 0.9
    system_prompt: |
      Focus on content creation with lively and interesting style.

# Usage:
# @coder help me write a sorting algorithm
# @writer help me write an email`} 
      />

      <h3>{t("examples.cronJobs")}</h3>
      <p>{t("examples.cronJobsDesc")}</p>
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`skills:
  - cron
  - reminder
  - weather

# Configure scheduled jobs
cron:
  jobs:
    - name: "morning_weather"
      schedule: "0 8 * * *"  # 8am daily
      action: "send_weather_report"
      
    - name: "daily_standup"
      schedule: "0 9 * * 1-5"  # 9am weekdays
      action: "remind_standup"
      
    - name: "weekly_summary"
      schedule: "0 18 * * 5"  # 6pm Fridays
      action: "generate_weekly_report"`} 
      />

      <h3>{t("examples.webhook")}</h3>
      <p>{t("examples.webhookDesc")}</p>
      <CodeBlock 
        code={`# Enable webhook in config.yaml
webhook:
  enabled: true
  port: 3001
  endpoints:
    - path: "/github"
      handler: "handle_github_event"
    - path: "/alert"
      handler: "handle_alert"

# Example: GitHub webhook handling
# When code is committed, auto-notify to Telegram
# When CI fails, send alert message`} 
      />

      <h2>{t("examples.tips")}</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            {t("examples.tip1Title")}
          </h4>
          <p className="text-blue-800 text-sm">
            {t("examples.tip1Desc")}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            {t("examples.tip2Title")}
          </h4>
          <p className="text-green-800 text-sm">
            {t("examples.tip2Desc")}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {t("examples.tip3Title")}
          </h4>
          <p className="text-purple-800 text-sm">
            {t("examples.tip3Desc")}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            {t("examples.tip4Title")}
          </h4>
          <p className="text-orange-800 text-sm">
            {t("examples.tip4Desc")}
          </p>
        </div>
      </div>

      <h2>{t("examples.shareConfig")}</h2>
      <p>{t("examples.shareConfigDesc")}</p>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-slate-900 mb-2">💡 {t("examples.templateLibrary")}</h4>
        <p className="text-slate-700 text-sm mb-4">
          {t("examples.templateLibraryDesc")}
        </p>
        <a 
          href="https://github.com/openclaw/openclaw/discussions" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          {t("examples.joinDiscussion")} →
        </a>
      </div>
    </DocLayout>
  );
}
