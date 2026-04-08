

## Adicionar acesso ao fluxo de venda a partir da homepage

### Problema
A página `/vender` existe mas não há nenhum botão, link ou CTA na homepage que leve o utilizador até lá. O fluxo está "escondido".

### Solução
Adicionar pontos de entrada visíveis para o fluxo de venda:

**1. Botão CTA no HeroSection**
- Adicionar um botão "Quero Vender" ao lado dos botões existentes no hero
- Ao clicar, navega para `/vender` (se autenticado) ou `/auth` (se não)

**2. Botão no Header/Navegação (se existir)**
- Verificar se há navbar e adicionar link "Vender" na navegação

**3. Botão no FinalCTASection**
- Adicionar um segundo CTA "Vender o meu imóvel" na secção final

### Ficheiros a modificar
| Ficheiro | Alteração |
|----------|-----------|
| `src/components/HeroSection.tsx` | Adicionar botão "Quero Vender" → navega para `/vender` |
| `src/components/FinalCTASection.tsx` | Adicionar CTA secundário para vendedores |

### Detalhes técnicos
- Usa `useNavigate()` (já importado no HeroSection)
- Botão com `variant="outline"` ou `variant="hero"` para destaque
- Navegação direta para `/vender` — a própria página já trata do redirect para `/auth` se não autenticado

