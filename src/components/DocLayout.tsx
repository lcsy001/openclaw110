"use client";

import Sidebar from "./Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import { Globe, ChevronDown } from "lucide-react";
import zhTranslations from "./i18n/zh";
import enTranslations from "./i18n/en";

interface DocLayoutProps {
  children: React.ReactNode;
}

function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // 从路径中检测语言: /en/docs/xxx -> en, /docs/xxx -> zh
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
      // 切换到英文: /docs/xxx -> /en/docs/xxx
      newPath = `/en${pathname}`;
    } else {
      // 切换到中文: /en/docs/xxx -> /docs/xxx
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
          <div className="absolute left-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
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

function DocLayoutContent({ children }: DocLayoutProps) {
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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64">
        {/* Top Header - Fixed */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 z-40">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={lang === "en" ? "/en" : "/"} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="font-bold text-lg text-slate-800">OpenClaw</span>
              </Link>
            </div>
            <nav className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link href={lang === "en" ? "/en/docs/installation" : "/docs/installation"} className="text-slate-600 hover:text-slate-900">
                {t("nav.docs")}
              </Link>
              <a
                href="https://github.com/openclaw/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900"
              >
                {t("nav.github")}
              </a>
              <Link
                href={lang === "en" ? "/en/docs/quickstart" : "/docs/quickstart"}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("nav.getStarted")}
              </Link>
            </nav>
          </div>
        </header>
        
        <div className="mt-16 max-w-4xl mx-auto px-8 py-12">
          <article className="prose prose-slate max-w-none">{children}</article>
        </div>
      </main>
    </div>
  );
}

export default function DocLayout({ children }: DocLayoutProps) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <article className="prose prose-slate max-w-none">{children}</article>
          </div>
        </main>
      </div>
    }>
      <DocLayoutContent>{children}</DocLayoutContent>
    </Suspense>
  );
}
