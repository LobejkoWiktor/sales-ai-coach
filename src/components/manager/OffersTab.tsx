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
import { Switch } from "@/components/ui/switch";
import { mockOffers } from "@/data/mockData";
import { Plus, Pencil, ExternalLink, Trash2 } from "lucide-react";

const OffersTab = () => {
  const [offers] = useState(mockOffers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold">Zarządzanie ofertami</h2>
          <p className="text-muted-foreground">
            Dodawaj i edytuj oferty dostępne do treningów
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Dodaj ofertę
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nowa oferta</DialogTitle>
              <DialogDescription>
                Wypełnij informacje o ofercie i dodaj materiały
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nazwa oferty</Label>
                <Input id="name" placeholder="np. SalesForce CRM Enterprise" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Krótki opis</Label>
                <Textarea
                  id="description"
                  placeholder="Opisz ofertę w 1-2 zdaniach"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tagi (oddzielone przecinkami)</Label>
                <Input id="tags" placeholder="SaaS, Enterprise, CRM" />
              </div>

              <div className="space-y-3">
                <Label>Materiały / zasoby</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Label (np. Prezentacja PDF)" className="flex-1" />
                    <Input placeholder="URL" className="flex-1" />
                    <Button variant="outline" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Dodaj kolejny materiał
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <Label htmlFor="active" className="text-base">
                    Oferta aktywna
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Tylko aktywne oferty są dostępne do treningów
                  </p>
                </div>
                <Switch id="active" defaultChecked />
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
                Dodaj ofertę
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="shadow-custom-md">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl font-heading">
                      {offer.name}
                    </CardTitle>
                    <Badge variant={offer.isActive ? "default" : "secondary"}>
                      {offer.isActive ? "Aktywna" : "Nieaktywna"}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {offer.description}
                  </CardDescription>
                  <div className="flex gap-2 mt-3">
                    {offer.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
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

            {offer.materials.length > 0 && (
              <CardContent>
                <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
                  Materiały ({offer.materials.length})
                </h4>
                <div className="space-y-1">
                  {offer.materials.map((material) => (
                    <a
                      key={material.id}
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded hover:bg-secondary transition-colors text-sm group"
                    >
                      <span>{material.label}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                    </a>
                  ))}
                </div>
              </CardContent>
            )}

            <CardContent className="text-xs text-muted-foreground border-t pt-3">
              Ostatnia aktualizacja:{" "}
              {new Date(offer.updatedAt).toLocaleDateString("pl-PL")}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OffersTab;
