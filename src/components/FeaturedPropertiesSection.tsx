import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

const FeaturedPropertiesSection = () => {
  return (
    <div className="group relative bg-[#0B1120] rounded-[2.5rem] overflow-hidden border border-slate-800 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:-translate-y-2">
          <Badge variant="secondary" className="mb-4">
            Empreendimentos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Em Destaque
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Conheça os empreendimentos que estamos a comercializar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {properties.map((property) => (
            <Link
              key={property.slug}
              to={`/imoveis/${property.slug}`}
              className="group block"
            >
              <div className="rounded-2xl overflow-hidden border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={property.coverImage}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-border/50">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.region}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {property.typology} · {property.areaRange}
                  </p>
                  <p className="text-primary font-semibold mt-3">
                    {property.priceRange}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/imoveis">
            <Button variant="outline" size="lg" className="rounded-xl gap-2">
              Ver todos os empreendimentos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
