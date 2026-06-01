import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, type Language } from "./translations";

const STORAGE_KEY = "salestwin-lang";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "pl" || stored === "en") return stored;
  } catch {
    // localStorage unavailable (SSR, privacy mode, etc.)
  }
  return "pl"; // Default to Polish
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  // Sync the <html lang=""> attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (section: string, key: string): string => {
      const sec = (translations as Record<string, Record<string, Record<Language, string>>>)[section];
      if (!sec) {
        console.warn(`[i18n] Missing section: "${section}"`);
        return `${section}.${key}`;
      }
      const entry = sec[key];
      if (!entry) {
        console.warn(`[i18n] Missing key: "${section}.${key}"`);
        return `${section}.${key}`;
      }
      return entry[language] ?? entry["pl"] ?? `${section}.${key}`;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};
