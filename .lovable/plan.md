# Mais transparência no Cubo 3D (subtil, +30%)

Ajustes apenas em `src/components/InteractiveCube.tsx`, na função `RealisticGlassFace`. Texto, ícones, brilhos e bordas mantêm-se legíveis — só o "vidro" das faces fica mais translúcido.

## Alterações

1. **Gradient de fundo da face** (linhas 281-284): reduzir alpha
   - `rgba(150,220,255,0.12)` → `0.08`
   - `rgba(120,200,255,0.08)` → `0.05`
   - `rgba(100,180,255,0.06)` → `0.035`

2. **Backdrop blur** (linhas 285-286): suavizar para reforçar sensação de transparência
   - `blur(18px) saturate(1.3)` → `blur(12px) saturate(1.2)`

3. **Border** (linha 287): mais ténue
   - `rgba(180,220,255,0.25)` → `rgba(180,220,255,0.18)`

4. **Inset highlights** (linhas 289-290): reduzir levemente
   - `inset 0 1px 2px rgba(255,255,255,0.5)` → `0.35`
   - `inset 0 -1px 2px rgba(0,30,60,0.15)` → `0.10`

5. **Camadas internas** (liquid shimmer + swirl, linhas 305-306 e 320): cortar opacidade ~30%
   - `rgba(100,180,255,0.08)` → `0.05`
   - `rgba(80,160,255,0.06)` → `0.04`
   - `rgba(150,200,255,0.15)` → `0.10`

## O que NÃO muda
- Texto "VIZ", labels e ícones (mantêm cor/glow atuais)
- Glow exterior do cubo, animações, rotação, tamanho
- Specular highlight e edge highlight (continuam a dar sensação de vidro)

## Verificação
- Abrir homepage, confirmar visualmente que as faces de trás se entreveem ligeiramente através das da frente
- Confirmar que labels continuam totalmente legíveis em fundo escuro
