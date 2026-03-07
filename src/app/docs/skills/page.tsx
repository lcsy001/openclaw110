import DocLayout from "../../../components/DocLayout";
import CodeBlock from "../../../components/CodeBlock";
import { Puzzle, Wrench, Zap, Package, Plus, Share2 } from "lucide-react";

export const metadata = {
  title: "技能系统 - OpenClaw 教程",
};

const builtInSkills = [
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
  return (
    <DocLayout>
      <h1>技能系统</h1>
      
      <p>
        技能（Skills）是 OpenClaw 的核心扩展机制。每个技能都是一个独立的功能模块，
        可以为你的助手添加特定能力。
      </p>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl my-8">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Puzzle className="w-5 h-5" />
          什么是技能？
        </h3>
        <p className="text-purple-100">
          技能可以理解为助手的"工具包"。通过组合不同的技能，你可以打造出功能各异的 AI 助手。
        </p>
      </div>

      <h2>内置技能一览</h2>
      <p>OpenClaw 自带了许多实用的技能，开箱即用：</p>

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
              <h4 className="text-sm font-semibold text-slate-700 mb-3">配置示例：</h4>
              <CodeBlock language="yaml" code={skill.config} />
            </div>
          </div>
        ))}
      </div>

      <h2>使用内置技能</h2>
      <p>在配置文件中启用技能非常简单：</p>
      
      <CodeBlock 
        filename="config.yaml"
        language="yaml"
        code={`skills:
  # 简单启用（使用默认配置）
  - weather
  - web_search
  - calculator
  
  # 带自定义配置
  - name: reminder
    config:
      storage: memory`} 
      />

      <h2>创建自定义技能</h2>
      
      <h3>技能目录结构</h3>
      <CodeBlock 
        filename="my-skill/"
        code={`my-skill/
├── SKILL.md          # 技能描述文件（必需）
├── index.js          # 技能逻辑代码（可选）
└── package.json      # 依赖配置（可选）`} 
      />

      <h3>步骤 1：创建 SKILL.md</h3>
      <p>这是技能的入口文件，定义了技能的功能和使用方式：</p>
      
      <CodeBlock 
        filename="SKILL.md"
        code={`# My Skill

## Description
这个技能的简要描述，告诉 AI 这个技能能做什么。

## Tools

### search_news
搜索新闻的工具

参数:
- query: 搜索关键词 (string, required)
- limit: 返回结果数量 (number, optional, default: 5)

## Usage
使用示例：
- "搜索关于人工智能的最新新闻"
- "查找今天的科技资讯"`} 
      />

      <h3>步骤 2：编写技能代码（可选）</h3>
      <p>如果技能需要复杂的逻辑，可以添加 JavaScript/TypeScript 代码：</p>
      
      <CodeBlock 
        filename="index.js"
        code={`// 技能逻辑代码
module.exports = {
  // 初始化时调用
  async init(config) {
    console.log('技能已加载:', config);
    // 可以在这里初始化数据库连接、API 客户端等
  },
  
  // 定义工具函数
  tools: {
    async search_news({ query, limit = 5 }) {
      // 实现搜索逻辑
      const results = await fetchNewsAPI(query, limit);
      return results;
    },
    
    async get_weather({ city }) {
      // 实现天气查询
      const weather = await fetchWeatherAPI(city);
      return weather;
    }
  },
  
  // 清理资源
  async destroy() {
    console.log('技能已卸载');
  }
};`} 
      />

      <h3>步骤 3：注册技能</h3>
      <p>在 config.yaml 中添加你的技能：</p>
      
      <CodeBlock 
        language="yaml"
        code={`skills:
  # 本地技能
  - ./skills/my-awesome-skill
  
  # 带配置的技能
  - name: ./skills/my-skill
    config:
      api_key: \${MY_SKILL_API_KEY}`} 
      />

      <h2>技能最佳实践</h2>
      
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            单一职责
          </h4>
          <p className="text-green-800 text-sm">
            每个技能只做一件事，做好一件事。避免功能过于复杂。
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Package className="w-4 h-4" />
            清晰文档
          </h4>
          <p className="text-blue-800 text-sm">
            写好 SKILL.md，让 AI 理解如何使用你的技能。
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            错误处理
          </h4>
          <p className="text-yellow-800 text-sm">
            妥善处理异常情况，返回友好的错误信息。
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            分享社区
          </h4>
          <p className="text-purple-800 text-sm">
            开发了好用的技能？分享给社区！
          </p>
        </div>
      </div>

      <h2>分享你的技能</h2>
      <p>开发了好用的技能？欢迎分享给社区！你可以：</p>
      <ul>
        <li><strong>提交到官方仓库</strong> - 成为 OpenClaw 内置技能</li>
        <li><strong>发布到 npm</strong> - 他人可以通过 <code>npm install</code> 安装</li>
        <li><strong>分享到 Discord</strong> - 在社区频道展示你的作品</li>
      </ul>

      <h2>技能市场（即将推出）</h2>
      <p>
        我们正在开发官方技能市场，届时你可以：
      </p>
      <ul>
        <li>一键安装社区贡献的技能</li>
        <li>查看技能评分和使用统计</li>
        <li>轻松管理已安装的技能</li>
      </ul>
      
      <div className="bg-slate-100 p-6 rounded-xl mt-8 text-center">
        <p className="text-slate-600">
          💡 想学习更多？查看 <a href="/docs/tools" className="text-blue-600 hover:underline">工具与扩展</a> 了解 CLI 命令和 API 接口。
        </p>
      </div>
    </DocLayout>
  );
}
