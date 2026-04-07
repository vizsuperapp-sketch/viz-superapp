

## Plano: Email automático de confirmação para leads

### O que será feito
Quando alguém submeter o formulário de contacto, receberá automaticamente um email de confirmação no endereço que indicou. O email terá o branding da VIZ e uma mensagem personalizada.

### Pré-requisitos
1. **Verificar domínio de email** — confirmar se já existe um domínio de email configurado no projeto. Se não existir, será necessário configurar um primeiro.
2. **Configurar infraestrutura de email** — garantir que a infraestrutura de envio (filas, funções) está ativa.

### Passos técnicos

1. **Verificar estado do domínio de email** — verificar se já há um domínio configurado
2. **Configurar infraestrutura de email** (se necessário) — preparar filas e funções de envio
3. **Criar template de email** — criar um template React Email em português com o branding VIZ (cores, fontes do projeto), com mensagem do tipo:
   - Assunto: "Recebemos o seu pedido — VIZ"
   - Corpo: saudação personalizada com o nome, confirmação de receção, indicação de que a equipa entrará em contacto
4. **Registar template** no registry de templates
5. **Atualizar o formulário de lead** (`LeadFormModal.tsx`) — após inserir o lead na base de dados com sucesso, chamar a função de envio de email com o template criado
6. **Deploy das funções** — publicar as alterações

### Resultado
Cada pessoa que submeter o formulário receberá imediatamente um email profissional de confirmação no seu inbox.

