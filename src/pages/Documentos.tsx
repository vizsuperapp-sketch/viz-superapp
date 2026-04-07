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
  Trash2,
  Download,
  LogOut,
  ArrowLeft,
  Loader2,
  FolderOpen,
} from "lucide-react";

interface StorageFile {
  name: string;
  id: string;
  created_at: string;
  metadata: { size: number; mimetype: string } | null;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Documentos = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [authLoading, user, navigate]);

  const fetchFiles = useCallback(async () => {
    if (!user) return;
    setLoadingFiles(true);
    const { data, error } = await supabase.storage
      .from("documents")
      .list(user.id, { sortBy: { column: "created_at", order: "desc" } });
    if (error) {
      console.error("Error listing files:", error);
    } else {
      setFiles((data as StorageFile[]) || []);
    }
    setLoadingFiles(false);
  }, [user]);

  useEffect(() => {
    if (user) fetchFiles();
  }, [user, fetchFiles]);

  const uploadFile = async (file: File) => {
    if (!user) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({
        title: "Tipo não suportado",
        description: "Envie ficheiros PDF, imagens ou documentos Office.",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "Ficheiro muito grande",
        description: "O tamanho máximo é de 20 MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const filePath = `${user.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("documents")
      .upload(filePath, file, { contentType: file.type });

    if (error) {
      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Ficheiro enviado com sucesso!" });
      fetchFiles();
    }
    setUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      Array.from(selected).forEach(uploadFile);
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files;
    if (dropped) Array.from(dropped).forEach(uploadFile);
  };

  const downloadFile = async (fileName: string) => {
    if (!user) return;
    const { data, error } = await supabase.storage
      .from("documents")
      .download(`${user.id}/${fileName}`);
    if (error) {
      toast({ title: "Erro ao descarregar", description: error.message, variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteFile = async (fileName: string) => {
    if (!user) return;
    const { error } = await supabase.storage
      .from("documents")
      .remove([`${user.id}/${fileName}`]);
    if (error) {
      toast({ title: "Erro ao apagar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Ficheiro apagado" });
      fetchFiles();
    }
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
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
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
        {/* Upload area */}
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragOver
              ? "border-primary bg-accent/50"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-12">
            {uploading ? (
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
            ) : (
              <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            )}
            <p className="text-foreground font-medium">
              {uploading ? "A enviar..." : "Arraste ficheiros ou clique para enviar"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              PDF, imagens e documentos Office — máx. 20 MB
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

        {/* File list */}
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
            ) : files.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>Ainda não enviou nenhum ficheiro.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between py-3 gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <FileText className="h-5 w-5 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name.replace(/^\d+-/, "")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {file.metadata?.size ? formatSize(file.metadata.size) : ""}{" "}
                          · {new Date(file.created_at).toLocaleDateString("pt-PT")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); downloadFile(file.name); }}
                        title="Descarregar"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); deleteFile(file.name); }}
                        title="Apagar"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
