import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockSessions, mockOffers } from "@/data/mockData";
import { TrendingUp, Users, Target } from "lucide-react";

const AnalyticsTab = () => {
  const totalSessions = mockSessions.length;
  const avgScore = Math.round(
    mockSessions.reduce((acc, s) => acc + s.score, 0) / totalSessions
  );

  const offerCounts = mockSessions.reduce((acc, session) => {
    session.config.selectedOffers.forEach((offerId) => {
      acc[offerId] = (acc[offerId] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topOffers = Object.entries(offerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([offerId, count]) => {
      const offer = mockOffers.find((o) => o.id === offerId);
      const offerSessions = mockSessions.filter((s) =>
        s.config.selectedOffers.includes(offerId)
      );
      const avgOfferScore = Math.round(
        offerSessions.reduce((acc, s) => acc + s.score, 0) /
          offerSessions.length
      );
      return {
        name: offer?.name || "Nieznana oferta",
        count,
        avgScore: avgOfferScore,
      };
    });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold mb-1">
          Analityka (podstawowa)
        </h2>
        <p className="text-muted-foreground">
          Ogólne statystyki treningów w ostatnich dniach
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-custom-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Treningi (ostatnie 7 dni)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalSessions}</div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Średni wynik
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgScore}%</div>
          </CardContent>
        </Card>

        <Card className="shadow-custom-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Aktywne oferty
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {mockOffers.filter((o) => o.isActive).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-custom-md">
        <CardHeader>
          <CardTitle className="text-xl font-heading">
            Top 5 najczęściej trenowanych ofert
          </CardTitle>
          <CardDescription>
            Które produkty są najczęściej ćwiczone przez handlowców
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topOffers.map((offer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{offer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {offer.count} treningów
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{offer.avgScore}%</p>
                  <p className="text-xs text-muted-foreground">Średni wynik</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
