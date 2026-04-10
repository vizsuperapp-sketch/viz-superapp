

## Correções identificadas no teste end-to-end

Testei o registo de novos clientes, upload de documentos e inspeccionei os logs de consola. Eis os problemas encontrados e as correções necessárias:

---

### Problemas encontrados

| Problema | Gravidade | Local |
|----------|-----------|-------|
| Mensagens de erro de autenticação em inglês (ex: HIBP password check) | Média | `src/pages/Auth.tsx` |
| Warnings "Function components cannot be given refs" no `InteractiveCube` e `LeadFormModal` | Baixa | `src/components/InteractiveCube.tsx`, `src/components/LeadFormModal.tsx` |
| `CubeFace` recebe ref mas não usa `forwardRef` | Baixa | `src/components/InteractiveCube.tsx` |

### O que funciona correctamente

- Registo de novos utilizadores (com password forte) -- funciona
- Upload de documentos no `/documentos` -- funciona (4/4 documentos OK)
- Listagem e download de ficheiros -- funciona
- Verificação de sessão antes de uploads -- funciona
- Formulário de lead -- formulário renderiza correctamente
- Autenticação Google -- botão presente e funcional

---

### Correções a implementar (1 mensagem)

**1. Traduzir erros de auth para português** (`src/pages/Auth.tsx`)
- Mapear mensagens comuns do backend para português:
  - "Password is known to be weak" → "A password é demasiado fraca. Escolha outra."
  - "User already registered" → "Este email já está registado."
  - "Invalid login credentials" → "Email ou password incorrectos."
  - Outros erros mantêm a mensagem original

**2. Corrigir warning de refs no `InteractiveCube`** (`src/components/InteractiveCube.tsx`)
- Envolver `CubeFace` com `React.forwardRef` para eliminar o warning de consola

**3. Corrigir warning de refs no `LeadFormModal`** (`src/components/LeadFormModal.tsx`)
- Envolver o componente com `React.forwardRef` se necessário, ou remover a ref não utilizada

---

### Ficheiros alterados

| Ficheiro | Alteração |
|----------|-----------|
| `src/pages/Auth.tsx` | Adicionar mapeamento de erros EN→PT |
| `src/components/InteractiveCube.tsx` | Envolver `CubeFace` com `forwardRef` |
| `src/components/LeadFormModal.tsx` | Corrigir warning de refs |

