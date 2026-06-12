import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileCheck, AlertCircle, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadWithProgress } from "@/lib/uploadWithProgress";
import { useToast } from "@/hooks/use-toast";

interface DocumentFile {
  file: File | null;
  uploaded: boolean;
  uploading: boolean;
  storagePath?: string;
}

interface StepDocumentsProps {
  propertyId: string;
  userId: string;
  onNext: () => void;
}

const REQUIRED_DOCS = [
  { key: "cpu", label: "Caderneta Predial Urbana (CPU)", required: true },
  { key: "certidao", label: "Certidão Permanente", required: true },
  { key: "energetico", label: "Certificado Energético", required: true },
  { key: "planta", label: "Planta do Imóvel", required: false },
];

const StepDocuments = ({ propertyId, userId, onNext }: StepDocumentsProps) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Record<string, DocumentFile>>({
    cpu: { file: null, uploaded: false, uploading: false },
    certidao: { file: null, uploaded: false, uploading: false },
    energetico: { file: null, uploaded: false, uploading: false },
    planta: { file: null, uploaded: false, uploading: false },
  });
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const requiredUploaded = REQUIRED_DOCS.filter((d) => d.required).every(
    (d) => documents[d.key].uploaded
  );
  const totalUploaded = Object.values(documents).filter((d) => d.uploaded).length;
  const progress = (totalUploaded / REQUIRED_DOCS.length) * 100;

  const handleFileSelect = async (key: string, file: File) => {
    // Verify session before upload
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: "Sessão expirada", description: "Faça login novamente para continuar.", variant: "destructive" });
      return;
    }

    setDocuments((prev) => ({
      ...prev,
      [key]: { ...prev[key], file, uploading: true },
    }));

    try {
      const filePath = `${userId}/${propertyId}/documents/${key}_${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("property-files")
        .upload(filePath, file, { upsert: false });

      if (uploadError) {
        toast({ title: "Erro ao carregar documento", description: uploadError.message, variant: "destructive" });
        setDocuments((prev) => ({
          ...prev,
          [key]: { ...prev[key], file: null, uploading: false },
        }));
        return;
      }

      // Register in client_documents table
      const { error: insertError } = await supabase
        .from("client_documents")
        .insert({
          user_id: userId,
          bucket: "property-files",
          storage_path: filePath,
          file_name: file.name,
          document_type: key,
        });

      if (insertError) {
        console.error("Error registering document:", insertError);
      }

      setDocuments((prev) => ({
        ...prev,
        [key]: { file, uploaded: true, uploading: false, storagePath: filePath },
      }));

      toast({ title: "Documento carregado", description: `${REQUIRED_DOCS.find((d) => d.key === key)?.label} carregado com sucesso.` });
    } catch (err) {
      console.error("Unexpected upload error:", err);
      toast({ title: "Erro inesperado ao carregar documento", variant: "destructive" });
      setDocuments((prev) => ({
        ...prev,
        [key]: { ...prev[key], file: null, uploading: false },
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Documentos do Imóvel</h2>
        <p className="text-muted-foreground">Carregue os documentos obrigatórios para publicar o seu imóvel.</p>
      </div>

      <Progress value={progress} className="h-2" />
      <p className="text-sm text-muted-foreground">{totalUploaded} de {REQUIRED_DOCS.length} documentos carregados</p>

      <div className="grid gap-4">
        {REQUIRED_DOCS.map((doc) => {
          const state = documents[doc.key];
          return (
            <div
              key={doc.key}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {state.uploaded ? (
                  <FileCheck className="h-5 w-5 text-primary shrink-0" />
                ) : doc.required ? (
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                ) : (
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{doc.label}</p>
                  {state.file && (
                    <p className="text-xs text-muted-foreground truncate">{state.file.name}</p>
                  )}
                  {state.uploaded && (
                    <p className="text-xs text-primary">Enviado com sucesso</p>
                  )}
                  {!doc.required && !state.file && (
                    <p className="text-xs text-muted-foreground">Opcional</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {state.uploaded ? (
                  <span className="text-xs text-muted-foreground px-2">✓</span>
                ) : (
                  <>
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
                      variant="outline"
                      size="sm"
                      disabled={state.uploading}
                      onClick={() => fileInputRefs.current[doc.key]?.click()}
                    >
                      {state.uploading ? (
                        <span className="animate-pulse">A carregar...</span>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-1" />
                          Carregar
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          variant="hero"
          size="lg"
          disabled={!requiredUploaded}
          onClick={onNext}
        >
          Próximo passo
        </Button>
      </div>
    </div>
  );
};

export default StepDocuments;
