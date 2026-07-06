## Objetivo
Receber um email em **viz.superapp@gmail.com** sempre que ocorrer:
1. Novo registo em `/auth`
2. Novo upload de documento
3. Nova conversa de chat iniciada

Sem Twilio, sem WhatsApp, sem connectors externos — usa a infraestrutura de email da própria Lovable (Lovable Emails).

## Porquê esta alternativa
- Zero configuração de contas de terceiros. Só precisas de aprovar um domínio de envio (subdomínio tipo `notify.oteudominio.com`) através do diálogo de setup da Lovable. Se ainda não tiveres domínio, uso um durante o setup.
- Entrega fiável, com fila, retries automáticos e log de envios (`email_send_log`) para auditoria.
- Gratuito dentro dos limites da Lovable Cloud.

## Trade-offs vs WhatsApp
- Chega ao Gmail, não ao telemóvel — sem push instantâneo (podes ativar notificação do Gmail no telefone para ficar quase equivalente).
- Se quiseres SMS/WhatsApp no futuro, mantém-se a opção de ligar Twilio depois.

## Arquitetura

Uma edge function partilhada `send-transactional-email` (criada pelo scaffold da Lovable) e 3 templates React Email:

| Template | Assunto | Disparo |
|---|---|---|
| `signup-notification` | 🆕 Novo registo VIZ — {email} | Trigger PG em `auth.users` → chama a função |
| `upload-notification` | 📎 Novo upload VIZ — {ficheiro} | No fim de `secure-upload/index.ts`, após insert em `client_documents` |
| `chat-notification` | 💬 Novo cliente no chat VIZ — {nome} | Após criar `chat_sessions` em `src/components/chat/ChatPreForm.tsx` |

Destinatário fixo `viz.superapp@gmail.com` (hard-coded na função — sem UI de configuração, conforme pediste).

Cada envio usa `idempotencyKey` derivado do id do evento para evitar duplicados em retries.

## Passos de implementação

1. **Setup do domínio de email** (diálogo Lovable) — só se ainda não existir. É a única ação manual.
2. `email_domain--setup_email_infra` — cria filas pgmq, tabelas de log/suppression, cron job.
3. `email_domain--scaffold_transactional_email` — cria `send-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression`.
4. Criar 3 templates em `supabase/functions/_shared/transactional-email-templates/` com estética VIZ (dark, glass) e registá-los em `registry.ts`.
5. Migração SQL: trigger `on_auth_user_created_notify` em `auth.users` (AFTER INSERT) que chama `send-transactional-email` via `net.http_post` com `templateName: 'signup-notification'`.
6. Editar `supabase/functions/secure-upload/index.ts` → `supabase.functions.invoke('send-transactional-email', ...)` após insert em `client_documents`.
7. Editar `src/components/chat/ChatPreForm.tsx` (ou o parent que cria a `chat_sessions`) → `invoke` após criar a sessão.
8. Deploy das edge functions.
9. Testar cada fluxo e confirmar linha em `email_send_log` + email na inbox.

## Fora de âmbito
- UI para gerir destinatários (email fica hard-coded).
- WhatsApp / SMS / push.
- Alertas para outros eventos (leads, geração IA, etc).
- Alterações visuais na app.

## O que preciso de ti
- Confirmar que queres avançar por email para `viz.superapp@gmail.com`.
- Se ainda não houver domínio de email configurado, completar o diálogo de setup quando eu o mostrar (2 min, requer acesso ao DNS do teu domínio).
