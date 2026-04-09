

## Correções consolidadas — 1 única mensagem de implementação

Todas as correções serão feitas numa só mensagem para minimizar o consumo de créditos.

---

### O que será corrigido

**1. CORS do `submit-lead` (edge function)**
- Os headers CORS estão incompletos — faltam `x-supabase-client-platform`, `x-supabase-client-platform-version`, `x-supabase-client-runtime`, `x-supabase-client-runtime-version`
- Isto pode causar falhas de preflight em browsers modernos com versões recentes do SDK

**2. Uploads de documentos — tratamento de sessão expirada**
- Em `StepDocuments.tsx` e `Documentos.tsx`, se a sessão do utilizador expirar durante o fluxo, o upload falha silenciosamente
- Será adicionada verificação de sessão antes de cada upload, com mensagem de erro clara e redirecionamento para login

**3. Migração SQL de segurança**
- Restringir execução da função `has_role` apenas a `authenticated` e `service_role` (actualmente `public` pode executar)
- Adicionar política DELETE no bucket `property-files` para que utilizadores possam apagar os seus próprios ficheiros

---

### Ficheiros alterados

| Ficheiro | Alteração |
|----------|-----------|
| `supabase/functions/submit-lead/index.ts` | Atualizar CORS headers |
| `src/components/vender/StepDocuments.tsx` | Verificar sessão antes de upload |
| `src/pages/Documentos.tsx` | Verificar sessão antes de upload |
| Migração SQL | Restringir `has_role` + DELETE policy no storage |

---

### Detalhes técnicos

**CORS** — Linha 5 do `submit-lead/index.ts` passa a incluir todos os headers do SDK:
```
authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version
```

**Sessão expirada** — Antes de cada upload, chamar `supabase.auth.getSession()`. Se não houver sessão, mostrar toast de erro e redirecionar para `/auth`.

**SQL** — Uma migração com:
```sql
REVOKE EXECUTE ON FUNCTION public.has_role FROM public;
GRANT EXECUTE ON FUNCTION public.has_role TO authenticated, service_role;

CREATE POLICY "Users can delete own files from property-files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'property-files' AND (storage.foldername(name))[1] = auth.uid()::text);
```

