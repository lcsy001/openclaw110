import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Puzzle, 
  MessageCircle,
  Terminal,
  Brain,
  Database,
  Code2,
  Layers,
  Sparkles,
  CheckCircle2,
  Github,
  Twitter
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "多平台消息",
    desc: "一键连接 Telegram、Discord、WhatsApp、飞书等主流平台，统一消息管理界面。",
  },
  {
    icon: Puzzle,
    title: "模块化技能",
    desc: "按需加载技能模块，天气查询、网络搜索、日程提醒等功能即插即用。",
  },
  {
    icon: Shield,
    title: "数据安全",
    desc: "完全本地运行，敏感数据不上传云端，你的隐私由你掌控。",
  },
  {
    icon: Zap,
    title: "高性能架构",
    desc: "基于 Node.js 构建，轻量高效，支持高并发消息处理。",
  },
];

const advancedFeatures = [
  {
    icon: Brain,
    title: "智能记忆系统",
    desc: "自动记录对话历史，支持长期记忆存储，让助手越用越懂你。",
  },
  {
    icon: Terminal,
    title: "强大的 CLI",
    desc: "丰富的命令行工具，轻松管理配置、技能和会话。",
  },
  {
    icon: Code2,
    title: "易于扩展",
    desc: "简单的 API 设计，使用 JavaScript/TypeScript 开发自定义技能。",
  },
  {
    icon: Database,
    title: "多模型支持",
    desc: "支持 OpenAI、Anthropic、Google Gemini 及本地模型（Ollama）。",
  },
];

const useCases = [
  {
    title: "个人助理",
    desc: "管理日程、设置提醒、查询信息，成为你的得力帮手。",
    icon: Sparkles,
  },
  {
    title: "团队协作",
    desc: "集成到企业通讯工具，自动化工作流程，提升团队效率。",
    icon: Layers,
  },
  {
    title: "开发者工具",
    desc: "代码审查、技术问答、API 文档查询，程序员的编程伙伴。",
    icon: Code2,
  },
  {
    title: "知识管理",
    desc: "整理笔记、总结文档、智能检索，打造个人知识库。",
    icon: Database,
  },
];

const highlights = [
  "开源免费，MIT 协议",
  "活跃的社区支持",
  "详细的文档教程",
  "持续更新迭代",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="font-bold text-xl text-slate-800">OpenClaw</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/docs/installation" className="text-slate-600 hover:text-slate-900">
              文档
            </Link>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900"
            >
              GitHub
            </a>
            <Link
              href="/docs/quickstart"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始使用
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>v1.0 正式发布</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            构建你的智能助手
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              从未如此简单
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            OpenClaw 是一个开源的智能助手框架。支持多平台消息、技能系统、记忆管理，
            让你轻松打造个性化的 AI 助手。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/docs/installation"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              开始安装
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/docs/quickstart"
              className="bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              查看教程
            </Link>
          </div>
          
          {/* Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              强大而灵活的功能
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              OpenClaw 提供完整的智能助手解决方案，从消息接入到 AI 能力，一应俱全。
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              高级特性
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              为进阶用户提供的强大功能，满足更复杂的应用场景。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              应用场景
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              无论是个人使用还是团队协作，OpenClaw 都能胜任。
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <useCase.icon className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">准备好开始了吗？</h2>
          <p className="text-blue-100 mb-8 text-lg">
            跟随我们的教程，5 分钟内搭建你的第一个 OpenClaw 助手
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/installation"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              立即开始
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
            >
              <Github className="w-5 h-5" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="font-semibold text-slate-800">OpenClaw</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm">
                开源的智能助手框架，让每个人都能拥有个性化的 AI 助手。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">文档</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/docs/installation" className="hover:text-slate-700">安装指南</Link></li>
                <li><Link href="/docs/quickstart" className="hover:text-slate-700">快速开始</Link></li>
                <li><Link href="/docs/configuration" className="hover:text-slate-700">配置说明</Link></li>
                <li><Link href="/docs/skills" className="hover:text-slate-700">技能开发</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">社区</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">GitHub</a></li>
                <li><a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">Discord</a></li>
                <li><a href="#" className="hover:text-slate-700">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 OpenClaw. 开源协议 MIT.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
