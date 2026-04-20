import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

const FeaturedPropertiesSection = () => {
  const displayProperties = properties.slice(0, 4);

  return (
    <section className="relative w-full py-12 md:py-20 bg-gradient-to-b from-background via-background to-background/80 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-14">
          <Badge
            variant="secondary"
            className="mb-3 md:mb-4 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary border-primary/20 text-xs md:text-sm inline-block"
          >
            ✨ Empreendimentos em Destaque
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Propriedades Exclusivas
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Descubra os melhores projetos imobiliários. Cada propriedade, uma oportunidade premium.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProperties.map((property) => {
            const imgSrc =
              property.coverImage || (property.images && property.images[0]) || "/placeholder.svg";

            return (
              <Link
                key={property.slug}
                to={`/imoveis/${property.slug}`}
                className="group relative rounded-xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                {/* Imagem */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={imgSrc}
                    alt={property.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2">
                    <Badge className="bg-black/60 backdrop-blur text-white border-white/20 text-[10px] md:text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.region}
                    </Badge>
                    {property.badge && (
                      <Badge className="bg-gradient-to-r from-primary to-cyan-500 text-white border-none text-[10px] md:text-xs">
                        {property.badge}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-3 md:p-4 space-y-1.5">
                  <h3 className="text-sm md:text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{property.typology}</p>
                  <p className="text-sm md:text-base font-bold text-emerald-400 pt-1">
                    {property.priceRange}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-14">
          <Link to="/imoveis">
            <Button
              variant="outline"
              className="rounded-xl gap-2 px-6 md:px-8 py-2.5 md:py-3 border-border/50 hover:border-primary/50 hover:bg-primary/5 text-sm md:text-base"
            >
              Ver todos os {properties.length} empreendimentos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
