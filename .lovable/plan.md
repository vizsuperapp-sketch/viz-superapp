

## Plano: Redesign completo da homepage VIZ — Premium Dark Proptech

### Visao geral
Transformar a homepage de um fundo claro com glass verde/teal para uma experiencia dark premium com identidade "blue glass", layout side-by-side no Hero, e novas secoes alinhadas com o prompt.

---

### Fase 1 — Cubo interativo (imagem de referencia)

**Ficheiro:** `src/components/InteractiveCube.tsx`

O cubo actual ja tem V-I-Z e glow azul, mas a imagem de referencia mostra um cubo com:
- Gradiente verde-teal-azul nas faces (nao azul puro) — mix de `hsla(163,...)` e `hsla(211,...)`
- Faces muito mais translucidas e "cristalinas" com reflexos de luz no topo
- Bordas brancas finas e visiveis com glow suave
- Letras V, I, Z brancas grandes e bold
- Fundo claro/neutro (nao escuro) a volta do cubo — o cubo e que brilha

Alteracoes:
- Faces: gradiente multi-cor `linear-gradient(145deg, hsla(163,50%,60%,0.4), hsla(190,60%,55%,0.35), hsla(211,70%,60%,0.3))` 
- Bordas: `1.5px solid hsla(0,0%,100%,0.6)` — mais brancas
- Reflexo especular no topo de cada face mais forte (0.4 opacidade)
- Inner glow: radial gradient verde-azul mais suave
- Manter hover labels e toda a logica de interacao

---

### Fase 2 — Dark premium background + CSS tokens

**Ficheiro:** `src/index.css`

- Adicionar variante dark nos tokens `:root` ou aplicar directamente nas secoes
- Background principal: `#0a0f1a` (dark navy) com gradientes ambientais azul profundo
- Glass tokens dark: `--glass-bg: rgba(255,255,255,0.05)`, borders `rgba(255,255,255,0.1)`
- `.text-gradient` manter verde-azul mas mais vibrante sobre dark
- Novos utilitarios: `.dark-section`, `.glass-card-dark`

---

### Fase 3 — Hero section side-by-side

**Ficheiro:** `src/components/HeroSection.tsx`

Layout:
- Fundo dark (`bg-[#0a0f1a]`) com glow radial azul subtil
- Grid `md:grid-cols-2` — texto esquerda, cubo direita
- Esquerda: headline "Comprar ou vender casa, sem agencia." + subheadline + support line + 2 CTAs
- Direita: `<InteractiveCube />` centrado verticalmente
- Trust signals em baixo, full-width
- Remover layout centrado actual

Headline: "Comprar ou vender casa, sem agencia."
Subheadline: "A VIZ liga comprador e vendedor diretamente, com tecnologia, transparencia e zero comissao."
Support: "Nao somos uma imobiliaria. Somos a nova infraestrutura da transacao imobiliaria."

---

### Fase 4 — Nova seccao "Isto nao e uma imobiliaria"

**Novo ficheiro:** `src/components/NotAgencySection.tsx`

- 3 cards premium glass-dark com glow azul no hover
- Cards: "Sem comissao", "Ligacao direta", "Processo guiado"
- Cada card com icone minimalista, titulo bold, descricao curta
- Fundo dark continuo

---

### Fase 5 — Refazer "Como funciona"

**Ficheiro:** `src/components/HowItWorksSection.tsx`

- 4 passos visuais: Publica → Conecta → Avanca com confianca → Conclui
- Layout horizontal com linha de progresso
- Fundo dark, cards glass subtis
- Substituir os 4 passos actuais pelos novos

---

### Fase 6 — Nova seccao "Quem e a VIZ"

**Novo ficheiro:** `src/components/ManifestoSection.tsx`

- Tom forte, nao corporativo
- Tipografia XXL com frases de manifesto
- Posicionar VIZ como nova categoria que substitui mediacao
- Fundo dark com accent glow

---

### Fase 7 — Closing CTA

**Ficheiro:** `src/components/FinalCTASection.tsx`

- Headline: "O futuro da transacao imobiliaria comeca aqui."
- Botao: "Entrar na VIZ"
- Glass card sobre fundo dark

---

### Fase 8 — Reorganizar Index.tsx

**Ficheiro:** `src/pages/Index.tsx`

Nova ordem:
1. HeroSection (dark, side-by-side)
2. NotAgencySection (novo — "Isto nao e uma imobiliaria")
3. ComparisonSection (adaptar para dark)
4. HowItWorksSection (redesenhado)
5. ManifestoSection (novo — "Quem e a VIZ")
6. BenefitsSection (adaptar para dark)
7. EcosystemSection (adaptar para dark)
8. FinalCTASection (redesenhado)
9. FooterSection (adaptar para dark)

Remover: ComparisonTableSection, DifferentiationSection, AppShowcaseSection (redundantes com as novas secoes)

---

### Ficheiros alterados
- `src/components/InteractiveCube.tsx` — cores do cubo conforme imagem
- `src/index.css` — tokens dark, utilitarios
- `src/components/HeroSection.tsx` — layout side-by-side dark
- `src/components/HowItWorksSection.tsx` — 4 novos passos
- `src/components/FinalCTASection.tsx` — nova copy
- `src/components/ComparisonSection.tsx` — adaptar para dark
- `src/components/BenefitsSection.tsx` — adaptar para dark
- `src/components/EcosystemSection.tsx` — adaptar para dark
- `src/components/FooterSection.tsx` — adaptar para dark
- `src/pages/Index.tsx` — nova ordem de secoes

### Ficheiros novos
- `src/components/NotAgencySection.tsx`
- `src/components/ManifestoSection.tsx`

### Ficheiros removidos do Index (componentes mantidos mas nao usados)
- ComparisonTableSection, DifferentiationSection, AppShowcaseSection

