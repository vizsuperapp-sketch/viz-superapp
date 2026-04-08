

## Corrigir página de documentos que trava ao inserir ficheiros

### Problema identificado

Há dois problemas no fluxo `/vender`:

**1. `createDraftProperty` pode falhar silenciosamente e travar a página**
Em `Vender.tsx` (linha 84), se `propertyId` é `null`, a página mostra "A carregar..." para sempre. Se a criação do draft falhar (por erro de RLS ou rede), o `propertyId` nunca é definido e a página fica presa no loading.

**2. Uploads podem falhar sem feedback claro e travar o estado**
Se o upload ao storage "property-files" falhar (ex: bucket não acessível, ficheiro grande), o botão pode ficar em "A carregar..." indefinidamente se houver um erro não tratado. Além disso, se o `propertyId` nunca foi criado, o path de upload usa um ID inválido.

### Solução

| Ficheiro | Alteração |
|----------|-----------|
| `src/pages/Vender.tsx` | Adicionar tratamento robusto de erros no `createDraftProperty`: gerar UUID no cliente (como fizemos com chat_sessions), retry automático, e estado de erro visível ao utilizador em vez de loading infinito |
| `src/components/vender/StepDocuments.tsx` | Adicionar timeout e melhor tratamento de erros no upload: se falhar, mostrar mensagem clara e permitir tentar de novo. Adicionar try/catch em volta do upload para evitar que erros não tratados travem o estado `uploading` |

### Detalhes técnicos

**Vender.tsx:**
- Gerar `propertyId` com `crypto.randomUUID()` no cliente (evita `.select().single()` que pode falhar por RLS)
- Adicionar estado `error` para mostrar mensagem ao utilizador se a criação falhar
- Adicionar botão "Tentar novamente" em caso de erro

**StepDocuments.tsx:**
- Envolver todo o `handleFileSelect` num `try/catch` global para que qualquer erro inesperado limpe o estado `uploading`
- Se o upload falhar, manter o botão "Carregar" ativo para o utilizador tentar de novo
- Resetar o `input.value` após selecção para permitir re-selecção do mesmo ficheiro

