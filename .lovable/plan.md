

## Corrigir chat que fica preso a carregar e não guarda mensagens

### Problema identificado

Há dois problemas relacionados:

**1. Stream nunca termina** — Se o AI gateway não enviar `[DONE]` ou a conexão ficar pendente, o loop `while (!done)` em `streamChat` nunca sai. O `loading` nunca volta a `false` e o chat fica "preso" a responder para sempre.

**2. `setLoading(false)` depende de callbacks frágeis** — O reset do estado `loading` está dentro de `onDone` e `onError`, que são callbacks. Se `streamChat` falhar de forma inesperada (timeout de rede, erro no reader), nenhum dos callbacks é chamado e o chat trava.

**3. Mensagens podem não estar a ser guardadas** — Se o stream falha antes de `onDone`, a mensagem do assistente nunca é gravada na base de dados. A sessão é criada mas fica sem mensagens no histórico.

### Solução

| Ficheiro | Alteração |
|----------|-----------|
| `src/components/ChatWidget.tsx` | Corrigir gestão de estado e adicionar timeout |

**Alterações concretas:**

1. **Adicionar `AbortController` com timeout de 60s** ao `fetch` dentro de `streamChat` — se a resposta demorar mais de 60s, aborta automaticamente e mostra erro ao utilizador.

2. **Mover `setLoading(false)` para um bloco `finally`** na função `send` — garante que o estado é sempre resetado, independentemente de como o stream termina.

3. **Guardar mensagem do assistente no `finally`** — se `assistantSoFar` tiver conteúdo quando o stream termina (por qualquer razão), gravar na base de dados.

4. **Remover `onDone`/`onError` callbacks** — simplificar `streamChat` para ser uma função que faz throw em caso de erro, em vez de usar callbacks. O controlo de estado fica todo no `send`.

### Resultado esperado
- Chat responde e termina a resposta normalmente
- Se houver timeout, mostra mensagem de erro e permite enviar nova mensagem
- Todas as mensagens (user + assistant) ficam guardadas e aparecem no histórico admin

