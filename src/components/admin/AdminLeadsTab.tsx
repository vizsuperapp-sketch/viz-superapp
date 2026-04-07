import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  user_type: string;
  goal: string | null;
  message: string | null;
  created_at: string;
}

const AdminLeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("Sem permissão para ver leads ou erro de ligação.");
    } else {
      setLeads((data as Lead[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading && leads.length === 0) {
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
        <Button variant="outline" size="sm" className="mt-4 rounded-xl" onClick={fetchLeads}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-20">
        <Inbox className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground text-sm">Ainda sem submissões.</p>
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
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Telefone</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Serviço</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Mensagem</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium">{lead.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{lead.phone}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {lead.user_type}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                  {lead.message || "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeadsTab;
