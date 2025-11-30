import type {
  Offer,
  TrainingPreset,
  TrainingSession,
  Insight,
  User,
} from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Jan Kowalski",
    email: "jan.kowalski@example.com",
    role: "sales-rep",
  },
  {
    id: "2",
    name: "Anna Nowak",
    email: "anna.nowak@example.com",
    role: "manager",
  },
];

export const mockOffers: Offer[] = [
  {
    id: "1",
    name: "Fotowoltaika 8 kWp z magazynem energii",
    description:
      "Kompleksowa instalacja PV 8 kWp z baterią 10 kWh, zapewniająca wysokie oszczędności, niezależność energetyczną i pełne wsparcie montażowe.",
    tags: ["Fotowoltaika", "Magazyn energii", "Oszczędność"],
    isActive: true,
    materials: [
      {
        id: "m1",
        label: "Prezentacja produktu PDF",
        url: "https://example.com/sf-presentation.pdf",
      },
      {
        id: "m2",
        label: "Strona produktu",
        url: "https://example.com/salesforce-crm",
      },
      {
        id: "m3",
        label: "Case study",
        url: "https://example.com/case-study",
      },
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-11-20",
  },
  {
    id: "2",
    name: "CloudStorage Pro",
    description: "Bezpieczne przechowywanie danych w chmurze z integracją AI",
    tags: ["SaaS", "Storage", "AI"],
    isActive: true,
    materials: [
      {
        id: "m4",
        label: "Dokumentacja techniczna",
        url: "https://example.com/cloud-docs",
      },
      {
        id: "m5",
        label: "Demo wideo",
        url: "https://example.com/cloud-demo",
      },
    ],
    createdAt: "2024-02-10",
    updatedAt: "2024-11-18",
  },
  {
    id: "3",
    name: "Analytics Dashboard Suite",
    description: "Kompleksowe narzędzie do analizy danych i raportowania",
    tags: ["Analytics", "BI", "Enterprise"],
    isActive: true,
    materials: [
      {
        id: "m6",
        label: "Prezentacja funkcji",
        url: "https://example.com/analytics-features",
      },
      {
        id: "m7",
        label: "Cennik",
        url: "https://example.com/pricing",
      },
    ],
    createdAt: "2024-03-05",
    updatedAt: "2024-11-25",
  },
  {
    id: "4",
    name: "Marketing Automation Platform",
    description: "Automatyzacja kampanii marketingowych z AI",
    tags: ["Marketing", "Automation", "SaaS"],
    isActive: false,
    materials: [],
    createdAt: "2024-04-12",
    updatedAt: "2024-10-01",
  },
];

export const mockPresets: TrainingPreset[] = [
  {
    id: "p1",
    name: "Rozmowa z klientem zainteresowanym fotowoltaiką 8 kWp z magazynem energii",
    description:
      "Rozmowa o oszczędnościach i nowoczesnych technologiach",
    offerId: "1",
    clientType: "modern-entrepreneur",
    difficulty: "hard",
    goal: "learn-benefits",
    createdAt: "2024-11-01",
    updatedAt: "2024-11-15",
  },
  {
    id: "p2",
    name: "Właściciel firmy – CloudStorage",
    description: "Rozmowa z właścicielem małej firmy, prostota użytkowania",
    offerId: "2",
    clientType: "small-business-owner",
    difficulty: "easy",
    goal: "qualify-lead",
    createdAt: "2024-11-05",
    updatedAt: "2024-11-20",
  },
  {
    id: "p3",
    name: "Dyrektor IT – Analytics Dashboard",
    description: "Rozmowa techniczna, integracje i bezpieczeństwo",
    offerId: "3",
    clientType: "it-director",
    difficulty: "medium",
    goal: "schedule-demo",
    createdAt: "2024-11-10",
    updatedAt: "2024-11-22",
  },
];

export const mockInsights: Insight[] = [
  {
    id: "i1",
    title: "Podkreśl ROI dla CFO",
    description:
      "CFO koncentruje się na zwrocie z inwestycji. Podaj konkretne liczby: średnio 35% wzrost efektywności w ciągu 6 miesięcy.",
    tags: ["ROI", "Finanse", "Wartość"],
    offerId: "1",
    trigger: "budget",
  },
  {
    id: "i2",
    title: "Integracje z systemami finansowymi",
    description:
      "Podkreśl łatwą integrację z SAP, Oracle Financials i popularnymi systemami księgowymi.",
    tags: ["Integracja", "Finanse"],
    offerId: "1",
    trigger: "integration",
  },
  {
    id: "i3",
    title: "Bezpieczeństwo danych",
    description:
      "Certyfikaty ISO 27001, SOC 2, zgodność z GDPR. Dane szyfrowane end-to-end.",
    tags: ["Bezpieczeństwo", "Compliance"],
    offerId: "2",
    trigger: "security",
  },
  {
    id: "i4",
    title: "Prostota wdrożenia",
    description:
      "Wdrożenie w 48h bez pomocy IT. Intuicyjny interfejs, który nie wymaga szkoleń.",
    tags: ["Onboarding", "UX"],
    offerId: "2",
    trigger: "implementation",
  },
  {
    id: "i5",
    title: "Customowe dashboardy",
    description:
      "Nieograniczone możliwości dostosowania widoków do potrzeb różnych działów.",
    tags: ["Customizacja", "Funkcje"],
    offerId: "3",
    trigger: "features",
  },
];

export const mockSessions: TrainingSession[] = [
  {
    id: "s1",
    date: "2024-11-25",
    config: {
      selectedOffers: ["1"],
      clientType: "cfo-decisive",
      difficulty: "hard",
      goal: "schedule-demo",
      isPreset: true,
      presetId: "p1",
      presetName: "CFO – Demo CRM Enterprise",
    },
    score: 78,
    metrics: {
      productKnowledge: 85,
      needsAnalysis: 70,
      valueArgumentation: 80,
    },
    usedInsights: [mockInsights[0], mockInsights[1]],
    messages: [],
    feedback: {
      strengths: [
        "Świetnie zaprezentowałeś ROI produktu",
        "Dobra reakcja na obiekcje budżetowe",
      ],
      improvements: [
        "Zapytaj wcześniej o konkretne potrzeby klienta",
        "Nie przerywaj klientowi podczas wypowiedzi",
      ],
    },
  },
  {
    id: "s2",
    date: "2024-11-23",
    config: {
      selectedOffers: ["2"],
      clientType: "small-business-owner",
      difficulty: "easy",
      isPreset: false,
    },
    score: 92,
    metrics: {
      productKnowledge: 90,
      needsAnalysis: 95,
      valueArgumentation: 91,
    },
    usedInsights: [mockInsights[3]],
    messages: [],
    feedback: {
      strengths: [
        "Doskonała analiza potrzeb",
        "Świetny kontakt z klientem",
        "Jasna prezentacja korzyści",
      ],
      improvements: ["Można było szybciej przejść do zamknięcia"],
    },
  },
];

export const clientTypeLabels = {
  "cfo-decisive": "Decyzyjny CFO",
  "small-business-owner": "Właściciel małej firmy",
  "it-director": "Dyrektor IT",
  "corporate-buyer": "Kupiec korporacyjny",
  "modern-entrepreneur": "Właściciel domu szukający oszczędności",
};

export const difficultyLabels = {
  easy: "Łatwy",
  medium: "Średni",
  hard: "Trudny",
};

export const goalLabels = {
  "schedule-demo": "Umówienie demo",
  "close-sale": "Domknięcie sprzedaży",
  "qualify-lead": "Kwalifikacja leadu",
  "cost-optimization": "Automatyzacja i redukcja kosztów",
  "learn-benefits": "Poznać koszty i korzyści instalacji",
};

export const clientTypeDescriptions = {
  "cfo-decisive":
    "Osoba decyzyjna, koncentruje się na ROI, analizuje każdą inwestycję pod kątem finansowym. Oczekuje konkretnych liczb i szybkiej zwrotności.",
  "small-business-owner":
    "Właściciel małej/średniej firmy, szuka prostych rozwiązań. Ceni sobie oszczędność czasu i prostotę wdrożenia.",
  "it-director":
    "Dyrektor techniczny, zadaje szczegółowe pytania o integracje, bezpieczeństwo i skalowalność. Analizuje aspekty techniczne.",
  "corporate-buyer":
    "Osoba odpowiedzialna za zakupy w korporacji. Interesuje ją zgodność z procedurami, terminy dostaw, wsparcie.",
  "modern-entrepreneur":
    "Właściciel domu szukający oszczędności, zainteresowany fotowoltaiką i magazynem energii.",
};

export const difficultyDescriptions = {
  easy: "Klient jest otwarty na rozmowę, zadaje podstawowe pytania, pozytywnie nastawiony.",
  medium:
    "Klient ma pewne wątpliwości, zadaje trudniejsze pytania, potrzebuje więcej argumentów.",
  hard: "Klient jest sceptyczny, stawia mocne obiekcje, trudno go przekonać. Wymaga dużego doświadczenia.",
};
