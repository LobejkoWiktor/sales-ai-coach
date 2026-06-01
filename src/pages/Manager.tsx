import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OffersTab from "@/components/manager/OffersTab";
import PresetsTab from "@/components/manager/PresetsTab";
import AnalyticsTab from "@/components/manager/AnalyticsTab";
import { useLanguage } from "@/i18n/LanguageContext";

const Manager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("offers");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold">
              {t("manager", "panelTitle")}
            </h1>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              {t("common", "logout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="offers">{t("manager", "offersTab")}</TabsTrigger>
            <TabsTrigger value="presets">{t("manager", "presetsTab")}</TabsTrigger>
            <TabsTrigger value="analytics">{t("manager", "analyticsTab")}</TabsTrigger>
          </TabsList>

          <TabsContent value="offers">
            <OffersTab />
          </TabsContent>

          <TabsContent value="presets">
            <PresetsTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Manager;
