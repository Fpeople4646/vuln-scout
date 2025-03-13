
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import BruteForce from "./pages/BruteForce";
import SqlInjection from "./pages/SqlInjection";
import XSS from "./pages/XSS";
import NetworkScanner from "./pages/NetworkScanner";
import DnsSpoofing from "./pages/DnsSpoofing";
import MitM from "./pages/MitM";
import PhishingSimulator from "./pages/PhishingSimulator";
import WifiSecurity from "./pages/WifiSecurity";
import IPTracking from "./pages/IPTracking";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bruteforce" element={<BruteForce />} />
            <Route path="/sql-injection" element={<SqlInjection />} />
            <Route path="/xss" element={<XSS />} />
            <Route path="/network-scanner" element={<NetworkScanner />} />
            <Route path="/dns-spoofing" element={<DnsSpoofing />} />
            <Route path="/mitm" element={<MitM />} />
            <Route path="/phishing" element={<PhishingSimulator />} />
            <Route path="/wifi-security" element={<WifiSecurity />} />
            <Route path="/ip-tracking" element={<IPTracking />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
