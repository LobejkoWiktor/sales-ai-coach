export type Language = "pl" | "en";

export const translations = {
  // ─── Common / Shared ────────────────────────────────────────
  common: {
    logout: { pl: "Wyloguj", en: "Log out" },
    back: { pl: "Powrót", en: "Back" },
    cancel: { pl: "Anuluj", en: "Cancel" },
    save: { pl: "Zapisz", en: "Save" },
    email: { pl: "Email", en: "Email" },
    password: { pl: "Hasło", en: "Password" },
    preset: { pl: "Preset", en: "Preset" },
    presetManager: { pl: "Preset managera", en: "Manager preset" },
    ownConfig: { pl: "Konfiguracja własna", en: "Custom configuration" },
    ownConfigBadge: { pl: "Własna konfiguracja", en: "Custom config" },
    offer: { pl: "Oferta:", en: "Offer:" },
    client: { pl: "Klient:", en: "Client:" },
    difficulty: { pl: "Trudność:", en: "Difficulty:" },
    goal: { pl: "Cel:", en: "Goal:" },
    active: { pl: "Aktywna", en: "Active" },
    inactive: { pl: "Nieaktywna", en: "Inactive" },
  },

  // ─── Data Labels ────────────────────────────────────────────
  clientTypeLabels: {
    "cfo-decisive": { pl: "Decyzyjny CFO", en: "Decisive CFO" },
    "small-business-owner": { pl: "Właściciel małej firmy", en: "Small business owner" },
    "it-director": { pl: "Dyrektor IT", en: "IT Director" },
    "corporate-buyer": { pl: "Kupiec korporacyjny", en: "Corporate buyer" },
    "modern-entrepreneur": { pl: "Właściciel domu szukający oszczędności", en: "Homeowner looking for savings" },
  },
  difficultyLabels: {
    easy: { pl: "Łatwy", en: "Easy" },
    medium: { pl: "Średni", en: "Medium" },
    hard: { pl: "Trudny", en: "Hard" },
  },
  goalLabels: {
    "schedule-demo": { pl: "Umówienie demo", en: "Schedule demo" },
    "close-sale": { pl: "Domknięcie sprzedaży", en: "Close the sale" },
    "qualify-lead": { pl: "Kwalifikacja leadu", en: "Qualify lead" },
    "cost-optimization": { pl: "Automatyzacja i redukcja kosztów", en: "Automation & cost reduction" },
    "learn-benefits": { pl: "Poznać koszty i korzyści instalacji", en: "Learn installation costs & benefits" },
  },
  clientTypeDescriptions: {
    "cfo-decisive": {
      pl: "Osoba decyzyjna, koncentruje się na ROI, analizuje każdą inwestycję pod kątem finansowym. Oczekuje konkretnych liczb i szybkiej zwrotności.",
      en: "A decisive person focused on ROI who analyzes every investment financially. Expects concrete numbers and fast returns.",
    },
    "small-business-owner": {
      pl: "Właściciel małej/średniej firmy, szuka prostych rozwiązań. Ceni sobie oszczędność czasu i prostotę wdrożenia.",
      en: "Small/medium business owner looking for simple solutions. Values time savings and ease of implementation.",
    },
    "it-director": {
      pl: "Dyrektor techniczny, zadaje szczegółowe pytania o integracje, bezpieczeństwo i skalowalność. Analizuje aspekty techniczne.",
      en: "Technical director who asks detailed questions about integrations, security, and scalability. Analyzes technical aspects.",
    },
    "corporate-buyer": {
      pl: "Osoba odpowiedzialna za zakupy w korporacji. Interesuje ją zgodność z procedurami, terminy dostaw, wsparcie.",
      en: "Corporate purchasing manager. Interested in procedure compliance, delivery timelines, and support.",
    },
    "modern-entrepreneur": {
      pl: "Właściciel domu szukający oszczędności, zainteresowany fotowoltaiką i magazynem energii.",
      en: "Homeowner looking for savings, interested in photovoltaics and energy storage.",
    },
  },
  difficultyDescriptions: {
    easy: {
      pl: "Klient jest otwarty na rozmowę, zadaje podstawowe pytania, pozytywnie nastawiony.",
      en: "Client is open to conversation, asks basic questions, and is positively inclined.",
    },
    medium: {
      pl: "Klient ma pewne wątpliwości, zadaje trudniejsze pytania, potrzebuje więcej argumentów.",
      en: "Client has some doubts, asks tougher questions, and needs more convincing arguments.",
    },
    hard: {
      pl: "Klient jest sceptyczny, stawia mocne obiekcje, trudno go przekonać.",
      en: "Client is skeptical, raises strong objections, and is hard to convince.",
    },
  },

  // ─── Login Page ─────────────────────────────────────────────
  login: {
    title: { pl: "SalesTwin", en: "SalesTwin" },
    subtitle: { pl: "Trenuj sprzedaż z AI-klientem", en: "Train sales with an AI client" },
    demoTitle: { pl: "Demo Application", en: "Demo Application" },
    demoDescription: {
      pl: 'You can log in using <strong>any email and password combination</strong>. Just select your role below and click "Zaloguj się".',
      en: 'You can log in using <strong>any email and password combination</strong>. Just select your role below and click "Log in".',
    },
    emailPlaceholder: { pl: "twoj@email.com", en: "your@email.com" },
    passwordPlaceholder: { pl: "••••••••", en: "••••••••" },
    roleLabel: { pl: "Zaloguj jako (demo):", en: "Log in as (demo):" },
    roleSalesRep: { pl: "Handlowiec", en: "Sales Rep" },
    roleManager: { pl: "Manager / Trener", en: "Manager / Coach" },
    loginButton: { pl: "Zaloguj się", en: "Log in" },
    forgotPassword: { pl: "Nie pamiętasz hasła?", en: "Forgot password?" },
  },

  // ─── Dashboard ──────────────────────────────────────────────
  dashboard: {
    greeting: { pl: "Cześć, {name}! 👋", en: "Hi, {name}! 👋" },
    greetingFallback: { pl: "Handlowiec", en: "Sales Rep" },
    readyToTrain: { pl: "Gotowy na dzisiejszy trening?", en: "Ready for today's training?" },
    quickStart: { pl: "Szybki start", en: "Quick start" },
    quickStartDescription: {
      pl: "Rozpocznij nowy trening lub kontynuuj ostatni",
      en: "Start a new training or continue the last one",
    },
    continueLastTraining: { pl: "Kontynuuj ostatni trening", en: "Continue last training" },
    newTraining: { pl: "Nowy trening", en: "New training" },
    selectOffersAndStart: { pl: "Wybierz oferty i rozpocznij", en: "Select offers and start" },
    recentTrainings: { pl: "Ostatnie treningi", en: "Recent trainings" },
    noTrainingsYet: { pl: "Nie masz jeszcze żadnych treningów", en: "You don't have any trainings yet" },
    startFirstTraining: { pl: "Rozpocznij pierwszy trening", en: "Start first training" },
  },

  // ─── Offer Selection ───────────────────────────────────────
  offerSelection: {
    backToDashboard: { pl: "Powrót do dashboardu", en: "Back to dashboard" },
    title: { pl: "Wybierz oferty do treningu", en: "Select offers for training" },
    subtitle: {
      pl: "Na podstawie wybranych ofert przygotujemy rozmowę i insighty sprzedażowe.",
      en: "We'll prepare a conversation and sales insights based on selected offers.",
    },
    showSummary: { pl: "Pokaż podsumowanie ofert", en: "Show offer summary" },
  },

  // ─── Offer Summary ─────────────────────────────────────────
  offerSummary: {
    changeOffers: { pl: "Zmień wybrane oferty", en: "Change selected offers" },
    title: { pl: "Podsumowanie wybranych ofert", en: "Summary of selected offers" },
    subtitle: {
      pl: "To materiały, na których opieramy rozmowę i insighty. Przejrzyj je przed treningiem.",
      en: "These are the materials we base the conversation and insights on. Review them before training.",
    },
    materialsToReview: { pl: "Materiały do przejrzenia", en: "Materials to review" },
    proceedToConfig: { pl: "Przejdź do konfiguracji treningu", en: "Proceed to training configuration" },
  },

  // ─── Config Type ────────────────────────────────────────────
  configType: {
    title: { pl: "Jak chcesz skonfigurować trening?", en: "How do you want to configure the training?" },
    subtitle: {
      pl: "Wybierz gotową konfigurację od managera lub stwórz własną",
      en: "Choose a manager preset or create your own configuration",
    },
    managerConfigs: { pl: "Konfiguracje od managera", en: "Manager configurations" },
    managerRecommended: {
      pl: "Rekomendowane ustawienia od Twojego managera",
      en: "Recommended settings from your manager",
    },
    useThisConfig: { pl: "Użyj tej konfiguracji", en: "Use this configuration" },
    noPresetsAvailable: {
      pl: "Brak dostępnych presetów dla wybranych ofert",
      en: "No presets available for the selected offers",
    },
    customConfig: { pl: "Własna konfiguracja", en: "Custom configuration" },
    customConfigSubtitle: { pl: "Dostosuj trening do siebie", en: "Customize the training for yourself" },
    createFromScratch: { pl: "Stwórz konfigurację od podstaw", en: "Create configuration from scratch" },
    createFromScratchDescription: {
      pl: "Sam wybierz typ klienta i poziom trudności dla wybranych ofert",
      en: "Choose the client type and difficulty level for selected offers yourself",
    },
    selectedOffers: { pl: "Wybrane oferty:", en: "Selected offers:" },
    createOwnConfig: { pl: "Stwórz własną konfigurację", en: "Create custom configuration" },
  },

  // ─── Training Config ───────────────────────────────────────
  trainingConfig: {
    title: { pl: "Twoja konfiguracja treningu", en: "Your training configuration" },
    subtitle: {
      pl: "Dostosuj parametry rozmowy do swoich potrzeb",
      en: "Adjust conversation parameters to your needs",
    },
    selectedOffers: { pl: "Wybrane oferty", en: "Selected offers" },
    selectedOffersDesc: {
      pl: "Treningi będą oparte na tych produktach",
      en: "Trainings will be based on these products",
    },
    trainingParams: { pl: "Parametry treningu", en: "Training parameters" },
    trainingParamsDesc: {
      pl: "Wybierz typ klienta i poziom trudności",
      en: "Choose client type and difficulty level",
    },
    clientType: { pl: "Typ klienta", en: "Client type" },
    difficultyLevel: { pl: "Poziom trudności rozmowy", en: "Conversation difficulty level" },
    goalOptional: { pl: "Cel rozmowy (opcjonalnie)", en: "Conversation goal (optional)" },
    noGoal: { pl: "Brak celu", en: "No goal" },
    selectGoal: { pl: "Wybierz cel...", en: "Select goal..." },
    configSummary: { pl: "Podsumowanie konfiguracji", en: "Configuration summary" },
    products: { pl: "Produkty:", en: "Products:" },
    selected: { pl: "wybrane", en: "selected" },
    proceedToPreparation: { pl: "Przejdź do przygotowania rozmowy", en: "Proceed to conversation preparation" },
  },

  // ─── Preparation ────────────────────────────────────────────
  preparation: {
    title: { pl: "Przygotowanie do treningu", en: "Training preparation" },
    subtitle: {
      pl: "Zapoznaj się z profilem klienta i przygotuj się mentalnie",
      en: "Get familiar with the client profile and prepare mentally",
    },
    yourClient: { pl: "Twój klient", en: "Your client" },
    youAreSelling: { pl: "W tym treningu sprzedajesz", en: "In this training you are selling" },
    difficultyLevel: { pl: "Poziom trudności", en: "Difficulty level" },
    goalLabel: { pl: "Cel rozmowy:", en: "Conversation goal:" },
    configSource: { pl: "Źródło konfiguracji", en: "Configuration source" },
    presetLabel: { pl: "Preset managera:", en: "Manager preset:" },
    startConversation: { pl: "Rozpocznij rozmowę", en: "Start conversation" },
    starting: { pl: "Rozpoczynanie...", en: "Starting..." },
  },

  // ─── Conversation ──────────────────────────────────────────
  conversation: {
    trainingInProgress: { pl: "Trening w toku", en: "Training in progress" },
    endConversation: { pl: "Zakończ rozmowę", en: "End conversation" },
    liveMode: { pl: "Tryb Live", en: "Live Mode" },
    enableLive: { pl: "Włącz Live", en: "Enable Live" },
    stopRecording: { pl: "Zatrzymaj nagrywanie", en: "Stop recording" },
    startSpeak: { pl: "Start / Mów", en: "Start / Speak" },
    ttsOn: { pl: "TTS Włączony", en: "TTS On" },
    ttsOff: { pl: "TTS Wyłączony", en: "TTS Off" },
    liveConversation: { pl: "🔴 Rozmowa na żywo", en: "🔴 Live conversation" },
    clientSpeaking: { pl: "🎤 Klient mówi...", en: "🎤 Client speaking..." },
    listeningToYou: { pl: "🎙️ Słucham Twojej odpowiedzi...", en: "🎙️ Listening to your response..." },
    waitingForStart: { pl: "Oczekiwanie na start", en: "Waiting to start" },
    you: { pl: "Ty", en: "You" },
    aiClient: { pl: "Klient AI", en: "AI Client" },
    inputPlaceholder: { pl: "Lub wpisz swoją odpowiedź...", en: "Or type your response..." },
    trainingSettings: { pl: "Ustawienia treningu", en: "Training settings" },
    trainingProgress: { pl: "Postęp treningu", en: "Training progress" },
    completed: { pl: "ukończone", en: "completed" },
    liveInsights: { pl: "Insighty na żywo", en: "Live insights" },
  },

  // ─── Training Summary ──────────────────────────────────────
  trainingSummary: {
    backToDashboard: { pl: "Powrót do dashboardu", en: "Back to dashboard" },
    title: { pl: "Podsumowanie treningu", en: "Training summary" },
    overallScore: { pl: "Wynik ogólny", en: "Overall score" },
    productKnowledge: { pl: "Znajomość oferty", en: "Product knowledge" },
    needsAnalysis: { pl: "Analiza potrzeb", en: "Needs analysis" },
    valueArgumentation: { pl: "Argumentacja wartości", en: "Value argumentation" },
    whatYouDidWell: { pl: "Co zrobiłeś dobrze", en: "What you did well" },
    whatToImprove: { pl: "Co poprawić następnym razem", en: "What to improve next time" },
    usedInsights: { pl: "Wykorzystane insighty", en: "Used insights" },
    usedInsightsDesc: {
      pl: "Insighty, które były dostępne podczas treningu",
      en: "Insights that were available during training",
    },
    clientType: { pl: "Typ klienta:", en: "Client type:" },
    configuration: { pl: "Konfiguracja:", en: "Configuration:" },
    presetLabel: { pl: "Preset:", en: "Preset:" },
    repeatTraining: { pl: "Powtórz trening", en: "Repeat training" },
    newTraining: { pl: "Nowy trening", en: "New training" },
  },

  // ─── Manager Page ──────────────────────────────────────────
  manager: {
    panelTitle: { pl: "Panel Managera - SalesTwin", en: "Manager Panel - SalesTwin" },
    offersTab: { pl: "Oferty", en: "Offers" },
    presetsTab: { pl: "Konfiguracje", en: "Configurations" },
    analyticsTab: { pl: "Analityka", en: "Analytics" },
  },

  // ─── Manager > Offers Tab ──────────────────────────────────
  offersTab: {
    title: { pl: "Zarządzanie ofertami", en: "Offer management" },
    subtitle: { pl: "Dodawaj i edytuj oferty dostępne do treningów", en: "Add and edit offers available for trainings" },
    addOffer: { pl: "Dodaj ofertę", en: "Add offer" },
    newOffer: { pl: "Nowa oferta", en: "New offer" },
    newOfferDesc: {
      pl: "Wypełnij informacje o ofercie i dodaj materiały",
      en: "Fill in offer information and add materials",
    },
    offerName: { pl: "Nazwa oferty", en: "Offer name" },
    offerNamePlaceholder: { pl: "np. SalesForce CRM Enterprise", en: "e.g. SalesForce CRM Enterprise" },
    shortDescription: { pl: "Krótki opis", en: "Short description" },
    shortDescriptionPlaceholder: { pl: "Opisz ofertę w 1-2 zdaniach", en: "Describe the offer in 1-2 sentences" },
    tagsLabel: { pl: "Tagi (oddzielone przecinkami)", en: "Tags (comma separated)" },
    tagsPlaceholder: { pl: "SaaS, Enterprise, CRM", en: "SaaS, Enterprise, CRM" },
    materials: { pl: "Materiały / zasoby", en: "Materials / resources" },
    labelPlaceholder: { pl: "Label (np. Prezentacja PDF)", en: "Label (e.g. PDF Presentation)" },
    urlPlaceholder: { pl: "URL", en: "URL" },
    addAnotherMaterial: { pl: "Dodaj kolejny materiał", en: "Add another material" },
    offerActive: { pl: "Oferta aktywna", en: "Offer active" },
    offerActiveDesc: {
      pl: "Tylko aktywne oferty są dostępne do treningów",
      en: "Only active offers are available for trainings",
    },
    materialsCount: { pl: "Materiały", en: "Materials" },
    lastUpdate: { pl: "Ostatnia aktualizacja:", en: "Last updated:" },
  },

  // ─── Manager > Presets Tab ─────────────────────────────────
  presetsTab: {
    title: { pl: "Konfiguracje treningu (Presety)", en: "Training configurations (Presets)" },
    subtitle: {
      pl: "Twórz rekomendowane ustawienia dla handlowców",
      en: "Create recommended settings for sales reps",
    },
    addConfig: { pl: "Dodaj konfigurację", en: "Add configuration" },
    newConfig: { pl: "Nowa konfiguracja treningu", en: "New training configuration" },
    newConfigDesc: {
      pl: "Stwórz preset dla określonej oferty i typu klienta",
      en: "Create a preset for a specific offer and client type",
    },
    configName: { pl: "Nazwa konfiguracji", en: "Configuration name" },
    configNamePlaceholder: { pl: "np. CFO – demo produktu X", en: "e.g. CFO – product X demo" },
    linkedOffer: { pl: "Powiązana oferta", en: "Linked offer" },
    selectOffer: { pl: "Wybierz ofertę...", en: "Select offer..." },
    clientType: { pl: "Typ klienta", en: "Client type" },
    select: { pl: "Wybierz...", en: "Select..." },
    difficultyLevel: { pl: "Poziom trudności", en: "Difficulty level" },
    goalOptional: { pl: "Cel rozmowy (opcjonalnie)", en: "Conversation goal (optional)" },
    selectGoal: { pl: "Wybierz cel...", en: "Select goal..." },
    noGoal: { pl: "Brak celu", en: "No goal" },
    descriptionLabel: { pl: "Krótki opis - kiedy używać", en: "Short description - when to use" },
    descriptionPlaceholder: {
      pl: "Opisz, w jakich sytuacjach handlowiec powinien użyć tej konfiguracji",
      en: "Describe in which situations a sales rep should use this configuration",
    },
    createdAt: { pl: "Utworzono:", en: "Created:" },
  },

  // ─── Manager > Analytics Tab ───────────────────────────────
  analyticsTab: {
    title: { pl: "Analityka (podstawowa)", en: "Analytics (basic)" },
    subtitle: {
      pl: "Ogólne statystyki treningów w ostatnich dniach",
      en: "General training statistics from recent days",
    },
    trainingsLast7Days: { pl: "Treningi (ostatnie 7 dni)", en: "Trainings (last 7 days)" },
    averageScore: { pl: "Średni wynik", en: "Average score" },
    activeOffers: { pl: "Aktywne oferty", en: "Active offers" },
    topOffersTitle: { pl: "Top 5 najczęściej trenowanych ofert", en: "Top 5 most practiced offers" },
    topOffersDesc: {
      pl: "Które produkty są najczęściej ćwiczone przez handlowców",
      en: "Which products are most frequently practiced by sales reps",
    },
    trainings: { pl: "treningów", en: "trainings" },
    avgScore: { pl: "Średni wynik", en: "Avg. score" },
    unknownOffer: { pl: "Nieznana oferta", en: "Unknown offer" },
  },

  // ─── Not Found ─────────────────────────────────────────────
  notFound: {
    title: { pl: "404", en: "404" },
    message: { pl: "Ups! Strona nie została znaleziona", en: "Oops! Page not found" },
    returnHome: { pl: "Wróć na stronę główną", en: "Return to Home" },
  },
} as const;

// Type-safe key accessor
export type TranslationKeys = typeof translations;
