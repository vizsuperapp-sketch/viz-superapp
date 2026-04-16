import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

type AuthStep = "login" | "signup" | "pending-email" | "email-not-confirmed";

const Auth = () => {
  const [step, setStep] = useState<AuthStep>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, session } = useAuth();

  // ✅ FIX: Só redireciona se user existe E email foi confirmado
  useEffect(() => {
    if (user && session && user.email_confirmed_at) {
      navigate("/documentos", { replace: true });
    }
  }, [user, session, navigate]);

  // 🔄 Reenviar email de confirmação
  const handleResendEmail = async () => {
    if (!pendingEmail) return;
    setResendLoading(true);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: pendingEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) throw error;

      toast({
        title: "✅ Email reenviado",
        description: "Verifique a sua caixa de entrada (ou spam).",
      });
    } catch (error: any) {
      toast({
        title: "❌ Erro",
        description: error.message || "Não foi possível reenviar o email.",
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (step === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          // ⚠️ Email não confirmado?
          if (error.message.toLowerCase().includes("email not confirmed")) {
            setPendingEmail(email);
            setStep("email-not-confirmed");
            toast({
              title: "⚠️ Email não confirmado",
              description: "Verifique a sua caixa de entrada e confirme o registo.",
            });
            return;
          }
          throw error;
        }

        // ✅ Login bem-sucedido
        navigate("/documentos", { replace: true });
      } else if (step === "signup") {
        // ✅ SIGNUP: Criar conta
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth`,
          },
        });

        if (error) throw error;

        // ✅ FIX: Mostra mensagem e muda para step pendente
        setPendingEmail(email);
        setStep("pending-email");
        setEmail("");
        setPassword("");
        setFullName("");

        toast({
          title: "✅ Conta criada com sucesso!",
          description: "Verifique o seu email para confirmar o registo.",
        });
      }
    } catch (error: any) {
      const msg = error.message || "";
      const translated = /weak|pwned|hibp/i.test(msg)
        ? "A password é demasiado fraca. Escolha outra."
        : /already registered|already been registered/i.test(msg)
          ? "Este email já está registado."
          : /invalid login credentials/i.test(msg)
            ? "Email ou password incorrectos."
            : /email not confirmed/i.test(msg)
              ? "Confirme o seu email antes de iniciar sessão."
              : msg || "Ocorreu um erro. Tente novamente.";

      toast({
        title: "❌ Erro",
        description: translated,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth`,
      });

      if (result.error) {
        toast({
          title: "❌ Erro",
          description: "Não foi possível iniciar sessão com o Google.",
          variant: "destructive",
        });
      }

      if (result.redirected) return;

      // ✅ Aguarda um pouco para session ser atualizada
      setTimeout(() => {
        navigate("/documentos", { replace: true });
      }, 500);
    } catch {
      toast({
        title: "❌ Erro",
        description: "Não foi possível iniciar sessão com o Google.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[140%] h-[140%] -top-[20%] -left-[20%]"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 40%, hsla(163, 40%, 82%, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 30% 60%, hsla(240, 30%, 92%, 0.3) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Button variant="ghost" className="mb-6 text-muted-foreground" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao site
        </Button>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-viz mb-2">
              <span className="text-sm font-bold text-primary-foreground tracking-tight">VIZ</span>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {step === "login" && "Iniciar sessão"}
              {step === "signup" && "Criar conta"}
              {step === "pending-email" && "Confirme o seu email"}
              {step === "email-not-confirmed" && "Email não confirmado"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === "login" && "Aceda à sua área de documentos"}
              {step === "signup" && "Registe-se para submeter os seus documentos"}
              {step === "pending-email" && "Enviámos um email de confirmação"}
              {step === "email-not-confirmed" && "Confirme o seu email para continuar"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* 📧 STEP: Pending Email (após signup) */}
            {step === "pending-email" && (
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">✅ Verifique o seu email para confirmar o registo</p>
                  <p className="text-xs text-blue-700 mt-2">
                    Email enviado para: <strong>{pendingEmail}</strong>
                  </p>
                  <p className="text-xs text-blue-700 mt-2">💡 Se não vir o email, verifique a pasta de spam.</p>
                </div>

                <Button onClick={handleResendEmail} variant="outline" className="w-full" disabled={resendLoading}>
                  {resendLoading ? "⏳ A reenviar..." : "🔄 Reenviar email"}
                </Button>

                <Button
                  onClick={() => {
                    setStep("login");
                    setPendingEmail("");
                  }}
                  variant="ghost"
                  className="w-full text-muted-foreground"
                >
                  Voltar para login
                </Button>
              </div>
            )}

            {/* ⚠️ STEP: Email Not Confirmed (tentou login sem confirmar) */}
            {step === "email-not-confirmed" && (
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Email ainda não foi confirmado</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Confirmou o email que recebeu em <strong>{pendingEmail}</strong>?
                    </p>
                  </div>
                </div>

                <Button onClick={handleResendEmail} variant="outline" className="w-full" disabled={resendLoading}>
                  {resendLoading ? "⏳ A reenviar..." : "🔄 Reenviar email de confirmação"}
                </Button>

                <Button
                  onClick={() => {
                    setStep("login");
                    setPendingEmail("");
                  }}
                  variant="ghost"
                  className="w-full text-muted-foreground"
                >
                  Voltar para login
                </Button>
              </div>
            )}

            {/* 🔐 STEP: Login / Signup */}
            {(step === "login" || step === "signup") && (
              <>
                <Button
                  variant="outline"
                  className="w-full h-11 text-foreground"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Entrar com Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">ou</span>
                  </div>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {step === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground">
                        Nome completo
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="O seu nome"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="hero" className="w-full h-11" disabled={loading}>
                    {loading ? "⏳ A processar..." : step === "login" ? "Iniciar sessão" : "Criar conta"}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  {step === "login" ? "Ainda não tem conta?" : "Já tem uma conta?"}{" "}
                  <button
                    type="button"
                    className="text-primary font-medium hover:underline"
                    onClick={() => setStep(step === "login" ? "signup" : "login")}
                  >
                    {step === "login" ? "Criar conta" : "Iniciar sessão"}
                  </button>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
