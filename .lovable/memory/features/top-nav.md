---
name: Top Nav global
description: Barra de navegação sticky translúcida com Home/Serviços/Preços/Imóveis + Área de Cliente; oculta em /admin e /auth
type: feature
---
Componente: `src/components/TopNav.tsx`, renderizado dentro do `<BrowserRouter>` em `App.tsx`.
Esconde-se em rotas que começam por `/admin` ou `/auth` via `useLocation`.
Mobile: menu hambúrguer com `Sheet`.
O botão "Área de Cliente" no Hero foi removido para evitar duplicação — vive só na nav.
