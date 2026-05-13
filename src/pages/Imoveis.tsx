import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Imoveis = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Voltar">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Empreendimentos
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Descubra os nossos empreendimentos em destaque
            </p>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((property) => (
            <Link
              key={property.slug}
              to={`/imoveis/${property.slug}`}
              className="group block"
            >
              <div className="rounded-2xl overflow-hidden border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                {/* Image */}
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

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {property.name}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {property.location}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Home className="h-4 w-4 text-primary" />
                      <span>{property.typology}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Ruler className="h-4 w-4 text-primary" />
                      <span>{property.areaRange}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-lg font-semibold text-primary">
                      {property.priceRange}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Imoveis;
