"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
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
  Twitter,
  Globe,
  ChevronDown,
  Smartphone,
  Wifi,
  Plug,
  Wrench,
  Users,
  Copy,
  Command,
  Heart,
  Star
} from "lucide-react";
import { translations, TranslationKey } from "@/lib/i18n";

function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // 从路径中检测语言
  const isEnglish = pathname.startsWith("/en");
  const currentLang = isEnglish ? "en" : "zh";
  
  const languages = [
    { code: "zh", name: "简体中文", flag: "中" },
    { code: "en", name: "English", flag: "EN" },
  ];
  
  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];
  
  const switchLanguage = (langCode: string) => {
    let newPath: string;
    if (langCode === "en") {
      // 切换到英文: / -> /en
      newPath = `/en`;
    } else {
      // 切换到中文: /en -> /
      newPath = pathname.replace(/^\/en/, "") || "/";
    }
    window.location.href = newPath;
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{currentLangObj.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors ${
                  currentLang === lang.code 
                    ? 'text-blue-600 font-medium bg-blue-50' 
                    : 'text-slate-700'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function HomePage({ params }: { params: { lang?: string } }) {
  // 优先使用 params.lang，否则从路径中检测语言
  const pathname = usePathname();
  const langParam = params?.lang;
  const isEnglish = langParam === "en" || pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "zh";
  
  const t = useMemo(() => {
    return (key: TranslationKey): string => {
      return translations[lang][key] || key;
    };
  }, [lang]);

  const getLangPath = (path: string) => {
    if (lang === "en") {
      return `/en${path === "/" ? "" : path}`;
    }
    return path;
  };

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

  const highlights = [
    "hero.highlight.1",
    "hero.highlight.2", 
    "hero.highlight.3",
    "hero.highlight.4",
  ] as TranslationKey[];

  const testimonials = [
    { quote: "Setup @openclaw yesterday. All I have to say is, wow. First I was using my Claude Max sub and I used all of my limit quickly, so today I had my claw bot setup a proxy to route my CoPilot subscription as a API endpoint so now it runs on that. It's the fact that claw can just keep building upon itself just by talking to it in discord is crazy. The future is already here.", author: "@jonahships_" },
    { quote: "Tried Claw. I tried to build my own AI assistant bots before, and I am very impressed how many hard things Claw gets right. Persistent memory, persona onboarding, comms integration, heartbeats. A few minor wrinkles remain, but the end result is AWESOME.", author: "@AryehDubois" },
    { quote: "I've been saying for like six months that even if LLMs suddenly stopped improving, we could spend years discovering new transformative uses. @openclaw feels like that kind of 'just had to glue all the parts together' leap forward. Incredible experience.", author: "@markjaquith" },
    { quote: "Why @openclaw is nuts: your context and skills live on YOUR computer, not a walled garden. It's open source. Growing community building skills. Only 19 days old and constantly improving.", author: "@danpeguine" },
    { quote: "Yeah this was 1,000% worth it. Separate Claude subscription + Claw, managing Claude Code / Codex sessions I can kick off anywhere, autonomously running tests on my app and capturing errors through a sentry webhook then resolving them and opening PRs... The future is here.", author: "@nateliason" },
    { quote: "A smart model with eyes and hands at a desk with keyboard and mouse. You message it like a coworker and it does everything a person could do with that Mac mini. That's what you have now.", author: "@nathanclark_" },
    { quote: "OpenClaw is a 24/7 assistant with access to its own computer. What if there were ten, or a hundred, or a thousand?? All running 24/7 in the cloud with access to your files, Gmail, calendar, everything about you... That's the future, and we're living it today.", author: "@nickvasiles" },
    { quote: "At this point I don't even know what to call @openclaw. It is something new. After a few weeks in with it, this is the first time I have felt like I am living in the future since the launch of ChatGPT.", author: "@davemorin" },
    { quote: "OpenClaw is the first 'software' in ages for which I constantly check for new releases on GitHub. It's hard to put into words. It's a special project.", author: "@cnakazawa" },
    { quote: "When you experience @openclaw it gives the same kick as when we first saw the power of ChatGPT, DeepSeek, and Claude Code. You realize that a fundamental shift is happening on how we use AI.", author: "@abhi__katiyar" },
    { quote: "It's running my company.", author: "@therno" },
    { quote: "After years of AI hype, I thought nothing could faze me. Then I installed @openclaw. From nervous 'hi what can you do?' to full throttle - design, code review, taxes, PM, content pipelines... AI as teammate, not tool. The endgame of digital employees is here.", author: "@lycfyi" },
    { quote: "Just shipped my first personal AI assistant. On WhatsApp. Builds my second brain while I chat. Memory moves across agents (Codex, Cursor, Manus, etc.) And a lot more skills still to plug in. Personal AI is getting real with @steipete's @openclaw.", author: "@christinetyip" },
    { quote: "It will actually be the thing that nukes a ton of startups, not ChatGPT as people meme about. The fact that it's hackable (and more importantly, self-hackable) and hostable on-prem will make sure tech like this DOMINATES conventional SaaS imo.", author: "@rovensky" },
    { quote: "Got OpenClaw set up and now I have an AI assistant named Claudia who lives in Telegram, remembers everything I tell her, and can actually *do* stuff. She just wrote this tweet. Meta? Maybe. Cool? Absolutely.", author: "@darrwalk" },
    { quote: "Current level of open-source apps capabilities: does everything, connects to everything, remembers everything. It's all collapsing into one unique personal OS — all apps, interfaces, walled gardens etc gone.", author: "@jakubkrcmar" },
    { quote: "I've enjoyed Brosef, my @openclaw so much that I needed to clone him. Brosef figured out exactly how to do it, then executed it himself so I have 3 instances running concurrently in his Discord server home.", author: "@jdrhyne" },
    { quote: "The future of how AI personal assistants look like is @openclaw. Has already help me submit health reimbursements, find doctor appointments, find and send me relevant documents, among others.", author: "@Cucho" },
    { quote: "Finally tried my own @openclaw and I've been blown away. This is unbelievably powerful and virtually limitless, you can create your own extensions in few hours with the help of AI.", author: "@ivanfioravanti" },
    { quote: "I can understand why people love @openclaw so much. I wanted to automate some tasks from Todoist and claw was able to create a skill for it on its own, all within a Telegram chat.", author: "@iamsubhrajyoti" },
    { quote: "Using @openclaw for a week and it genuinely feels like early AGI. The gap between 'what I can imagine' and 'what actually works' has never been smaller.", author: "@tobi_bsf" },
    { quote: "@openclaw is the most interesting project I've come across recently—an open-source personal AI assistant that can call almost any tool through plugins.", author: "@AdamShao" },
    { quote: "OpenClaw built me a simple Stumbleupon for some of my favourite articles. From my phone, while putting my baby to sleep...", author: "@vallver" },
    { quote: "Everyday my @openclaw is getting better. It's becoming so important, especially with multi agent.", author: "@adam91holt" },
    { quote: "Siri should have been this. And so much more.", author: "@crossiBuilds" },
    { quote: "The open source community built a better version of Siri while Apple has been lying flat for years.", author: "@Hesamation" },
    { quote: "Feels like using Linux vs Windows 20 years ago — you're in control.", author: "@snopoke" },
    { quote: "AI as a teammate, not a tool. The endgame of digital employees is here.", author: "@lycfyi" },
    { quote: "Crazy. OpenClaw is a superpower.", author: "@robmartinson" },
  ];

  const navLinks = [
    { href: "/docs/installation", labelKey: "nav.install" as TranslationKey },
    { href: "/docs/quickstart", labelKey: "nav.quickstart" as TranslationKey },
    { href: "/docs/channels", labelKey: "nav.channels" as TranslationKey },
    { href: "/docs/nodes", labelKey: "nav.nodes" as TranslationKey },
    { href: "/docs/remote", labelKey: "nav.remote" as TranslationKey },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={lang === "en" ? "/en" : "/"} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="font-bold text-xl text-slate-800">OpenClaw</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLangPath(link.href)}
                  className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900"
            >
              {t("header.github")}
            </a>
            <LanguageSwitcher />
            <Link
              href={getLangPath("/docs/quickstart")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("header.getStarted")}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t("hero.title")}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("hero.subtitle")}
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={getLangPath("/docs/installation")}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              {t("hero.startInstall")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={getLangPath("/docs/quickstart")}
              className="bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              {t("hero.viewTutorial")}
            </Link>
          </div>
          
          {/* One-click Install Command */}
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
                <span className="text-slate-500 text-xs">一键安装</span>
              </div>
              <div className="font-mono text-sm">
                <span className="text-green-400">$</span>{" "}
                <span className="text-white">curl -fsSL https://openclaw.ai/install.sh | bash</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-3">
              适用于 macOS、Windows 和 Linux
            </p>
          </div>
          
          {/* Highlights */}
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

      {/* Core Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {t("features.title")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("features.subtitle")}
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
                <h3 className="font-semibold text-slate-900 mb-2">{t(feature.titleKey)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t(feature.descKey)}</p>
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
              {t("advanced.title")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("advanced.subtitle")}
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
                  <h3 className="font-semibold text-slate-900 mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{t(feature.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {t("more.title")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("more.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreFeatures.map((feature, idx) => (
              <Link
                key={idx}
                href={getLangPath(feature.href)}
                className="p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors group border border-slate-200 hover:border-blue-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{t(feature.titleKey)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t(feature.descKey)}</p>
                <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-medium">
                  <span>{lang === "en" ? "Learn more" : "了解更多"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {t("usecases.title")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("usecases.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm hover:shadow-md"
              >
                <useCase.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-slate-900">{t(useCase.titleKey)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t(useCase.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials - Two-row bidirectional scrolling */}
      <section className="py-10 px-0 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              What People Say
            </h2>
            <p className="text-slate-500 text-sm">
              Real voices from the developer community
            </p>
          </div>
        </div>
        
        {/* Row 1: Scroll left to right */}
        <div className="mb-6">
          <div className="flex animate-scroll-left gap-6 w-max">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={`row1-${idx}`}
                className="flex-shrink-0 w-72 bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
              >
                <p className="text-slate-600 text-sm mb-3 line-clamp-3">"{item.quote}"</p>
                <p className="text-slate-400 text-xs font-medium">{item.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scroll right to left (opposite direction) */}
        <div>
          <div className="flex animate-scroll-right gap-6 w-max">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((item, idx) => (
              <div
                key={`row2-${idx}`}
                className="flex-shrink-0 w-72 bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
              >
                <p className="text-slate-600 text-sm mb-3 line-clamp-3">"{item.quote}"</p>
                <p className="text-slate-400 text-xs font-medium">{item.author}</p>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 50s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 50s linear infinite;
          }
          .animate-scroll-left:hover,
          .animate-scroll-right:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Quick Start CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-blue-100 mb-8 text-lg">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={getLangPath("/docs/installation")}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              {t("cta.getStarted")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
            >
              <Github className="w-5 h-5" />
              {t("cta.starGithub")}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Link href={lang === "en" ? "/en" : "/"} className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="font-semibold text-slate-800">OpenClaw</span>
              </Link>
              <p className="text-slate-500 text-sm max-w-sm">
                OpenClaw - {lang === "zh" ? "开源的智能助手框架" : "Open Source AI Assistant Framework"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">{t("footer.docs")}</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href={getLangPath("/docs/installation")} className="hover:text-slate-700">{t("footer.install")}</Link></li>
                <li><Link href={getLangPath("/docs/quickstart")} className="hover:text-slate-700">{t("footer.quickstart")}</Link></li>
                <li><Link href={getLangPath("/docs/configuration")} className="hover:text-slate-700">{t("footer.config")}</Link></li>
                <li><Link href={getLangPath("/docs/nodes")} className="hover:text-slate-700">{lang === "en" ? "Mobile Nodes" : "移动节点"}</Link></li>
                <li><Link href={getLangPath("/docs/remote")} className="hover:text-slate-700">{lang === "en" ? "Remote Access" : "远程访问"}</Link></li>
                <li><Link href={getLangPath("/docs/channels")} className="hover:text-slate-700">{lang === "en" ? "Channels" : "消息通道"}</Link></li>
                <li><Link href={getLangPath("/docs/plugins")} className="hover:text-slate-700">{lang === "en" ? "Plugins" : "插件系统"}</Link></li>
                <li><Link href={getLangPath("/docs/security")} className="hover:text-slate-700">{lang === "en" ? "Security" : "安全设置"}</Link></li>
                <li><Link href={getLangPath("/docs/troubleshooting")} className="hover:text-slate-700">{lang === "en" ? "Troubleshooting" : "故障排除"}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">{t("footer.community")}</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">GitHub</a></li>
                <li><a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">Discord</a></li>
                <li><a href="#" className="hover:text-slate-700">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              {t("footer.copyright")}
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
