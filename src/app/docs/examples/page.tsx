import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { Lightbulb, Code, Bot, Users, Calendar, Search, Cloud, MessageSquare } from "lucide-react";

export const metadata = {
  title: "使用示例 - OpenClaw 教程",
};

const examples = [
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
      ""今天天气怎么样？" → 自动查询当地天气",
      ""提醒我明天下午3点开会" → 设置定时提醒",
      ""帮我搜索 React 最新版本特性" → 网络搜索"
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
      ""@助手 总结今天的站会内容" → 生成会议纪要",
      ""@助手 查询项目进度" → 获取项目状态",
      ""@助手 安排下周团队建设" → 协助活动策划"
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
      ""帮我 review 这段代码" → 代码审查和优化建议",
      ""解释这个正则表达式" → 详细技术解释",
      ""@coder 重构这个函数" → 切换到代码专家代理"
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
      ""如何退款？" → 根据知识库回答",
      ""订单状态查询" → 调用订单系统 API",
      ""投诉建议" → 记录并转交人工处理"
    ]
  }
];

export default function ExamplesPage() {
  return (
    <DocLayout>
      <h1>使用示例</h1>
      
      <p>
        这里展示了一些典型的 OpenClaw 使用场景。你可以参考这些示例，
        根据自己的需求进行定制。
      </p>

      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          灵感来源
        </h3>
        <p className="text-green-100">
          这些示例展示了 OpenClaw 的多种应用场景。你可以直接复制配置进行修改，
          或者组合多个示例的特性。
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

          <h3 className="font-semibold text-slate-900 mb-3">使用场景</h3>
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

      <h2>进阶示例</h2>

      <h3>多代理协作</h3>
      <p>配置多个专业代理，根据任务类型自动切换：</p>
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`agents:
  # 通用助手
  default:
    model: bailian/kimi-k2.5
    system_prompt: |
      你是主助手，负责协调任务分配。
      根据用户需求，决定使用哪个专业代理。
  
  # 代码专家
  coder:
    model: bailian/qwen3-coder-plus
    system_prompt: |
      专注于编程任务，提供代码解决方案。
  
  # 写作专家
  writer:
    model: bailian/qwen3.5-plus
    temperature: 0.9
    system_prompt: |
      专注于文案创作，文风活泼有趣。

# 使用方式：
# @coder 帮我写个排序算法
# @writer 帮我写一封邮件`} 
      />

      <h3>定时任务自动化</h3>
      <p>使用 Cron 技能实现定时任务：</p>
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`skills:
  - cron
  - reminder
  - weather

# 配置定时任务
cron:
  jobs:
    - name: "morning_weather"
      schedule: "0 8 * * *"  # 每天早8点
      action: "send_weather_report"
      
    - name: "daily_standup"
      schedule: "0 9 * * 1-5"  # 工作日早9点
      action: "remind_standup"
      
    - name: "weekly_summary"
      schedule: "0 18 * * 5"  # 每周五晚6点
      action: "generate_weekly_report"`} 
      />

      <h3>Webhook 集成</h3>
      <p>接收外部系统的 webhook 通知：</p>
      <CodeBlock 
        code={`# 在 config.yaml 中启用 webhook
webhook:
  enabled: true
  port: 3001
  endpoints:
    - path: "/github"
      handler: "handle_github_event"
    - path: "/alert"
      handler: "handle_alert"

# 示例：GitHub webhook 处理
# 当代码提交时，自动通知到 Telegram
# 当 CI 失败时，发送告警消息`} 
      />

      <h2>实用技巧</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            搜索增强
          </h4>
          <p className="text-blue-800 text-sm">
            启用 web_search 技能，让助手能够获取最新信息，回答时效性问题。
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            天气提醒
          </h4>
          <p className="text-green-800 text-sm">
            结合 weather 技能和 cron，实现每日天气推送和恶劣天气预警。
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            日程管理
          </h4>
          <p className="text-purple-800 text-sm">
            使用 reminder 技能管理日程，支持自然语言输入如"明天下午3点开会"。
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            团队协作
          </h4>
          <p className="text-orange-800 text-sm">
            集成到飞书/Discord，实现团队知识库查询、会议纪要和任务分配。
          </p>
        </div>
      </div>

      <h2>分享你的配置</h2>
      <p>
        你有独特的使用场景？欢迎分享到社区！优秀的配置可能会被收录到官方示例中。
      </p>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-slate-900 mb-2">💡 配置模板库</h4>
        <p className="text-slate-700 text-sm mb-4">
          我们计划建立一个社区配置模板库，用户可以一键导入和分享配置。
          敬请期待！
        </p>
        <a 
          href="https://github.com/openclaw/openclaw/discussions" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          参与讨论 →
        </a>
      </div>
    </DocLayout>
  );
}
