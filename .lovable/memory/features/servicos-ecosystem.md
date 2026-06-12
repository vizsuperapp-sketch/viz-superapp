---
name: Ecossistema de Serviços
description: 6 serviços monetizados (CEE, fotos 360°, documentos, hipoteca, gestão renda, manutenção) com preços "a partir de" em src/data/servicos.ts
type: feature
---
Fonte única: `src/data/servicos.ts` (SERVICOS + CATEGORIAS).
Preços sempre rotulados "desde €X" / "taxa -1,5%" / "até -30%". Mostrar sempre preço de mercado riscado + badge poupança.
Renderizado em:
- `EcosystemServicesSection` (homepage, antes de NotAgency)
- `/servicos` (Tabs por categoria)
- `/precos` (tabela comparativa VIZ vs Mercado)
CTAs apontam para `/servicos/<id>` (placeholder; rotas individuais virão na FASE 2).
