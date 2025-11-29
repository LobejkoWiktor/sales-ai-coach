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
import { Badge } from "@/components/ui/badge";
import { storage } from "@/lib/storage";
import { mockOffers } from "@/data/mockData";
import {
  clientTypeLabels,
  clientTypeDescriptions,
  difficultyLabels,
  difficultyDescriptions,
  goalLabels,
} from "@/data/mockData";
import { ArrowLeft, Play, Target, User, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Preparation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const config = storage.getCurrentConfig();

  if (!config) {
    navigate("/offers");
    return null;
  }

  const selectedOffers = mockOffers.filter((offer) =>
    config.selectedOffers.includes(offer.id)
  );

  const handleStartConversation = async () => {
    setIsLoading(true);
    try {
      const payload = {
        trainingConfig: config,
        selectedOffers: selectedOffers,
      };

      console.log("Starting conversation with payload:", payload);

      // Placeholder for the actual API call
      // In a real scenario, you might want to await this
      try {
        await fetch("/api/start-training", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error("Failed to send start training data:", error);
        // We continue anyway as this might be just analytics/logging
      }

      navigate("/conversation");
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast.error("Wystąpił błąd podczas rozpoczynania rozmowy");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-3">
            Przygotowanie do treningu
          </h1>
          <p className="text-muted-foreground text-lg">
            Zapoznaj się z profilem klienta i przygotuj się mentalnie
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <Card className="shadow-custom-md border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl font-heading">
                  Twój klient
                </CardTitle>
              </div>
              <CardDescription className="text-base">
                {clientTypeLabels[config.clientType]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {clientTypeDescriptions[config.clientType]}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-custom-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                <CardTitle className="text-xl font-heading">
                  W tym treningu sprzedajesz
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-4 bg-secondary/50 rounded-lg space-y-2"
                >
                  <h4 className="font-semibold text-lg">{offer.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {offer.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {offer.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-custom-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <CardTitle className="text-xl font-heading">
                  Poziom trudności
                </CardTitle>
              </div>
              <CardDescription className="text-base">
                {difficultyLabels[config.difficulty]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {difficultyDescriptions[config.difficulty]}
              </p>
              {config.goal && (
                <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm font-medium text-accent-foreground">
                    <strong>Cel rozmowy:</strong> {goalLabels[config.goal]}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-dashed">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Źródło konfiguracji
                  </p>
                  <Badge variant="outline">
                    {config.isPreset
                      ? `Preset managera: ${config.presetName}`
                      : "Konfiguracja własna"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="gradient-primary text-lg px-12 gap-3 shadow-custom-md hover:shadow-custom-lg transition-all"
            onClick={handleStartConversation}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            {isLoading ? "Rozpoczynanie..." : "Rozpocznij rozmowę"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Preparation;
