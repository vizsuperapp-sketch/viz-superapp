

## Chatbot IA para o Site VIZ

### Como funciona
- O utilizador escreve perguntas em linguagem natural no chat
- A IA responde automaticamente com base num **system prompt** que tu defines
- Não há comandos — é conversa livre
- Tu controlas o conhecimento e comportamento do bot editando o system prompt

### O que será construído

**1. Edge function `chat`**
- Recebe mensagens do utilizador, adiciona o system prompt com contexto VIZ, e envia para o Lovable AI (modelo `google/gemini-3-flash-preview`)
- Streaming SSE para respostas em tempo real (token a token)
- Tratamento de erros (rate limit 429, créditos 402)
- System prompt em PT com info sobre: o que é a VIZ, como funciona, zero comissões, processo de compra/venda, não é imobiliária

**2. Componente `ChatWidget.tsx`**
- Botão flutuante no canto inferior direito (ícone de chat)
- Janela de chat com mensagem de boas-vindas
- Input de texto + envio
- Respostas renderizadas com markdown (`react-markdown`)
- Streaming token-by-token
- Botão minimizar/fechar

**3. Integração no `App.tsx`**
- Widget visível em todas as páginas

### Ficheiros
- **Criar**: `supabase/functions/chat/index.ts`, `src/components/ChatWidget.tsx`
- **Modificar**: `App.tsx` (adicionar `<ChatWidget />`)
- **Instalar**: `react-markdown`

### System prompt (editável por ti a qualquer momento)
Incluirá contexto sobre:
- O que é a VIZ (SuperApp imobiliário)
- Zero comissões
- Liga comprador e vendedor diretamente
- Não é imobiliária tradicional
- Processo de registo e utilização
- Tom informal mas profissional, em PT

