
import { ToastProvider } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { ProjectProvider } from "@/contexts/ProjectContext";
import Index from "./pages/Index";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import BudgetFinancials from "./pages/BudgetFinancials";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Timeline from "./pages/Timeline";
import Projects from "./pages/Projects";
import InvestmentImpact from "./pages/InvestmentImpact";
import ActionItems from "./pages/ActionItems";
import NotFound from "./pages/NotFound";

// Enable dark mode by default
const enableDarkMode = () => {
  document.documentElement.classList.add('dark');
};

const queryClient = new QueryClient();

// Layout component without the global AI Assistant
const PageLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const App = () => {
  // Set dark mode on initial load
  useEffect(() => {
    enableDarkMode();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <TooltipProvider>
          <ProjectProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<PageLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/action-items" element={<ActionItems />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/budget-financials" element={<BudgetFinancials />} />
                  <Route path="/investment-impact" element={<InvestmentImpact />} />
                  <Route path="/timeline" element={<Timeline />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </ProjectProvider>
        </TooltipProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
