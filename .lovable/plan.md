## Objetivo
Manter o chatbot IA atual e adicionar um botão "Falar no WhatsApp" que abre `wa.me/351916021831` com mensagem pré-preenchida, em dois pontos do widget.

## Alterações

### 1. `src/components/ChatWidget.tsx`
- Adicionar constante `WHATSAPP_NUMBER = "351916021831"`.
- No header da janela do chat (ao lado do botão fechar), adicionar um botão verde discreto com ícone do WhatsApp (lucide `MessageCircle` ou SVG inline) + label "WhatsApp".
- Ao clicar, abrir `https://wa.me/351916021831?text=<msg>` em nova aba (`target="_blank"`, `rel="noopener noreferrer"`).
- Mensagem pré-preenchida adapta-se ao estado:
  - Se já existe pre-form preenchido (nome + interesse): `Olá VIZ! Sou o {nome}, interessado em {interesse}. Gostaria de continuar a conversa por aqui.`
  - Caso contrário: `Olá VIZ! Gostaria de falar convosco.`

### 2. `src/components/chat/ChatPreForm.tsx`
- Abaixo do botão principal "Começar conversa", adicionar separador "ou" e um botão secundário "Falar diretamente no WhatsApp" que abre o mesmo link `wa.me` com mensagem genérica.
- Mantém o fluxo IA intacto para quem prefere o chat no site.

### 3. Memória do projeto
- Atualizar `mem://features/chatbot-ai` para registar o número WhatsApp oficial e o novo entry point.

## Fora de scope
- Sem alterações na edge function `chat` nem na lógica de persistência.
- Sem Twilio/API — apenas deep link `wa.me` (sem custos, sem connector).
- Sem alterações de design system; usar tokens existentes + cor verde WhatsApp (`#25D366`) apenas no ícone/acento do botão.

## Verificação
- Abrir chat → clicar botão WhatsApp no header → confirma abertura `wa.me/351916021831` com texto correto.
- Submeter pre-form com nome "João" e interesse "Comprar" → reabrir chat → botão WhatsApp inclui esses dados na mensagem.
- No pre-form, clicar "Falar diretamente no WhatsApp" → abre link genérico.
