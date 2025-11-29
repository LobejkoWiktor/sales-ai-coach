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
  clientTypeLabels,
  difficultyLabels,
  goalLabels,
} from "@/data/mockData";
import {
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

const TrainingSummary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            Powrót do dashboardu
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-heading font-bold mb-3">
            Podsumowanie treningu
          </h1>
          <p className="text-muted-foreground text-lg">
            {new Date(session.date).toLocaleDateString("pl-PL")}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <Card className="shadow-custom-lg border-primary/30">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-heading mb-2">
                Wynik ogólny
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
                  Znajomość oferty
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
                  Analiza potrzeb
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
                  Argumentacja wartości
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
                    Co zrobiłeś dobrze
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
                    Co poprawić następnym razem
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
                  Wykorzystane insighty
                </CardTitle>
              </div>
              <CardDescription>
                Insighty, które były dostępne podczas treningu
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
                      {insight.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {insight.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {insight.tags.map((tag) => (
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

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="py-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Typ klienta:</span>
                  <p className="font-medium">
                    {clientTypeLabels[session.config.clientType]}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Trudność:</span>
                  <p className="font-medium">
                    {difficultyLabels[session.config.difficulty]}
                  </p>
                </div>
                {session.config.goal && (
                  <div>
                    <span className="text-muted-foreground">Cel:</span>
                    <p className="font-medium">
                      {goalLabels[session.config.goal]}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Konfiguracja:</span>
                  <p className="font-medium">
                    <Badge variant="outline">
                      {session.config.isPreset
                        ? `Preset: ${session.config.presetName}`
                        : "Własna konfiguracja"}
                    </Badge>
                  </p>
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
            Powtórz trening
          </Button>
          <Button
            size="lg"
            onClick={() => navigate("/offers")}
            className="gap-2 gradient-primary"
          >
            <Plus className="w-4 h-4" />
            Nowy trening
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TrainingSummary;
