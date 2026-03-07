import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { Terminal, Command, Package, GitBranch, Cpu, Globe, Search, Globe2, Image, FileText, MessageSquare, Users, Clock, Layers } from "lucide-react";

export const metadata = {
  title: "工具与扩展 - OpenClaw 教程",
};

const cliCommands = [
  { cmd: "openclaw init [name]", desc: "初始化新工作区" },
  { cmd: "openclaw start", desc: "启动服务" },
  { cmd: "openclaw stop", desc: "停止服务" },
  { cmd: "openclaw status", desc: "查看运行状态" },
  { cmd: "openclaw validate", desc: "验证配置文件" },
  { cmd: "openclaw logs", desc: "查看日志" },
];

const gatewayCommands = [
  { cmd: "openclaw gateway status", desc: "查看 Gateway 状态" },
  { cmd: "openclaw gateway start", desc: "启动 Gateway" },
  { cmd: "openclaw gateway stop", desc: "停止 Gateway" },
  { cmd: "openclaw gateway restart", desc: "重启 Gateway" },
];

const skillCommands = [
  { cmd: "openclaw skill list", desc: "列出已安装技能" },
  { cmd: "openclaw skill install <name>", desc: "安装技能" },
  { cmd: "openclaw skill update <name>", desc: "更新技能" },
  { cmd: "openclaw skill remove <name>", desc: "移除技能" },
];

