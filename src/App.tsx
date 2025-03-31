
import { ToastProvider } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Timeline from "./pages/Timeline";
import Projects from "./pages/Projects";
import InvestmentImpact from "./pages/InvestmentImpact";
import NotFound from "./pages/NotFound";

// Enable dark mode by default
const enableDarkMode = () => {
  document.documentElement.classList.add('dark');
};

const queryClient = new QueryClient();

const App = () => {
  // Set dark mode on initial load
  useEffect(() => {
    enableDarkMode();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/investment-impact" element={<InvestmentImpact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
