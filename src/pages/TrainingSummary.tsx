import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { storage } from "@/lib/storage";
import { mockSessions } from "@/data/mockData";
import {
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const TrainingSummary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { language, t } = useLanguage();
  
  const session =
    storage.getSessions().find((s) => s.id === id) ||
    mockSessions.find((s) => s.id === id);

  if (!session) {
    navigate("/dashboard");
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-accent";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  // Helper function to translate static mock insights in UI
  const getInsightText = (insightId: string, field: "title" | "description", defaultVal: string) => {
    const translationsMap: Record<string, { title: { pl: string; en: string }; description: { pl: string; en: string } }> = {
      i1: {
        title: { pl: "Podkreśl ROI dla CFO", en: "Emphasize ROI for CFO" },
        description: {
          pl: "CFO koncentruje się na zwrocie z inwestycji. Podaj konkretne liczby: średnio 35% wzrost efektywności w ciągu 6 miesięcy.",
          en: "CFO focuses on return on investment. Give concrete numbers: average 35% efficiency increase within 6 months."
        }
      },
      i2: {
        title: { pl: "Integracje z systemami finansowymi", en: "Integrations with financial systems" },
        description: {
          pl: "Podkreśl łatwą integrację z SAP, Oracle Financials i popularnymi systemami księgowymi.",
          en: "Emphasize easy integration with SAP, Oracle Financials, and popular accounting systems."
        }
      },
      i3: {
        title: { pl: "Bezpieczeństwo danych", en: "Data security" },
        description: {
          pl: "Certyfikaty ISO 27001, SOC 2, zgodność z GDPR. Dane szyfrowane end-to-end.",
          en: "ISO 27001, SOC 2 certificates, GDPR compliance. Data is encrypted end-to-end."
        }
      },
      i4: {
        title: { pl: "Prostota wdrożenia", en: "Ease of implementation" },
        description: {
          pl: "Wdrożenie w 48h bez pomocy IT. Intuicyjny interfejs, który nie wymaga szkoleń.",
          en: "Deployment in 48h without IT help. Intuitive interface that requires no training."
        }
      },
      i5: {
        title: { pl: "Customowe dashboardy", en: "Custom dashboards" },
        description: {
          pl: "Nieograniczone możliwości dostosowania widoków do potrzeb różnych działów.",
          en: "Unlimited customization options for views tailored to the needs of different departments."
        }
      }
    };
    return translationsMap[insightId]?.[field]?.[language] ?? defaultVal;
  };

  const getInsightTags = (insightId: string, defaultTags: string[]) => {
    const tagsMap: Record<string, { pl: string[]; en: string[] }> = {
      i1: { pl: ["ROI", "Finanse", "Wartość"], en: ["ROI", "Finance", "Value"] },
      i2: { pl: ["Integracja", "Finanse"], en: ["Integration", "Finance"] },
      i3: { pl: ["Bezpieczeństwo", "Compliance"], en: ["Security", "Compliance"] },
      i4: { pl: ["Onboarding", "UX"], en: ["Onboarding", "UX"] },
      i5: { pl: ["Customizacja", "Funkcje"], en: ["Customization", "Features"] }
    };
    return tagsMap[insightId]?.[language] ?? defaultTags;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            {t("trainingSummary", "backToDashboard")}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-heading font-bold mb-3">
            {t("trainingSummary", "title")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {new Date(session.date).toLocaleDateString(language === "pl" ? "pl-PL" : "en-US")}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <Card className="shadow-custom-lg border-primary/30">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-heading mb-2">
                {t("trainingSummary", "overallScore")}
              </CardTitle>
              <div className={`text-6xl font-bold ${getScoreColor(session.score)}`}>
                {session.score}%
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={session.score} className="h-3" />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="shadow-custom-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {t("trainingSummary", "productKnowledge")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(session.metrics.productKnowledge)}`}>
                  {session.metrics.productKnowledge}%
                </div>
                <Progress
                  value={session.metrics.productKnowledge}
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>

            <Card className="shadow-custom-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {t("trainingSummary", "needsAnalysis")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(session.metrics.needsAnalysis)}`}>
                  {session.metrics.needsAnalysis}%
                </div>
                <Progress
                  value={session.metrics.needsAnalysis}
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>

            <Card className="shadow-custom-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {t("trainingSummary", "valueArgumentation")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getScoreColor(session.metrics.valueArgumentation)}`}>
                  {session.metrics.valueArgumentation}%
                </div>
                <Progress
                  value={session.metrics.valueArgumentation}
                  className="h-2 mt-2"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-custom-md border-success/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <CardTitle className="text-lg font-heading">
                    {t("trainingSummary", "whatYouDidWell")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {session.feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-custom-md border-accent/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <CardTitle className="text-lg font-heading">
                    {t("trainingSummary", "whatToImprove")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {session.feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <TrendingDown className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-custom-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-heading">
                  {t("trainingSummary", "usedInsights")}
                </CardTitle>
              </div>
              <CardDescription>
                {t("trainingSummary", "usedInsightsDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {session.usedInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-3 bg-secondary/50 rounded-lg"
                  >
                    <h4 className="font-semibold text-sm mb-1">
                      {getInsightText(insight.id, "title", insight.title)}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {getInsightText(insight.id, "description", insight.description)}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {getInsightTags(insight.id, insight.tags).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-custom-md bg-muted/50 border-dashed">
            <CardContent className="py-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("trainingSummary", "clientType")}</span>
                  <p className="font-medium">
                    {t("clientTypeLabels", session.config.clientType)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("common", "difficulty")}</span>
                  <p className="font-medium">
                    {t("difficultyLabels", session.config.difficulty)}
                  </p>
                </div>
                {session.config.goal && (
                  <div>
                    <span className="text-muted-foreground">{t("common", "goal")}</span>
                    <p className="font-medium">
                      {t("goalLabels", session.config.goal)}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">{t("trainingSummary", "configuration")}</span>
                  <div className="mt-1">
                    <Badge variant="outline">
                      {session.config.isPreset
                        ? `${t("trainingSummary", "presetLabel")} ${session.config.presetName}`
                        : t("common", "ownConfigBadge")}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              storage.setCurrentConfig(session.config);
              navigate("/preparation");
            }}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t("trainingSummary", "repeatTraining")}
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/offers")}
            className="gap-2 gradient-primary"
          >
            <Plus className="w-4 h-4" />
            {t("trainingSummary", "newTraining")}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TrainingSummary;
