## Objetivo

Reescrever a secção Hero da homepage para comunicar a proposta de venda sem comissões, com dois CTAs claros e um contador social de "lista VIP" dinâmico.

## Alterações no HeroSection

1. **Headline principal**
   - Novo texto: `Vende a tua casa. Poupa €15.000. Sem agências.`
   - Manter animação `fade-up` e tipografia bold/balanceada.

2. **Subtitle**
   - Novo texto: `A VIZ liga compradores e vendedores diretamente. Zero comissão. Sempre.`
   - Substituir os dois parágrafos de suporte existentes por este único subtítulo.

3. **Dois botões grandes**
   - **Botão 1 — "Quero Vender →"**
     - Aparência: gradiente azul/cyan dominante, tamanho grande (`xl`).
     - Ação: `navigate('/vender')`.
   - **Botão 2 — "Quero Comprar →"**
     - Aparência: outline branco/brilhante sobre fundo escuro, tamanho grande.
     - Ação: scroll suave para a secção de imóveis em destaque.
   - Remover o botão "Ver como funcionar" para dar protagonismo aos CTAs.

4. **Contador VIP**
   - Mostrar `{count} pessoas já na lista VIP` com ícone `Users`.
   - O valor deve ser dinâmico, vindo do backend.

## Backend para contador VIP

1. **Nova Edge Function `get-vip-count`**
   - Localização: `supabase/functions/get-vip-count/index.ts`.
   - Lógica: `SELECT COUNT(*)::int FROM public.leads` usando `service_role`.
   - Resposta pública em JSON, sem autenticação.
   - Configurar CORS headers para a origem da app.

2. **Client helper**
   - Criar `src/lib/vip-count.ts` com função `getVipCount()` que chama a edge function e retorna `number`.
   - Usar fallback local (ex: `247`) se a chamada falhar, para evitar UI vazia.

3. **Deploy da edge function** no final.

## Estilos

- Adicionar utilitário `.bg-gradient-cyan` (ou similar) em `src/index.css` com gradiente azul/cyan dominante para o CTA principal, seguindo os tokens de cor existentes (`--viz-blue`, `--viz-green` ou tons adjacentes).
- Ajustar os botões para empilharem verticalmente em mobile e ficarem lado a lado em desktop, mantendo tamanho grande e destaque.

## Ficheiros a alterar

- `src/components/HeroSection.tsx` (conteúdo e CTAs)
- `src/pages/Index.tsx` (garantir ID na secção de imóveis para scroll do CTA "Comprar")
- `src/index.css` (novo gradiente azul/cyan)
- `src/lib/vip-count.ts` (novo helper)
- `supabase/functions/get-vip-count/index.ts` (nova edge function)

## Verificação

- `bunx vite build` passa sem erros.
- Preview mostra a nova headline, os dois CTAs e o contador VIP com número real.
- Clicar em "Quero Comprar" faz scroll suave para a secção de imóveis.
- Clicar em "Quero Vender" navega para `/vender`.