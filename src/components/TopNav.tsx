import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import vizLogoCube from "@/assets/viz-logo-cube.png";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/servicos", label: "Serviços" },
  { to: "/precos", label: "Preços" },
  { to: "/imoveis", label: "Imóveis" },
];

const HIDDEN_PREFIXES = ["/admin", "/auth"];

const TopNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors",
      isActive
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground",
    );

  const goClient = () => navigate(user ? "/documentos" : "/auth");

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="container max-w-6xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={vizLogoCube} alt="VIZ" className="w-7 h-7 object-contain" />
          <span className="font-bold tracking-tight">VIZ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border/50 text-muted-foreground hover:text-foreground"
            onClick={goClient}
          >
            <UserCircle className="h-4 w-4 mr-2" />
            {user ? "Os meus documentos" : "Área de Cliente"}
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-1 mt-8">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-accent",
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Button
                variant="outline"
                className="mt-4 justify-start"
                onClick={() => {
                  setOpen(false);
                  goClient();
                }}
              >
                <UserCircle className="h-4 w-4 mr-2" />
                {user ? "Os meus documentos" : "Área de Cliente"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default TopNav;
