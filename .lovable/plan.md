## Objetivo
Substituir a navegação interna (placeholder `/servicos/<id>`) pelos CTAs de todos os cards de serviço, direcionando o utilizador diretamente para uma conversa WhatsApp com mensagem pré-preenchida.

## Dados do utilizador
- Número: `+351 916 021 831` (formatado para wa.me: `351916021831`)
- Mensagem genérica: `Olá, quero saber mais sobre os serviços VIZ.`
- Escopo: **ambas as secções** — cards da homepage (`EcosystemServicesSection`) e página `/servicos` (`Servicos`).

---

## Passos

### 1. Utilitário WhatsApp (`src/lib/whatsapp.ts`)
Criar função auxiliar que retorna o link `wa.me` encode-ado:
```ts
export const WHATSAPP_NUMBER = "351916021831";
export const WHATSAPP_MESSAGE = "Olá, quero saber mais sobre os serviços VIZ.";

export function getWhatsAppLink(): string {
  const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
```

### 2. Atualizar `src/components/EcosystemServicesSection.tsx`
- Remover `useNavigate` (ou deixar se ainda for usado pelo botão "Ver todos os serviços").
- No `onClick` de cada card CTA (`Button` dentro do loop `SERVICOS.map`):
  - Substituir `navigate(s.ctaHref)` por `window.open(getWhatsAppLink(), "_blank", "noopener,noreferrer")`.
- No botão "Ver todos os serviços" (rodapé da secção):
  - Manter `navigate("/servicos")` (este continua a fazer sentido como navegação interna).

### 3. Atualizar `src/pages/Servicos.tsx`
- No `onClick` de cada card CTA:
  - Substituir `navigate(s.ctaHref)` por `window.open(getWhatsAppLink(), "_blank", "noopener,noreferrer")`.
- Manter `useNavigate` para eventuais outros usos futuros (ou remover se ficar sem uso).

### 4. Verificação
- Confirmar que nenhum `navigate(s.ctaHref)` resta nos dois componentes.
- Testar preview: clicar num CTA de serviço deve abrir nova tab com WhatsApp.
- Console limpo — sem warnings de hooks não utilizados.

---

## Fora do scope
- Não alterar `src/data/servicos.ts` (mantém `ctaHref` para FASE 2).
- Não criar página de checkout, backend de encomendas, nem integração Stripe.