

## Plano: Substituir logo do cubo no Hero

### O que fazer
Substituir a imagem atual `src/assets/viz-logo-cube.png` pela nova imagem enviada (cubo VIZ de cristal com letras V, I, Z), e processar para remover o fundo branco.

### Passos
1. Copiar `user-uploads://WhatsApp_Image_2026-04-08_at_00.20.13.png` para `src/assets/viz-logo-cube.png` (sobrescrever)
2. Processar a imagem com Python/Pillow para remover o fundo branco e torná-lo transparente
3. Nenhuma alteração de código necessária — o `HeroSection.tsx` já importa e usa este ficheiro

### Ficheiros alterados
- `src/assets/viz-logo-cube.png` — substituída pela nova imagem com fundo transparente

