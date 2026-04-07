

## Plano: Remover fundo branco da imagem do logo cubo

### Problema
A imagem `src/assets/viz-logo-cube.png` tem fundo branco visível, que contrasta com o fundo dark da homepage.

### Solução
Processar a imagem com um script Python (Pillow) para remover o fundo branco, tornando-o transparente, e guardar como PNG com alpha channel.

### Passos
1. Usar script Python com Pillow para detectar pixels brancos/quase brancos e torná-los transparentes
2. Sobrescrever `src/assets/viz-logo-cube.png` com a versão sem fundo
3. Nenhuma alteração de código necessária — o componente já referencia este ficheiro

### Ficheiros alterados
- `src/assets/viz-logo-cube.png` — imagem processada com fundo transparente

