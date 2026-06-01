import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { storage } from "@/lib/storage";
import { mockOffers } from "@/data/mockData";
import {
  clientTypeLabels,
  difficultyLabels,
  goalLabels,
} from "@/data/mockData";
import { ClientType, DifficultyLevel, ConversationGoal } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const TrainingConfig = () => {
  const navigate = useNavigate();
  const config = storage.getCurrentConfig();
  const { t } = useLanguage();

  if (!config?.selectedOffers || config.selectedOffers.length === 0) {
    navigate("/offers");
    return null;
  }

  const [clientType, setClientType] = useState<ClientType>(
    config.clientType || "cfo-decisive"
  );
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    config.difficulty || "medium"
  );
  const [goal, setGoal] = useState<ConversationGoal | undefined>(config.goal);

  const selectedOffers = mockOffers.filter((offer) =>
    config.selectedOffers.includes(offer.id)
  );

  const handleContinue = () => {
    storage.setCurrentConfig({
      selectedOffers: config.selectedOffers,
      clientType,
      difficulty,
      goal,
      isPreset: false,
    });
    navigate("/preparation");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/config-type")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common", "back")}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-3">
            {t("trainingConfig", "title")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("trainingConfig", "subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg">{t("trainingConfig", "selectedOffers")}</CardTitle>
              <CardDescription>
                {t("trainingConfig", "selectedOffersDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <span className="font-medium">{offer.name}</span>
                    <div className="flex gap-2">
                      {offer.tags.slice(0, 2).map((tag) => (
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

          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle className="text-lg">{t("trainingConfig", "trainingParams")}</CardTitle>
              <CardDescription>
                {t("trainingConfig", "trainingParamsDesc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="client-type" className="text-base">
                  {t("trainingConfig", "clientType")}
                </Label>
                <Select value={clientType} onValueChange={(v) => setClientType(v as ClientType)}>
                  <SelectTrigger id="client-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(clientTypeLabels).map((value) => (
                      <SelectItem key={value} value={value}>
                        {t("clientTypeLabels", value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="difficulty" className="text-base">
                  {t("trainingConfig", "difficultyLevel")}
                </Label>
                <Select value={difficulty} onValueChange={(v) => setDifficulty(v as DifficultyLevel)}>
                  <SelectTrigger id="difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(difficultyLabels).map((value) => (
                      <SelectItem key={value} value={value}>
                        {t("difficultyLabels", value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="goal" className="text-base">
                  {t("trainingConfig", "goalOptional")}
                </Label>
                <Select value={goal || "none"} onValueChange={(v) => setGoal(v === "none" ? undefined : v as ConversationGoal)}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder={t("trainingConfig", "selectGoal")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("trainingConfig", "noGoal")}</SelectItem>
                    {Object.keys(goalLabels).map((value) => (
                      <SelectItem key={value} value={value}>
                        {t("goalLabels", value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/30 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {t("trainingConfig", "configSummary")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("common", "client")}</span>
                <span className="font-medium">{t("clientTypeLabels", clientType)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("common", "difficulty")}</span>
                <span className="font-medium">{t("difficultyLabels", difficulty)}</span>
              </div>
              {goal && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("common", "goal")}</span>
                  <span className="font-medium">{t("goalLabels", goal)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("trainingConfig", "products")}</span>
                <span className="font-medium">
                  {selectedOffers.length} {t("trainingConfig", "selected")}
                </span>
              </div>
              <div className="pt-2">
                <Badge variant="outline">{t("common", "ownConfigBadge")}</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button size="lg" onClick={handleContinue} className="gap-2">
              {t("trainingConfig", "proceedToPreparation")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrainingConfig;
