import { useLanguage } from "@/i18n/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === "pl" ? "en" : "pl");
  };

  return (
    <button
      id="language-switcher"
      onClick={toggle}
      aria-label={language === "pl" ? "Switch to English" : "Przełącz na polski"}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]
        hover:bg-white/20 hover:border-primary/40 hover:shadow-[0_8px_32px_rgba(var(--primary-rgb,99,102,241),0.2)]
        hover:scale-105 active:scale-95
        transition-all duration-300 ease-out cursor-pointer
        dark:bg-black/20 dark:border-white/10 dark:hover:bg-black/30 dark:hover:border-primary/40"
    >
      <span className="text-lg leading-none transition-transform duration-300 hover:rotate-12">
        {language === "pl" ? "🇵🇱" : "🇬🇧"}
      </span>
      <span className="text-sm font-semibold tracking-wide text-foreground/90">
        {language === "pl" ? "PL" : "EN"}
      </span>
      <svg
        className="w-3.5 h-3.5 text-foreground/50 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    </button>
  );
};

export default LanguageSwitcher;
