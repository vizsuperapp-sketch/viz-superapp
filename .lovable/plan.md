## Objetivo

Adicionar uma barra de prova social abaixo do Hero Section com três números de impacto, fundo glass e design minimalista.

## Alterações

1. **Criar componente** `src/components/SocialProofBar.tsx`:
   - Fundo: glass card semi-transparente (`liquid-glass-strong` ou similar).
   - Três itens lado a lado (horizontal em desktop, empilhados em mobile):
     - **0%** — label "Comissão cobrada" (ícone simples, ex. `Percent` ou `BadgePercent`)
     - **€15.000+** — label "Poupança média por transação" (ícone simples, ex. `Wallet` ou `PiggyBank`)
     - **100%** — label "Transparência no processo" (ícone simples, ex. `Eye` ou `ShieldCheck`)
   - Texto branco, tipografia clean, ícones pequenos e discretos.
   - Animação opcional: `reveal`/`fade-up` para manter consistência com o Hero.

2. **Inserir no Hero Section**:
   - Em `src/components/HeroSection.tsx`, renderizar `<SocialProofBar />` abaixo do conteúdo principal do texto, antes do botão "Começar agora" ou integrado com os CTAs existentes (posicionar de forma visualmente equilibrada).

## Ficheiros a alterar

- `src/components/SocialProofBar.tsx` (novo)
- `src/components/HeroSection.tsx` (inserir barra)

## Verificação

- `bunx vite build` passa sem erros.
- Preview mostra a barra de prova social abaixo do Hero com os 3 números, fundo glass e texto branco.
- Layout responsivo: horizontal em desktop, empilhado em mobile.