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
import { mockOffers, mockPresets } from "@/data/mockData";
import { storage } from "@/lib/storage";
import { ArrowLeft, Settings, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ConfigType = () => {
  const navigate = useNavigate();
  const config = storage.getCurrentConfig();
  const { t } = useLanguage();

  if (!config?.selectedOffers || config.selectedOffers.length === 0) {
    navigate("/offers");
    return null;
  }

  const relevantPresets = mockPresets.filter((preset) =>
    config.selectedOffers.includes(preset.offerId)
  );

  const handlePresetSelect = (presetId: string) => {
    const preset = mockPresets.find((p) => p.id === presetId);
    if (!preset) return;

    storage.setCurrentConfig({
      selectedOffers: [preset.offerId],
      clientType: preset.clientType,
      difficulty: preset.difficulty,
      goal: preset.goal,
      isPreset: true,
      presetId: preset.id,
      presetName: preset.name,
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
            onClick={() => navigate("/offer-summary")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common", "back")}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-3">
            {t("configType", "title")}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t("configType", "subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-heading font-semibold">
                {t("configType", "managerConfigs")}
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              {t("configType", "managerRecommended")}
            </p>

            {relevantPresets.length > 0 ? (
              <div className="space-y-4">
                {relevantPresets.map((preset) => {
                  const offer = mockOffers.find((o) => o.id === preset.offerId);
                  return (
                    <Card
                      key={preset.id}
                      className="hover:shadow-custom-md transition-all border-border/50"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <CardTitle className="text-lg font-heading">
                            {preset.name}
                          </CardTitle>
                          <Badge variant="outline" className="shrink-0">
                            {t("common", "preset")}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {preset.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              {t("common", "offer")}
                            </span>
                            <p className="font-medium">{offer?.name}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{t("common", "client")}</span>
                            <p className="font-medium">
                              {t("clientTypeLabels", preset.clientType)}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              {t("common", "difficulty")}
                            </span>
                            <p className="font-medium">
                              {t("difficultyLabels", preset.difficulty)}
                            </p>
                          </div>
                          {preset.goal && (
                            <div>
                              <span className="text-muted-foreground">{t("common", "goal")}</span>
                              <p className="font-medium">
                                {t("goalLabels", preset.goal)}
                              </p>
                            </div>
                          )}
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => handlePresetSelect(preset.id)}
                        >
                          {t("configType", "useThisConfig")}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {t("configType", "noPresetsAvailable")}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-heading font-semibold">
                {t("configType", "customConfig")}
              </h2>
            </div>
            <p className="text-muted-foreground mb-6">
              {t("configType", "customConfigSubtitle")}
            </p>

            <Card className="border-accent/30 shadow-custom-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  {t("configType", "createFromScratch")}
                </CardTitle>
                <CardDescription>
                  {t("configType", "createFromScratchDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">{t("configType", "selectedOffers")}</p>
                    <div className="space-y-1">
                      {config.selectedOffers.map((offerId) => {
                        const offer = mockOffers.find((o) => o.id === offerId);
                        return (
                          <p key={offerId} className="text-sm text-muted-foreground">
                            • {offer?.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    className="w-full gradient-accent"
                    size="lg"
                    onClick={() => navigate("/config")}
                  >
                    {t("configType", "createOwnConfig")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfigType;
