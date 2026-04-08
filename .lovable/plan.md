

## Adicionar separador "Chat" ao painel admin

### O que será feito
Criar um novo separador (tab) no painel admin que mostra todas as sessões de chat e permite expandir cada sessão para ver o histórico completo de mensagens.

### Ficheiros a criar/modificar

| Ficheiro | Ação |
|----------|------|
| `src/components/admin/AdminChatTab.tsx` | **Criar** — novo componente com lista de sessões e visualização de mensagens |
| `src/pages/Admin.tsx` | **Modificar** — adicionar a tab "Chat" ao TabsList |

### Estrutura do componente `AdminChatTab`

**Vista principal:** Tabela com todas as sessões de `chat_sessions` (nome, email, telefone, interesse, data), ordenadas por data decrescente.

**Ao clicar numa sessão:** Expande um painel abaixo (ou ao lado) mostrando todas as mensagens de `chat_messages` filtradas por `session_id`, ordenadas cronologicamente. Cada mensagem mostra o role (user/assistant) com estilos visuais distintos (bolhas tipo chat).

**Funcionalidades:**
- Loading e estados vazios consistentes com os outros tabs
- Botão para voltar à lista de sessões
- Badge com o interesse do utilizador
- Formatação de datas em PT-PT

### Alterações em `Admin.tsx`
- Importar `AdminChatTab`
- Adicionar `<TabsTrigger value="chat">Chat</TabsTrigger>` ao TabsList
- Adicionar `<TabsContent value="chat"><AdminChatTab /></TabsContent>`

### Sem alterações na base de dados
As tabelas `chat_sessions` e `chat_messages` já existem com políticas RLS que permitem SELECT apenas a admins — exactamente o que precisamos.

