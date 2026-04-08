import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface ClientDocument {
  id: string;
  bucket: string;
  storage_path: string;
  file_name: string;
  document_type: string;
  created_at: string;
}

const AdminClientsTab = ({ onSelectClient }: { onSelectClient?: (id: string, name: string) => void }) => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<{ id: string; name: string } | null>(null);
  const [clientDocs, setClientDocs] = useState<ClientDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("Sem permissão para ver perfis.");
    } else {
      setProfiles((data as Profile[]) || []);
    }
    setLoading(false);
  };

  const fetchClientDocs = async (clientId: string) => {
    setLoadingDocs(true);
    const { data, error } = await supabase
      .from("client_documents")
      .select("*")
      .eq("user_id", clientId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching client docs:", error);
    } else {
      setClientDocs(data || []);
    }
    setLoadingDocs(false);
  };

  const handleSelectClient = (id: string, name: string) => {
    setSelectedClient({ id, name });
    fetchClientDocs(id);
    onSelectClient?.(id, name);
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

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive text-sm">{error}</p>
        <Button variant="outline" size="sm" className="mt-4 rounded-xl" onClick={fetchProfiles}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-20">
        <Users className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground text-sm">Ainda sem clientes registados.</p>
      </div>
    );
  }

  // Show client documents view
  if (selectedClient) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => { setSelectedClient(null); setClientDocs([]); }}>
            ← Voltar
          </Button>
          <h3 className="font-semibold text-foreground">Documentos de {selectedClient.name}</h3>
        </div>

        {loadingDocs ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : clientDocs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground text-sm">Sem documentos enviados.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Ficheiro</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Tipo</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Data</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientDocs.map((doc) => (
                  <tr key={doc.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{doc.file_name}</td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{doc.document_type}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(doc.created_at).toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" onClick={() => downloadFile(doc)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Nome</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Email</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Registo</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Documentos</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium">{profile.full_name || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{profile.email || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                  {new Date(profile.created_at).toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg text-xs"
                    onClick={() => handleSelectClient(profile.id, profile.full_name || profile.email || profile.id)}
                  >
                    Ver documentos
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

export default AdminClientsTab;
