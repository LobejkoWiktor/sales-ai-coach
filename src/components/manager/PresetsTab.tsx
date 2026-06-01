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
import { useLanguage } from "@/i18n/LanguageContext";

const PresetsTab = () => {
  const [presets] = useState(mockPresets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { language, t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold">
            {t("presetsTab", "title")}
          </h2>
          <p className="text-muted-foreground">
            {t("presetsTab", "subtitle")}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t("presetsTab", "addConfig")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t("presetsTab", "newConfig")}</DialogTitle>
              <DialogDescription>
                {t("presetsTab", "newConfigDesc")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="preset-name">{t("presetsTab", "configName")}</Label>
                <Input
                  id="preset-name"
                  placeholder={t("presetsTab", "configNamePlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preset-offer">{t("presetsTab", "linkedOffer")}</Label>
                <Select>
                  <SelectTrigger id="preset-offer">
                    <SelectValue placeholder={t("presetsTab", "selectOffer")} />
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
                  <Label htmlFor="preset-client">{t("presetsTab", "clientType")}</Label>
                  <Select>
                    <SelectTrigger id="preset-client">
                      <SelectValue placeholder={t("presetsTab", "select")} />
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

                <div className="space-y-2">
                  <Label htmlFor="preset-difficulty">{t("presetsTab", "difficultyLevel")}</Label>
                  <Select>
                    <SelectTrigger id="preset-difficulty">
                      <SelectValue placeholder={t("presetsTab", "select")} />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="preset-goal">{t("presetsTab", "goalOptional")}</Label>
                <Select>
                  <SelectTrigger id="preset-goal">
                    <SelectValue placeholder={t("presetsTab", "selectGoal")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("presetsTab", "noGoal")}</SelectItem>
                    {Object.keys(goalLabels).map((value) => (
                      <SelectItem key={value} value={value}>
                        {t("goalLabels", value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preset-description">
                  {t("presetsTab", "descriptionLabel")}
                </Label>
                <Textarea
                  id="preset-description"
                  placeholder={t("presetsTab", "descriptionPlaceholder")}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                {t("common", "cancel")}
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {t("presetsTab", "addConfig")}
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
                      <Badge variant="outline">{t("common", "preset")}</Badge>
                    </div>
                    <CardDescription className="text-base mb-3">
                      {preset.description}
                    </CardDescription>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-muted-foreground">{t("common", "offer")}</span>{" "}
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
                    {t("presetsTab", "clientType")}
                  </span>
                  <span className="font-medium text-sm">
                    {t("clientTypeLabels", preset.clientType)}
                  </span>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <span className="text-xs text-muted-foreground block mb-1">
                    {t("common", "difficulty").replace(":", "")}
                  </span>
                  <span className="font-medium text-sm">
                    {t("difficultyLabels", preset.difficulty)}
                  </span>
                </div>
                {preset.goal && (
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <span className="text-xs text-muted-foreground block mb-1">
                      {t("common", "goal").replace(":", "")}
                    </span>
                    <span className="font-medium text-sm">
                      {t("goalLabels", preset.goal)}
                    </span>
                  </div>
                )}
              </CardContent>

              <CardContent className="text-xs text-muted-foreground border-t pt-3">
                {t("presetsTab", "createdAt")}{" "}
                {new Date(preset.createdAt).toLocaleDateString(language === "pl" ? "pl-PL" : "en-US")}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PresetsTab;
