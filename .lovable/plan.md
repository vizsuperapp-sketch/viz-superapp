

## Revisao Geral do Site — Problemas Encontrados e Correcoes

Analisei todo o codigo, base de dados, policies de storage, edge functions, fluxo de autenticacao, uploads e leads. Eis os problemas identificados e as correcoes necessarias.

---

### Problemas Encontrados

| # | Problema | Gravidade | Causa |
|---|----------|-----------|-------|
| 1 | **Pagina crasha apos registo por email** | Alta | Apos signup, email nao esta confirmado. O `useEffect` em `Auth.tsx` detecta `user` e redireciona para `/documentos`. La, o utilizador nao tem sessao valida (email nao confirmado), mas o `AuthProvider` reporta `user` brevemente antes do estado estabilizar, causando flash/crash. |
| 2 | **Signup por email redireciona para /documentos mesmo sem confirmar email** | Alta | Em `Auth.tsx` linha 25, o `useEffect` navega para `/documentos` quando `user` existe, mas apos `signUp` o Supabase pode emitir um evento de sessao temporario mesmo sem confirmacao. |
| 3 | **Admin (admin@viz.pt) sem perfil na tabela profiles** | Media | O trigger `on_auth_user_created` foi criado depois do registo deste utilizador. Falta INSERT manual. |
| 4 | **StepPhotos.tsx nao verifica sessao antes de upload** | Media | Diferente de `StepDocuments.tsx` e `Documentos.tsx`, o `StepPhotos` nao valida sessao antes de enviar fotos para o storage. |
| 5 | **`generate-description` usa `serve` deprecated** | Baixa | Usa `import { serve } from "https://deno.land/std@0.168.0/http/server.ts"` em vez de `Deno.serve`. |

---

### Correcoes a Implementar

**1. Corrigir fluxo pos-signup (`Auth.tsx`)**
- Apos `signUp` bem-sucedido, NAO redirecionar — mostrar apenas o toast "Verifique o seu email"
- O `useEffect` que redireciona quando `user` existe deve verificar `user.email_confirmed_at` ou `session` antes de redirecionar
- Assim a pagina nao crasha nem redireciona para `/documentos` sem sessao valida

**2. Proteger `/documentos` e `/vender` contra sessao sem email confirmado**
- Em `Documentos.tsx` e `Vender.tsx`, verificar que o utilizador tem sessao activa (nao apenas `user`) antes de permitir acesso

**3. Migracoes SQL**
- Inserir perfil em falta para admin@viz.pt
- (Opcional) Nenhuma alteracao de schema necessaria — tabelas e policies estao correctas

**4. Verificacao de sessao no StepPhotos.tsx**
- Adicionar `supabase.auth.getSession()` check antes do upload, igual ao padrao ja usado em `StepDocuments.tsx`

**5. Atualizar `generate-description` para usar `Deno.serve`**
- Substituir `import { serve }` por `Deno.serve` para consistencia com as outras edge functions

---

### Ficheiros Alterados

| Ficheiro | Alteracao |
|----------|-----------|
| `src/pages/Auth.tsx` | Corrigir redirect pos-signup; verificar email_confirmed_at no useEffect |
| `src/pages/Documentos.tsx` | Verificar sessao activa (nao apenas user) |
| `src/pages/Vender.tsx` | Verificar sessao activa |
| `src/components/vender/StepPhotos.tsx` | Adicionar verificacao de sessao antes de upload |
| `supabase/functions/generate-description/index.ts` | Migrar para Deno.serve |
| Migracao SQL | INSERT perfil admin@viz.pt |

---

### Detalhes Tecnicos

**Auth.tsx — logica corrigida:**
```typescript
// useEffect: so redirecionar se user TEM sessao confirmada
useEffect(() => {
  if (user && session) navigate("/documentos", { replace: true });
}, [user, session, navigate]);

// Apos signUp: nao navegar, apenas mostrar toast
```

**StepPhotos.tsx — verificacao de sessao:**
```typescript
const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  toast({ title: "Sessao expirada", description: "Faca login novamente.", variant: "destructive" });
  return;
}
```

**SQL — perfil admin:**
```sql
INSERT INTO public.profiles (id, full_name, email)
VALUES ('1130c394-7a1a-43ef-a5b9-2fa4ee0cec3e', 'Admin', 'admin@viz.pt')
ON CONFLICT (id) DO NOTHING;
```

