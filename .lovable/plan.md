## Objetivo
Ajustar o chatbot VIZ para **não entrar em detalhes de preços/pormenores** e **redirecionar dúvidas para WhatsApp** (+351 916 021 831).

## Alterações

### 1. `supabase/functions/chat/index.ts` — Atualizar `buildSystemPrompt`
Reescrever as regras do prompt do assistente:

- **Nunca mencionar preços, valores, taxas, percentagens ou condições financeiras concretas.** Se o utilizador perguntar preço/custo/comissão/spread → resposta padrão: *"Os valores variam consoante o caso. Para te dar uma resposta certa, fala com a equipa VIZ no WhatsApp 👉 https://wa.me/351916021831"*.
- **Manter respostas curtas e de alto nível** (2-3 frases). Apresentar o serviço em 1 frase, sem detalhes técnicos, prazos ou comparações.
- **Sempre que houver dúvida específica, pedido de proposta, caso particular, documento, prazo, agendamento ou negociação** → encaminhar para WhatsApp com o link `https://wa.me/351916021831`.
- Remover da árvore de qualificação as menções a "spread -1,5%", "comissões 0%", etc. Substituir por linguagem genérica ("ajudamos com financiamento", "tratamos do certificado energético").
- Manter tom informal/amigável, português de Portugal, 1 pergunta de cada vez.
- Adicionar instrução explícita: *"Em caso de dúvida ou pedido concreto, encaminha SEMPRE para o WhatsApp em vez de inventar ou estimar."*

### 2. `src/lib/whatsapp.ts` — (sem alteração)
Reutilizar `WHATSAPP_NUMBER` já existente. O prompt do chatbot inclui o link em texto puro (Markdown já é renderizado em `ChatMessages.tsx` via `react-markdown`, portanto o link fica clicável automaticamente).

### 3. Verificação
- Abrir chatbot, perguntar "quanto custa o certificado energético?" → deve responder genericamente + link WhatsApp.
- Perguntar "qual o spread do crédito?" → mesma resposta.
- Pergunta geral ("o que fazem?") → resposta curta sem preços.

## Fora do scope
- Não alterar UI do chat, `ChatPreForm`, persistência, nem `src/data/servicos.ts` (preços continuam visíveis nos cards de serviços, conforme decisão anterior).
- Não alterar CTAs WhatsApp dos cards (já implementados).
