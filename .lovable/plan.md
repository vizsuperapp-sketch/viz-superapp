

## Plano: Redesenhar o cubo interativo com estética de vidro em camadas

### Objectivo
Substituir o cubo actual por um design mais sofisticado que replica a imagem de referência: um cubo com shell exterior wireframe, painéis interiores flutuantes com ícones, e um núcleo central brilhante — mantendo toda a interactividade existente (drag, auto-rotate, hover).

### Alterações visuais (baseadas na imagem)
- **Shell exterior**: cubo wireframe translúcido maior (arestas finas, faces quase invisíveis)
- **Painéis interiores**: 6 faces mais pequenas que "flutuam" a partir do centro, com espaço entre elas e o shell — cada uma com ícone e label
- **Núcleo central**: glow teal/verde intenso no centro do cubo
- **Camadas múltiplas**: sensação de profundidade com 2 cubos concêntricos (outer shell + inner panels)

### Labels actualizadas (conforme a imagem)
Substituir "Arrendar" → "Mudar" e "Gerir" → manter ou ajustar conforme as 6 faces visíveis na referência.

### Ficheiro alterado
- `src/components/InteractiveCube.tsx` — reescrita do componente visual, mantendo toda a lógica de interacção (drag, auto-rotate, pointer events, hover speed-up)

### Detalhes técnicos
- Continua a usar CSS `transform-style: preserve-3d` com `rotateX/Y`
- Shell exterior: cubo com `translateZ` maior (~160px), faces com `border` fino e `background` quase transparente
- Painéis interiores: cubo com `translateZ` menor (~100px), faces glass com ícones
- Núcleo: div central com `radial-gradient` e `blur` intenso
- Toda a lógica de `onPointerDown/Move/Up`, `autoRotate`, `isHovered` permanece inalterada
- Animações `breathe` e `sparkle` mantidas

