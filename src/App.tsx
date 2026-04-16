import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import SuccessPostSale from "./pages/SuccessPostSale.tsx";
import Admin from "./pages/Admin.tsx";
import Auth from "./pages/Auth.tsx";
import Documentos from "./pages/Documentos.tsx";
import Vender from "./pages/Vender.tsx";
import Imoveis from "./pages/Imoveis.tsx";
import ImovelDetalhe from "./pages/ImovelDetalhe.tsx";
import NotFound from "./pages/NotFound.tsx";
import ChatWidget from "./components/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas (acessíveis sem login) */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/imoveis" element={<Imoveis />} />
            <Route path="/imoveis/:slug" element={<ImovelDetalhe />} />

            {/* Rotas Protegidas (exigem login e email confirmado) */}
            <Route
              path="/sucesso"
              element={
                <ProtectedRoute>
                  <SuccessPostSale />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredEmailConfirmed={true}>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/documentos"
              element={
                <ProtectedRoute>
                  <Documentos />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vender"
              element={
                <ProtectedRoute>
                  <Vender />
                </ProtectedRoute>
              }
            />

            {/* Rota para página não encontrada (sempre pública) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ChatWidget />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
