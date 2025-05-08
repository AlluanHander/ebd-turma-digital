
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChurchProvider } from "./context/ChurchProvider";
import { InventoryProvider } from "./context/InventoryContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Classe from "./pages/Classe";
import Secretary from "./pages/Secretary";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

// Initialize capacitor if available
const initCapacitor = async () => {
  if (Capacitor && Capacitor.isPluginAvailable('SplashScreen')) {
    try {
      const { SplashScreen } = await import('@capacitor/splash-screen');
      await SplashScreen.hide();
      
      // Set status bar style if available
      if (Capacitor.isPluginAvailable('StatusBar')) {
        const { StatusBar, Style } = await import('@capacitor/status-bar');
        // Fix: Use the proper enum value from the Style export
        await StatusBar.setStyle({ style: Style.Dark });
      }
    } catch (e) {
      console.error('Error initializing Capacitor plugins', e);
    }
  }
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initCapacitor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChurchProvider>
        <InventoryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/home" element={<Home />} />
                <Route path="/classe" element={<Classe />} />
                <Route path="/turma" element={<Classe />} /> {/* Add this route to handle redirects from old URLs */}
                <Route path="/secretary" element={<Secretary />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </InventoryProvider>
      </ChurchProvider>
    </QueryClientProvider>
  );
};

export default App;
