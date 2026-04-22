

## Cubo Liquid Glass — Versão CSS 3D Realista

### Diagnóstico do estado atual
O ficheiro voltou à versão CSS 3D (a tentativa R3F foi revertida). Problemas vs. imagem de referência:
1. **Faces opacas entre si** — `backdrop-filter` não atravessa irmãos 3D, então não vês a face de trás através da da frente. Falta a sensação de "vidro real".
2. **Container ocupa `h-screen`** — quebra o layout do Hero (devia ser ~520px).
3. **Faces com fundo demasiado opaco** (alpha 0.12) — esconde as faces de trás mesmo se ajustássemos blending.
4. **Sem "drips" / escorridos de gelo** no topo (elemento marcante da referência).
5. **Falta aresta luminosa** contínua tipo neón nas bordas do cubo.

### Alterações em `src/components/InteractiveCube.tsx`

**1. Container (fix de layout)**
- Trocar `w-full h-screen bg-gradient-to-br …` por `w-full h-full flex items-center justify-center` com `min-height: 520px` (desktop) / `380px` (mobile).
- Remover background do componente — o Hero já tem o seu. Manter apenas os blobs ambientais subtis dentro do container.
- Reduzir `cubeSize` para `280` (encaixa melhor na coluna direita do Hero).

**2. Faces translúcidas reais**
- Trocar `background` das faces para `rgba(180, 220, 255, 0.04)` (quase invisível) + `border` mais luminosa `rgba(180, 230, 255, 0.5)`.
- Remover `backdropFilter` (não funciona entre faces 3D irmãs e custa GPU sem ganho).
- Adicionar `mix-blend-mode: screen` nas faces para que cores se somem onde se sobrepõem visualmente — efeito "vidro empilhado".
- Aumentar peso dos `boxShadow` internos (highlight branco no topo, escuro no fundo) para dar volume.

**3. Drips / escorridos de gelo (topo da face VIZ + cantos)**
- Adicionar 3-4 SVG paths absolutos em cada face, usando `<svg>` inline com `path` em forma de gota escorrida (curvas Bezier), preenchidos com gradiente branco→transparente e `filter: blur(1px)` para parecerem refração de água.
- Concentrar escorridos perto das arestas superiores.

**4. Arestas neón**
- Adicionar 12 `<div>` finos posicionados como arestas do cubo (cada aresta = um plano fino com `translateZ`/`rotate`), com gradiente ciano→azul e `box-shadow` luminoso. Dá o contorno néon visível na referência.
- Alternativa mais simples: aumentar `border` das faces para `2px` com cor `hsla(190, 100%, 70%, 0.6)` e `box-shadow` exterior ciano forte — efeito quase idêntico, sem 12 elementos extra. **Vamos usar esta.**

**5. Néon vivo (texto/ícones)**
- Manter cores actuais mas reforçar:
  - VIZ: branco puro com `text-shadow` ciano em 3 camadas (10px, 25px, 50px) — tipo tubo de néon.
  - COMPRAR: ciano `#00ffff`, COMPRAR e VENDER com `stroke-width: 2` nos ícones (mais grosso = mais "néon").
  - Adicionar `animation: neon-pulse 2.5s ease-in-out infinite` para shimmer subtil.

**6. Reflexo/luz especular animado**
- Manter o highlight superior esquerdo, mas adicionar uma "banda de luz" diagonal que atravessa cada face de 8 em 8 segundos (`@keyframes light-sweep`) — dá vida sem ser distrair.

**7. Sombra ambiente abaixo do cubo**
- Adicionar uma elipse desfocada por baixo (`filter: blur(40px)`, `background: radial-gradient(ellipse, rgba(0,150,255,0.4), transparent)`) que pulsa devagar — ancora o cubo no espaço.

**8. Limpeza**
- Remover legenda "🖱️ Arraste…" (já implícito pelo cursor `grab`).
- Manter "SuperApp da Casa" mas reduzir para `text-2xl` e dar `mt-4` (cabe melhor na hero).

### Resultado esperado
- Faces verdadeiramente translúcidas: vês as bordas/conteúdo das faces de trás através das da frente (via `mix-blend-mode: screen` + alpha baixíssimo).
- Arestas neón ciano contínuas a delinear a silhueta do cubo.
- Escorridos de "gelo derretido" no topo dão o aspecto liquid glass da referência.
- Néon VIZ/Comprar/Vender pulsa suavemente.
- Cubo cabe na coluna direita do Hero sem ocupar o ecrã todo.
- Zero dependências novas, zero risco de Suspense/WebGL crashar.

### Limitação honesta
CSS 3D **não** consegue refração real (chromatic aberration, distorção do que está atrás como na imagem AI gerada). Para isso só com Three.js + `MeshTransmissionMaterial` — que já tentámos e foi instável. Esta versão chega ao "muito perto" mantendo robustez total.

### Ficheiros
- `src/components/InteractiveCube.tsx` — refactor focado (manter estrutura geral, alterar tokens visuais + adicionar drips SVG + arestas néon + ajustar container)

