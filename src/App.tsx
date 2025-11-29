import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OfferSelection from "./pages/OfferSelection";
import OfferSummary from "./pages/OfferSummary";
import ConfigType from "./pages/ConfigType";
import TrainingConfig from "./pages/TrainingConfig";
import Preparation from "./pages/Preparation";
import Conversation from "./pages/Conversation";
import TrainingSummary from "./pages/TrainingSummary";
import Manager from "./pages/Manager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/offers" element={<OfferSelection />} />
          <Route path="/offer-summary" element={<OfferSummary />} />
          <Route path="/config-type" element={<ConfigType />} />
          <Route path="/config" element={<TrainingConfig />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/summary/:id" element={<TrainingSummary />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
