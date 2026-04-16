import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const FeaturedPropertiesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const displayProperties = properties.slice(0, 4); // Mostrar só 4 principais

  useEffect(() => {
    if (!isAutoPlay || displayProperties.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayProperties.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, displayProperties.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + displayProperties.length) % displayProperties.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % displayProperties.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    setActiveIndex(index);
  };

  const activeProperty = displayProperties[activeIndex];

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-background via-background to-background/80 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
            ✨ Empreendimentos em Destaque
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Propriedades Exclusivas
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubra os melhores projetos imobiliários. Cada propriedade, uma oportunidade de investimento premium.
          </p>
        </div>

        {/* Main Carousel Container */}
        {displayProperties.length > 0 && activeProperty && (
          <div className="max-w-6xl mx-auto">
            {/* Featured Card Showcase */}
            <div className="relative mb-12">
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
                {/* Background Image with Parallax */}
                <div className="absolute inset-0">
                  <img
                    src={activeProperty.coverImage}
                    alt={activeProperty.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent opacity-80" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="space-y-6 mb-8">
                    {/* Location Badge */}
                    <div className="w-fit">
                      <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        {activeProperty.region}
                      </Badge>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {activeProperty.name}
                      </h3>
                      <p className="text-lg text-white/80">{activeProperty.typology}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {/* Price */}
                      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-xs font-medium text-white/60 mb-1">Preço</p>
                        <p className="text-lg md:text-xl font-bold text-emerald-400">{activeProperty.priceRange}</p>
                      </div>

                      {/* Area */}
                      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-xs font-medium text-white/60 mb-1">Área</p>
                        <p className="text-lg md:text-xl font-bold text-blue-400">{activeProperty.areaRange}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link to={`/imoveis/${activeProperty.slug}`} className="w-fit">
                      <Button className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white rounded-xl gap-2 h-12 px-8">
                        Ver Detalhes
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-muted/50 hover:bg-muted border border-border/50 text-foreground transition-all duration-300 hover:border-primary/30"
                  aria-label="Previous property"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  aria-label="Next property"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {displayProperties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-gradient-to-r from-primary to-cyan-500"
                        : "w-2 bg-muted/50 hover:bg-muted"
                    }`}
                    aria-label={`Go to property ${index + 1}`}
                  />
                ))}
              </div>

              {/* Counter & Autoplay */}
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-muted-foreground">
                  <span className="text-primary font-bold">{activeIndex + 1}</span> / {displayProperties.length}
                </div>
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isAutoPlay
                      ? "bg-gradient-to-r from-primary to-cyan-500 text-white"
                      : "bg-muted/50 text-foreground border border-border/50 hover:border-primary/30"
                  }`}
                  aria-label={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
                >
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Info Pills */}
            <div className="mt-10 flex flex-wrap gap-2 justify-center">
              <div className="px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground backdrop-blur-sm">
                ✨ Carousel Interativo
              </div>
              <div className="px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground backdrop-blur-sm">
                🎭 Parallax & Efeitos 3D
              </div>
              <div className="px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground backdrop-blur-sm">
                💫 Design Premium
              </div>
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link to="/imoveis">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl gap-2 px-8 border-border/50 hover:border-primary/30 hover:bg-muted/50"
            >
              Ver todos os {properties.length} empreendimentos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default FeaturedPropertiesSection;
