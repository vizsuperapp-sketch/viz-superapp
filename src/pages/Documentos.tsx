import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  FileText,
  Download,
  LogOut,
  ArrowLeft,
  Loader2,
  FolderOpen,
} from "lucide-react";
import PropertyDocumentsSection from "@/components/documentos/PropertyDocumentsSection";
import { withRetry, friendlyError } from "@/lib/retry";
import { uploadWithProgress } from "@/lib/uploadWithProgress";
import { Progress } from "@/components/ui/progress";

interface ClientDocument {
  id: string;
  bucket: string;
  storage_path: string;
  file_name: string;
  document_type: string;
  created_at: string;
}

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface UploadItem {
  id: string;
  file: File;
  previewUrl?: string;
  progress: number; // 0-100
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}

const Documentos = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const uploading = uploadQueue.some((u) => u.status === "uploading" || u.status === "pending");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [authLoading, user, navigate]);

  const fetchDocuments = useCallback(async () => {
    if (!user) return;
    setLoadingFiles(true);
    const { data, error } = await supabase
      .from("client_documents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error listing documents:", error);
    } else {
      setDocuments(data || []);
    }
    setLoadingFiles(false);
  }, [user]);

  useEffect(() => {
    if (user) fetchDocuments();
  }, [user, fetchDocuments]);

  const updateItem = (id: string, patch: Partial<UploadItem>) => {
    setUploadQueue((q) => q.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };

  const uploadFile = async (file: File, documentType = "outro") => {
    if (!user) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: "Sessão expirada", description: "Faz login novamente para continuar.", variant: "destructive" });
      navigate("/auth", { replace: true });
      return;
    }
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({
        title: "Tipo não suportado",
        description: "Apenas PDF, JPG ou PNG são permitidos.",
        variant: "destructive",
      });
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast({
        title: "Ficheiro muito grande",
        description: `Máximo 5 MB por ficheiro (este tem ${formatSize(file.size)}).`,
        variant: "destructive",
      });
      return;
    }

    const id = crypto.randomUUID();
    const previewUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
    setUploadQueue((q) => [...q, { id, file, previewUrl, progress: 0, status: "pending" }]);

    const filePath = `${user.id}/${Date.now()}-${file.name}`;
    let uploaded = false;
    try {
      updateItem(id, { status: "uploading" });
      await withRetry(
        () => uploadWithProgress("documents", filePath, file, (pct) => updateItem(id, { progress: pct })),
        { retries: 2, onRetry: (n) => console.warn(`Upload retry #${n} for ${file.name}`) },
      );
      uploaded = true;

      const { error: insertError } = await supabase.from("client_documents").insert({
        user_id: user.id,
        bucket: "documents",
        storage_path: filePath,
        file_name: file.name,
        document_type: documentType,
      });

      if (insertError) {
        await supabase.storage.from("documents").remove([filePath]).catch(() => {});
        throw insertError;
      }

      updateItem(id, { status: "done", progress: 100 });
      toast({ title: "Ficheiro enviado com sucesso!" });
      fetchDocuments();
      // Limpa o item da fila após 2 segundos
      setTimeout(() => {
        setUploadQueue((q) => q.filter((it) => it.id !== id));
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      }, 2000);
    } catch (err) {
      console.error("Upload failed:", err);
      if (uploaded) await supabase.storage.from("documents").remove([filePath]).catch(() => {});
      const msg = friendlyError(err, "Não foi possível enviar o ficheiro.");
      updateItem(id, { status: "error", error: msg });
      toast({ title: "Erro no upload", description: msg, variant: "destructive" });
    }
  };

  const removeQueueItem = (id: string) => {
    setUploadQueue((q) => {
      const it = q.find((x) => x.id === id);
      if (it?.previewUrl) URL.revokeObjectURL(it.previewUrl);
      return q.filter((x) => x.id !== id);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      Array.from(selected).forEach((f) => uploadFile(f));
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files;
    if (dropped) Array.from(dropped).forEach((f) => uploadFile(f));
  };

  const downloadFile = async (doc: ClientDocument) => {
    const { data, error } = await supabase.storage
      .from(doc.bucket)
      .download(doc.storage_path);
    if (error) {
      toast({ title: "Erro ao descarregar", description: error.message, variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.file_name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} aria-label="Voltar à página inicial">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-viz">
              <span className="text-[10px] font-bold text-primary-foreground tracking-tight">VIZ</span>
            </div>
            <span className="font-semibold text-foreground">Os meus documentos</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <PropertyDocumentsSection
          documents={documents}
          uploading={uploading}
          onUpload={uploadFile}
        />

        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragOver ? "border-primary bg-accent/50" : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-foreground font-medium text-center">
              Arrasta ficheiros ou clica para enviar
            </p>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              PDF, JPG ou PNG — máx. 5 MB por ficheiro
            </p>
            <input
              id="file-input"
              type="file"
              className="hidden"
              multiple
              accept={ACCEPTED_TYPES.join(",")}
              onChange={handleFileSelect}
            />
          </CardContent>
        </Card>

        {uploadQueue.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-foreground">A enviar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {uploadQueue.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  {it.previewUrl ? (
                    <img
                      src={it.previewUrl}
                      alt={it.file.name}
                      className="h-12 w-12 rounded-md object-cover border border-border shrink-0"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{it.file.name}</p>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {it.status === "error"
                          ? "Falhou"
                          : it.status === "done"
                            ? "Concluído"
                            : `${it.progress}%`}
                      </span>
                    </div>
                    <Progress
                      value={it.progress}
                      className={`h-1.5 ${it.status === "error" ? "[&>div]:bg-destructive" : ""}`}
                    />
                    {it.error && <p className="text-xs text-destructive">{it.error}</p>}
                  </div>
                  {it.status === "error" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQueueItem(it.id)}
                      aria-label="Remover"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-foreground">
              <FolderOpen className="h-5 w-5 text-primary" />
              Ficheiros enviados
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingFiles ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>Ainda não enviou nenhum ficheiro.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between py-3 gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <FileText className="h-5 w-5 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {doc.file_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.document_type !== "outro" ? doc.document_type + " · " : ""}
                          {new Date(doc.created_at).toLocaleDateString("pt-PT")}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => { e.stopPropagation(); downloadFile(doc); }}
                      title="Descarregar"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Documentos;
