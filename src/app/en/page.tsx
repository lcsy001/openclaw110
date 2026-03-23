"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, Zap, Shield, Puzzle, MessageCircle,
  Terminal, Brain, Database, Code2, Layers, Sparkles,
  CheckCircle2, Github, Twitter, Globe, ChevronDown,
  Smartphone, Wifi, Plug, Wrench, Users
} from "lucide-react";
import { translations, TranslationKey } from "@/lib/i18n";

function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = require("react").useState(false);
  const isEnglish = pathname.startsWith("/en");
  const currentLang = isEnglish ? "en" : "zh";
  
  const languages = [
    { code: "zh", name: "简体中文", flag: "中" },
    { code: "en", name: "English", flag: "EN" },
  ];
  
  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];
  
  const switchLanguage = (langCode: string) => {
    let newPath = langCode === "en" ? "/en" : "/";
    window.location.href = newPath;
  };
  
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
        <Globe className="w-4 h-4" />
        <span className="font-medium">{currentLangObj.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => switchLanguage(lang.code)} className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${currentLang === lang.code ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-700'}`}>
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ENHomePage() {
  const pathname = "/en";
  const lang = "en";
  
  const t = useMemo(() => (key: TranslationKey): string => (translations[lang][key] || key), [lang]);

  const getLangPath = (path: string) => `/en${path === "/" ? "" : path}`;

  const features = [
    { icon: MessageCircle, titleKey: "features.multiPlatform" as TranslationKey, descKey: "features.multiPlatformDesc" as TranslationKey },
    { icon: Puzzle, titleKey: "features.modularSkills" as TranslationKey, descKey: "features.modularSkillsDesc" as TranslationKey },
    { icon: Shield, titleKey: "features.dataSecurity" as TranslationKey, descKey: "features.dataSecurityDesc" as TranslationKey },
    { icon: Zap, titleKey: "features.highPerformance" as TranslationKey, descKey: "features.highPerformanceDesc" as TranslationKey },
  ];

  const advancedFeatures = [
    { icon: Brain, titleKey: "advanced.memory" as TranslationKey, descKey: "advanced.memoryDesc" as TranslationKey },
    { icon: Terminal, titleKey: "advanced.cli" as TranslationKey, descKey: "advanced.cliDesc" as TranslationKey },
    { icon: Code2, titleKey: "advanced.extensible" as TranslationKey, descKey: "advanced.extensibleDesc" as TranslationKey },
    { icon: Database, titleKey: "advanced.multiModel" as TranslationKey, descKey: "advanced.multiModelDesc" as TranslationKey },
  ];

  const useCases = [
    { titleKey: "usecases.personal" as TranslationKey, descKey: "usecases.personalDesc" as TranslationKey, icon: Sparkles },
    { titleKey: "usecases.team" as TranslationKey, descKey: "usecases.teamDesc" as TranslationKey, icon: Layers },
    { titleKey: "usecases.dev" as TranslationKey, descKey: "usecases.devDesc" as TranslationKey, icon: Code2 },
    { titleKey: "usecases.knowledge" as TranslationKey, descKey: "usecases.knowledgeDesc" as TranslationKey, icon: Database },
  ];

  const moreFeatures = [
    { icon: Smartphone, titleKey: "more.nodes" as TranslationKey, descKey: "more.nodesDesc" as TranslationKey, href: "/docs/nodes" },
    { icon: Wifi, titleKey: "more.remote" as TranslationKey, descKey: "more.remoteDesc" as TranslationKey, href: "/docs/remote" },
    { icon: MessageCircle, titleKey: "more.channels" as TranslationKey, descKey: "more.channelsDesc" as TranslationKey, href: "/docs/channels" },
    { icon: Plug, titleKey: "more.plugins" as TranslationKey, descKey: "more.pluginsDesc" as TranslationKey, href: "/docs/plugins" },
    { icon: Shield, titleKey: "more.security" as TranslationKey, descKey: "more.securityDesc" as TranslationKey, href: "/docs/security" },
    { icon: Wrench, titleKey: "more.troubleshooting" as TranslationKey, descKey: "more.troubleshootingDesc" as TranslationKey, href: "/docs/troubleshooting" },
    { icon: Users, titleKey: "more.multiagent" as TranslationKey, descKey: "more.multiagentDesc" as TranslationKey, href: "/docs/multiagent" },
  ];

  const highlights = ["hero.highlight.1", "hero.highlight.2", "hero.highlight.3", "hero.highlight.4"] as TranslationKey[];

  const navLinks = [
    { href: "/docs/installation", labelKey: "nav.install" as TranslationKey },
    { href: "/docs/quickstart", labelKey: "nav.quickstart" as TranslationKey },
    { href: "/docs/channels", labelKey: "nav.channels" as TranslationKey },
    { href: "/docs/nodes", labelKey: "nav.nodes" as TranslationKey },
    { href: "/docs/remote", labelKey: "nav.remote" as TranslationKey },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/en" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="font-bold text-xl text-slate-800">OpenClaw</span>
          </Link>
          <nav className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={getLangPath(link.href)} className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
            <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900">GitHub</a>
            <LanguageSwitcher />
            <Link href={getLangPath("/docs/quickstart")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</Link>
          </nav>
        </div>
      </header>
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t("hero.title")}<br/>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t("hero.subtitle")}</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">{t("hero.description")}</p>
          <div className="flex items-center justify-center gap-4">
            <Link href={getLangPath("/docs/installation")} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 flex items-center gap-2">
              {t("hero.startInstall")}<ArrowRight className="w-5 h-5" />
            </Link>
            <Link href={getLangPath("/docs/quickstart")} className="bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50">
              {t("hero.viewTutorial")}
            </Link>
          </div>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-slate-900 rounded-xl p-4 text-left">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-slate-400 text-sm ml-2">Terminal</span>
                </div>
                <span className="text-slate-500 text-xs">One-click Install</span>
              </div>
              <div className="font-mono text-sm">
                <span className="text-green-400">$</span> <span className="text-white">curl -fsSL https://openclaw.ai/install.sh | bash</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-3">Works on macOS, Windows and Linux</p>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{t(item)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("features.title")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t("features.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{t(feature.titleKey)}</h3>
                <p className="text-slate-600 text-sm">{t(feature.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("advanced.title")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t("advanced.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-slate-600 text-sm">{t(feature.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("more.title")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t("more.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreFeatures.map((feature, idx) => (
              <Link key={idx} href={getLangPath(feature.href)} className="p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{t(feature.titleKey)}</h3>
                <p className="text-slate-600 text-sm">{t(feature.descKey)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t("usecases.title")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t("usecases.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm">
                <useCase.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{t(useCase.titleKey)}</h3>
                <p className="text-slate-600 text-sm">{t(useCase.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-blue-100 mb-8 text-lg">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={getLangPath("/docs/installation")} className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50">
              {t("cta.getStarted")}<ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold">
              <Github className="w-5 h-5" />Star on GitHub
            </a>
          </div>
        </div>
      </section>
      <footer className="border-t border-slate-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Link href="/en" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <span className="text-white font-bold text-sm flex items-center justify-center h-full">O</span>
                </div>
                <span className="font-semibold text-slate-800">OpenClaw</span>
              </Link>
              <p className="text-slate-500 text-sm">Open Source AI Assistant Framework</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Docs</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href={getLangPath("/docs/installation")}>Installation</Link></li>
                <li><Link href={getLangPath("/docs/quickstart")}>Quick Start</Link></li>
                <li><Link href={getLangPath("/docs/configuration")}>Configuration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
            © 2026 OpenClaw. MIT License.
          </div>
        </div>
      </footer>
    </div>
  );
}
