import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2, RefreshCw, Inbox, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";

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

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      setLoginError(error.message);
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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
    if (session) {
      fetchLeads();
    }
  }, [session]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto px-6">
          <h1 className="text-2xl font-bold tracking-tight mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            {loginError && <p className="text-destructive text-sm">{loginError}</p>}
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/">
              <Button variant="ghost" size="sm">← Voltar ao site</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl py-10 px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft size={18} />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
              <p className="text-sm text-muted-foreground">
                {leads.length} submissão{leads.length !== 1 ? "ões" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={fetchLeads} disabled={loading}>
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Atualizar
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl gap-2" onClick={handleLogout}>
              <LogOut size={14} />
              Sair
            </Button>
          </div>
        </div>

        {loading && leads.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive text-sm">{error}</p>
            <Button variant="outline" size="sm" className="mt-4 rounded-xl" onClick={fetchLeads}>
              Tentar novamente
            </Button>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20">
            <Inbox className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground text-sm">Ainda sem submissões.</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Admin;
