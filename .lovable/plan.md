## Diagnóstico
O `InteractiveCube` tem 3 problemas que causam o travamento e o desalinhamento no telemóvel:

1. **Layout fora do eixo**: o componente envolve tudo num `w-full h-screen` com fundo gradiente próprio, mas é renderizado dentro da coluna direita do Hero. Em mobile cria um bloco 100vh com largura total a empurrar o grid, gerando overflow horizontal e margens descentradas. Além disso o container do cubo tem `width: 480px` (cubeSize 320 × 1.5), maior que viewports de 375px.
2. **Re-render a 60fps**: `setRotation` é chamado em cada `requestAnimationFrame`, re-renderizando os 6 faces (cada um com vários divs com `backdropFilter`) a cada frame — causa freeze em iPhone/Android médios.
3. **GPU overload**: três blobs `blur-3xl` + `backdrop-filter: blur(12px) saturate(1.2)` em 6 faces simultâneas + glow radial pulsante. Em mobile a composição passa do limite e bloqueia o main thread.

## Alterações em `src/components/InteractiveCube.tsx`

### 1. Remover wrapper full-screen
- Substituir o `<div className="w-full h-screen bg-gradient-to-br ...">` por um wrapper compacto `relative flex flex-col items-center justify-center` sem altura fixa nem fundo (o Hero já tem ambient background).
- Remover os 3 blobs `blur-3xl` (duplicam o fundo do Hero).
- Remover o `<h2>SuperApp da Casa</h2>` e o `<p>` de instruções (já existem no Hero).

### 2. Tamanho responsivo
- Detetar mobile uma vez via `window.matchMedia("(max-width: 640px)")` no mount.
- `cubeSize`: 220 em mobile, 320 em desktop. Container interno = `cubeSize` (sem multiplicador 1.5) com `overflow-visible` para o glow.
- Wrapper exterior `max-w-full` para nunca exceder a coluna.

### 3. Animação sem re-render
- Trocar `useState({x,y})` por `useRef({x,y})` e aplicar a rotação diretamente via `innerCubeRef.current.style.transform = ...` dentro do rAF.
- React deixa de re-renderizar a cada frame; só o nó interior recebe atualização de transform.
- Estados que continuam em React: `isDragging`, `autoRotate` (mudam raramente).

### 4. Reduzir custo GPU em mobile
- Em mobile: `backdropFilter` reduzido para `blur(6px)` (em vez de 12px) e `saturate(1.1)`.
- Remover a animação `pulse-glow` no mobile (manter glow estático).
- Remover a animação `liquid-shimmer` no swirl interno em mobile.
- Manter visuais completos em desktop.

### 5. Touch sem scroll-jacking
- Adicionar `touch-action: none` no nó do cubo para o drag em telemóvel não interferir com scroll vertical da página fora do cubo.

## Verificação
- `browser--view_preview` com viewport 375×812: confirmar que (a) não há scroll horizontal, (b) o cubo está centrado dentro da coluna, (c) o scroll vertical é fluido, (d) o cubo continua a rodar.
- Repetir em desktop 1280×720 para garantir que nada regrediu visualmente.
- `browser--performance_profile` em mobile para confirmar redução de long tasks.

## Fora de scope
- Não mexer no Hero nem noutros componentes.
- Manter API/identidade visual (faces, cores, ícones, texto "VIZ").
