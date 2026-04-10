

## Redesign do Cubo Interativo — Material cristalino + 6 faces com conteúdo

### Referência visual
A imagem mostra um cubo de cristal/vidro com gradiente verde-teal (esquerda) para azul (direita), arestas com brilho neon ciano, reflexos especulares intensos, e ícones brancos grandes nas faces visíveis (casa, aperto de mão) com "VIZ" no topo.

### Conteúdo das 6 faces

| Face | Posição | Conteúdo |
|------|---------|----------|
| Frente | `translateZ` | **VIZ** (texto grande 72px, sem ícone) |
| Direita | `rotateY(90deg)` | 🏠 ícone `Home` + **COMPRAR** |
| Esquerda | `rotateY(-90deg)` | 📈 ícone `TrendingUp` + **VENDER** |
| Trás | `rotateY(180deg)` | 🏛 ícone `Landmark` + **FINANCIAR** |
| Topo | `rotateX(90deg)` | 🔑 ícone `Key` + **ARRENDAR** |
| Baixo | `rotateX(-90deg)` | ⚙️ ícone `Settings` + **GERIR** |

### Alterações ao material (para corresponder à imagem)

- **Gradiente das faces**: mais saturado, transição verde-teal → azul mais intensa (`hsla(163,60%,55%,0.4)` → `hsla(211,80%,55%,0.45)`)
- **Arestas com brilho neon**: border mais luminoso (`2px solid hsla(180,80%,70%,0.6)`) com `boxShadow` de glow ciano nas arestas
- **Reflexo especular**: mais pronunciado, cobrindo ~25% do topo da face
- **Core glow**: mais intenso e com tom ciano
- **Sparkle points**: nos cantos, simulando os brilhos de aresta visíveis na imagem

### Ficheiro alterado

| Ficheiro | Alteração |
|----------|-----------|
| `src/components/InteractiveCube.tsx` | Atualizar `faces` array com ícones Lucide + palavras, redesenhar material do `CubeFace`, atualizar hover labels |

### Detalhes técnicos

- Importar `Home, TrendingUp, Landmark, Key, Settings` de `lucide-react`
- `CubeFace` recebe `icon` (componente Lucide) + `label` (texto) + `isLogo` (boolean para face VIZ)
- Face VIZ: texto 72px bold, sem ícone
- Faces com serviço: ícone ~48px acima + texto ~20px bold abaixo
- Hover labels atualizados para as 3 faces visíveis no ângulo padrão

