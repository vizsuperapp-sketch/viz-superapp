import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FooterSection from "@/components/FooterSection";
import { CATEGORIAS, SERVICOS, type ServicoCategoria } from "@/data/servicos";

const Servicos = () => {
  const [tab, setTab] = useState<string>("tudo");
  const navigate = useNavigate();

  const lista = useMemo(
    () => (tab === "tudo" ? SERVICOS : SERVICOS.filter((s) => s.categoria === (tab as ServicoCategoria))),
    [tab],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-16 pb-24 px-6">
        <div className="container max-w-6xl mx-auto">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center">
            Ecossistema VIZ
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-4">
            Tudo integrado. <span className="text-gradient">Tudo simples.</span>
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Serviços opcionais a preços transparentes, pensados para todo o ciclo
            da sua casa. Sem comissões na transação.
          </p>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mx-auto flex flex-wrap h-auto justify-center mb-10 bg-muted/40">
              {CATEGORIAS.map((c) => (
                <TabsTrigger key={c.id} value={c.id} className="capitalize">
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={tab} className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lista.map((s) => {
                  const Icon = s.icon;
                  return (
                    <article
                      key={s.id}
                      className="glass-card rounded-2xl p-6 flex flex-col gap-4"
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center glass-icon">
                        <Icon size={20} strokeWidth={1.4} className="text-primary" />
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold mb-1">{s.nome}</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {s.descricao}
                        </p>
                      </div>

                      <ul className="space-y-1.5 text-[13px] text-foreground/80">
                        {s.beneficios.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-4 border-t border-border/40">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className="text-2xl font-bold text-gradient">
                            {s.precoLabel}
                          </span>
                          <span className="text-xs line-through text-muted-foreground/60">
                            {s.precoMercadoLabel}
                          </span>
                        </div>
                        <div className="text-[11px] font-medium text-primary/90 mb-4">
                          💰 {s.poupancaLabel}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-between border-primary/25 hover:bg-primary/10"
                          onClick={() => navigate(s.ctaHref)}
                        >
                          {s.ctaLabel}
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Servicos;
