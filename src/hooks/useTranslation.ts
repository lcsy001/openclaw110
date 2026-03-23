"use client";

import { useSearchParams } from "next/navigation";
import { translations, TranslationKey } from "@/lib/i18n";

export function useTranslation() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") || "zh") as "zh" | "en";
  
  const t = (key: TranslationKey): string => {
    return translations[lang][key] || key;
  };
  
  return { t, lang };
}
