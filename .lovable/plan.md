

## Fluxo de Venda de Imóvel — Processo Guiado com IA

### Resumo
Criar uma nova rota `/vender` com um wizard multi-step para vendedores, que guia o utilizador por 3 etapas:
1. **Upload de documentos obrigatórios** (CPU, Certidão, Certificado Energético) + opcional (Planta)
2. **Descrição do imóvel com ajuda da IA** — o utilizador preenche dados básicos e a IA gera uma descrição profissional
3. **Upload de fotos com melhoramento por IA** — o utilizador envia fotos e a IA melhora-as automaticamente

### O que será construído

**1. Tabela `properties` na base de dados**
- Campos: `id`, `user_id`, `title`, `description`, `ai_description`, `status` (draft/pending/active), `created_at`, `updated_at`
- RLS: utilizadores só acedem às suas próprias propriedades

**2. Bucket de storage `property-files`**
- Estrutura: `{user_id}/{property_id}/documents/` e `{user_id}/{property_id}/photos/`
- RLS: acesso isolado por utilizador

**3. Página `/vender` — Wizard multi-step**
- **Step 1 — Documentos**: Upload de ficheiros com checklist visual (CPU ✓, Certidão ✓, Cert. Energético ✓, Planta opcional). Barra de progresso. Validação antes de avançar.
- **Step 2 — Descrição**: Formulário com campos básicos (tipologia, localização, área, estado, extras). Botão "Gerar descrição com IA" que chama edge function para produzir texto profissional. O utilizador pode editar o resultado.
- **Step 3 — Fotos**: Upload de múltiplas fotos. Botão "Melhorar fotos com IA" que envia cada foto à IA para enhancement (brilho, contraste, correção de cor). Preview antes/depois.

**4. Edge function `generate-description`**
- Recebe dados do imóvel (tipologia, área, localização, extras)
- Usa Lovable AI (`google/gemini-3-flash-preview`) para gerar descrição profissional em PT
- System prompt focado em imobiliário português

**5. Edge function `enhance-photo`**
- Recebe imagem base64
- Usa Lovable AI (`google/gemini-3.1-flash-image-preview`) para melhorar a foto
- Retorna imagem melhorada

**6. Integração no `App.tsx`**
- Nova rota `/vender` protegida (requer autenticação)

### Ficheiros

| Ação | Ficheiro |
|------|---------|
| Criar | `src/pages/Vender.tsx` (wizard principal) |
| Criar | `src/components/vender/StepDocuments.tsx` |
| Criar | `src/components/vender/StepDescription.tsx` |
| Criar | `src/components/vender/StepPhotos.tsx` |
| Criar | `supabase/functions/generate-description/index.ts` |
| Criar | `supabase/functions/enhance-photo/index.ts` |
| Modificar | `src/App.tsx` (rota `/vender`) |
| Migration | Tabela `properties` + bucket `property-files` + RLS |

### Detalhes técnicos

- **Wizard state**: React state local com step counter (1-3) e dados acumulados
- **Documentos obrigatórios**: CPU, Certidão Permanente, Certificado Energético — o utilizador não avança sem os 3
- **Geração de descrição**: Edge function com prompt tipo "Gera uma descrição profissional para venda de imóvel em Portugal com os seguintes dados: ..."
- **Enhancement de fotos**: Usa modelo de imagem `google/gemini-3.1-flash-image-preview` com prompt "Enhance this real estate photo: improve lighting, color balance, and make it look professional"
- **Autenticação**: Redireciona para `/auth` se não autenticado

