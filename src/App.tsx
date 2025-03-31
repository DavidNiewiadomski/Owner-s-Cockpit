
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Documents from "./pages/Documents";
import Analytics from "./pages/Analytics";
import Integrations from "./pages/Integrations";
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/projects" element={<Navigate to="/" />} />
            <Route path="/timeline" element={<Navigate to="/" />} />
            <Route path="/messages" element={<Navigate to="/" />} />
            <Route path="/settings" element={<Navigate to="/" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
