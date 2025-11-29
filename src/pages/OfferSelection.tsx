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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { mockOffers } from "@/data/mockData";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { storage } from "@/lib/storage";

const OfferSelection = () => {
  const navigate = useNavigate();
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const activeOffers = mockOffers.filter((offer) => offer.isActive);

  const toggleOffer = (offerId: string) => {
    setSelectedOffers((prev) =>
      prev.includes(offerId)
        ? prev.filter((id) => id !== offerId)
        : [...prev, offerId]
    );
  };

  const handleContinue = () => {
    const currentConfig = storage.getCurrentConfig();
    storage.setCurrentConfig({
      ...currentConfig,
      selectedOffers,
      clientType: currentConfig?.clientType || "cfo-decisive",
      difficulty: currentConfig?.difficulty || "medium",
      isPreset: false,
    });
    navigate("/offer-summary");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do dashboardu
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-3">
            Wybierz oferty do treningu
          </h1>
          <p className="text-muted-foreground text-lg">
            Na podstawie wybranych ofert przygotujemy rozmowę i insighty
            sprzedażowe.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {activeOffers.map((offer) => (
            <Card
              key={offer.id}
              className={`cursor-pointer transition-all hover:shadow-custom-md ${
                selectedOffers.includes(offer.id)
                  ? "border-primary shadow-custom-sm"
                  : "border-border/50"
              }`}
              onClick={() => toggleOffer(offer.id)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedOffers.includes(offer.id)}
                    onCheckedChange={() => toggleOffer(offer.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-xl font-heading mb-2">
                      {offer.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {offer.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {offer.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            size="lg"
            disabled={selectedOffers.length === 0}
            onClick={handleContinue}
            className="gap-2"
          >
            Pokaż podsumowanie ofert
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OfferSelection;
