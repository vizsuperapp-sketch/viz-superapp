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
    <section className="relative w-full py-12 md:py-32 bg-gradient-to-b from-background via-background to-background/80 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 w-full">
        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12 px-4 animate-in fade-in duration-800">
          <Badge
            variant="secondary"
            className="mb-3 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary border-primary/20 text-xs md:text-sm"
          >
            ✨ Empreendimentos em Destaque
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 tracking-tight">
            Propriedades Exclusivas
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Descubra os melhores projetos imobiliários. Cada propriedade, uma oportunidade premium.
          </p>
        </div>

        {displayProperties.length > 0 && activeProperty && (
          <div className="w-full px-4 sm:px-6 md:px-4 md:max-w-6xl md:mx-auto">
            {/* ============================================ */}
            {/* VÍDEO 360° - VISTABELLA */}
            {/* ============================================ */}
            {isVistaBella && activeProperty.video360 && showVideo && (
              <div className="mb-6 md:mb-8 animate-in fade-in duration-800">
                <div className="relative w-full h-64 sm:h-80 md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden border-2 border-primary/50 shadow-lg md:shadow-2xl md:shadow-primary/30">
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all"
                    aria-label="Fechar vídeo"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
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
            {/* INFORMAÇÕES DO IMÓVEL */}
            {/* ============================================ */}
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              {/* BADGES E TÍTULOLO */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm px-2.5 py-1 text-xs md:text-sm rounded-lg">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1.5" />
                    {activeProperty.region}
                  </Badge>
                  {activeProperty.badge && (
                    <Badge className="bg-gradient-to-r from-primary to-cyan-500 text-white border-none px-2.5 py-1 text-xs md:text-sm rounded-lg">
                      ⭐ {activeProperty.badge}
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground leading-tight">
                    {activeProperty.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1.5">
                    {activeProperty.typology}
                  </p>
                </div>
              </div>

              {/* CARDS COM INFORMAÇÕES - GRID 2x2 EM MOBILE, 4 COLUNAS EM DESKTOP */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-3 md:p-4">
                  <p className="text-xs text-muted-foreground mb-1.5 font-medium">Preço</p>
                  <p className="text-base sm:text-lg md:text-2xl font-bold text-emerald-400 truncate">
                    {activeProperty.priceRange}
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-3 md:p-4">
                  <p className="text-xs text-muted-foreground mb-1.5 font-medium">Área</p>
                  <p className="text-base sm:text-lg md:text-2xl font-bold text-blue-400 truncate">
                    {activeProperty.areaRange}
                  </p>
                </div>

                {activeProperty.completion && (
                  <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-3 md:p-4">
                    <p className="text-xs text-muted-foreground mb-1.5 font-medium">Conclusão</p>
                    <p className="text-xs sm:text-sm md:text-base font-bold text-primary truncate">
                      {activeProperty.completion}
                    </p>
                  </div>
                )}

                <div className="backdrop-blur-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-3 md:p-4">
                  <p className="text-xs text-muted-foreground mb-1.5 font-medium">Imagens</p>
                  <p className="text-base sm:text-lg md:text-2xl font-bold text-cyan-400 truncate">
                    {activeProperty.images.length}
                  </p>
                </div>
              </div>

              {/* BOTÕES - STACK EM MOBILE, LADO A LADO EM DESKTOP */}
              <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 pt-2">
                <Link to={`/imoveis/${activeProperty.slug}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white rounded-lg gap-2 h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base font-semibold transition-all">
                    Ver Detalhes <ArrowRight className="h-3.5 w-3.5 md:h-5 md:w-5" />
                  </Button>
                </Link>

                {isVistaBella && activeProperty.video360 && (
                  <Button
                    onClick={() => setShowVideo(!showVideo)}
                    variant="outline"
                    className="flex-1 rounded-lg h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base font-semibold border-border/50 hover:border-primary/50"
                  >
                    {showVideo ? "🎬 Fechar" : "🎥 Abrir 360°"}
                  </Button>
                )}
              </div>
            </div>

            {/* ============================================ */}
            {/* DESTAQUES */}
            {/* ============================================ */}
            {activeProperty.highlights && activeProperty.highlights.length > 0 && (
              <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                <h4 className="text-base md:text-lg font-semibold text-foreground">✨ Destaques</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
                  {activeProperty.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <span className="text-primary font-bold mt-0.5 flex-shrink-0 text-sm md:text-base">✓</span>
                      <span className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* DESCRIÇÃO */}
            {/* ============================================ */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
              <h4 className="text-base md:text-lg font-semibold text-foreground">📍 Sobre o Empreendimento</h4>
              <div className="bg-muted/20 border border-border/50 rounded-xl p-3.5 md:p-6 space-y-3 md:space-y-4">
                {activeProperty.description.split("\n\n").map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* ============================================ */}
            {/* CAROUSEL */}
            {/* ============================================ */}
            <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-border/30 space-y-5 md:space-y-6">
              <h4 className="text-base md:text-lg font-semibold text-foreground px-0">Outros Empreendimentos</h4>

              {/* GRID DE IMÓVEIS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                {displayProperties.map((prop, idx) => {
                  const imgSrc = prop.images && prop.images.length > 0 ? prop.images[0] : prop.coverImage;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`cursor-pointer relative h-28 sm:h-32 md:h-48 rounded-lg overflow-hidden group border-2 transition-all duration-300 ${
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                        <h5 className="text-xs sm:text-xs md:text-sm font-bold text-white truncate">{prop.name}</h5>
                        <p className="text-xs text-white/70 truncate">{prop.priceRange}</p>
                      </div>

                      {idx === activeIndex && (
                        <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CONTROLES */}
              <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
                {/* BOTÕES PREV/NEXT */}
                <div className="flex items-center gap-2 md:order-1">
                  <button
                    onClick={handlePrev}
                    className="p-2 md:p-3 rounded-full bg-muted/50 hover:bg-muted border border-border/50 text-foreground transition-all duration-300"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 md:p-3 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                    aria-label="Próximo"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* DOTS */}
                <div className="flex gap-1.5 md:gap-2 justify-center md:order-2">
                  {displayProperties.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-6 md:w-8 bg-gradient-to-r from-primary to-cyan-500" : "w-2 bg-muted/50 hover:bg-muted"}`}
                      aria-label={`Ir para imóvel ${index + 1}`}
                    />
                  ))}
                </div>

                {/* CONTADOR E AUTOPLAY */}
                <div className="flex items-center gap-2.5 md:gap-3 justify-center md:order-3">
                  <div className="text-xs md:text-sm font-medium text-muted-foreground">
                    <span className="text-primary font-bold">{activeIndex + 1}</span> / {displayProperties.length}
                  </div>
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className={`p-2 md:p-3 rounded-full transition-all duration-300 ${isAutoPlay ? "bg-gradient-to-r from-primary to-cyan-500 text-white" : "bg-muted/50 text-foreground border border-border/50 hover:border-primary/30"}`}
                    aria-label={isAutoPlay ? "Pausar autoplay" : "Retomar autoplay"}
                  >
                    <Zap className="w-4 h-4 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* VER TODOS */}
            <div className="text-center mt-10 md:mt-12 pt-6 md:pt-8 border-t border-border/30">
              <Link to="/imoveis">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-lg md:rounded-xl gap-2 px-4 md:px-8 py-2.5 md:py-3 border-border/50 hover:border-primary/30 hover:bg-muted/50 text-xs sm:text-sm md:text-base w-full md:w-auto"
                >
                  Ver todos os {properties.length} empreendimentos <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
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
