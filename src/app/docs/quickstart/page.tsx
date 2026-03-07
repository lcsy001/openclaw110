import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { MessageSquare, Bot, Key, Rocket, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "快速开始 - OpenClaw 教程",
};

export default function QuickStartPage() {
  return (
    <DocLayout>
      <h1>快速开始</h1>
      
      <p>
        本指南将帮助你在 5 分钟内搭建一个能用的 OpenClaw 助手。
        我们将以 Telegram 为例，展示如何配置消息平台。
      </p>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          目标
        </h3>
        <p className="text-blue-100">
          完成本教程后，你将拥有一个可以接收和回复消息的 AI 助手。
        </p>
      </div>

      <h2>第 1 步：创建 Telegram Bot</h2>
      
      <div className="space-y-4 my-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">1</div>
          <div>
            <p className="text-slate-700">在 Telegram 中搜索 <strong>@BotFather</strong></p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">2</div>
          <div>
            <p className="text-slate-700">发送 <code>/newbot</code> 命令创建新机器人</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">3</div>
          <div>
            <p className="text-slate-700">按照提示设置机器人名称和用户名</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-green-600">4</div>
          <div>
            <p className="text-slate-700"><strong>保存获得的 API Token</strong>（格式如：<code>123456789:ABCdefGHIjklMNOpqrsTUVwxyz</code>）</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900">重要提醒</h4>
            <p className="text-yellow-800 text-sm mt-1">
              API Token 是敏感信息，不要分享给他人。如果泄露，可以在 BotFather 中撤销并重新生成。
            </p>
          </div>
        </div>
      </div>

      <h2>第 2 步：配置 OpenClaw</h2>
      <p>编辑你的 <code>config.yaml</code> 文件，添加 Telegram 配置：</p>
      
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`providers:
  telegram:
    enabled: true
    token: \${TELEGRAM_BOT_TOKEN}  # 从环境变量读取

agents:
  default:
    model: openai/gpt-4o-mini
    system_prompt: |
      你是一个 helpful 的 AI 助手，友好且专业。
      你会用简洁清晰的中文回答用户的问题。
      
skills:
  - weather
  - web_search`} 
      />

      <h2>第 3 步：设置环境变量</h2>
      <p>创建 <code>.env</code> 文件并添加必要的 API 密钥：</p>
      
      <CodeBlock 
        filename=".env"
        code={`# Telegram Bot Token（必填）
TELEGRAM_BOT_TOKEN=123456789:your_bot_token_here

# OpenAI API Key（如果使用 OpenAI 模型）
OPENAI_API_KEY=sk-your_openai_key_here

# Anthropic API Key（可选，使用 Claude 模型）
ANTHROPIC_API_KEY=sk-your_anthropic_key_here`} 
      />

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            获取 OpenAI Key
          </h4>
          <p className="text-slate-600 text-sm">
            访问 <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com</a>
          </p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            获取 Anthropic Key
          </h4>
          <p className="text-slate-600 text-sm">
            访问 <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a>
          </p>
        </div>
      </div>

      <h2>第 4 步：启动服务</h2>
      <p>运行以下命令启动 OpenClaw：</p>
      
      <CodeBlock code="openclaw start" />

      <p>如果看到类似以下的输出，说明启动成功：</p>
      
      <CodeBlock 
        code={`✓ Config loaded from ./config.yaml
✓ Skills loaded: weather, web_search
✓ Telegram provider connected (@YourBotName)
✓ Agent 'default' ready (model: openai/gpt-4o-mini)
🚀 OpenClaw is running!`} 
      />

      <h2>第 5 步：测试你的助手</h2>
      <p>
        现在去 Telegram 找到你创建的机器人，发送一条消息测试。
        尝试问一些问题：
      </p>
      
      <div className="bg-slate-50 p-6 rounded-xl my-6">
        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          测试对话示例
        </h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm">你</div>
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700">你好！你能做什么？</div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-slate-700">
              你好！我是你的 OpenClaw 助手。我可以帮你查询天气、搜索网络信息、管理日程等。有什么可以帮你的吗？
            </div>
          </div>
        </div>
      </div>

      <h3>推荐测试指令</h3>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>"今天北京天气怎么样？"（需要配置天气技能）</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>"搜索一下最新的 AI 新闻"</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>"帮我总结一下这段文字：[粘贴文字]"</span>
        </li>
      </ul>

      <h2>常见问题排查</h2>
      
      <h4>❌ 无法连接到 Telegram</h4>
      <div className="bg-red-50 p-4 rounded-lg my-4">
        <p className="text-slate-700 mb-2">检查以下几点：</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>Token 是否正确复制（注意没有多余的空格）</li>
          <li>网络是否可以访问 Telegram API（部分地区需要代理）</li>
          <li>防火墙是否阻止了连接</li>
        </ul>
      </div>

      <h4>❌ 模型返回错误</h4>
      <div className="bg-red-50 p-4 rounded-lg my-4">
        <p className="text-slate-700 mb-2">确保：</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>API Key 有效且有足够额度</li>
          <li>选择的模型名称正确</li>
          <li>网络可以访问对应的 API 端点</li>
        </ul>
      </div>

      <h4>❌ 技能不工作</h4>
      <div className="bg-red-50 p-4 rounded-lg my-4">
        <p className="text-slate-700 mb-2">检查：</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>技能是否在 config.yaml 中启用</li>
          <li>技能所需的 API Key 是否配置</li>
          <li>查看日志获取详细错误信息：<code>openclaw logs</code></li>
        </ul>
      </div>

      <h2>下一步</h2>
      <p>
        恭喜你完成了基础配置！接下来可以：
      </p>
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <a href="/docs/configuration" className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
          <h4 className="font-semibold text-slate-900 mb-2">深入了解配置</h4>
          <p className="text-slate-600 text-sm">探索更多配置选项</p>
        </a>
        <a href="/docs/skills" className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
          <h4 className="font-semibold text-slate-900 mb-2">添加更多技能</h4>
          <p className="text-slate-600 text-sm">扩展助手能力</p>
        </a>
        <a href="/docs/memory" className="block p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
          <h4 className="font-semibold text-slate-900 mb-2">配置记忆功能</h4>
          <p className="text-slate-600 text-sm">让助手记住你</p>
        </a>
      </div>
    </DocLayout>
  );
}
