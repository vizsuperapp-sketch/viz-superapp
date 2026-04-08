import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileCheck, AlertCircle, FileText, Home } from "lucide-react";

interface ClientDocument {
  id: string;
  bucket: string;
  storage_path: string;
  file_name: string;
  document_type: string;
  created_at: string;
}

const REQUIRED_DOCS = [
  { key: "cpu", label: "Caderneta Predial Urbana (CPU)", required: true },
  { key: "certidao", label: "Certidão Permanente", required: true },
  { key: "energetico", label: "Certificado Energético", required: true },
  { key: "planta", label: "Planta do Imóvel", required: false },
];

interface PropertyDocumentsSectionProps {
  documents: ClientDocument[];
  uploading: boolean;
  onUpload: (file: File, documentType: string) => Promise<void>;
}

const PropertyDocumentsSection = ({ documents, uploading, onUpload }: PropertyDocumentsSectionProps) => {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const uploadedTypes = new Set(documents.map((d) => d.document_type));
  const totalUploaded = REQUIRED_DOCS.filter((d) => uploadedTypes.has(d.key)).length;
  const progress = (totalUploaded / REQUIRED_DOCS.length) * 100;

  const handleFileSelect = (key: string, file: File) => {
    onUpload(file, key);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <Home className="h-5 w-5 text-primary" />
          Documentos do Imóvel
        </CardTitle>
        <div className="space-y-2 pt-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {totalUploaded} de {REQUIRED_DOCS.length} documentos carregados
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {REQUIRED_DOCS.map((doc) => {
          const isUploaded = uploadedTypes.has(doc.key);
          const latestDoc = documents.find((d) => d.document_type === doc.key);

          return (
            <div
              key={doc.key}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {isUploaded ? (
                  <FileCheck className="h-5 w-5 text-primary shrink-0" />
                ) : doc.required ? (
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                ) : (
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{doc.label}</p>
                  {isUploaded && latestDoc ? (
                    <>
                      <p className="text-xs text-muted-foreground truncate">{latestDoc.file_name}</p>
                      <p className="text-xs text-primary">Enviado com sucesso</p>
                    </>
                  ) : !doc.required ? (
                    <p className="text-xs text-muted-foreground">Opcional</p>
                  ) : (
                    <p className="text-xs text-destructive">Obrigatório</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <input
                  ref={(el) => { fileInputRefs.current[doc.key] = el; }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(doc.key, file);
                    e.target.value = "";
                  }}
                />
                <Button
                  variant={isUploaded ? "outline" : "default"}
                  size="sm"
                  disabled={uploading}
                  onClick={() => fileInputRefs.current[doc.key]?.click()}
                >
                  {uploading ? (
                    <span className="animate-pulse">A carregar...</span>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-1" />
                      {isUploaded ? "Atualizar" : "Carregar"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PropertyDocumentsSection;
