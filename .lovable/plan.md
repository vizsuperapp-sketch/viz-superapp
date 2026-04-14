

## Portal de Imoveis — Adicionar secao de empreendimentos ao site

### Objectivo
Criar uma nova pagina `/imoveis` (portal de imoveis) e uma seccao na homepage que mostre os 2 empreendimentos (Machado Santos e Horizon) com os dados extraidos dos links fornecidos.

---

### O que sera criado

**1. Pagina `/imoveis` — Portal de Imoveis**
- Lista dos empreendimentos em cards com imagem principal, nome, tipologia, preco, area e localidade
- Ao clicar num empreendimento, abre a pagina de detalhe

**2. Pagina `/imoveis/:slug` — Detalhe do Empreendimento**
- Galeria de imagens (carousel)
- Descricao completa do empreendimento
- Tabela de fracoes com tipologia, area, preco, garagem e referencia
- Botao "Contacte-nos" que abre o formulario de lead

**3. Seccao na Homepage — antes do FinalCTASection**
- Preview dos 2 empreendimentos com link para o portal
- Titulo "Empreendimentos em Destaque"

**4. Rota no App.tsx**
- `/imoveis` e `/imoveis/:slug`

---

### Dados dos empreendimentos (hardcoded inicialmente)

**Machado Santos**
- Localizacao: Margem Sul (Montijo)
- Tipologia: T0 - T2
- Preco: 285.000 EUR - 395.000 EUR
- Area: 80,02 m2 - 173,11 m2
- Conclusao: 1o Semestre 2027
- Imagem principal: `https://static.wixstatic.com/media/a9bb7d_aa24eb9118dd4ded8cb5103109d0e1f8~mv2.jpg/v1/fill/w_1905,h_782,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/img74.jpg`
- 5 fracoes com dados de area, preco e referencia

**Horizon**
- Localizacao: Lourinha (Lisboa)
- Tipologia: T3 - T4
- Preco: 1.450.000 EUR - 2.300.000 EUR
- Area: 283,6 m2 - 501,1 m2
- 15 moradias exclusivas, piscina, mobiladas
- Imagem principal: `https://static.wixstatic.com/media/a9bb7d_60db3151f85d427fb897ea71a1adec88~mv2.jpg/v1/fill/w_1600,h_657,al_c,q_85,enc_avif,quality_auto/06.jpg`
- 9 villas com dados de area, preco, garagem e referencia

---

### Ficheiros a criar/alterar

| Ficheiro | Accao |
|----------|-------|
| `src/data/properties.ts` | Criar — dados estaticos dos 2 empreendimentos |
| `src/pages/Imoveis.tsx` | Criar — listagem de empreendimentos |
| `src/pages/ImovelDetalhe.tsx` | Criar — pagina de detalhe com galeria e tabela de fracoes |
| `src/components/FeaturedPropertiesSection.tsx` | Criar — seccao de destaque para a homepage |
| `src/pages/Index.tsx` | Alterar — adicionar FeaturedPropertiesSection |
| `src/App.tsx` | Alterar — adicionar rotas `/imoveis` e `/imoveis/:slug` |

---

### Design

- Cards com imagem de capa, badge de localizacao, nome, tipologia e faixa de preco
- Pagina de detalhe com carousel de imagens usando o componente Carousel existente
- Tabela de fracoes responsiva
- Estilo consistente com o resto do site (dark theme, tons de azul/verde)

