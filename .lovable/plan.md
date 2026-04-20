

## Simplificar Divulgação de Imóveis na Homepage

### Problemas
- Secção `FeaturedPropertiesSection` ocupa scroll excessivo (~330 linhas: showcase + descrição longa + galeria + carousel + outros)
- Imagens externas (`vistabellaoeiras.com`) podem falhar sem fallback
- Iframe YouTube com erros

### Solução: Grid compacto estilo `/imoveis`

Substituir `FeaturedPropertiesSection.tsx` por uma versão enxuta:

**Estrutura nova (~80 linhas):**
- Header curto: badge "Empreendimentos em Destaque" + título + subtítulo
- Grid responsivo `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` com 4 cards
- Cada card (reutilizando o padrão de `Imoveis.tsx`):
  - Imagem `aspect-[4/3]` com `onError` fallback para `/placeholder.svg`
  - Badge região (canto superior esquerdo)
  - Badge "NOVO" se `property.badge` existir
  - Nome + localização + tipologia + preço
  - Hover: borda primary + scale na imagem
  - Link para `/imoveis/${slug}`
- CTA final: botão "Ver todos os N empreendimentos" → `/imoveis`

**Removido:**
- Showcase com imóvel ativo grande
- Iframe YouTube embed (vídeo só na página de detalhe)
- Descrição longa em parágrafos
- Galeria thumbnail duplicada
- Controles carousel (prev/next/dots/auto-play)
- Estado `activeIndex`, `isAutoPlay`, `showVideo`, refs de timer

**Robustez de imagens:**
```tsx
<img src={property.coverImage} onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }} />
```

**Resultado:** secção passa de ~scroll de 4-5 viewports para ~1 viewport, sem iframes, com fallback visual para imagens partidas. Mantém estética dark/glass do projeto e link para detalhe completo onde o vídeo 360° continua disponível.

### Ficheiros
- `src/components/FeaturedPropertiesSection.tsx` — reescrita completa

