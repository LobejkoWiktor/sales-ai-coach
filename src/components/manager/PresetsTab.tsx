import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockPresets, mockOffers } from "@/data/mockData";
import {
  clientTypeLabels,
  difficultyLabels,
  goalLabels,
} from "@/data/mockData";
import { Plus, Pencil, Trash2 } from "lucide-react";

const PresetsTab = () => {
  const [presets] = useState(mockPresets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold">
            Konfiguracje treningu (Presety)
          </h2>
          <p className="text-muted-foreground">
            Twórz rekomendowane ustawienia dla handlowców
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Dodaj konfigurację
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nowa konfiguracja treningu</DialogTitle>
              <DialogDescription>
                Stwórz preset dla określonej oferty i typu klienta
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="preset-name">Nazwa konfiguracji</Label>
                <Input
                  id="preset-name"
                  placeholder="np. CFO – demo produktu X"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preset-offer">Powiązana oferta</Label>
                <Select>
                  <SelectTrigger id="preset-offer">
                    <SelectValue placeholder="Wybierz ofertę..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockOffers
                      .filter((o) => o.isActive)
                      .map((offer) => (
                        <SelectItem key={offer.id} value={offer.id}>
                          {offer.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preset-client">Typ klienta</Label>
                  <Select>
                    <SelectTrigger id="preset-client">
                      <SelectValue placeholder="Wybierz..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(clientTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preset-difficulty">Poziom trudności</Label>
                  <Select>
                    <SelectTrigger id="preset-difficulty">
                      <SelectValue placeholder="Wybierz..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(difficultyLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preset-goal">Cel rozmowy (opcjonalnie)</Label>
                <Select>
                  <SelectTrigger id="preset-goal">
                    <SelectValue placeholder="Wybierz cel..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Brak celu</SelectItem>
                    {Object.entries(goalLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preset-description">
                  Krótki opis - kiedy używać
                </Label>
                <Textarea
                  id="preset-description"
                  placeholder="Opisz, w jakich sytuacjach handlowiec powinien użyć tej konfiguracji"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Anuluj
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Dodaj konfigurację
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {presets.map((preset) => {
          const offer = mockOffers.find((o) => o.id === preset.offerId);
          return (
            <Card key={preset.id} className="shadow-custom-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-heading">
                        {preset.name}
                      </CardTitle>
                      <Badge variant="outline">Preset</Badge>
                    </div>
                    <CardDescription className="text-base mb-3">
                      {preset.description}
                    </CardDescription>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-muted-foreground">Oferta:</span>{" "}
                        <span className="font-medium">{offer?.name}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid md:grid-cols-3 gap-3">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <span className="text-xs text-muted-foreground block mb-1">
                    Typ klienta
                  </span>
                  <span className="font-medium text-sm">
                    {clientTypeLabels[preset.clientType]}
                  </span>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <span className="text-xs text-muted-foreground block mb-1">
                    Trudność
                  </span>
                  <span className="font-medium text-sm">
                    {difficultyLabels[preset.difficulty]}
                  </span>
                </div>
                {preset.goal && (
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <span className="text-xs text-muted-foreground block mb-1">
                      Cel
                    </span>
                    <span className="font-medium text-sm">
                      {goalLabels[preset.goal]}
                    </span>
                  </div>
                )}
              </CardContent>

              <CardContent className="text-xs text-muted-foreground border-t pt-3">
                Utworzono: {new Date(preset.createdAt).toLocaleDateString("pl-PL")}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PresetsTab;
