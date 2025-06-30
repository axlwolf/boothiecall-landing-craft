import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAppInitialization } from "@/hooks/useAppInitialization";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminTemplates from "./pages/AdminTemplates";
import AdminAnimations from "./pages/AdminAnimations";
import AdminSEO from "./pages/AdminSEO";
import AdminSettings from "./pages/AdminSettings";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminContent from "./pages/AdminContent";

const queryClient = new QueryClient();

const AppContent = () => {
  useAppInitialization();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/templates" element={<AdminTemplates />} />
      <Route path="/admin/animations" element={<AdminAnimations />} />
      <Route path="/admin/seo" element={<AdminSEO />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/admin/content" element={<AdminContent />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
