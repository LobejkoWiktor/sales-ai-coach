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
import { mockOffers } from "@/data/mockData";
import { storage } from "@/lib/storage";
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from "lucide-react";

const OfferSummary = () => {
  const navigate = useNavigate();
  const config = storage.getCurrentConfig();

  if (!config?.selectedOffers || config.selectedOffers.length === 0) {
    navigate("/offers");
    return null;
  }

  const selectedOffers = mockOffers.filter((offer) =>
    config.selectedOffers.includes(offer.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/offers")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zmień wybrane oferty
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-3">
            Podsumowanie wybranych ofert
          </h1>
          <p className="text-muted-foreground text-lg">
            To materiały, na których opieramy rozmowę i insighty. Przejrzyj je
            przed treningiem.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {selectedOffers.map((offer) => (
            <Card key={offer.id} className="shadow-custom-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-heading mb-2">
                      {offer.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {offer.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {offer.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              {offer.materials.length > 0 && (
                <CardContent>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Materiały do przejrzenia
                  </h4>
                  <div className="space-y-2">
                    {offer.materials.map((material) => (
                      <a
                        key={material.id}
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary hover:border-primary/30 transition-all group"
                      >
                        <span className="font-medium">{material.label}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            size="lg"
            onClick={() => navigate("/config-type")}
            className="gap-2"
          >
            Przejdź do konfiguracji treningu
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OfferSummary;
