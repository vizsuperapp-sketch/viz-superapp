
## Estado

Os 4 ajustes de responsividade já foram aplicados no turno anterior:

1. **`HeroSection.tsx`** — mini-cubo escondido em `< md`; headline com quebra semântica (`SuperApp da casa.` / `Comprar ou vender, sem comissões.`) e tipografia fluida `clamp(2.25rem, 7vw, 4.5rem)`.
2. **`HeroSection.tsx`** — cubo 3D escondido em mobile, reduzido (`md:scale-90`) e afastado (`md:translate-x-4`) em tablet para libertar os CTAs.
3. **`Auth.tsx`** — cartão de login com `max-w-lg` a partir de `md`, ancorado ao topo em mobile (`items-start md:items-center`, `pt-12 md:pt-6`).
4. **`index.css`** — `footer { padding-bottom: calc(env(safe-area-inset-bottom) + 5rem) }` em `max-width: 767px` para o FAB do chat não tapar o rodapé.

O build e a verificação Playwright ficaram por concluir porque o sandbox reiniciou.

## O que falta fazer (só verificação)

- Re-correr o build de produção (`bun run build`).
- Re-capturar screenshots mobile (390 px) e tablet (820 px) das 7 rotas (`/`, `/imoveis`, `/vender`, `/servicos`, `/precos`, `/documentos`, `/auth`).
- Confirmar visualmente que os 4 pontos ficaram resolvidos e que o desktop não regrediu.
- Se algum ponto não estiver perfeito, aplicar patch adicional na mesma volta.

Nenhuma alteração de código nova está prevista neste passo — só validação. Se surgirem regressões durante a verificação, corrigem-se de imediato.
