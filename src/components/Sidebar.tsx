"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
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
import zhTranslations from "./i18n/zh";
import enTranslations from "./i18n/en";

export default function Sidebar() {
  const pathname = usePathname();
  
  // 从路径中检测语言: /en/docs/xxx -> en, /docs/xxx -> zh
  const isEnglish = pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const translations = lang === "en" ? enTranslations : zhTranslations;
  const t = useMemo(() => {
    return (key: string): string => {
      return (translations as Record<string, string>)[key] || key;
    };
  }, [lang, translations]);

  // 根据语言生成正确的路径
  const getLangPrefix = () => lang === "en" ? "/en" : "";
  
  const navItems = [
    { href: "/", label: t("sidebar.home"), icon: Home },
    {
      section: t("sidebar.gettingStarted"),
      items: [
        { href: "/docs/installation", label: t("sidebar.installation"), icon: Rocket },
        { href: "/docs/quickstart", label: t("sidebar.quickStart"), icon: BookOpen },
      ],
    },
    {
      section: t("sidebar.coreConcepts"),
      items: [
        { href: "/docs/configuration", label: t("sidebar.configuration"), icon: Settings },
        { href: "/docs/skills", label: t("sidebar.skills"), icon: Puzzle },
        { href: "/docs/memory", label: t("sidebar.memory"), icon: Brain },
        { href: "/docs/tools", label: t("sidebar.tools"), icon: Wrench },
      ],
    },
    {
      section: t("sidebar.advanced"),
      items: [
        { href: "/docs/nodes", label: t("sidebar.nodes"), icon: Puzzle },
        { href: "/docs/remote", label: t("sidebar.remote"), icon: Zap },
        { href: "/docs/channels", label: t("sidebar.channels"), icon: BookOpen },
        { href: "/docs/plugins", label: t("sidebar.plugins"), icon: Settings },
        { href: "/docs/security", label: t("sidebar.security"), icon: Brain },
        { href: "/docs/troubleshooting", label: t("sidebar.troubleshooting"), icon: HelpCircle },
        { href: "/docs/multiagent", label: t("sidebar.multiagent"), icon: Lightbulb },
        { href: "/docs/examples", label: t("sidebar.examples"), icon: Rocket },
        { href: "/docs/advanced", label: t("sidebar.advancedTopic"), icon: Zap },
        { href: "/docs/faq", label: t("sidebar.faq"), icon: HelpCircle },
      ],
    },
  ];

  const getHrefWithLang = (href: string) => {
    // 如果是首页
    if (href === "/") {
      return lang === "en" ? "/en" : "/";
    }
    // 其他页面添加语言前缀
    return `${getLangPrefix()}${href}`;
  };

  // 检查路径是否匹配（考虑语言前缀）
  const isPathActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/en";
    }
    const fullPath = `${getLangPrefix()}${href}`;
    return pathname === fullPath;
  };

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-200 overflow-y-auto">
      <div className="p-6">
        <Link href={lang === "en" ? "/en" : "/"} className="flex items-center gap-2 mb-8">
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
                      const isActive = isPathActive(subItem.href);
                      return (
                        <li key={subItem.href}>
                          <Link
                            href={getHrefWithLang(subItem.href)}
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
            const isActive = isPathActive(item.href);
            return (
              <Link
                key={item.href}
                href={getHrefWithLang(item.href)}
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


    </aside>
  );
}
