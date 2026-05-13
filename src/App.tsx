import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";

// Code-split rotas pesadas (admin, vender, documentos, imóveis) para baixar bundle inicial em mobile/4G
const SuccessPostSale = lazy(() => import("./pages/SuccessPostSale.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Documentos = lazy(() => import("./pages/Documentos.tsx"));
const Vender = lazy(() => import("./pages/Vender.tsx"));
const Imoveis = lazy(() => import("./pages/Imoveis.tsx"));
const ImovelDetalhe = lazy(() => import("./pages/ImovelDetalhe.tsx"));
const ChatWidget = lazy(() => import("./components/ChatWidget"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/imoveis" element={<Imoveis />} />
              <Route path="/imoveis/:slug" element={<ImovelDetalhe />} />

              {/* Rotas Protegidas */}
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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
