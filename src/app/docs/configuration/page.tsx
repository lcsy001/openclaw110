import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { Settings, Server, Bot, Puzzle, Shield, Database } from "lucide-react";

export const metadata = {
  title: "配置文件 - OpenClaw 教程",
};

const modelProviders = [
  { name: "openai", models: "gpt-4o, gpt-4o-mini, gpt-4-turbo", desc: "OpenAI 官方 API" },
  { name: "anthropic", models: "claude-3-5-sonnet, claude-3-opus", desc: "Anthropic Claude" },
  { name: "google", models: "gemini-pro, gemini-ultra", desc: "Google Gemini" },
  { name: "bailian", models: "qwen3.5-plus, kimi-k2.5, glm-5", desc: "阿里云百炼" },
  { name: "local", models: "llama2, mistral, codellama", desc: "本地模型 (Ollama)" },
];

export default function ConfigurationPage() {
  return (
    <DocLayout>
      <h1>配置文件</h1>
      
      <p>
        OpenClaw 使用 YAML 格式的配置文件。主配置文件名为 <code>config.yaml</code>，
        位于工作区根目录。
      </p>

      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          配置即代码
        </h3>
        <p className="text-cyan-100">
          通过简单的 YAML 文件，你可以完全控制 OpenClaw 的行为。无需编写代码，即可定制你的 AI 助手。
        </p>
      </div>

      <h2>完整配置示例</h2>
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`# ============================================
# OpenClaw 配置文件
# ============================================

# 消息平台配置
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

# AI 代理配置
agents:
  default:
    model: bailian/kimi-k2.5
    temperature: 0.7
    max_tokens: 2000
    system_prompt: |
      你是一个 helpful 的 AI 助手，友好且专业。
      用简洁清晰的中文回答用户的问题。

# 技能配置
skills:
  - weather
  - web_search
  - calculator
  - reminder

# 记忆系统配置
memory:
  enabled: true
  storage: file
  path: ./memory
  auto_extract: true

# 日志配置
logging:
  level: info
  file: logs/openclaw.log`} 
      />

      <h2>配置详解</h2>

      <h3><Server className="w-5 h-5 inline mr-2" />Providers（消息平台）</h3>
      <p>配置你要连接的消息平台。目前支持：</p>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-slate-900">Telegram</h4>
          <p className="text-slate-600 text-sm mt-1">通过 Bot API，适合个人使用</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
          <h4 className="font-semibold text-slate-900">Discord</h4>
          <p className="text-slate-600 text-sm mt-1">适合社区和团队协作</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-slate-900">飞书/Lark</h4>
          <p className="text-slate-600 text-sm mt-1">企业协作平台</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-slate-900">WhatsApp</h4>
          <p className="text-slate-600 text-sm mt-1">需要额外配置 Business API</p>
        </div>
      </div>

      <h3><Bot className="w-5 h-5 inline mr-2" />Agents（AI 代理）</h3>
      <p>定义你的 AI 助手的行为和参数：</p>
      
      <CodeBlock 
        language="yaml"
        code={`agents:
  default:
    # 模型选择，格式：提供商/模型名
    model: bailian/kimi-k2.5
    
    # 创造性程度 (0-2)，越高越随机
    temperature: 0.7
    
    # 最大回复长度
    max_tokens: 2000
    
    # 上下文窗口大小（对话历史保留轮数）
    context_window: 10
    
    # 系统提示词，定义助手角色和行为
    system_prompt: |
      你是 OpenClaw 助手，一个智能、友好的 AI。
      你擅长帮助用户完成各种任务。
      
    # 启用的技能列表
    skills:
      - weather
      - web_search`} 
      />

      <h4>支持的模型提供商</h4>
      <div className="bg-slate-50 rounded-xl overflow-hidden my-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">提供商</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">示例模型</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">说明</th>
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

      <h3><Puzzle className="w-5 h-5 inline mr-2" />Skills（技能）</h3>
      <p>启用你想要使用的技能列表：</p>
      
      <CodeBlock 
        language="yaml"
        code={`skills:
  # 简单启用（使用默认配置）
  - weather
  - web_search
  - calculator
  
  # 带自定义配置的技能
  - name: reminder
    config:
      storage: memory
      
  # 本地开发的技能
  - ./skills/my-custom-skill`} 
      />

      <h3><Database className="w-5 h-5 inline mr-2" />Memory（记忆系统）</h3>
      <CodeBlock 
        language="yaml"
        code={`memory:
  enabled: true
  storage: file           # file, sqlite, redis
  path: ./memory          # 存储路径
  auto_extract: true      # 自动提取关键信息
  
  # 记忆检索配置
  retrieval:
    max_results: 5
    similarity_threshold: 0.7`} 
      />

      <h3><Shield className="w-5 h-5 inline mr-2" />Security（安全配置）</h3>
      <CodeBlock 
        language="yaml"
        code={`security:
  # 允许访问的用户列表（可选）
  allowed_users:
    - user_id_1
    - user_id_2
  
  # 敏感词过滤
  content_filter:
    enabled: true
    block_list:
      - "敏感词1"
      - "敏感词2"`} 
      />

      <h2>环境变量</h2>
      <p>敏感信息建议通过环境变量传入，使用 <code>{'${...}'}</code> 语法引用：</p>
      
      <CodeBlock 
        filename=".env"
        code={`# AI 模型 API 密钥
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
BAILIAN_API_KEY=sk-sp-...

# 消息平台 Token
TELEGRAM_BOT_TOKEN=123456:ABC...
DISCORD_BOT_TOKEN=...
FEISHU_APP_ID=cli_...
FEISHU_APP_SECRET=...

# 其他服务
SEARCH_API_KEY=...       # 搜索技能
WEATHER_API_KEY=...      # 天气技能`} 
      />

      <h2>多环境配置</h2>
      <p>你可以为不同环境创建不同的配置文件：</p>
      
      <CodeBlock 
        code={`# 开发环境
openclaw start --config config.dev.yaml

# 测试环境
openclaw start --config config.test.yaml

# 生产环境
openclaw start --config config.prod.yaml`} 
      />

      <h2>配置验证</h2>
      <p>在启动前验证配置文件是否正确：</p>
      
      <CodeBlock code="openclaw validate" />

      <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-r-lg">
        <h4 className="font-semibold text-green-900 mb-2">✅ 验证通过</h4>
        <p className="text-green-800 text-sm">
          如果配置正确，你会看到 &quot;Config is valid&quot; 的提示。如果有错误，会显示具体的错误位置和原因。
        </p>
      </div>

      <h2>热重载</h2>
      <p>
        修改配置文件后，OpenClaw 会自动检测变化并重新加载（部分配置需要重启才能生效）。
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <h4 className="font-semibold text-yellow-900 mb-2">⚠️ 注意</h4>
        <p className="text-yellow-800 text-sm">
          以下配置变更需要重启服务：providers、agents 的 model 变更、memory 存储后端变更。
        </p>
      </div>

      <h2>配置模板</h2>
      <p>我们提供了一些常用场景的预设配置：</p>
      
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">个人助理</h4>
          <p className="text-slate-600 text-sm">适合日常对话、提醒、查询</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">团队协作</h4>
          <p className="text-slate-600 text-sm">多平台接入、权限管理</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">开发助手</h4>
          <p className="text-slate-600 text-sm">代码审查、技术问答</p>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-blue-900 mb-2">💡 配置技巧</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• 使用 YAML 的锚点和引用减少重复配置</li>
          <li>• 将敏感信息放在 .env 文件，不要提交到版本控制</li>
          <li>• 定期备份配置文件，方便回滚</li>
          <li>• 使用注释记录每个配置的用途</li>
        </ul>
      </div>
    </DocLayout>
  );
}
