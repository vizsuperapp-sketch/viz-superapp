

## Plano: Email de confirmação automática para leads

### Resumo
Quando alguém submeter o formulário de contacto, receberá um email de confirmação personalizado com o branding VIZ (cores verde/teal, fonte DM Sans).

### Nota sobre segurança
O alerta de segurança sobre a política RLS dos leads já foi corrigido na última migração — a política antiga foi substituída por uma que restringe o acesso apenas a administradores. O scan pode estar desatualizado.

### Passos

1. **Configurar infraestrutura de email**
   - Preparar as tabelas de base de dados, filas e funções necessárias para o envio de emails

2. **Criar sistema de email transacional**
   - Criar as funções de backend para envio de emails, gestão de cancelamentos e supressões
   - Criar o template de email "lead-confirmation" em português com branding VIZ:
     - Cores: verde primário (#5BBF9B), azul secundário (#4D9EFF)
     - Fonte: DM Sans / Arial fallback
     - Assunto: "Recebemos o seu pedido — VIZ"
     - Corpo: saudação personalizada com o nome, confirmação de receção, indicação de contacto próximo
   - Registar o template no sistema

3. **Criar página de cancelamento de subscrição**
   - Adicionar rota `/unsubscribe` à aplicação com o design consistente do projeto
   - Validação de token e confirmação de cancelamento

4. **Atualizar formulário de leads**
   - Modificar `LeadFormModal.tsx` para enviar o email de confirmação imediatamente após guardar o lead na base de dados
   - Incluir chave de idempotência para evitar envios duplicados

5. **Publicar as funções de backend**
   - Garantir que todas as funções são publicadas e operacionais

### Resultado
Cada pessoa que submeter o formulário receberá automaticamente um email profissional de confirmação no seu inbox assim que a verificação DNS do domínio estiver completa. A infraestrutura fica pronta de imediato.

### Detalhe técnico
- Template React Email com inline styles e branding VIZ
- Envio via fila com retries automáticos
- Supressão automática de bounces/complaints
- Link de cancelamento de subscrição incluído automaticamente pelo sistema

