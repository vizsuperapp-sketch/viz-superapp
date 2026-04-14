

## Mover secção de Imóveis para mais acima na homepage

A secção `FeaturedPropertiesSection` está actualmente na posição 8 de 10 (quase no final). Vou movê-la para logo após o `HowItWorksSection` (posição 5), dando-lhe muito mais visibilidade.

### Alteração

**`src/pages/Index.tsx`** — reordenar componentes:

```
HeroSection
NotAgencySection
ComparisonSection
HowItWorksSection
FeaturedPropertiesSection  ← movido para aqui
ManifestoSection
BenefitsSection
EcosystemSection
FinalCTASection
FooterSection
```

Isto coloca os imóveis logo após explicar "Como Funciona", que é o momento ideal para mostrar exemplos concretos.

