import FooterSection from "@/components/FooterSection";
import { SERVICOS } from "@/data/servicos";

const Precos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-16 pb-24 px-6">
        <div className="container max-w-5xl mx-auto">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3 text-center">
            Preços transparentes
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-4">
            VIZ vs <span className="text-gradient">Mercado.</span>
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            0% comissão na transação. Para os serviços opcionais, mostramos sempre
            quanto poupa em comparação com o mercado.
          </p>

          {/* Desktop table */}
          <div className="hidden md:block glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold">Serviço</th>
                  <th className="px-6 py-4 font-semibold text-primary">VIZ</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Mercado médio</th>
                  <th className="px-6 py-4 font-semibold text-right">Poupança</th>
                </tr>
              </thead>
              <tbody>
                {SERVICOS.map((s) => (
                  <tr key={s.id} className="border-t border-border/30">
                    <td className="px-6 py-4 font-medium">{s.nome}</td>
                    <td className="px-6 py-4 text-gradient font-bold">{s.precoLabel}</td>
                    <td className="px-6 py-4 line-through text-muted-foreground">
                      {s.precoMercadoLabel}
                    </td>
                    <td className="px-6 py-4 text-right text-primary/90">
                      {s.poupancaLabel}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-primary/30 bg-primary/5">
                  <td className="px-6 py-5 font-bold">Total típico transação</td>
                  <td className="px-6 py-5 font-bold text-gradient text-lg">
                    desde €280
                  </td>
                  <td className="px-6 py-5 line-through text-muted-foreground">
                    €2.000+
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-gradient text-lg">
                    Economiza €1.700+
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {SERVICOS.map((s) => (
              <div key={s.id} className="glass-card rounded-2xl p-5">
                <div className="font-semibold mb-3">{s.nome}</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      VIZ
                    </div>
                    <div className="font-bold text-gradient">{s.precoLabel}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      Mercado
                    </div>
                    <div className="line-through text-muted-foreground">
                      {s.precoMercadoLabel}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-primary/90 font-medium">
                  💰 {s.poupancaLabel}
                </div>
              </div>
            ))}
            <div className="glass-card rounded-2xl p-5 border border-primary/30 bg-primary/5">
              <div className="font-bold mb-2">Total típico de uma transação</div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gradient">desde €280</span>
                <span className="line-through text-muted-foreground">€2.000+</span>
              </div>
              <div className="mt-2 text-sm font-bold text-gradient">
                Economiza €1.700+
              </div>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground/60 text-center mt-6">
            Valores indicativos, "a partir de". Podem variar conforme imóvel,
            localização e complexidade.
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Precos;
