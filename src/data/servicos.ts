import { FileBadge, Camera, FileText, Landmark, Building2, Wrench, type LucideIcon } from "lucide-react";

export type ServicoCategoria = "vender" | "comprar" | "arrendar" | "manutencao";

export interface Servico {
  id: string;
  nome: string;
  categoria: ServicoCategoria;
  icon: LucideIcon;
  precoLabel: string;
  precoMercadoLabel: string;
  poupancaLabel: string;
  descricao: string;
  beneficios: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const CATEGORIAS: { id: ServicoCategoria | "tudo"; label: string }[] = [
  { id: "tudo", label: "Tudo" },
  { id: "vender", label: "Vender" },
  { id: "comprar", label: "Comprar" },
  { id: "arrendar", label: "Arrendar" },
  { id: "manutencao", label: "Manutenção" },
];

export const SERVICOS: Servico[] = [
  {
    id: "cee",
    nome: "Certificado Energético",
    categoria: "vender",
    icon: FileBadge,
    precoLabel: "desde €200*",
    precoMercadoLabel: "€400",
    poupancaLabel: "Poupa até €200*",
    descricao: "Perito certificado em sua casa. Certificado emitido em 48h.",
    beneficios: [
      "Perito ADENE acreditado",
      "Visita agendada em 48h",
      "Documento oficial emitido digitalmente",
      "Acompanhamento até registo",
    ],
    ctaLabel: "Encomendar",
    ctaHref: "/servicos/cee",
  },
  {
    id: "fotos360",
    nome: "Fotos 360° + Drone",
    categoria: "vender",
    icon: Camera,
    precoLabel: "desde €120*",
    precoMercadoLabel: "€500",
    poupancaLabel: "Poupa até €380*",
    descricao: "Tour virtual imersivo, fotos profissionais e drone exterior.",
    beneficios: [
      "Tour 360° navegável",
      "Drone exterior (autorização incl.)",
      "Edição profissional",
      "Publicação automática em 10+ portais",
    ],
    ctaLabel: "Publicar agora",
    ctaHref: "/servicos/fotos360",
  },
  {
    id: "documentos",
    nome: "Documentos Legais",
    categoria: "vender",
    icon: FileText,
    precoLabel: "desde €80*",
    precoMercadoLabel: "€300+ advogado",
    poupancaLabel: "Poupa até €220*",
    descricao: "CPCV, escritura e contratos gerados automaticamente e revistos.",
    beneficios: [
      "Modelos validados juridicamente",
      "Geração automática com os seus dados",
      "Histórico digital permanente",
      "Suporte legal por chat",
    ],
    ctaLabel: "Gerar documentos",
    ctaHref: "/servicos/documentos",
  },
  {
    id: "hipoteca",
    nome: "Financiamento à Compra",
    categoria: "comprar",
    icon: Landmark,
    precoLabel: "taxa -1,5%*",
    precoMercadoLabel: "taxa base banco",
    poupancaLabel: "Poupa milhares ao longo do crédito",
    descricao: "Simulador grátis e taxas exclusivas com bancos parceiros.",
    beneficios: [
      "Simulador online imediato",
      "Comparação entre 6 bancos",
      "Spread parceiro -1,5%* vs balcão",
      "Consultoria opcional (€50)",
    ],
    ctaLabel: "Simular agora",
    ctaHref: "/servicos/hipoteca",
  },
  {
    id: "gestao-renda",
    nome: "Gestão de Arrendamento",
    categoria: "arrendar",
    icon: Building2,
    precoLabel: "desde €30/mês*",
    precoMercadoLabel: "5–8% da renda",
    poupancaLabel: "Até 70%* mais barato",
    descricao: "Avaliação do inquilino, cobrança e seguro de incumprimento.",
    beneficios: [
      "Score automático do inquilino",
      "Cobrança e recibos automáticos",
      "Seguro incumprimento opcional (2%*)",
      "Dashboard de receitas",
    ],
    ctaLabel: "Gerir arrendamento",
    ctaHref: "/servicos/gestao-renda",
  },
  {
    id: "manutencao",
    nome: "Manutenção & Reparação",
    categoria: "manutencao",
    icon: Wrench,
    precoLabel: "até -30%* vs mercado",
    precoMercadoLabel: "preço retalho",
    poupancaLabel: "Poupa até 30%*",
    descricao: "Rede de profissionais pré-aprovados com orçamento comparado.",
    beneficios: [
      "Profissionais verificados",
      "3 orçamentos automáticos",
      "Garantia VIZ no serviço",
      "Pagamento seguro pela plataforma",
    ],
    ctaLabel: "Solicitar serviço",
    ctaHref: "/servicos/manutencao",
  },
];
