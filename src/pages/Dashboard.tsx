import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { storage } from "@/lib/storage";
import { mockSessions } from "@/data/mockData";
import { Play, Plus, TrendingUp, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = storage.getCurrentUser();
  const lastSession = storage.getLastSession();
  const recentSessions = mockSessions.slice(-3).reverse();
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold">SalesTwin</h1>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              {t("common", "logout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-2">
            {t("dashboard", "greeting").replace("{name}", user?.name || t("dashboard", "greetingFallback"))}
          </h2>
          <p className="text-muted-foreground">
            {t("dashboard", "readyToTrain")}
          </p>
        </div>

        <Card className="shadow-custom-md border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-heading">{t("dashboard", "quickStart")}</CardTitle>
            <CardDescription>
              {t("dashboard", "quickStartDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {lastSession && (
              <Button
                size="lg"
                variant="outline"
                className="h-auto py-6 flex flex-col items-start gap-2 hover:bg-secondary hover:border-primary/30 transition-all"
                onClick={() => {
                  storage.setCurrentConfig(lastSession.config);
                  navigate("/preparation");
                }}
              >
                <div className="flex items-center gap-2 text-primary">
                  <Play className="w-5 h-5" />
                  <span className="font-semibold text-base">
                    {t("dashboard", "continueLastTraining")}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground text-left">
                  {t("clientTypeLabels", lastSession.config.clientType)} •{" "}
                  {t("difficultyLabels", lastSession.config.difficulty)}
                </span>
              </Button>
            )}

            <Button
              size="lg"
              className="h-auto py-6 flex flex-col items-start gap-2 gradient-primary hover:opacity-90 transition-opacity"
              onClick={() => navigate("/offers")}
            >
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span className="font-semibold text-base">{t("dashboard", "newTraining")}</span>
              </div>
              <span className="text-sm text-primary-foreground/90">
                {t("dashboard", "selectOffersAndStart")}
              </span>
            </Button>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-heading font-semibold">
              {t("dashboard", "recentTrainings")}
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentSessions.map((session) => (
              <Card
                key={session.id}
                className="hover:shadow-custom-md transition-shadow cursor-pointer border-border/50"
                onClick={() => navigate(`/summary/${session.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold">
                      {session.config.isPreset && session.config.presetName
                        ? session.config.presetName
                        : t("clientTypeLabels", session.config.clientType)}
                    </CardTitle>
                    <Badge
                      variant={
                        session.score >= 80
                          ? "default"
                          : session.score >= 60
                            ? "secondary"
                            : "destructive"
                      }
                      className="shrink-0"
                    >
                      {session.score}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(session.date).toLocaleDateString(language === "pl" ? "pl-PL" : "en-US")}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("common", "difficulty")}</span>
                    <span className="font-medium">
                      {t("difficultyLabels", session.config.difficulty)}
                    </span>
                  </div>
                  {session.config.goal && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("common", "goal")}</span>
                      <span className="font-medium">
                        {t("goalLabels", session.config.goal)}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 flex items-center gap-1 text-xs">
                    {session.config.isPreset ? (
                      <Badge variant="outline" className="text-xs">
                        {t("common", "presetManager")}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        {t("common", "ownConfigBadge")}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {recentSessions.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  {t("dashboard", "noTrainingsYet")}
                </p>
                <Button onClick={() => navigate("/offers")}>
                  {t("dashboard", "startFirstTraining")}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
