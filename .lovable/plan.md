

## Adicionar campos de documentos do imóvel à área de cliente (/documentos)

### Problema
Os campos estruturados de documentos do imóvel (Caderneta Predial, Certidão Permanente, Certificado Energético, Planta) só existem no fluxo `/vender` (página principal do site). Deveriam estar também dentro da área de cliente em `/documentos`, onde o utilizador gere os seus ficheiros.

### Solução
Reorganizar a página `/documentos` em duas secções:

**1. Secção "Documentos do Imóvel"** — campos estruturados com os 4 tipos obrigatórios/opcionais
- Caderneta Predial Urbana (CPU) — obrigatório
- Certidão Permanente — obrigatório
- Certificado Energético — obrigatório
- Planta do Imóvel — opcional
- Cada campo mostra se já foi enviado (consulta `client_documents` pelo `document_type`) e permite enviar novo
- Documentos anteriores do mesmo tipo ficam no histórico (não são substituídos)

**2. Secção "Outros Documentos"** — zona genérica de upload (drag & drop atual)
- Mantém o upload genérico para ficheiros avulsos
- Tipo registado como "outro"

**3. Secção "Histórico completo"** — lista todos os documentos enviados (já existe)

### Ficheiros a modificar

| Ficheiro | Alteração |
|----------|-----------|
| `src/pages/Documentos.tsx` | Adicionar secção de documentos estruturados do imóvel antes da zona genérica de upload; consultar `client_documents` para mostrar estado de cada tipo |

### Detalhes técnicos
- Reutilizar o padrão visual do `StepDocuments.tsx` (ícone + label + botão carregar + estado "Enviado")
- Consulta inicial a `client_documents` já existe — basta filtrar por `document_type` para mostrar quais tipos já foram enviados
- Upload dos documentos estruturados regista com `document_type` = "cpu" / "certidao" / "energetico" / "planta"
- Upload genérico continua a registar com `document_type` = "outro"
- Sem alterações na base de dados — usa a tabela `client_documents` existente

