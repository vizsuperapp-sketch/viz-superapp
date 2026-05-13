import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, FileText, Download, FolderOpen, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface StorageFile {
  name: string;
  id: string;
  created_at: string;
  metadata: { size: number; mimetype: string } | null;
}

interface ClientFolder {
  name: string; // user_id
  id: string;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const AdminDocumentsTab = ({ preselectedClient }: { preselectedClient?: { id: string; name: string } | null }) => {
  const { toast } = useToast();
  const [folders, setFolders] = useState<ClientFolder[]>([]);
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [selectedClient, setSelectedClient] = useState<{ id: string; name: string } | null>(preselectedClient || null);
  const [loading, setLoading] = useState(true);
  const [clientNames, setClientNames] = useState<Record<string, string>>({});

  // Fetch all client folders
  const fetchFolders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("documents").list("", { limit: 1000 });
    if (error) {
      console.error("Error listing folders:", error);
      setLoading(false);
      return;
    }
    // Folders have id = null in storage listing
    const folderItems = (data || []).filter((item) => item.id === null || item.metadata === null);
    setFolders(folderItems as ClientFolder[]);

    // Fetch profile names for these user IDs
    const userIds = folderItems.map((f) => f.name);
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", userIds);
      if (profiles) {
        const names: Record<string, string> = {};
        profiles.forEach((p) => {
          names[p.id] = p.full_name || p.email || p.id;
        });
        setClientNames(names);
      }
    }
    setLoading(false);
  }, []);

  // Fetch files for a specific client
  const fetchClientFiles = useCallback(async (clientId: string) => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("documents")
      .list(clientId, { sortBy: { column: "created_at", order: "desc" }, limit: 1000 });
    if (error) {
      console.error("Error listing files:", error);
    } else {
      setFiles((data as StorageFile[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (preselectedClient) {
      setSelectedClient(preselectedClient);
    }
  }, [preselectedClient]);

  useEffect(() => {
    if (selectedClient) {
      fetchClientFiles(selectedClient.id);
    } else {
      fetchFolders();
    }
  }, [selectedClient, fetchClientFiles, fetchFolders]);

  const downloadFile = async (clientId: string, fileName: string) => {
    const { data, error } = await supabase.storage
      .from("documents")
      .download(`${clientId}/${fileName}`);
    if (error) {
      toast({ title: "Erro ao descarregar", description: error.message, variant: "destructive" });
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/^\d+-/, "");
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Viewing a specific client's files
  if (selectedClient) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" className="rounded-lg" onClick={() => { setSelectedClient(null); setFiles([]); }}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <span className="text-sm font-medium text-foreground">
            Ficheiros de: <span className="text-primary">{selectedClient.name}</span>
          </span>
        </div>

        {files.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground text-sm">Este cliente não tem ficheiros.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="text-left font-medium text-muted-foreground px-4 py-3">Ficheiro</th>
                    <th className="text-left font-medium text-muted-foreground px-4 py-3">Tamanho</th>
                    <th className="text-left font-medium text-muted-foreground px-4 py-3">Data</th>
                    <th className="text-right font-medium text-muted-foreground px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary shrink-0" />
                        {file.name.replace(/^\d+-/, "")}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {file.metadata?.size ? formatSize(file.metadata.size) : "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {new Date(file.created_at).toLocaleDateString("pt-PT", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => downloadFile(selectedClient.id, file.name)}
                          title="Descarregar"
                          aria-label="Descarregar ficheiro"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Viewing all client folders
  if (folders.length === 0) {
    return (
      <div className="text-center py-20">
        <FolderOpen className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground text-sm">Ainda sem documentos de clientes.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Cliente</th>
              <th className="text-right font-medium text-muted-foreground px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {folders.map((folder) => (
              <tr key={folder.name} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  {clientNames[folder.name] || folder.name}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg text-xs"
                    onClick={() => setSelectedClient({ id: folder.name, name: clientNames[folder.name] || folder.name })}
                  >
                    Ver ficheiros
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDocumentsTab;