export default function ToolsPage() {
  return (
    <DocLayout>
      <h1>工具与扩展</h1>
      
      <p>
        OpenClaw 提供了丰富的内置工具和扩展机制，让你可以根据需求定制助手的功能。
      </p>

      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          CLI 工具
        </h3>
        <p className="text-slate-300">
          强大的命令行接口，让你轻松管理 OpenClaw 的方方面面。
        </p>
      </div>

      <h2>基础命令</h2>
      <div className="bg-slate-50 rounded-xl overflow-hidden my-6">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">命令</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">说明</th>
            </tr>
          </thead>
          <tbody>
            {cliCommands.map((item, idx) => (
              <tr key={idx} className="border-t border-slate-200">
                <td className="px-6 py-3 font-mono text-sm text-slate-800">{item.cmd}</td>
                <td className="px-6 py-3 text-slate-600">{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>高级用法</h3>
      <CodeBlock 
        code={`# 指定配置文件启动
openclaw start --config config.prod.yaml

# 后台运行
openclaw start --daemon

# 调试模式（详细日志）
openclaw start --debug

# 查看实时日志
openclaw logs -f

# 指定日志级别
openclaw logs --level debug`} 
      />

      <h2>Gateway 管理</h2>
      <p>OpenClaw Gateway 是消息路由的核心组件：</p>
      
      <div className="bg-slate-50 rounded-xl overflow-hidden my-6">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">命令</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">说明</th>
            </tr>
          </thead>
          <tbody>
            {gatewayCommands.map((item, idx) => (
              <tr key={idx} className="border-t border-slate-200">
                <td className="px-6 py-3 font-mono text-sm text-slate-800">{item.cmd}</td>
                <td className="px-6 py-3 text-slate-600">{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>技能管理</h2>
      
      <h3>安装技能</h3>
      <CodeBlock 
        code={`# 从 npm 安装官方技能
openclaw skill install @openclaw/weather

# 从 GitHub 安装
openclaw skill install github:user/repo

# 从本地路径安装
openclaw skill install ./my-custom-skill`} 
      />

      <h3>管理技能</h3>
      <div className="bg-slate-50 rounded-xl overflow-hidden my-6">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">命令</th>
              <th className="text-left px-6 py-3 font-semibold text-slate-700">说明</th>
            </tr>
          </thead>
          <tbody>
            {skillCommands.map((item, idx) => (
              <tr key={idx} className="border-t border-slate-200">
                <td className="px-6 py-3 font-mono text-sm text-slate-800">{item.cmd}</td>
                <td className="px-6 py-3 text-slate-600">{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>会话管理</h2>
      <p>管理和监控活跃的对话会话：</p>
      
      <CodeBlock 
        code={`# 列出所有会话
openclaw sessions list

# 查看会话详情
openclaw sessions info <session-id>

# 发送消息到会话
openclaw sessions send <session-id> "你好"

# 结束会话
openclaw sessions kill <session-id>`} 
      />

      <h2>子代理（Sub-agents）</h2>
      <p>对于复杂任务，可以 spawn 子代理并行处理：</p>
      
      <CodeBlock 
        code={`# 创建子代理会话执行特定任务
openclaw subagent spawn --task "分析这个代码库的性能瓶颈"

# 列出活跃子代理
openclaw subagent list

# 向子代理发送指令
openclaw subagent steer <id> "重点关注内存使用"

# 终止子代理
openclaw subagent kill <id>`} 
      />

      <h2>API 接口</h2>
      <p>OpenClaw 提供 HTTP API 供外部调用：</p>
      
      <h3>发送消息</h3>
      <CodeBlock 
        language="bash"
        code={`curl -X POST http://localhost:3000/api/v1/send \\
  -H "Content-Type: application/json" \\
  -d '{
    "session": "abc123",
    "message": "你好"
  }'`} 
      />

      <h3>获取会话历史</h3>
      <CodeBlock 
        language="bash"
        code={`curl http://localhost:3000/api/v1/sessions/abc123/history`} 
      />

      <h3>执行技能</h3>
      <CodeBlock 
        language="bash"
        code={`curl -X POST http://localhost:3000/api/v1/skills/weather/execute \\
  -H "Content-Type: application/json" \\
  -d '{
    "city": "北京"
  }'`} 
      />

      <h2>内置 Agent 工具</h2>
      <p>OpenClaw 为 AI Agent 提供了一系列强大的内置工具：</p>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4" />
            web_search
          </h4>
          <p className="text-slate-600 text-sm">搜索网络获取最新信息，支持 Brave、Perplexity 等</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Globe2 className="w-4 h-4" />
            web_fetch
          </h4>
          <p className="text-slate-600 text-sm">获取网页内容并提取为可读文本</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Image className="w-4 h-4" />
            browser
          </h4>
          <p className="text-slate-600 text-sm">控制浏览器进行自动化操作、截图等</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-orange-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            read / write / edit
          </h4>
          <p className="text-slate-600 text-sm">文件系统操作，读写和编辑文件</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-pink-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            exec / process
          </h4>
          <p className="text-slate-600 text-sm">执行 shell 命令和管理后台进程</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-cyan-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            message
          </h4>
          <p className="text-slate-600 text-sm">发送消息到各种平台（Telegram、Discord 等）</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            sessions_list / sessions_spawn
          </h4>
          <p className="text-slate-600 text-sm">管理会话和生成子代理</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-teal-500">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            cron
          </h4>
          <p className="text-slate-600 text-sm">定时任务管理</p>
        </div>
      </div>

      <h3>工具配置</h3>
      <p>在 openclaw.json 中配置工具权限：</p>
      <CodeBlock 
        filename="openclaw.json"
        code={`{
  "tools": {
    "allow": ["web_search", "read", "write", "exec"],
    "deny": ["browser"],
    "profile": "coding"
  }
}`} 
      />

      <h3>工具组（Tool Groups）</h3>
      <p>使用快捷方式批量配置工具：</p>
      <CodeBlock 
        code={`# 可用工具组
group:fs       → read, write, edit, apply_patch
group:runtime  → exec, bash, process
group:web      → web_search, web_fetch
group:ui       → browser, canvas
group:sessions → sessions_list, sessions_history, sessions_send, sessions_spawn
group:memory   → memory_search, memory_get
group:messaging → message

# 配置示例
{
  "tools": {
    "allow": ["group:fs", "group:web", "sessions_list"]
  }
}`} 
      />

      <h2>扩展开发</h2>
      
      <h3>自定义 Provider</h3>
      <p>实现新的消息平台支持：</p>
      
      <CodeBlock 
        filename="providers/my-provider.js"
        code={`class MyProvider {
  constructor(config) {
    this.config = config;
  }
  
  async connect() {
    // 建立连接
    console.log('连接到消息平台...');
  }
  
  async send(message) {
    // 发送消息
    await this.api.sendMessage(message);
  }
  
  async onMessage(callback) {
    // 接收消息
    this.api.on('message', callback);
  }
}

module.exports = MyProvider;`} 
      />

      <h3>Hook 系统</h3>
      <p>在关键生命周期插入自定义逻辑：</p>
      
      <CodeBlock 
        filename="hooks.js"
        code={`module.exports = {
  // 消息接收前
  beforeReceive: async (message) => {
    // 过滤或修改消息
    if (message.text.includes('敏感词')) {
      return null; // 阻止消息
    }
    return message;
  },
  
  // 回复发送前
  beforeSend: async (reply) => {
    // 格式化回复
    reply.text = reply.text.trim();
    return reply;
  },
  
  // 错误处理
  onError: async (error) => {
    // 记录或通知
    console.error('发生错误:', error);
  }
};`} 
      />

      <h2>循环检测（Loop Detection）</h2>
      <p>OpenClaw 内置工具调用循环检测，防止 Agent 陷入无限循环：</p>
      <CodeBlock 
        filename="openclaw.json"
        code={`{
  "tools": {
    "loopDetection": {
      "enabled": true,
      "warningThreshold": 10,
      "criticalThreshold": 20,
      "detectors": {
        "genericRepeat": true,
        "knownPollNoProgress": true,
        "pingPong": true
      }
    }
  }
}`} 
      /> 
      />

      <h2>插件发布</h2>
      <p>完整的插件包含以下文件：</p>
      
      <CodeBlock 
        filename="my-plugin/"
        code={`my-plugin/
├── package.json       # 插件元数据
│   {
│     "name": "@yourname/my-plugin",
│     "version": "1.0.0",
│     "main": "index.js"
│   }
├── index.js           # 入口文件
├── SKILL.md           # 技能定义（可选）
└── README.md          # 使用说明`} 
      />

      <h3>发布步骤</h3>
      <ol className="space-y-2">
        <li>确保代码质量，添加测试</li>
        <li>编写完善的 README 文档</li>
        <li>选择合适的开源协议（推荐 MIT）</li>
        <li>发布到 npm 或 GitHub</li>
        <li>在 Discord 社区分享</li>
      </ol>

      <h2>子代理（Sub-agents）</h2>
      <p>对于复杂任务，可以 spawn 子代理并行处理：</p>
      
      <CodeBlock 
        code={`# 创建子代理会话执行特定任务
openclaw subagent spawn --task "分析这个代码库的性能瓶颈"

# 列出活跃子代理
openclaw subagent list

# 向子代理发送指令
openclaw subagent steer <id> "重点关注内存使用"

# 终止子代理
openclaw subagent kill <id>`} 
      />

      <h3>会话管理工具</h3>
      <CodeBlock 
        code={`# 列出所有会话
openclaw sessions list

# 查看会话详情
openclaw sessions info <session-id>

# 发送消息到会话
openclaw sessions send <session-id> "你好"

# 结束会话
openclaw sessions kill <session-id>`} 
      />

      <h2>ClawHub 技能市场</h2>
      <p>发现和使用社区贡献的技能：</p>
      <CodeBlock 
        code={`# 浏览可用技能
openclaw hub search

# 安装社区技能
openclaw hub install weather-plus

# 查看技能详情
openclaw hub info weather-plus`} 
      />

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          加入开发者社区
        </h4>
        <p className="text-slate-700 text-sm">
          有扩展开发的想法？加入我们的 Discord 社区，与其他开发者交流经验！
        </p>
      </div>
    </DocLayout>
  );
}
