## Plano — QA e Correções (Registo, Upload, Chatbot, Mobile)

### Contexto
A app já tem implementado: registo (`/auth`), upload (`/documentos`), chatbot flutuante (`ChatWidget`), tema dark Liquid Glass. Este plano foca-se em **auditar, corrigir bugs e otimizar para mobile** — não há reescritas grandes.

Nota: não consigo executar testes em iOS/Android físicos nem simular 4G real a partir do sandbox. Vou usar o browser tool para Desktop + emulação mobile (375×812 iPhone, 360×800 Android) + Network throttling "Slow 3G/Fast 3G" como aproximação a 4G fraco. Resultados reais em dispositivos físicos têm de ser validados pelo utilizador.

---

### 1. Registo de utilizadores (`/auth`)
- Auditar `Auth.tsx`: validação de email, força de password, mensagens de erro PT, estado de loading, redirect pós-signup.
- Verificar fluxo Google OAuth (`lovable.auth.signInWithOAuth`).
- Confirmar `emailRedirectTo: window.location.origin` no `signUp`.
- Garantir mensagens traduzidas (memória `auth/error-localization`).
- Corrigir bugs encontrados.

### 2. Upload de documentos (`/documentos`)
- Testar drag&drop, seleção múltipla, validação MIME/tamanho (já 20MB).
- Verificar barra de progresso visível em ficheiros grandes (atualmente só spinner — adicionar % se viável).
- Confirmar tratamento de erro de rede (4G fraco) com retry/toast claro.
- Validar que sessão expirada redireciona corretamente.

### 3. Chatbot flutuante (`ChatWidget`)
- Auditar abertura/fecho, scroll, posição em mobile (não tapar CTAs).
- Verificar estados: pré-form → chat → erro de quota (60 msgs) → sessão expirada (24h).
- Garantir streaming SSE funcional com ligação lenta.
- Botão fechar acessível com teclado.
- Markdown renderizado nas respostas (verificar `react-markdown`).

### 4. Otimização Mobile
- Auditar todas as páginas em 375×812 e 360×800: header, hero, cubo 3D (fallback se WebGL falhar), modais, tabelas comparativas, footer.
- Verificar `touch-action`, áreas tocáveis ≥44px, fontes legíveis (≥14px).
- Lazy-load do `InteractiveCube` (R3F é pesado em 4G).
- Imagens com `loading="lazy"` e dimensões definidas.
- Reduzir bundle inicial se necessário (code-split de rotas pesadas: `/admin`, `/vender`).

### 5. Correção de erros
- `code--read_console_logs` + `browser--read_console_logs` em cada rota crítica.
- Corrigir warnings de React (keys, refs, hydration).
- Verificar 404s de assets no Network tab.

---

### Metodologia de teste
1. **Desktop (1280×720)**: navegação completa em `/`, `/auth`, `/documentos`, `/vender`, `/imoveis`, chatbot.
2. **iOS aproximado (390×844, iPhone 14)**: mesmas rotas, foco em toque e teclado virtual.
3. **Android aproximado (360×800)**: mesmas rotas.
4. **4G throttled**: via `browser` tool com Fast 3G (proxy razoável para 4G fraco). Medir LCP e tempo até interativo no `/`.

Para cada combinação registo: ✅ ok / ⚠️ aviso / ❌ bug → fix.

### Ficheiros prováveis de tocar
- `src/pages/Auth.tsx` (mensagens, validação)
- `src/pages/Documentos.tsx` (progresso upload, retry)
- `src/components/ChatWidget.tsx` (mobile layout, estados de erro)
- `src/components/HeroSection.tsx` + `InteractiveCube.tsx` (lazy-load)
- `src/App.tsx` (code-split rotas pesadas com `React.lazy`)
- `src/index.css` (ajustes responsivos pontuais)

### Entregável
Relatório por rota/dispositivo com bugs encontrados + commits de correção. Sem mudanças de schema/backend (RLS e edge functions já endurecidas em rondas anteriores).

### Limitações honestas
- Não há iOS/Android físico no sandbox — emulação por viewport apenas.
- "4G throttled" será aproximado via Chrome DevTools throttling no browser tool.
- Validação final em dispositivos reais fica do lado do utilizador.
