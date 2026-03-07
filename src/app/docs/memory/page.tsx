import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { Brain, Clock, Database, Users, FileText, Search } from "lucide-react";

export const metadata = {
  title: "记忆与代理 - OpenClaw 教程",
};

export default function MemoryPage() {
  return (
    <DocLayout>
      <h1>记忆与代理</h1>
      
      <p>
        OpenClaw 的记忆系统让助手能够记住对话历史、用户偏好和重要信息，
        提供更加个性化的体验。
      </p>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          为什么需要记忆？
        </h3>
        <p className="text-indigo-100">
          没有记忆的助手就像金鱼——每次对话都从零开始。记忆让助手能持续学习你的偏好，
          提供越来越贴心的服务。
        </p>
      </div>

      <h2>记忆类型</h2>
      
      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-blue-500" />
            <h3 className="font-semibold text-slate-900">短期记忆</h3>
          </div>
          <p className="text-slate-600 mb-4">
            自动保存当前对话的历史记录，让助手理解上下文。
          </p>
          <CodeBlock 
            language="yaml"
            code={`agents:
  default:
    # 保留的对话轮数
    context_window: 10
    
    # 是否总结长对话
    summarize_threshold: 20`} 
          />
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-purple-500" />
            <h3 className="font-semibold text-slate-900">长期记忆</h3>
          </div>
          <p className="text-slate-600 mb-4">
            跨会话记住重要信息，如用户偏好、重要日期等。
          </p>
          <CodeBlock 
            language="yaml"
            code={`memory:
  enabled: true
  storage: file  # file, sqlite, redis
  path: ./memory
  auto_extract: true`} 
          />
        </div>
      </div>

      <h2>记忆文件结构</h2>
      <p>OpenClaw 在工作区的 memory 目录中存储记忆：</p>
      
      <CodeBlock 
        filename="memory/"
        code={`memory/
├── MEMORY.md           # 核心记忆（手动维护）
├── 2026-03-06.md       # 每日日志（自动生成）
├── 2026-03-05.md
└── embeddings/         # 向量嵌入存储
    └── ...`} 
      />

      <h2>MEMORY.md - 你的长期记忆</h2>
      <p>这是最重要的记忆文件，用于存储长期需要记住的信息：</p>
      
      <CodeBlock 
        filename="MEMORY.md"
        code={`# 用户记忆

## 基本信息
- 名字: 张三
- 职业: 软件工程师
- 时区: Asia/Shanghai
- 语言偏好: 简体中文

## 偏好设置
- 喜欢简洁的回答
- 偏好 Python 语言
- 不喜欢太正式的语气
- 代码风格：PEP8

## 重要日期
- 生日: 1990-05-15
- 项目截止日期: 2026-04-01

## 正在进行的项目
- OpenClaw 教程网站开发
- 个人知识库整理

## 技术栈
- 前端: React, TypeScript, TailwindCSS
- 后端: Node.js, Python
- 数据库: PostgreSQL, MongoDB`} 
      />

      <h2>自动记忆提取</h2>
      <p>开启后，助手会自动从对话中提取重要信息并保存：</p>
      
      <CodeBlock 
        language="yaml"
        code={`memory:
  auto_extract: true
  extract_topics:
    - personal_info    # 个人信息
    - preferences      # 偏好设置
    - facts            # 事实信息
    - todos            # 待办事项
    - projects         # 项目信息`} 
      />

      <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-r-lg">
        <h4 className="font-semibold text-green-900 mb-2">自动提取示例</h4>
        <div className="space-y-2 text-sm text-green-800">
          <p><strong>用户:</strong> "我叫李四，是一名设计师"</p>
          <p><strong>系统:</strong> 自动提取 → 名字: 李四, 职业: 设计师</p>
        </div>
      </div>

      <h2>多代理系统（Agents）</h2>
      
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-6 h-6 text-indigo-500" />
        <p className="text-slate-700">
          你可以配置多个不同的代理，每个有自己的个性和专长：
        </p>
      </div>

      <CodeBlock 
        language="yaml"
        code={`agents:
  # 通用助手 - 默认使用
  default:
    model: bailian/kimi-k2.5
    system_prompt: |
      你是一个 helpful 的 AI 助手，友好且专业。
      用简洁清晰的中文回答用户的问题。
  
  # 代码专家 - 编程相关
  coder:
    model: bailian/qwen3-coder-plus
    system_prompt: |
      你是资深程序员，擅长多种编程语言。
      提供清晰、高效、符合最佳实践的代码解决方案。
      优先使用中文注释。
    skills:
      - github
      - coding-agent
  
  # 创意写手 - 文案创作
  writer:
    model: bailian/qwen3.5-plus
    temperature: 0.9
    system_prompt: |
      你是创意写作专家，文风活泼有趣。
      擅长撰写文章、故事、营销文案。
  
  # 数据分析师
  analyst:
    model: bailian/glm-5
    system_prompt: |
      你是数据分析专家，严谨细致。
      擅长数据解读、报表分析、趋势预测。`} 
      />

      <h3>切换代理</h3>
      <p>在对话中动态切换使用的代理：</p>
      
      <div className="bg-slate-100 p-4 rounded-lg my-4 space-y-2">
        <p><strong>用户:</strong> <code>@coder 帮我 review 这段代码</code></p>
        <p><strong>助手:</strong> [切换到 coder 代理] 好的，让我看看这段代码...</p>
      </div>

      <h2>记忆搜索</h2>
      <p>助手会自动搜索相关记忆来回答问题。你也可以手动触发搜索：</p>
      
      <CodeBlock code={`# 手动触发记忆搜索（开发调试用）
openclaw memory search "用户的偏好"

# 查看记忆统计
openclaw memory stats`} />

      <h2>隐私与安全</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
          <FileText className="w-5 h-5 text-slate-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-900">本地存储</h4>
            <p className="text-slate-600 text-sm">所有记忆数据本地存储，不上传云端</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
          <Search className="w-5 h-5 text-slate-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-slate-900">完全控制</h4>
            <p className="text-slate-600 text-sm">用户可以完全控制哪些信息被记住</p>
          </div>
        </div>
      </div>

      <h2>最佳实践</h2>
      <ol className="space-y-3">
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">1</span>
          <div>
            <strong>定期整理</strong> - 每周回顾 MEMORY.md，删除过时信息
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">2</span>
          <div>
            <strong>结构化存储</strong> - 使用清晰的标题和分类
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">3</span>
          <div>
            <strong>保护隐私</strong> - 不要将密码等敏感信息存入记忆
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm flex-shrink-0">4</span>
          <div>
            <strong>适度依赖</strong> - 不是所有信息都需要长期记忆
          </div>
        </li>
      </ol>

      <div className="bg-indigo-50 p-6 rounded-xl mt-8">
        <h4 className="font-semibold text-indigo-900 mb-2">💡 小贴士</h4>
        <p className="text-indigo-800 text-sm">
          良好的记忆管理能让助手越用越懂你。建议从一开始就养成维护 MEMORY.md 的习惯，
          这会让你的 AI 助手体验提升一个档次。
        </p>
      </div>
    </DocLayout>
  );
}
