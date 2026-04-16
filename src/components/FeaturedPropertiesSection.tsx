import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Zap, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const FeaturedPropertiesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const displayProperties = properties.slice(0, 4);

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
  const isVistaBella = activeProperty.slug === "vistabella-oeiras";

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-background via-background to-background/80 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12 animate-in fade-in duration-800">
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

        {displayProperties.length > 0 && activeProperty && (
          <div className="max-w-6xl mx-auto">
            {/* VÍDEO 360° EM DESTAQUE PARA VistaBella */}
            {isVistaBella && activeProperty.video360 && (
              <div className="mb-8 animate-in fade-in duration-800">
                <div className="relative h-[400px] md:h-[550px] rounded-3xl overflow-hidden group bg-black/90 border-2 border-primary/30">
                  {!showVideo ? (
                    <div className="relative h-full w-full">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9b274c3f592b?w=1200&h=800&fit=crop')`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <div
                          className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-primary to-cyan-500 shadow-lg shadow-primary/50 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => setShowVideo(true)}
                        >
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                        <p className="text-white text-center font-semibold">🎥 Tour 360° em Vídeo</p>
                        <p className="text-white/80 text-sm text-center max-w-xs">
                          Explore o empreendimento virtualmente
                        </p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src={activeProperty.video360}
                      title="Tour 360 VistaBella Oeiras"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  )}
                </div>
                {showVideo && (
                  <div className="mt-4 flex justify-center">
                    <Button onClick={() => setShowVideo(false)} variant="outline" className="rounded-xl">
                      Voltar às Fotos
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* CAROUSEL PRINCIPAL DE IMAGENS */}
            <div className="relative mb-12">
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
                <div className="absolute inset-0">
                  <img
                    src={activeProperty.coverImage}
                    alt={activeProperty.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent opacity-80" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="space-y-6 mb-8">
                    <div className="w-fit flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        {activeProperty.region}
                      </Badge>
                      {activeProperty.badge && (
                        <Badge className="bg-gradient-to-r from-primary to-cyan-500 text-white border-none">
                          ⭐ {activeProperty.badge}
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {activeProperty.name}
                      </h3>
                      <p className="text-lg text-white/80">{activeProperty.typology}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-xs font-medium text-white/60 mb-1">Preço</p>
                        <p className="text-lg md:text-xl font-bold text-emerald-400">{activeProperty.priceRange}</p>
                      </div>

                      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-xs font-medium text-white/60 mb-1">Área</p>
                        <p className="text-lg md:text-xl font-bold text-blue-400">{activeProperty.areaRange}</p>
                      </div>
                    </div>

                    <Link to={`/imoveis/${activeProperty.slug}`} className="w-fit">
                      <Button className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white rounded-xl gap-2 h-12 px-8">
                        Ver Detalhes <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
              </div>
            </div>

            {/* CONTROLES DO CAROUSEL */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
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

              <div className="flex gap-2">
                {displayProperties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-gradient-to-r from-primary to-cyan-500" : "w-2 bg-muted/50 hover:bg-muted"}`}
                    aria-label={`Go to property ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-muted-foreground">
                  <span className="text-primary font-bold">{activeIndex + 1}</span> / {displayProperties.length}
                </div>
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`p-3 rounded-full transition-all duration-300 ${isAutoPlay ? "bg-gradient-to-r from-primary to-cyan-500 text-white" : "bg-muted/50 text-foreground border border-border/50 hover:border-primary/30"}`}
                  aria-label={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
                >
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 justify-center">
              <div className="px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground backdrop-blur-sm">
                ✨ Carousel Interativo
              </div>
              <div className="px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground backdrop-blur-sm">
                🎥 Tour 360° com Vídeo
              </div>
              <div className="px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs text-muted-foreground backdrop-blur-sm">
                💫 Design Premium
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <Link to="/imoveis">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl gap-2 px-8 border-border/50 hover:border-primary/30 hover:bg-muted/50"
            >
              Ver todos os {properties.length} empreendimentos <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
