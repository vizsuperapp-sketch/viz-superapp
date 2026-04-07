

## Plano: Autenticação de clientes e upload de documentos

### O que será feito
- Página de login/registo com email+password e Google
- Área privada "/documentos" onde clientes autenticados podem subir e ver os seus documentos
- A landing page continua pública — só a área de documentos requer login
- Storage seguro com políticas para que cada cliente veja apenas os seus ficheiros

### Passos

1. **Criar tabela de profiles**
   - Tabela `profiles` (id, full_name, email, avatar_url, created_at) ligada a `auth.users`
   - Trigger para criar perfil automaticamente no registo
   - RLS: cada utilizador só acede ao seu perfil

2. **Criar bucket de storage "documents"**
   - Bucket privado para documentos dos clientes
   - Estrutura de pastas: `{user_id}/nome-do-ficheiro`
   - RLS: cada utilizador só pode ler/escrever na sua pasta

3. **Configurar Google OAuth**
   - Usar a ferramenta de configuração de social login para ativar Google
   - Gera automaticamente o módulo `lovable` necessário

4. **Criar página de autenticação (`/auth`)**
   - Formulário de login e registo com email+password
   - Botão "Entrar com Google"
   - Design consistente com o branding VIZ (cores teal, fonte DM Sans)
   - Texto em português

5. **Criar página de documentos (`/documentos`)**
   - Protegida por autenticação (redireciona para `/auth` se não logado)
   - Upload de ficheiros (drag & drop + botão)
   - Lista de documentos subidos pelo utilizador com nome, data e tamanho
   - Opção de download e eliminação dos seus documentos
   - Tipos aceites: PDF, imagens, documentos Office

6. **Adicionar navegação**
   - Botão "Área de Cliente" ou "Documentos" no header/navbar
   - Botão de logout quando autenticado

7. **Atualizar rotas no App.tsx**
   - `/auth` — página de login/registo
   - `/documentos` — área protegida de documentos

### Detalhe técnico
- Auth context com `onAuthStateChange` + `getSession`
- Upload via Supabase Storage SDK (`supabase.storage.from('documents').upload(...)`)
- Listagem via `supabase.storage.from('documents').list(userId)`
- RLS no bucket garante isolamento entre clientes
- Google OAuth via `lovable.auth.signInWithOAuth("google")`

