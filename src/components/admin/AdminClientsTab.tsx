import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

const AdminClientsTab = ({ onSelectClient }: { onSelectClient?: (id: string, name: string) => void }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                  {onSelectClient && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg text-xs"
                      onClick={() => onSelectClient(profile.id, profile.full_name || profile.email || profile.id)}
                    >
                      Ver ficheiros
                    </Button>
                  )}
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
