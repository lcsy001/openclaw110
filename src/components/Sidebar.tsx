"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Settings, 
  Puzzle, 
  Brain, 
  Wrench, 
  Rocket,
  ChevronRight,
  Home,
  Lightbulb,
  Zap,
  HelpCircle
} from "lucide-react";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  {
    section: "入门指南",
    items: [
      { href: "/docs/installation", label: "安装 OpenClaw", icon: Rocket },
      { href: "/docs/quickstart", label: "快速开始", icon: BookOpen },
    ],
  },
  {
    section: "核心概念",
    items: [
      { href: "/docs/configuration", label: "配置文件", icon: Settings },
      { href: "/docs/skills", label: "技能系统", icon: Puzzle },
      { href: "/docs/memory", label: "记忆与代理", icon: Brain },
      { href: "/docs/tools", label: "工具与扩展", icon: Wrench },
    ],
  },
  {
    section: "进阶内容",
    items: [
      { href: "/docs/examples", label: "使用示例", icon: Lightbulb },
      { href: "/docs/advanced", label: "高级主题", icon: Zap },
      { href: "/docs/faq", label: "常见问题", icon: HelpCircle },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 overflow-y-auto">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">O</span>
          </div>
          <span className="font-bold text-xl text-slate-800">OpenClaw</span>
        </Link>

        <nav className="space-y-6">
          {navItems.map((item, idx) => {
            if ("section" in item) {
              return (
                <div key={idx}>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    {item.section}
                  </h3>
                  <ul className="space-y-1">
                    {item.items?.map((subItem) => {
                      const Icon = subItem.icon;
                      const isActive = pathname === subItem.href;
                      return (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{subItem.label}</span>
                            {isActive && (
                              <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }

            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
        <a
          href="https://github.com/openclaw/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub 仓库
        </a>
      </div>
    </aside>
  );
}
