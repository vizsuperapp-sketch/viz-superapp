import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { properties } from "@/data/properties";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import LeadFormModal from "@/components/LeadFormModal";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Home,
  Calendar,
  Star,
  Phone,
} from "lucide-react";

const ImovelDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const [leadOpen, setLeadOpen] = useState(false);
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Empreendimento não encontrado
          </h1>
          <Link to="/imoveis">
            <Button variant="outline">Voltar aos empreendimentos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasGarage = property.fractions.some((f) => f.garage);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/imoveis">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">
            {property.name}
          </h1>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="container mx-auto px-4 py-6">
        <Carousel className="w-full">
          <CarouselContent>
            {property.images.map((img, i) => (
              <CarouselItem key={i}>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                  <img
                    src={img}
                    alt={`${property.name} - Imagem ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>

      {/* Info + Description */}
      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & meta */}
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {property.name}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>
                  {property.location} · {property.region}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <Badge variant="secondary" className="gap-1.5">
                  <Home className="h-3 w-3" />
                  {property.typology}
                </Badge>
                <Badge variant="secondary" className="gap-1.5">
                  <Ruler className="h-3 w-3" />
                  {property.areaRange}
                </Badge>
                {property.completion && (
                  <Badge variant="secondary" className="gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {property.completion}
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Descrição do Empreendimento
              </h3>
              {property.description.split("\n\n").map((p, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Highlights */}
            {property.highlights && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Destaques
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Star className="h-4 w-4 text-primary shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fractions table */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Frações Disponíveis
              </h3>
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Fração</TableHead>
                      <TableHead>Tipologia</TableHead>
                      <TableHead>Área</TableHead>
                      <TableHead>Preço</TableHead>
                      {hasGarage && <TableHead>Garagem</TableHead>}
                      <TableHead>Ref.</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {property.fractions.map((f, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {f.fraction}
                        </TableCell>
                        <TableCell>{f.typology}</TableCell>
                        <TableCell>{f.area}</TableCell>
                        <TableCell className="font-semibold">
                          {f.price}
                        </TableCell>
                        {hasGarage && (
                          <TableCell>{f.garage || "—"}</TableCell>
                        )}
                        <TableCell className="text-muted-foreground text-xs">
                          {f.reference}
                        </TableCell>
                        <TableCell>
                          {f.status === "sold" ? (
                            <Badge variant="destructive" className="text-xs">
                              Vendido
                            </Badge>
                          ) : f.status === "reserved" ? (
                            <Badge
                              variant="outline"
                              className="text-xs border-yellow-500/50 text-yellow-500"
                            >
                              Reservado
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-xs border-primary/50 text-primary"
                            >
                              Disponível
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-8 rounded-2xl border border-border/50 bg-card p-6 space-y-4">
              <p className="text-2xl font-bold text-primary">
                {property.priceRange}
              </p>
              <p className="text-sm text-muted-foreground">
                {property.fractions.filter((f) => f.status === "available")
                  .length}{" "}
                frações disponíveis
              </p>
              <Button
                variant="hero"
                size="lg"
                className="w-full rounded-xl"
                onClick={() => setLeadOpen(true)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contacte-nos
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LeadFormModal open={leadOpen} onOpenChange={setLeadOpen} />
    </div>
  );
};

export default ImovelDetalhe;
