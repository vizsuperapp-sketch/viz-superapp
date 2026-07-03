## Objetivo

Adicionar uma nova secção de conversão "Quero Vender o Meu Imóvel" antes do footer, com destaque visual e CTA claro.

## Nova secção

1. **Criar componente** `src/components/SellPropertySection.tsx`:
  - **Headline**: `Pronto para poupar milhares Euros ?`
  - **Subtitle**: `Publica o teu imóvel gratuitamente. Sem contratos. Sem comissões.`
  - **Botão grande**: `Publicar o Meu Imóvel →` (variante `cyan` do botão, tamanho `xl`)
  - **Ação do botão**: navegar para `/vender`.
  - **Background**: card com gradiente suave e glow (reutilizando/estendendo o estilo liquid-glass/glass-card existente, com gradiente próprio).
  - **Animação**: usar `useScrollReveal` para manter consistência com as outras secções.
2. **Inserir na homepage**:
  - Em `src/pages/Index.tsx`, renderizar `<SellPropertySection />` imediatamente antes de `<FooterSection />`.

## Estilos

- Criar/utilizar um utilitário CSS para o gradiente de fundo da secção, mantendo a paleta dark existente.
- O glow deve ser sutil, sem competir com o cubo ou outros elementos.

## Ficheiros a alterar

- `src/components/SellPropertySection.tsx` (novo)
- `src/pages/Index.tsx` (inserir secção)

## Verificação

- `bunx vite build` passa sem erros.
- Preview mostra a nova secção antes do footer, com headline, subtitle, botão azul/cyan e glow suave.
- Clicar no botão navega para `/vender`.