## Objetivo
Enviar uma notificação WhatsApp para **+351 916 021 831** sempre que ocorrer:
1. **Novo registo** em `/auth`
2. **Novo upload** de documento (em `/vender` ou `/documentos`)
3. **Nova conversa** de chat iniciada (1 notificação por sessão, não por mensagem)

Canal de envio: **Twilio WhatsApp** via connector gateway da Lovable.

## Pré-requisitos (ação do utilizador)
1. **Ligar o connector Twilio** — vou pedir a ligação; precisas de ter uma conta Twilio (o sandbox WhatsApp serve para testes).
2. **Número From aprovado no Twilio** — normalmente `whatsapp:+14155238886` no sandbox, ou o teu número WhatsApp Business aprovado em produção.
3. **Sandbox**: enviar `join <código>` do +351 916 021 831 para o número Twilio sandbox uma vez, para poder receber mensagens.

Guardo o número `From` como secret `TWILIO_WHATSAPP_FROM` e o destino `TWILIO_WHATSAPP_TO=whatsapp:+351916021831` (fixo, o teu número).

## Arquitetura

Uma única edge function `notify-whatsapp` (privada, service-role) que:
- Recebe `{ event: "signup" | "upload" | "chat", payload: {...} }`.
- Formata a mensagem em PT-PT.
- Chama Twilio via `https://connector-gateway.lovable.dev/twilio/Messages.json`.
- É *fire-and-forget* — falhas não bloqueiam o fluxo do utilizador (log em `console.error` + tabela `notification_log` para auditoria).

Cada evento é disparado a partir do sítio certo:

| Evento | Disparo | Ficheiro |
|---|---|---|
| Novo registo | Trigger PG em `auth.users` (AFTER INSERT) → `net.http_post` para `notify-whatsapp` | Migração SQL |
| Novo upload | No fim do `secure-upload/index.ts`, depois de gravar em `client_documents` | Edge function existente |
| Nova conversa | Após criar `chat_sessions` (primeira vez), invoke client-side de `notify-whatsapp` | `src/components/chat/ChatPreForm.tsx` |

Para o registo uso trigger DB (garantido, mesmo em signup por Google/OAuth). Para upload e chat uso invoke direto porque já há contexto server/client.

### Tabela de auditoria
```
notification_log(id, event_type, payload jsonb, status, twilio_sid, error, created_at)
```
Só service_role escreve/lê. Útil para depurar entregas.

## Formato das mensagens

- **Registo**: `🆕 Novo registo VIZ\nNome: {nome}\nEmail: {email}\nData: {hora PT}`
- **Upload**: `📎 Novo upload VIZ\nCliente: {email}\nFicheiro: {nome} ({tipo})\nData: {hora PT}`
- **Chat**: `💬 Novo cliente no chat VIZ\nNome: {nome}\nInteresse: {interesse}\nData: {hora PT}`

## Passos de implementação

1. Connector Twilio (`standard_connectors--connect`).
2. Guardar `TWILIO_WHATSAPP_FROM` e `TWILIO_WHATSAPP_TO` como secrets.
3. Criar tabela `notification_log` (migração com GRANTs + RLS service-role only).
4. Criar edge function `notify-whatsapp` (com CORS, sem verify_jwt para permitir chamada de trigger PG e client).
5. Migração: trigger `on_auth_user_created_notify` em `auth.users`.
6. Editar `supabase/functions/secure-upload/index.ts` → invoke `notify-whatsapp` após insert em `client_documents`.
7. Editar `src/components/chat/ChatPreForm.tsx` → invoke `notify-whatsapp` após criar `chat_sessions`.
8. Testar cada fluxo end-to-end e confirmar entrega WhatsApp + linha em `notification_log`.

## Fora de âmbito
- UI para configurar destinatários (número fica hard-coded via secret).
- Notificações por email em paralelo.
- Alertas para outros eventos (ex: leads, geração IA).
- Alterações visuais.
