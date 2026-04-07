

## Plano: Cubo V-I-Z com hover labels

### Conceito
Substituir os 6 ícones/labels actuais por um cubo onde as 3 faces visíveis principais mostram as letras **V**, **I**, **Z** em grande (tipografia bold, branca). As restantes 3 faces (traseira, topo, fundo) ficam com glass subtil sem conteúdo. Ao fazer hover sobre o cubo, aparecem micro-labels flutuantes junto às faces visíveis.

### Faces do cubo
| Face | Conteúdo principal | Hover label |
|------|-------------------|-------------|
| Frente | **V** | Venda direta |
| Direita | **I** | IA que acompanha |
| Esquerda | **Z** | Zero comissão |
| Traseira | glass vazio | Transparência total |
| Topo | glass sutil | — |
| Fundo | glass sutil | — |

### Hover labels
- Estado: `hoveredFace` tracked via `onMouseEnter` em cada face
- Ao hovering no cubo inteiro, mostrar 3 labels posicionados com CSS absoluto fora do cubo (offset ~20px das arestas), com animação `fade-in` + leve `translateY`
- Labels em texto pequeno (10-11px), uppercase, cor branca com opacidade

### Alterações visuais
- Letras V/I/Z: `font-size: 72px`, `font-weight: 800`, cor branca com `text-shadow` glow azul
- Remover ícones Lucide (já não necessários)
- Glow ambiente muda de verde/teal para **azul profundo** (`hsla(211, 80%, 55%, ...)`) conforme a identidade "blue glass"
- Faces glass: gradiente azul translúcido em vez de verde
- Core glow: azul profundo

### Lógica mantida
- Toda a interactividade (drag, auto-rotate, hover speed-up, pointer events)
- Animações `breathe` e `sparkle`
- Mesmo tamanho (260px) e container

### Ficheiro alterado
- `src/components/InteractiveCube.tsx` — reescrita das faces e adição de hover labels

