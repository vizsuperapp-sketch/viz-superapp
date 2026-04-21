

## Clarear o fundo da aplicação

### Situação atual
O fundo é definido em `src/index.css` com `--background: 222 47% 6%` (HSL) — extremamente escuro, quase preto-azulado. Isto cria a sensação de "muito escuro" reportada.

### Proposta
Subir a luminosidade do fundo e ajustar tokens dependentes para manter a hierarquia visual (cards continuam ligeiramente mais claros que o fundo, bordas continuam visíveis).

**Alterações em `src/index.css` (`:root`):**

| Token | Antes | Depois | Efeito |
|---|---|---|---|
| `--background` | `222 47% 6%` | `222 35% 11%` | Fundo principal mais claro, mantém tom navy |
| `--card` | `222 40% 9%` | `222 32% 14%` | Cards continuam acima do fundo |
| `--popover` | `222 40% 9%` | `222 32% 14%` | Consistência com cards |
| `--muted` | `222 30% 14%` | `222 25% 18%` | Áreas muted continuam destacadas |
| `--border` | `222 20% 15%` | `222 18% 20%` | Bordas mantêm contraste suave |
| `--input` | `222 20% 15%` | `222 18% 20%` | Igual a border |
| `--sidebar-background` | `222 40% 8%` | `222 32% 13%` | Sidebar acompanha fundo |
| `--sidebar-border` | `222 20% 15%` | `222 18% 20%` | Consistência |
| `bg-gradient-soft` end | `222 40% 8%` | `222 32% 13%` | Gradiente acompanha |

### O que NÃO muda
- Paleta primária (verde VIZ + azul) — mantém identidade
- Tokens de glass (`--glass-bg`, blur, highlights) — continuam a funcionar bem sobre o novo fundo
- Tipografia, espaçamentos, layouts

### Resultado esperado
Fundo passa de quase-preto (~6% luminosidade) para um navy escuro confortável (~11%). Mantém a estética Liquid Glass dark, mas reduz a sensação de "buraco preto", melhora legibilidade e suaviza o contraste com texto claro.

### Ficheiros
- `src/index.css` — bloco `:root` (tokens listados acima)

