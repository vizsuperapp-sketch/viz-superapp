# Plano — Ecossistema de Serviços VIZ (FASE 1)

Objetivo: tornar visível e tangível o modelo de monetização VIZ (0% comissão + serviços adjacentes), mostrando preços "a partir de" e poupança vs mercado.

## 1. Fonte de dados — `src/data/servicos.ts`

Array `SERVICOS` com 6 entradas (cee, fotos360, documentos, hipoteca, gestaoRenda, manutencao). Cada serviço:

```
{
  id, nome, categoria: 'vender'|'comprar'|'arrendar'|'manutencao',
  icon: LucideIcon, precoLabel: 'desde €200' | '-1,5% taxa' | '€30/mês',
  precoMercadoLabel: '€400',
  poupancaLabel: 'Poupa até €200',
  descricao, beneficios: string[],
  ctaLabel, ctaHref: '/servicos/<id>'  // placeholder
}
```

Também `CATEGORIAS` (Vender, Comprar, Arrendar, Manutenção) para os tabs.

## 2. Nova secção na homepage — `src/components/EcosystemServicesSection.tsx`

- Inserida em `src/pages/Index.tsx` **antes** de `NotAgencySection`.
- Grid `md:grid-cols-2 lg:grid-cols-3`, mobile stack.
- Cards usam tokens existentes (`glass-card`, `text-gradient`, gradiente cyan/primário do cubo) — sem cores hardcoded. Liquid Glass.
- Cada card: ícone Lucide num `glass-icon`, título, lista de 3 bullets, preço grande (`text-2xl font-bold text-gradient`), badge "Poupa €X vs mercado", botão `variant="outline"` → `navigate(ctaHref)`.
- Hover: leve `scale-[1.02]` + shadow azul. Scroll-reveal via `useScrollReveal`.
- Mantém narrativa: cabeçalho "Ecossistema VIZ — Tudo o que precisa, num só sítio" + subtítulo sobre 0% comissão + serviços opcionais.

## 3. Top-nav — `src/components/TopNav.tsx`

- Componente novo, fixo no topo (`sticky top-0 z-40`), translúcido (`backdrop-blur`, `bg-background/70`, borda inferior subtil).
- Logo VIZ à esquerda → `/`. Links: Home, Serviços, Preços, Imóveis. À direita: botão "Área de Cliente" (já presente no Hero) — passa a viver na nav.
- Mobile: menu hambúrguer com `Sheet` (já no projeto).
- Renderizado em `src/App.tsx` dentro de `<BrowserRouter>` acima das `<Routes>`, exceto em `/admin` e `/auth` (verificado via `useLocation`).
- Remover botão duplicado do `HeroSection` (o canto superior direito do Hero deixa de ter o botão "Área de Cliente" para evitar duplicação).

## 4. Hero — `src/components/HeroSection.tsx`

- Manter layout side-by-side e headline principal (memory `brand/hero-redesign` respeitada).
- Adicionar abaixo do parágrafo descritivo uma linha de 6 micro-chips (ícone Lucide + label curto): CEE, Hipoteca, Documentos, Fotos 360°, Gestão Renda, Manutenção. Cada chip é `glass-icon` pequeno; ao clicar faz scroll para a nova secção `#ecossistema`.
- Não alterar cubo, CTAs principais nem trust signals.

## 5. Página `/servicos` — `src/pages/Servicos.tsx`

- Header: "Ecossistema VIZ — Tudo integrado. Tudo simples."
- `Tabs` (shadcn) com triggers: Tudo · Vender · Comprar · Arrendar · Manutenção.
- Cada tab renderiza os serviços filtrados de `SERVICOS` num grid de cards mais detalhados (nome, preço "desde €X", preço mercado riscado, badge poupança, 4 bullets, CTA "Encomendar" → `ctaHref` placeholder).
- Footer reutilizado.

## 6. Página `/precos` — `src/pages/Precos.tsx`

- Header: "Preços VIZ vs Mercado".
- Tabela responsiva (shadcn `Table` em desktop; cards empilhados em mobile) com colunas Serviço · VIZ · Mercado · Poupança.
- Linha total destacada com badge `text-gradient` "Economiza até €2.000+ por transação".
- Nota legal: "Valores indicativos, a partir de. Pode variar conforme imóvel."
- Footer reutilizado.

## 7. Rotas — `src/App.tsx`

- Adicionar `Servicos` e `Precos` como `lazy()` imports.
- Novas rotas públicas `/servicos` e `/precos`.
- Importar `TopNav` e renderizá-lo dentro do `BrowserRouter`.

## 8. Memory updates

- Atualizar `mem://features/homepage-narrative` para incluir `EcosystemServicesSection` antes de NotAgency.
- Criar `mem://features/servicos-ecosystem` com a lista de 6 serviços e preços "a partir de".
- Criar `mem://features/top-nav` com rotas do menu e regra de ocultar em /admin e /auth.

## Out of scope (FASE 2, não nesta entrega)

- `/simulador-hipoteca`, `/comparativo`, checkout, backend de encomendas, integração Stripe, FAQ por serviço, testemunhos, newsletter, pacotes B2B.
- CTAs apontam para `/servicos/<id>` que **não** será criado agora — a rota cairá no `NotFound` existente até FASE 2. Posso opcionalmente fazer cada CTA abrir `LeadFormModal` em vez disso se preferir — confirmar antes de implementar se este comportamento de 404 incomodar.

## Verificação

- `browser--view_preview` em 1280×720 e 375×812: secção nova visível, cards alinhados, tabela `/precos` legível, top-nav não sobrepõe Hero.
- Confirmar que botões do Hero antigos continuam funcionais e que `Área de Cliente` aparece só na nav.
- Console limpo, sem warnings de chave duplicada nem 404 de assets.
