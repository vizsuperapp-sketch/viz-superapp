

## Cubo VIZ — Aspecto Realista (estilo da imagem)

### Fix obrigatório (build error)
Remover `jsx` do `<style jsx>` em `InteractiveCube.tsx` linha 217 (Next.js syntax inválida em Vite). Trocar por `<style>` standard.

### Direção visual (referência da imagem)
- **Material**: vidro/gelo translúcido com refração, gotas/escorridos no topo, reflexos especulares fortes, transparência real entre faces.
- **Neon vivo**: ícones e texto em néon ciano/azul/magenta com glow intenso e bloom.
- **Iluminação**: rim light frio nas arestas, luz quente subtil num canto.
- **Conteúdo das faces** (alinhar com a imagem):
  - Topo: **VIZ** (néon branco/ciano)
  - Frente: **Comprar** (aperto de mão, ciano)
  - Direita: **Vender** (casa, azul)
  - Outras faces mantidas: Arrendar, Gerir, Financiar — em néons da mesma família.

### Decisão técnica: Three.js (recomendado)

Para chegar perto da imagem (refração, gotas, transparência real, bloom), CSS 3D não chega. Proposta:

- Adicionar `three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0` (versões obrigatórias para React 18, conforme docs do projeto).
- Reescrever `InteractiveCube.tsx` com:
  - `<Canvas>` com câmara perspectiva e `OrbitControls` (auto-rotate + drag).
  - **Cubo de vidro**: `MeshTransmissionMaterial` (drei) — `transmission: 1`, `roughness: 0.05`, `thickness: 1.5`, `ior: 1.45`, `chromaticAberration: 0.04`, `distortion: 0.2`, `temporalDistortion: 0.1`, `clearcoat: 1`, leve tint azul.
  - **Arestas**: `<Edges>` com cor ciano para definir silhueta.
  - **Texto/ícones néon**: `<Text>` (drei) por face com material emissivo forte (`emissiveIntensity: 2-3`) em ciano/azul/magenta; ícones desenhados como SVG→`<Text>` ou `<Svg>` extrusionado. Posicionados ligeiramente à frente de cada face (z-offset) para parecerem gravados/flutuantes dentro do vidro.
  - **Pós-processamento** (`@react-three/postprocessing` opcional, ou via `EffectComposer` do drei): `Bloom` (intensity 1.2, luminanceThreshold 0.2) — é isto que dá o "néon vivo".
  - **Ambiente**: `<Environment preset="night">` ou HDR escuro azulado para reflexos realistas.
  - **Iluminação**: `directionalLight` fria + `pointLight` ciano + `pointLight` magenta subtil.
  - **Fundo**: transparente (`<Canvas gl={{ alpha: true }}>`) para integrar com a Hero existente.

### Interação
- Auto-rotate lento (0.4 rad/s) via `OrbitControls autoRotate`.
- Drag desativa auto-rotate; volta ao fim de 2s parado.
- `enableZoom={false}`, `enablePan={false}`.

### Layout
- Container 100% da coluna direita do Hero, altura ~520px desktop / 380px mobile.
- Legenda "SuperApp da Casa" abaixo do canvas, mantendo estilo atual.

### Performance / fallback
- `dpr={[1, 2]}`, `frameloop="always"` só quando visível (IntersectionObserver) → pausa quando fora do viewport.
- Em dispositivos sem WebGL, fallback para a versão CSS atual simplificada.

### Ficheiros
- `src/components/InteractiveCube.tsx` — reescrita completa (R3F)
- `package.json` — adicionar `three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `@react-three/postprocessing` (compatível com R3F 8)

### Notas
- Não vamos usar a imagem carregada como textura — vamos **recriar** o aspecto em 3D real (fica vivo, rotaciona, néon pulsa). Se preferires usar a imagem como textura estática num plano, diz e simplifico.

