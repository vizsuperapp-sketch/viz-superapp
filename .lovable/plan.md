## Objetivo

Fazer uma varredura profunda end-to-end do site, testar registo, uploads de documentos e chatbot, e corrigir tudo o que não estiver fluido. Nada disto altera o design.

## Fase 1 — Diagnóstico (sem editar código)

1. **Estado do backend**
   - `security--run_security_scan` para detetar RLS/GRANTs em falta em `profiles`, `properties`, `leads`, `client_documents`, `chat_sessions`, `chat_messages`, `user_roles`.
   - `supabase--linter` + `read_query` para confirmar policies e grants nas 7 tabelas e nos buckets `documents` e `property-files`.
   - `edge_function_logs` das funções `chat`, `submit-lead`, `secure-upload`, `enhance-photo`, `generate-description`, `get-vip-count` (últimas 24h).

2. **Testes E2E via Playwright headless** (script em `/tmp/browser/`, com sessão Supabase injetada quando aplicável):
   - **Registo / Auth** (`/auth`): signup novo, login, erros PT-PT, redirect pós-login.
   - **Chatbot** (widget global): abrir → pre-form → enviar mensagem → confirmar streaming e persistência em `chat_messages`.
   - **Vender / Uploads** (`/vender`): fluxo dos 3 passos, upload de foto real, upload de PDF, geração de descrição IA, criação de `properties` + `client_documents`.
   - **Documentos** (`/documentos`): listagem, upload, download de ficheiro em bucket privado (signed URL).
   - **Leads** (modal do Hero): submissão via `submit-lead`, verificar registo em `leads`.
   - Cada passo captura screenshot + consola + network; qualquer 4xx/5xx ou exceção é registada.

3. **Relatório consolidado**: lista priorizada de bugs (bloqueante / grave / polimento) com ficheiro:linha e evidência.

## Fase 2 — Correções (build mode, uma iteração por categoria)

Só depois de aprovado o relatório. Correções típicas esperadas:

- **Backend**: GRANTs em falta, policies RLS que bloqueiam inserts legítimos, `user_id` nullable, políticas de storage nos buckets `documents` / `property-files`.
- **Edge Functions**: CORS incompleto, validação Zod, tratamento de erros, respostas com `corsHeaders` também em erro.
- **Frontend**: estados de loading/erro em falta, `toast` de erro em vez de crashes silenciosos, guards de sessão antes de upload (já é regra do projeto), race conditions em uploads, feedback visual durante streaming do chat.
- **Auth**: mensagens PT-PT em falta, redirects protegidos.

Cada correção é seguida de re-teste Playwright do mesmo fluxo para confirmar verde.

## Fase 3 — Validação final

- Re-run do script E2E completo com 0 erros de consola relevantes e 0 respostas 4xx/5xx inesperadas.
- `bunx vite build` limpo.
- Resumo final: o que foi encontrado, o que foi corrigido, o que ficou fora de âmbito.

## Fora de âmbito

- Alterações visuais / de copy que não estejam ligadas a um bug.
- Novas funcionalidades (só correções).
- Testes de carga / performance sob concorrência real.
