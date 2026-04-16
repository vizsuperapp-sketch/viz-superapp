import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Zap, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const FeaturedPropertiesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
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
            {/* ============================================ */}
            {/* VÍDEO 360° - VISTABELLA APENAS */}
            {/* ============================================ */}
            {isVistaBella && activeProperty.video360 && showVideo && (
              <div className="mb-8 animate-in fade-in duration-800">
                <div className="relative h-[250px] sm:h-[350px] md:h-[450px] rounded-3xl overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/30">
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all"
                    aria-label="Fechar vídeo"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <iframe
                    width="100%"
                    height="100%"
                    src={`${activeProperty.video360}?autoplay=1&fs=1&modestbranding=1`}
                    title="Tour 360 VistaBella Oeiras"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* INFORMAÇÕES DO IMÓVEL - SEMPRE VISÍVEL */}
            {/* ============================================ */}
            <div className="space-y-6 mb-12">
              {/* HEADER COM BADGES E TÍTULO */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm px-2 sm:px-3 py-1 text-xs sm:text-sm">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {activeProperty.region}
                  </Badge>
                  {activeProperty.badge && (
                    <Badge className="bg-gradient-to-r from-primary to-cyan-500 text-white border-none px-2 sm:px-3 py-1 text-xs sm:text-sm">
                      ⭐ {activeProperty.badge}
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">{activeProperty.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">{activeProperty.typology}</p>
                </div>
              </div>

              {/* CARDS COM INFORMAÇÕES */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground mb-1">Preço</p>
                  <p className="text-lg sm:text-2xl font-bold text-emerald-400">{activeProperty.priceRange}</p>
                </div>

                <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground mb-1">Área</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-400">{activeProperty.areaRange}</p>
                </div>

                {activeProperty.completion && (
                  <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-3 sm:p-4">
                    <p className="text-xs text-muted-foreground mb-1">Conclusão</p>
                    <p className="text-xs sm:text-sm font-bold text-primary">{activeProperty.completion}</p>
                  </div>
                )}

                <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-muted-foreground mb-1">Imagens</p>
                  <p className="text-lg sm:text-2xl font-bold text-cyan-400">{activeProperty.images.length}</p>
                </div>
              </div>

              {/* BOTÕES */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={`/imoveis/${activeProperty.slug}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white rounded-lg gap-2 h-11 sm:h-12 text-sm sm:text-base">
                    Ver Detalhes Completos <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                {isVistaBella && activeProperty.video360 && (
                  <Button
                    onClick={() => setShowVideo(!showVideo)}
                    variant="outline"
                    className="flex-1 rounded-lg h-11 sm:h-12 text-sm sm:text-base"
                  >
                    {showVideo ? "🎬 Fechar Vídeo" : "🎥 Abrir Vídeo 360°"}
                  </Button>
                )}
              </div>
            </div>

            {/* ============================================ */}
            {/* DESTAQUES */}
            {/* ============================================ */}
            {activeProperty.highlights && activeProperty.highlights.length > 0 && (
              <div className="space-y-4 mb-12">
                <h4 className="text-lg sm:text-xl font-semibold text-foreground">✨ Destaques</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {activeProperty.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <span className="text-primary font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* DESCRIÇÃO COMPLETA */}
            {/* ============================================ */}
            <div className="space-y-4 mb-12">
              <h4 className="text-lg sm:text-xl font-semibold text-foreground">📍 Sobre o Empreendimento</h4>
              <div className="bg-muted/20 border border-border/50 rounded-xl p-4 sm:p-6 space-y-4">
                {activeProperty.description.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* ============================================ */}
            {/* CAROUSEL DE OUTROS IMÓVEIS */}
            {/* ============================================ */}
            <div className="mt-12 pt-8 border-t border-border/30 space-y-6">
              <h4 className="text-lg sm:text-xl font-semibold text-foreground">Outros Empreendimentos</h4>

              {/* GRID DE IMÓVEIS COM IMAGENS REAIS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {displayProperties.map((prop, idx) => {
                  // Usa a primeira imagem do array ou a cover image
                  const imgSrc = prop.images && prop.images.length > 0 ? prop.images[0] : prop.coverImage;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`cursor-pointer relative h-[140px] sm:h-[170px] rounded-lg overflow-hidden group border-2 transition-all duration-300 ${
                        idx === activeIndex
                          ? "border-primary/80 ring-2 ring-primary/50"
                          : "border-border/50 hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={prop.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                        <h5 className="text-xs sm:text-sm font-bold text-white truncate">{prop.name}</h5>
                        <p className="text-xs text-white/80 truncate">{prop.priceRange}</p>
                      </div>

                      {idx === activeIndex && (
                        <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CONTROLES DO CAROUSEL */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 sm:p-3 rounded-full bg-muted/50 hover:bg-muted border border-border/50 text-foreground transition-all duration-300"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  {displayProperties.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-6 sm:w-8 bg-gradient-to-r from-primary to-cyan-500" : "w-2 bg-muted/50 hover:bg-muted"}`}
                      aria-label={`Ir para imóvel ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                    <span className="text-primary font-bold">{activeIndex + 1}</span> / {displayProperties.length}
                  </div>
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${isAutoPlay ? "bg-gradient-to-r from-primary to-cyan-500 text-white" : "bg-muted/50 text-foreground border border-border/50 hover:border-primary/30"}`}
                    aria-label={isAutoPlay ? "Pausar autoplay" : "Retomar autoplay"}
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* VER TODOS OS IMÓVEIS */}
            <div className="text-center mt-12">
              <Link to="/imoveis">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl gap-2 px-4 sm:px-8 border-border/50 hover:border-primary/30 hover:bg-muted/50 text-sm sm:text-base"
                >
                  Ver todos os {properties.length} empreendimentos <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
