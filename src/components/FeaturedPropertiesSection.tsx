import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Zap, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const FeaturedPropertiesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showVideo, setShowVideo] = useState(false); // ✅ COMEÇA FECHADO
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
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-12 md:py-24 bg-gradient-to-b from-background via-background to-background/80 overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
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

        {displayProperties.length > 0 && activeProperty && (
          <div className="w-full max-w-6xl mx-auto">
            {/* ============================================ */}
            {/* VÍDEO 360° - VISTABELLA (APENAS SE ABRIR) */}
            {/* ============================================ */}
            {isVistaBella && showVideo && (
              <div className="mb-6 md:mb-8 w-full">
                <div
                  className="relative w-full rounded-xl md:rounded-2xl overflow-hidden border border-primary/50 shadow-lg"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-1.5 md:p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all"
                    aria-label="Fechar vídeo"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Go_zTwaMz1I?autoplay=1&fs=1&modestbranding=1"
                    title="Tour VistaBella Oeiras"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* INFORMAÇÕES DO IMÓVEL */}
            {/* ============================================ */}
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              {/* BADGES E TÍTULO */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary/20 text-primary border-primary/30 px-2.5 py-1 text-xs md:text-sm">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    {activeProperty.region}
                  </Badge>
                  {activeProperty.badge && (
                    <Badge className="bg-gradient-to-r from-primary to-cyan-500 text-white border-none px-2.5 py-1 text-xs md:text-sm">
                      ⭐ {activeProperty.badge}
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground leading-tight">
                    {activeProperty.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1">
                    {activeProperty.typology}
                  </p>
                </div>
              </div>

              {/* CARDS COM INFORMAÇÕES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-2.5 md:p-4">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Preço</p>
                  <p className="text-sm md:text-2xl font-bold text-emerald-400 break-words">
                    {activeProperty.priceRange}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-2.5 md:p-4">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Área</p>
                  <p className="text-sm md:text-2xl font-bold text-blue-400 break-words">{activeProperty.areaRange}</p>
                </div>

                {activeProperty.completion && (
                  <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-2.5 md:p-4">
                    <p className="text-xs text-muted-foreground mb-1 font-medium">Conclusão</p>
                    <p className="text-xs md:text-base font-bold text-primary break-words">
                      {activeProperty.completion}
                    </p>
                  </div>
                )}

                <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 rounded-lg p-2.5 md:p-4">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Imagens</p>
                  <p className="text-sm md:text-2xl font-bold text-cyan-400">{activeProperty.images.length}</p>
                </div>
              </div>

              {/* BOTÕES */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <Link to={`/imoveis/${activeProperty.slug}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white rounded-lg gap-2 h-10 md:h-12 text-xs md:text-base font-semibold">
                    Ver Detalhes <ArrowRight className="h-3.5 w-3.5 md:h-5 md:w-5" />
                  </Button>
                </Link>

                {isVistaBella && (
                  <Button
                    onClick={() => setShowVideo(!showVideo)}
                    variant="outline"
                    className="flex-1 rounded-lg h-10 md:h-12 text-xs md:text-base font-semibold"
                  >
                    {showVideo ? "🎬 Fechar" : "🎥 Abrir Vídeo"}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {activeProperty.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <span className="text-primary font-bold mt-0.5 flex-shrink-0 text-sm">✓</span>
                      <span className="text-xs md:text-sm text-muted-foreground">{highlight}</span>
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
              <div className="bg-muted/20 border border-border/50 rounded-lg md:rounded-xl p-3 md:p-6 space-y-3 md:space-y-4">
                {activeProperty.description.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* ============================================ */}
            {/* GALERIA DE IMAGENS - VISTABELLA */}
            {/* ============================================ */}
            {isVistaBella && activeProperty.images && activeProperty.images.length > 0 && !showVideo && (
              <div className="mb-8 md:mb-12 w-full">
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">🖼️ Galeria</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                  {activeProperty.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-24 sm:h-32 md:h-48 rounded-lg overflow-hidden group border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      <img
                        src={img}
                        alt={`${activeProperty.name} - ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/* CAROUSEL - OUTROS IMÓVEIS */}
            {/* ============================================ */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border/30 space-y-4 md:space-y-6">
              <h4 className="text-base md:text-lg font-semibold text-foreground">Outros Empreendimentos</h4>

              {/* GRID DE IMÓVEIS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                {displayProperties.map((prop, idx) => {
                  const imgSrc = prop.images && prop.images.length > 0 ? prop.images[0] : prop.coverImage;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setIsAutoPlay(false);
                        setActiveIndex(idx);
                        setShowVideo(false);
                      }}
                      className={`cursor-pointer relative h-24 sm:h-32 md:h-48 rounded-lg overflow-hidden group border-2 transition-all ${
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

                      <div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-2">
                        <h5 className="text-xs md:text-sm font-bold text-white truncate">{prop.name}</h5>
                        <p className="text-xs text-white/70 truncate">{prop.priceRange}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CONTROLES */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 order-1 md:order-1">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-muted/50 hover:bg-muted border border-border/50 text-foreground transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>

                <div className="flex gap-1.5 md:gap-2 justify-center order-3 md:order-2">
                  {displayProperties.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-6 md:w-8 bg-gradient-to-r from-primary to-cyan-500" : "w-2 bg-muted/50 hover:bg-muted"}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 md:gap-3 justify-between md:justify-end order-2 md:order-3">
                  <div className="text-xs md:text-sm font-medium text-muted-foreground">
                    <span className="text-primary font-bold">{activeIndex + 1}</span>/{displayProperties.length}
                  </div>
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className={`p-2 rounded-full transition-all ${isAutoPlay ? "bg-gradient-to-r from-primary to-cyan-500 text-white" : "bg-muted/50 text-foreground border border-border/50"}`}
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* VER TODOS */}
            <div className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border/30">
              <Link to="/imoveis">
                <Button
                  variant="outline"
                  className="rounded-lg md:rounded-xl gap-2 px-4 md:px-8 py-2 md:py-3 border-border/50 hover:border-primary/30 hover:bg-muted/50 text-xs md:text-base w-full md:w-auto"
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
