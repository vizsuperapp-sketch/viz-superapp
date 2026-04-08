

## Consolidar documentos na área do cliente — sem apagar, só adicionar

### Problema atual
- Existem dois fluxos separados de documentos: `/documentos` (área do cliente genérica) e `/vender` step 1 (documentos do imóvel)
- O cliente pode apagar ficheiros em ambos os sítios (DELETE policy existe nos dois buckets)
- Não há um registo central que associe documentos ao perfil do cliente com histórico

### O que será feito

**1. Migration — Remover políticas de DELETE do storage**
- Remover a policy "Users can delete own documents" do bucket `documents`
- Remover a policy "Users can delete own property files" do bucket `property-files`
- Adicionar policy de DELETE apenas para admins em ambos os buckets (para gestão interna)

**2. Criar tabela `client_documents` para registo/histórico**
- Campos: `id`, `user_id`, `bucket`, `storage_path`, `file_name`, `document_type` (cpu, certidao, energetico, planta, outro), `created_at`
- RLS: utilizadores veem os seus, admins veem todos. Ninguém faz DELETE (nem o cliente nem via código)
- Sem policy de DELETE — garante histórico permanente

**3. Atualizar `/documentos` (área do cliente)**
- Remover botão de apagar ficheiros — o cliente só pode enviar e descarregar
- Ao fazer upload, registar na tabela `client_documents`
- Mostrar histórico completo de ficheiros enviados

**4. Atualizar `StepDocuments.tsx` (fluxo de venda)**
- Remover funcionalidade de "remover" documento já carregado — uma vez enviado, fica permanente
- O cliente pode substituir/enviar novo ficheiro do mesmo tipo, mas o anterior permanece no histórico
- Ao fazer upload, registar na tabela `client_documents` com `document_type` adequado

**5. Atualizar `AdminClientsTab` / painel admin**
- Permitir ao admin ver todos os documentos de qualquer cliente via tabela `client_documents`

### Ficheiros

| Ação | Ficheiro |
|------|---------|
| Migration | Remover DELETE policies dos clientes, criar tabela `client_documents` |
| Modificar | `src/pages/Documentos.tsx` — remover botão apagar, registar em `client_documents` |
| Modificar | `src/components/vender/StepDocuments.tsx` — remover remoção, registar em `client_documents` |
| Modificar | `src/components/admin/AdminClientsTab.tsx` — mostrar documentos do cliente |

### Detalhes técnicos

```sql
-- Tabela client_documents (append-only, sem DELETE)
CREATE TABLE public.client_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  bucket TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  document_type TEXT DEFAULT 'outro',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;

-- SELECT: utilizador vê os seus
CREATE POLICY "Users can view own client_documents"
  ON public.client_documents FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: utilizador insere os seus
CREATE POLICY "Users can insert own client_documents"
  ON public.client_documents FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- SELECT: admins veem todos
CREATE POLICY "Admins can view all client_documents"
  ON public.client_documents FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- SEM policies de UPDATE ou DELETE → histórico imutável

-- Remover DELETE policies dos clientes nos buckets
DROP POLICY "Users can delete own documents" ON storage.objects;
DROP POLICY "Users can delete own property files" ON storage.objects;
```

- Na UI do `/documentos`: o botão `Trash2` desaparece; ficheiros são listados da tabela `client_documents` em vez de `storage.list()`
- No `StepDocuments`: o botão `X` de remover desaparece; se o cliente enviar novo ficheiro do mesmo tipo, é adicionado como novo registo (o anterior mantém-se)

