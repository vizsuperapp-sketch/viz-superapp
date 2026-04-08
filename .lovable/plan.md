

## Chatbot: Formulário pré-chat + Novo tom + Histórico de conversas

### O que será feito

Três mudanças principais no chatbot VIZ:

1. **Formulário pré-chat** — antes de iniciar a conversa, o utilizador preenche nome, telefone, email e interesse (comprar, vender, arrendar, financiamento, certificado energético, destaque, outro)
2. **Novo tom informal + perguntas de qualificação** — o assistente passa a ser direto, amigável e proativo no cross-selling de serviços
3. **Persistência do histórico** — todas as conversas são guardadas na base de dados para análise interna

### Fluxo do utilizador

```text
[Clica no botão do chat]
        │
        ▼
[Formulário pré-chat]
  Nome, Telefone, Email, Interesse
        │
        ▼
[Cria sessão na BD + regista lead]
        │
        ▼
[Chat abre com mensagem personalizada]
  "Olá {nome}! Vi que tens interesse em {interesse}..."
        │
        ▼
[Cada mensagem é guardada na BD em tempo real]
```

### Ficheiros a criar/modificar

| Ação | Ficheiro | Descrição |
|------|---------|-----------|
| Migration | Nova tabela `chat_sessions` e `chat_messages` | Guardar sessões e mensagens |
| Modificar | `src/components/ChatWidget.tsx` | Adicionar ecrã de formulário pré-chat, enviar dados de contacto ao backend, persistir mensagens |
| Modificar | `supabase/functions/chat/index.ts` | Novo SYSTEM_PROMPT informal + receber contexto do utilizador + guardar mensagens na BD |

### Detalhes técnicos

**Nova tabela `chat_sessions`:**
- `id`, `name`, `email`, `phone`, `interest`, `created_at`
- RLS: admins podem ver todas (para análise interna); sem restrição de INSERT (visitantes anónimos podem criar)

**Nova tabela `chat_messages`:**
- `id`, `session_id` (FK → chat_sessions), `role` (user/assistant), `content`, `created_at`
- RLS: admins podem ver todas; sem restrição de INSERT

**Formulário pré-chat (ChatWidget):**
- Campos: Nome (obrigatório), Telefone (obrigatório), Email (obrigatório), Interesse (dropdown com opções: Comprar, Vender, Arrendar, Financiamento, Certificado Energético, Destaque, Outro)
- Após submissão, cria `chat_session` e passa o `session_id` + dados do utilizador ao backend em cada pedido
- Mensagens enviadas e recebidas são guardadas em `chat_messages`

**Novo SYSTEM_PROMPT (informal + qualificação):**
- Tom: informal, amigável, direto — como um amigo que percebe de imobiliário
- Respostas curtas: 2-3 frases máximo
- Recebe o nome e interesse do utilizador como contexto
- Árvore de qualificação:
  - Comprar → perguntar se tem imóvel para vender; se tem financiamento aprovado
  - Vender → perguntar se tem certificado energético; se precisa de ajuda com documentação
  - Qualquer caso → oferecer consultor ou advogado

**Edge function `chat/index.ts`:**
- Recebe `session_id`, `interest`, `name` além das `messages`
- Injeta contexto do utilizador no system prompt
- Guarda cada mensagem do utilizador e do assistente na tabela `chat_messages` via service_role

