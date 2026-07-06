
# Redesign VIZ — Homepage investor-ready

## Objetivo
Reestruturar a homepage seguindo a estrutura de 10 secções pedida, com estética Liquid Glass (gradiente `#0f172a → #1a2744`, azul/cyan/verde, Outfit + DM Sans, cubo 3D central), formulário de waitlist funcional em Lovable Cloud, mobile-first, sem erros de build.

## Alterações principais

### 1. Design system (`src/index.css`, `tailwind.config.ts`)
- Background gradiente suave `#0f172a → #1a2744` (não preto puro).
- Tokens semânticos: `--primary` (azul #3B82F6), `--accent` (cyan #06B6D4), `--success` (verde #10B981), `--danger` (vermelho para "antes").
- Glass utility: `bg-white/5 backdrop-blur-xl border border-white/10`.
- Fonts: Outfit (headings), DM Sans (body) via Google Fonts.

### 2. Base de dados (nova tabela `waitlist`)
Migration com:
- Campos: `full_name`, `email` (unique), `phone`, `user_type` (comprador/vendedor/investidor).
- RLS: `INSERT` público (anon+authenticated), `SELECT` apenas admins via `has_role`.
- GRANT explícito a `anon`, `authenticated`, `service_role`.

### 3. Nova estrutura da homepage (`src/pages/Index.tsx`)
Substituir 12 secções actuais por 10 novas, criadas em `src/components/viz/`:

1. `VizNavbar` — logo cubo+VIZ, links (Comprar/Vender/Serviços/Como Funciona), CTA "Começar Agora" cyan, glass on scroll.
2. `VizHero` — headline "Vende a tua casa. Poupa €15.000. Sem agências.", subtitle, 2 CTAs, cubo 3D 280px à direita (reutiliza `InteractiveCube`), badge "247 pessoas na lista VIP 🔥".
3. `VizStatsBar` — 3 glass cards: 0% / €15.000+ / €25B+.
4. `VizProblemSection` — "O sistema imobiliário está partido", diagrama caótico + 4 pontos.
5. `VizSolutionSection` — comparação lado a lado (vermelho vs verde), 4 linhas cada.
6. `VizHowItWorks` — 3 cards horizontais com números grandes.
7. `VizServicesGrid` — 6 cards (Crédito, Certificado, Legal, Foto 360°, Seguros, Obras) com ícones Lucide.
8. `VizRoadmap` — 3 fases (Concierge / MVP Digital / Ecossistema).
9. `VizWaitlistForm` — formulário funcional com validação zod, insert directo em `waitlist`, toast de sucesso.
10. `VizFooter` — logo, tagline, links, "Confidencial 2026 · VIZ SuperApp".

### 4. Meta / SEO (`index.html`)
Title: "VIZ — Vende a tua casa sem comissões". Description investor-focused.

### 5. Rotas existentes
Manter `/vender`, `/comprar`, `/admin`, `/auth`, etc. intactas — só a `/` é redesenhada. Navbar aponta para essas rotas.

## Fora de scope
- Não mexer no chatbot, admin, selling wizard, área de documentos.
- Não alterar tabelas existentes (properties, leads, chat_*).
- Sem novas integrações externas.

## Verificação
- `tsgo` + build limpo.
- Playwright: screenshot 390px (mobile) e 1280px (desktop) da nova home.
- Submissão real do formulário via preview + confirmação da row em `waitlist`.
