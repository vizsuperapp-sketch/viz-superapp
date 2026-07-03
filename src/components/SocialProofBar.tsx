import { Percent, Wallet, Eye } from "lucide-react";

const stats = [
  { value: "0%", label: "Comissão cobrada", icon: Percent },
  { value: "€15.000+", label: "Poupança média por transação", icon: Wallet },
  { value: "100%", label: "Transparência no processo", icon: Eye },
];

const SocialProofBar = () => {
  return (
    <div
      className="w-full max-w-xl opacity-0 animate-fade-up"
      style={{ animationDelay: "450ms" }}
    >
      <div className="liquid-glass-strong rounded-2xl px-6 py-5 md:px-8 md:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center sm:flex-col sm:items-center gap-3 sm:gap-2 text-left sm:text-center"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10">
                <Icon size={16} className="text-cyan-300" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {value}
                </p>
                <p className="text-[11px] md:text-xs text-white/60 leading-tight">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProofBar;
