import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2, LogOut, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import AdminLeadsTab from "@/components/admin/AdminLeadsTab";
import AdminClientsTab from "@/components/admin/AdminClientsTab";
import AdminDocumentsTab from "@/components/admin/AdminDocumentsTab";
import AdminChatTab from "@/components/admin/AdminChatTab";

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecked, setRoleChecked] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("leads");
  const [docClient, setDocClient] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setIsAdmin(false);
        setRoleChecked(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Check admin role when session changes
  useEffect(() => {
    if (!session?.user) {
      setRoleChecked(true);
      return;
    }
    setRoleChecked(false);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        setIsAdmin(!!data);
        setRoleChecked(true);
      });
  }, [session?.user?.id]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) setLoginError(error.message);
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSelectClient = (id: string, name: string) => {
    setDocClient({ id, name });
    setActiveTab("documents");
  };

  if (authLoading || !roleChecked) {
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
            <Input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            {loginError && <p className="text-destructive text-sm">{loginError}</p>}
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/"><Button variant="ghost" size="sm">← Voltar ao site</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShieldAlert className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="text-xl font-bold">Acesso restrito</h1>
          <p className="text-muted-foreground">Não tens permissão para aceder a este painel.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/"><Button variant="outline">Voltar ao site</Button></Link>
            <Button variant="ghost" onClick={handleLogout}>Terminar sessão</Button>
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
            <h1 className="text-2xl font-bold tracking-tight">Painel Admin</h1>
          </div>
          <Button variant="ghost" size="sm" className="rounded-xl gap-2" onClick={handleLogout}>
            <LogOut size={14} />
            Sair
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); if (v !== "documents") setDocClient(null); }}>
          <TabsList className="mb-6">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <AdminLeadsTab />
          </TabsContent>

          <TabsContent value="clients">
            <AdminClientsTab onSelectClient={handleSelectClient} />
          </TabsContent>

          <TabsContent value="documents">
            <AdminDocumentsTab preselectedClient={docClient} />
          </TabsContent>

          <TabsContent value="chat">
            <AdminChatTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
