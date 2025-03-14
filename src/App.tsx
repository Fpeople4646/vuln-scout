
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./components/auth/AuthGuard";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Index />} />
              
              {/* Protected routes */}
              <Route path="/bruteforce" element={<AuthGuard><BruteForce /></AuthGuard>} />
              <Route path="/sql-injection" element={<AuthGuard><SqlInjection /></AuthGuard>} />
              <Route path="/xss" element={<AuthGuard><XSS /></AuthGuard>} />
              <Route path="/network-scanner" element={<AuthGuard><NetworkScanner /></AuthGuard>} />
              <Route path="/dns-spoofing" element={<AuthGuard><DnsSpoofing /></AuthGuard>} />
              <Route path="/mitm" element={<AuthGuard><MitM /></AuthGuard>} />
              <Route path="/phishing" element={<AuthGuard><PhishingSimulator /></AuthGuard>} />
              <Route path="/wifi-security" element={<AuthGuard><WifiSecurity /></AuthGuard>} />
              <Route path="/ip-tracking" element={<AuthGuard><IPTracking /></AuthGuard>} />
              <Route path="/tools" element={<AuthGuard><Tools /></AuthGuard>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
