"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import en from "./i18n/en";
import zh from "./i18n/zh";

type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isReady: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译字典
const translations: Record<Language, Record<string, string>> = {
  zh: zh,
  en: en,
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  // 返回安全的默认值
  return context || { 
    language: "zh" as Language, 
    setLanguage: () => {}, 
    isReady: true,
    t: (key: string) => key
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 优先从 URL 参数获取
    const urlLang = searchParams.get("lang");
    if (urlLang === "en" || urlLang === "zh") {
      setLanguageState(urlLang);
      setIsReady(true);
      return;
    }

    // 然后检查 localStorage
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language;
      if (savedLang) {
        setLanguageState(savedLang);
      }
    }
    setIsReady(true);
  }, [searchParams]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
    
    // 更新 URL 参数但不刷新页面
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isReady, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 语言切换组件
export function LanguageSwitcher() {
  const { language, setLanguage, isReady } = useLanguage();
  
  if (!isReady) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-8 h-6 bg-slate-100 rounded animate-pulse" />
        <div className="w-6 h-6 bg-slate-100 rounded animate-pulse" />
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLanguage("zh")}
        className={`px-2 py-1 text-xs rounded transition-colors ${
          language === "zh" 
            ? "bg-blue-100 text-blue-700 font-medium" 
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-xs rounded transition-colors ${
          language === "en" 
            ? "bg-blue-100 text-blue-700 font-medium" 
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
        }`}
      >
        EN
      </button>
    </div>
  );
}

// 翻译 hook - 用于在组件中获取翻译
export function useTranslation() {
  const { language, t } = useLanguage();
  return { language, t };
}