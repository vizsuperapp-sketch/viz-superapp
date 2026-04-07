

## Plano: Adicionar secção de mockups da app ao landing page

### O que vai ser feito
Criar uma nova secção visual no landing page que mostra a imagem dos mockups do iPhone com as anotações sobre simplicidade, linguagem humana e transparência radical.

### Onde no site
A secção será inserida entre **DifferentiationSection** e **EcosystemSection** — um encaixe natural, pois reforça a diferenciação do produto antes de mostrar o ecossistema.

### Passos

1. **Copiar a imagem** do upload para `src/assets/app-mockups.png`

2. **Criar `src/components/AppShowcaseSection.tsx`**
   - Secção com fundo subtil (consistente com o design glass/gradient existente)
   - Importa a imagem como módulo ES6 e apresenta-a responsivamente
   - A imagem ocupa a largura principal com `max-w-5xl` e auto margins
   - Usa a classe `reveal` existente para animação de scroll

3. **Atualizar `src/pages/Index.tsx`**
   - Importar e inserir `<AppShowcaseSection />` entre `<DifferentiationSection />` e `<EcosystemSection />`

### Detalhes técnicos
- Imagem importada via `import mockups from "@/assets/app-mockups.png"` para optimização pelo Vite
- Responsive: imagem com `w-full` e `object-contain`
- Integra o hook `useScrollReveal` já existente no projecto

