import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { AlertCircle, CheckCircle, Terminal, Download, Settings } from "lucide-react";

export const metadata = {
  title: "安装 OpenClaw - OpenClaw 教程",
};

export default function InstallationPage() {
  return (
    <DocLayout>
      <h1>安装 OpenClaw</h1>
      
      <p>
        OpenClaw 支持 Windows、macOS 和 Linux 系统。选择适合你系统的安装方式，
        几分钟内即可开始使用。
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900">开始之前</h4>
            <p className="text-blue-800 text-sm mt-1">
              确保你的系统已安装 Node.js 18.0+。可以通过运行 <code>node --version</code> 检查版本。
            </p>
          </div>
        </div>
      </div>

      <h2>系统要求</h2>
      <div className="grid md:grid-cols-3 gap-4 my-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">Node.js</h4>
          <p className="text-slate-600 text-sm">版本 18.0 或更高</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">包管理器</h4>
          <p className="text-slate-600 text-sm">npm 或 yarn</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">Git（可选）</h4>
          <p className="text-slate-600 text-sm">用于克隆仓库</p>
        </div>
      </div>

      <h2>安装方式</h2>
      
      <h3>方式一：通过 npm 安装（推荐）</h3>
      <p>最简单的方式是全局安装 OpenClaw CLI：</p>
      
      <CodeBlock code="npm install -g openclaw" />

      <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">验证安装</h4>
            <p className="text-green-800 text-sm mt-1">
              安装完成后，运行以下命令验证是否成功：
            </p>
            <CodeBlock code="openclaw --version" />
          </div>
        </div>
      </div>

      <h3>方式二：从源码安装</h3>
      <p>如果你想参与开发或使用最新功能，可以从 GitHub 克隆源码：</p>
      
      <CodeBlock 
        code={`# 克隆仓库
git clone https://github.com/openclaw/openclaw.git

# 进入目录
cd openclaw

# 安装依赖
npm install

# 构建项目
npm run build

# 链接到全局（可选）
npm link`} 
      />

      <h3>方式三：使用 Docker</h3>
      <p>如果你更喜欢容器化部署，可以使用 Docker：</p>
      
      <CodeBlock 
        code={`# 拉取镜像
docker pull openclaw/openclaw:latest

# 运行容器
docker run -d \\
  --name openclaw \\
  -v $(pwd)/workspace:/app/workspace \\
  -p 3000:3000 \\
  openclaw/openclaw:latest`} 
      />

      <h2>初始化工作区</h2>
      <p>安装完成后，创建你的工作区目录：</p>
      
      <CodeBlock code="openclaw init my-assistant" />

      <p>这将创建一个包含以下结构的目录：</p>
      
      <CodeBlock 
        filename="my-assistant/"
        code={`├── config.yaml          # 主配置文件
├── .env                 # 环境变量
├── memory/              # 记忆存储目录
│   └── MEMORY.md       # 核心记忆文件
├── skills/              # 自定义技能目录
└── workspace/           # 工作文件目录`} 
      />

      <h2>配置环境变量</h2>
      <p>编辑 <code>.env</code> 文件，添加必要的 API 密钥：</p>
      
      <CodeBlock 
        filename=".env"
        code={`# AI 模型 API 密钥（至少配置一个）
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-your-anthropic-key

# 消息平台 Token（根据需要配置）
TELEGRAM_BOT_TOKEN=your-telegram-token
DISCORD_BOT_TOKEN=your-discord-token`} 
      />

      <h2>启动服务</h2>
      <p>一切准备就绪后，启动 OpenClaw：</p>
      
      <CodeBlock code="openclaw start" />

      <div className="bg-slate-900 text-slate-50 p-4 rounded-lg my-6 font-mono text-sm">
        <div className="flex items-center gap-2 mb-2 text-green-400">
          <Terminal className="w-4 h-4" />
          <span>终端输出</span>
        </div>
        <div className="space-y-1">
          <p><span className="text-green-400">✓</span> Config loaded</p>
          <p><span className="text-green-400">✓</span> Skills loaded: weather, web_search</p>
          <p><span className="text-green-400">✓</span> Telegram provider connected</p>
          <p><span className="text-green-400">✓</span> Agent &apos;default&apos; ready</p>
          <p className="text-blue-400">🚀 OpenClaw is running on http://localhost:3000</p>
        </div>
      </div>

      <h2>常见问题</h2>
      
      <h4>Q: 安装时遇到权限错误？</h4>
      <p>在 Linux/macOS 上，可能需要使用 sudo：</p>
      <CodeBlock code="sudo npm install -g openclaw" />

      <h4>Q: 如何更新到最新版本？</h4>
      <CodeBlock code="npm update -g openclaw" />

      <h4>Q: 如何卸载？</h4>
      <CodeBlock code="npm uninstall -g openclaw" />

      <h2>下一步</h2>
      <p>
        恭喜你完成安装！接下来请阅读 <a href="/docs/quickstart">快速开始</a> 指南，
        配置你的第一个消息平台连接。
      </p>

      <div className="flex items-center gap-4 mt-8">
        <a 
          href="/docs/quickstart" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          继续：快速开始
          <Download className="w-4 h-4" />
        </a>
      </div>
    </DocLayout>
  );
}
