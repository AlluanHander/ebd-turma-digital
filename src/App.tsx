
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChurchProvider } from "./context/ChurchProvider";
import { InventoryProvider } from "./context/InventoryContext";
import { TeacherProvider } from "./context/TeacherContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Secretary from "./pages/Secretary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChurchProvider>
      <InventoryProvider>
        <TeacherProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/secretary" element={<Secretary />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TeacherProvider>
      </InventoryProvider>
    </ChurchProvider>
  </QueryClientProvider>
);

export default App;
