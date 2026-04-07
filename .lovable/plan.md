

## Plano: Redesenhar o cubo para corresponder à imagem de referência

### Problemas actuais
- Cubo demasiado pequeno e desbotado
- Painéis interiores quase invisíveis (opacidade muito baixa)
- Ícones e labels mal se vêem
- Falta contraste e presença visual
- O shell exterior é demasiado subtil

### O que a imagem de referência mostra
- Cubo grande e sólido com cantos arredondados bem visíveis
- Faces com fundo verde/teal translúcido mas **claramente visível** (não quase transparente)
- Ícones brancos grandes e legíveis dentro de cada face
- Labels em uppercase branco bem legíveis
- Arestas/bordas visíveis com brilho
- Glow ambiente forte por baixo e à volta
- Sensação de objeto sólido de vidro fosco, não wireframe invisível

### Alterações no ficheiro `src/components/InteractiveCube.tsx`

1. **Aumentar tamanho**: outer de 220px para 280px, inner de 140px para 240px (painéis quase do tamanho do cubo, sem gap wireframe)
2. **Remover o shell exterior wireframe** — na imagem de referência não existe um wireframe separado; é um cubo sólido com faces visíveis
3. **Painéis com fundo muito mais opaco**: `hsla(163, 45%, 65%, 0.35)` em vez de 0.03-0.12
4. **Bordas mais visíveis**: `1.5px solid hsla(163, 50%, 85%, 0.5)` 
5. **Ícones maiores** (36-40px) com cor branca mais opaca (0.95)
6. **Labels maiores** (11px) com cor branca mais opaca
7. **Glow central mais forte e maior**
8. **Sombra ambiente mais pronunciada**
9. **Container maior** para dar presença no hero
10. **Manter toda a lógica** de drag, auto-rotate, hover, pointer events

### Resultado esperado
Um cubo 3D grande, sólido e elegante com faces de vidro verde-teal visíveis, ícones brancos claros, e presença visual forte no hero — fiel à imagem de referência.

