## Estado actual vs pedido

Antes de listar trabalho, o que **já existe** (não vou refazer):

- **Auth**: signup/login email+password + Google OAuth, reenvio de email de confirmação, mensagens de erro traduzidas para PT, redirect pós-login.
- **Upload**: drag-and-drop existe em `Documentos.tsx`, validação de tipo (PDF/JPG/PNG/DOC/DOCX/XLS), `try/catch` com retry + rollback de ficheiros órfãos (feito na volta anterior).
- **Chatbot**: flutuante bottom-right, full-screen em mobile, pre-form, streaming SSE, persistência em DB, mensagens de boas-vindas personalizadas por interesse.
- **Mobile**: viewport meta com `viewport-fit=cover`, `aria-label` em botões icon-only, inputs com font-size 16px (anti-zoom iOS), code-split de rotas, `loading="lazy"` em imagens, sitemap.xml + JSON-LD (volta anterior).
- **Retry/erros**: `withRetry` + `friendlyError` em `src/lib/retry.ts`, aplicados a leads e uploads.

## Gaps reais a fechar

### 1. Registo de utilizadores — `src/pages/Auth.tsx`

- Adicionar campo **"Confirmar password"** com validação (match + ≥8 chars).
- Indicador visual da força da password (fraca/média/forte) em tempo real.
- **Checkbox obrigatório de Termos & Condições + Política de Privacidade** no signup, com link para uma página `/termos` simples (texto placeholder editável).
- Botão "Criar conta" `disabled` até validação passar.
- Manter Google OAuth e fluxo de email de confirmação como estão.

### 2. Upload de documentos — `src/pages/Documentos.tsx`

- **Progress bar real por ficheiro** (em vez do spinner global). Como o cliente Supabase Storage não emite progresso, usar `fetch` para `XHR` upload com `xhr.upload.onprogress`, ou listar ficheiros em fila com estado `uploading` por item.
- **Miniatura preview** para imagens (JPG/PNG): gerar `URL.createObjectURL` antes do upload e mostrar à frente do nome.
- **Limite reduzido para 5 MB** (actualmente 20 MB) e mensagem clara `"Máximo 5 MB por ficheiro"`.
- Restringir aceite a **PDF/JPG/PNG** apenas (remover DOCX/XLS do `ACCEPTED_TYPES`).
- Mensagens de erro específicas por tipo de falha (rede, tipo, tamanho, rejeição RLS).

### 3. Chatbot — `src/components/ChatWidget.tsx` + `chat/`

- **Typing indicator**: mostrar `…` animado enquanto `loading` (3 dots a pulsar) — substitui o spinner actual em `ChatMessages`.
- **Quick replies**: botões clicáveis injectados após cada resposta do bot com 3 sugestões contextuais ("Ver imóveis", "Falar com humano", "Simulação financiamento"). Carregar os botões empurra o texto para `input` e dispara `send`.
- **Escalação para humano**: botão sempre visível "Falar com agente" no header do chat. Ao clicar, marca a sessão (`escalated=true` em `chat_sessions` — requer migration: nova coluna `escalated boolean default false`) e mostra mensagem "Um agente VIZ vai contactar-te brevemente". Aparece também na admin tab para filtragem.

### 4. Optimização mobile

- A maior parte já está feita. Verificar e corrigir:
  - **Touch targets**: auditar visualmente botões `size="icon"` (default 36×36 → bumpar para `min-h-11 min-w-11` onde forem alvos primários).
  - Garantir que **nenhum container tem overflow-x** em 320px (testar `iPhone SE`).
  - Revisitar `HeroSection` em 320px (cube + headline lado-a-lado podem partir).

### 5. Correção de erros

- **`ErrorBoundary` global** (`src/components/ErrorBoundary.tsx`) wrappando `<App />` em `main.tsx`, com UI de fallback "Algo correu mal" + botão "Recarregar".
- **`ErrorBoundary` por rota** dentro do `<Suspense>` para isolar crashes de rotas lazy-loaded.
- Audit ao vivo no preview: abrir `/`, `/auth`, `/imoveis`, `/documentos`, `/admin` (após login) e capturar erros de consola + 404s de rede num relatório.

## Testes — sê realista sobre o que consigo fazer

Posso fazer no preview com browser tool:
- ✅ Chrome (motor do sandbox), com viewport emulado iPhone (375×812), Android (360×800), Desktop (1280×720).
- ✅ Throttling de rede via DevTools (Slow 4G ≈ 4G fraco).
- ✅ Console errors, network 404s, performance profile, axe-style scan via observação.
- ✅ Reproduzir fluxos: signup, upload (com a tua sessão), enviar mensagem ao chatbot.

**Não consigo:**
- ❌ Firefox/Safari/Edge reais. Posso citar incompatibilidades conhecidas mas não correr testes.
- ❌ iPhone/Android físicos. Apenas emulação de viewport.
- ❌ PageSpeed score real (depende de hosting/CDN/imagens). Posso medir LCP/CLS/INP no preview e indicar se está dentro do limite.

## Relatório que entrego no fim

Tabela por funcionalidade:
- ✅ O que verifiquei a funcionar
- ❌ O que falhou (com causa raiz e fix aplicado)
- ⚠️ Warnings de consola/a11y
- 📊 Métricas: LCP, CLS, INP, JS heap, contagem DOM, payload total

## Detalhes técnicos

**Migration necessária:**
```sql
ALTER TABLE chat_sessions ADD COLUMN escalated boolean NOT NULL DEFAULT false;
```

**Ficheiros tocados (estimativa):**
- `src/pages/Auth.tsx` — confirm password, T&C, força
- `src/pages/Termos.tsx` (novo) + rota em `App.tsx`
- `src/pages/Documentos.tsx` — progress por ficheiro, preview, limite 5 MB
- `src/components/ChatWidget.tsx` — typing, quick replies, escalação
- `src/components/chat/ChatMessages.tsx` — typing dots, quick reply buttons
- `src/components/admin/AdminChatTab.tsx` — filtro escalado
- `src/components/ErrorBoundary.tsx` (novo)
- `src/main.tsx` — wrap com boundary
- `src/App.tsx` — boundary por rota

**Ordem de execução:**
1. Migration (`escalated`) — pede aprovação
2. Auth + Termos
3. Upload (progress + preview + 5MB)
4. Chat (typing + quick replies + escalação + admin filter)
5. ErrorBoundary
6. Audit ao vivo no preview com viewport mobile + relatório final
