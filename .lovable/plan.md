

## Criar ProtectedRoute — Correção de Pasta

### Situação
O projeto usa `src/components/` (inglês). O utilizador pediu `src/componentes/` (português) mas essa pasta não existe.

### Opções

**Opção A — Usar pasta existente (recomendado)**
Criar em `src/components/ProtectedRoute.tsx` — consistente com todo o projeto.

**Opção B — Criar pasta nova em português**
Criar `src/componentes/ProtectedRoute.tsx` — requer atualizar todas as importações do projeto futuramente para manter consistência.

### Recomendação
Usar **Opção A** (`src/components/ProtectedRoute.tsx`) — mantém consistência com a estrutura existente. O código do componente estará 100% funcional e integrado.

### Implementação (Opção A)
Criar `src/components/ProtectedRoute.tsx` com:
- Import correto: `@/contexts/AuthContext`
- Estados: loading (spinner), unauthenticated (redirect /auth), email não confirmado (mensagem completa)
- Prop `requiredEmailConfirmed` (default: true)
- JSX formatado corretamente (o código partilhado tinha formatação corrompida)

