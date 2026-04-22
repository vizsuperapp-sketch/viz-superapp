

## Restaurar o Cubo 3D Interativo

### Diagnóstico
A consola mostra erros de ref e o cubo deixou de aparecer. Causas prováveis:
1. `Environment preset="night"` faz fetch externo de HDR — pode falhar silenciosamente e crashar a `<Suspense>`.
2. `MeshTransmissionMaterial` + `EffectComposer/Bloom` juntos causam buffer preto em alguns GPUs/contextos WebGL.
3. Componentes funcionais (`GlassCube`, `NeonLabel`, `Scene`) recebem `ref` indirectamente — gera warnings que noutros casos podem mascarar erros reais.
4. Possível erro na fonte remota do `<Text>` (Google Fonts woff) que rebenta a Suspense sem fallback.

### Correções em `src/components/InteractiveCube.tsx`

**1. Adicionar ErrorBoundary + fallback CSS**
Envolver o `<Canvas>` num error boundary local. Se o WebGL/3D falhar, mostrar um cubo CSS simples (mantém a hero sem buraco vazio).

**2. Tornar Environment opcional e seguro**
- Remover `<Environment preset="night">` (depende de CDN externo) e substituir por iluminação manual reforçada (já temos lights). Ganha-se robustez sem perder muito visual porque o Bloom + emissive dominam.

**3. Remover dependência de fonte externa no `<Text>`**
- Remover a prop `font="https://fonts.gstatic.com/..."` — usar a fonte default do drei (evita falhas de rede e Suspense pendurada).

**4. Estabilizar postprocessing**
- Manter Bloom mas reduzir `intensity` para 1.0 e adicionar `multisampling={0}` no `<EffectComposer>` para compatibilidade.
- Garantir `gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}` e `<Canvas shadows={false}>`.

**5. Resolver warnings de ref**
- Os componentes `Scene`, `GlassCube`, `NeonLabel` não precisam de `ref` — o warning vem porque drei/r3f tenta passar ref a componentes funcionais. Solução: envolver com `forwardRef` quando recebem children de R3F (apenas onde necessário) OU simplesmente parar de receber ref. Não é fatal, mas vamos limpar para evitar ruído.

**6. Garantir que o container tem altura**
Já tem `height: min(70vh, 520px); minHeight: 380px` — confirmar que não foi alterado.

### Estrutura final do componente
```
<div container com altura fixa>
  <ErrorBoundary fallback={<CssFallbackCube />}>
    <Canvas>
      <Scene />  // luzes + GlassCube + Bloom (sem Environment, sem fonte remota)
    </Canvas>
  </ErrorBoundary>
</div>
```

### Resultado esperado
- Cubo volta a aparecer mesmo sem ligação ao CDN da Google Fonts/HDR.
- Se mesmo assim o WebGL falhar (driver/GPU), aparece um fallback CSS em vez de espaço vazio.
- Warnings de ref desaparecem da consola.

### Ficheiros
- `src/components/InteractiveCube.tsx` — patch focado (manter estrutura geral, só remover Environment + fonte remota + adicionar ErrorBoundary + fallback)

