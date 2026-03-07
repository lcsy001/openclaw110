import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { HelpCircle, AlertTriangle, MessageCircle, Server, Key, Bug, RefreshCw } from "lucide-react";

export const metadata = {
  title: "常见问题 - OpenClaw 教程",
};

const faqs = [
  {
    category: "安装与启动",
    icon: Server,
    items: [
      {
        q: "安装时遇到权限错误怎么办？",
        a: "在 Linux/macOS 上，尝试使用 sudo 安装：sudo npm install -g openclaw。或者检查 npm 的全局安装目录权限。"
      },
      {
        q: "启动时提示端口被占用",
        a: "默认使用 3000 端口。可以通过 --port 参数指定其他端口：openclaw start --port 3001"
      },
      {
        q: "如何完全卸载 OpenClaw？",
        a: "运行 npm uninstall -g openclaw，然后删除工作区目录即可。"
      }
    ]
  },
  {
    category: "配置问题",
    icon: Key,
    items: [
      {
        q: "配置文件格式错误怎么办？",
        a: "使用 openclaw validate 命令检查配置文件。注意 YAML 的缩进必须使用空格，不能使用 Tab。"
      },
      {
        q: "环境变量不生效",
        a: "确保 .env 文件位于工作区根目录，且变量名与配置文件中引用的名称一致。重启服务后生效。"
      },
      {
        q: "如何切换不同的模型？",
        a: "修改 config.yaml 中 agents.default.model 字段，格式为 提供商/模型名，如 bailian/kimi-k2.5"
      }
    ]
  },
  {
    category: "消息平台",
    icon: MessageCircle,
    items: [
      {
        q: "Telegram Bot 不回复消息",
        a: "检查：1) Token 是否正确 2) 是否发送了 /start 命令 3) 网络是否能访问 Telegram API 4) 查看日志 openclaw logs"
      },
      {
        q: "Discord Bot 离线",
        a: "检查 Discord Bot Token 是否正确，以及是否在 Discord Developer Portal 中启用了必要的 Intents 权限。"
      },
      {
        q: "飞书机器人收不到消息",
        a: "确认：1) 应用已发布 2) 机器人已添加到群组 3) 订阅了 message 事件 4) 回调地址配置正确"
      }
    ]
  },
  {
    category: "故障排除",
    icon: Bug,
    items: [
      {
        q: "助手回复很慢",
        a: "可能原因：1) 网络延迟 2) 模型响应慢 3) 上下文太长。尝试切换更快的模型或减少 context_window。"
      },
      {
        q: "技能不工作",
        a: "检查：1) 技能是否在 config.yaml 中启用 2) 技能所需的 API Key 是否配置 3) 查看日志获取详细错误"
      },
      {
        q: "内存占用过高",
        a: "尝试：1) 减少 context_window 2) 关闭不必要的技能 3) 重启服务 4) 使用更轻量的模型"
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <DocLayout>
      <h1>常见问题</h1>
      
      <p>
        这里收集了用户最常遇到的问题。如果你在这里找不到答案，欢迎加入我们的 Discord 社区寻求帮助。
      </p>

      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          遇到问题？
        </h3>
        <p className="text-amber-100">
          首先查看下方的常见问题，如果无法解决，可以通过 Discord 或 GitHub Issues 寻求帮助。
        </p>
      </div>

      {faqs.map((category, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">
            <category.icon className="w-6 h-6 text-blue-500" />
            {category.category}
          </h2>
          <div className="space-y-4">
            {category.items.map((item, itemIdx) => (
              <div key={itemIdx} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-500">Q:</span>
                  {item.q}
                </h3>
                <p className="text-slate-600 ml-6">
                  <span className="text-green-500 font-semibold">A:</span> {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2>调试技巧</h2>
      
      <h3>查看详细日志</h3>
      <CodeBlock code={`# 实时查看日志
openclaw logs -f

# 查看最近 100 行
openclaw logs -n 100

# 调试模式启动
openclaw start --debug`} />

      <h3>检查服务状态</h3>
      <CodeBlock code={`# 查看整体状态
openclaw status

# 查看 Gateway 状态
openclaw gateway status

# 查看配置是否有效
openclaw validate`} />

      <h3>常见问题速查</h3>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            连接错误
          </h4>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• 检查网络连接</li>
            <li>• 验证 API Token</li>
            <li>• 查看防火墙设置</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            性能问题
          </h4>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• 减少 context_window</li>
            <li>• 切换到更快的模型</li>
            <li>• 关闭不必要的技能</li>
          </ul>
        </div>
      </div>

      <h2>获取帮助</h2>
      <p>如果以上方法都无法解决你的问题，可以通过以下渠道寻求帮助：</p>
      
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <a 
          href="https://discord.com/invite/clawd" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-indigo-50 p-4 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <h4 className="font-semibold text-indigo-900 mb-2">Discord 社区</h4>
          <p className="text-indigo-700 text-sm">实时交流，快速获得帮助</p>
        </a>
        <a 
          href="https://github.com/openclaw/openclaw/issues" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <h4 className="font-semibold text-slate-900 mb-2">GitHub Issues</h4>
          <p className="text-slate-700 text-sm">报告 Bug 或请求功能</p>
        </a>
        <a 
          href="https://docs.openclaw.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <h4 className="font-semibold text-blue-900 mb-2">官方文档</h4>
          <p className="text-blue-700 text-sm">查看详细文档说明</p>
        </a>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-slate-900 mb-2">💡 提交问题建议</h4>
        <p className="text-slate-700 text-sm">
          向社区求助时，建议提供：1) OpenClaw 版本 2) 配置文件（脱敏后）3) 错误日志 4) 复现步骤。
          这样可以帮助他人更快地理解和解决你的问题。
        </p>
      </div>
    </DocLayout>
  );
}
