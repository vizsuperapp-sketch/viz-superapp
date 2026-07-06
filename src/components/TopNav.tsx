import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import vizLogoCube from "@/assets/viz-logo-cube.png";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/imoveis", label: "Comprar" },
  { to: "/vender", label: "Vender" },
  { to: "/servicos", label: "Serviços" },
  { to: "/#como-funciona", label: "Como Funciona" },
];

const HIDDEN_PREFIXES = ["/admin", "/auth"];

const TopNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const handleAnchor = (to: string) => {
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: id } });
      }
      return true;
    }
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[#0f172a]/70 border-b border-white/10"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={vizLogoCube}
            alt="VIZ"
            className="w-8 h-8 object-contain transition-transform group-hover:rotate-12"
          />
          <span className="font-display font-extrabold text-lg tracking-tight text-foreground">
            VIZ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) =>
            l.to.startsWith("/#") ? (
              <button
                key={l.to}
                onClick={() => handleAnchor(l.to)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={() => {
              if (pathname === "/") {
                document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/", { state: { scrollTo: "waitlist" } });
              }
            }}
            className="rounded-full bg-brand-cyan hover:bg-brand-cyan/90 text-[#001018] font-semibold shadow-[0_8px_30px_-8px_hsl(var(--brand-cyan)/0.6)]"
          >
            Começar Agora
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 bg-[#0f172a]/95 backdrop-blur-xl border-white/10"
          >
            <div className="flex flex-col gap-1 mt-10">
              {LINKS.map((l) =>
                l.to.startsWith("/#") ? (
                  <button
                    key={l.to}
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => handleAnchor(l.to), 100);
                    }}
                    className="px-3 py-3 rounded-lg text-base font-medium text-left text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </button>
                ) : (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive
                          ? "bg-white/10 text-foreground"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ),
              )}
              <Button
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => {
                    if (pathname === "/") {
                      document
                        .getElementById("waitlist")
                        ?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      navigate("/", { state: { scrollTo: "waitlist" } });
                    }
                  }, 100);
                }}
                className="mt-4 rounded-full bg-brand-cyan hover:bg-brand-cyan/90 text-[#001018] font-semibold"
              >
                Começar Agora
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default TopNav;
