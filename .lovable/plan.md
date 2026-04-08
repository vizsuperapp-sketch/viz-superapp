

## Corrigir RLS da tabela `chat_sessions` para permitir leitura após inserção

### Problema
Quando um utilizador autenticado (não-admin) insere na tabela `chat_sessions`, o código faz `.insert().select("id").single()` para obter o `id` da sessão criada. O PostgREST precisa de executar um SELECT para devolver o resultado, mas a única política SELECT exige role `admin`. Resultado: erro 403 (42501).

O mesmo problema existe na tabela `chat_messages` — não bloqueia o INSERT direto (sem `.select()`), mas é melhor corrigir ambas.

### Solução

**Opção escolhida:** Gerar o UUID no lado do cliente e enviar no INSERT, eliminando a necessidade do `.select().single()` após inserção.

### Ficheiros a modificar

| Ficheiro | Alteração |
|----------|-----------|
| `src/components/ChatWidget.tsx` | Gerar `crypto.randomUUID()` antes do insert e incluí-lo no body; remover `.select("id").single()` |

### Detalhes técnicos
- Usar `crypto.randomUUID()` para gerar o `id` da sessão no cliente
- Incluir o `id` no objecto inserido: `.insert({ id: newId, name, email, phone, interest })`
- Remover `.select("id").single()` — já não é necessário pois temos o ID
- Sem alteração na base de dados — a coluna `id` já tem default `gen_random_uuid()` mas aceita valores explícitos
- Os inserts em `chat_messages` já não usam `.select()`, por isso não são afectados

