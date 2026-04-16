export interface PropertyFraction {
  fraction: string;
  typology: string;
  area: string;
  price: string;
  garage?: string;
  reference: string;
  status?: "available" | "reserved" | "sold";
}

export interface Property {
  slug: string;
  name: string;
  location: string;
  region: string;
  typology: string;
  priceRange: string;
  areaRange: string;
  description: string;
  completion?: string;
  highlights?: string[];
  coverImage: string;
  images: string[];
  fractions: PropertyFraction[];
}

export const properties: Property[] = [
  {
    slug: "machado-santos",
    name: "Machado Santos",
    location: "Montijo",
    region: "Margem Sul",
    typology: "T0 – T2",
    priceRange: "285 000 € – 395 000 €",
    areaRange: "80,02 m² – 173,11 m²",
    completion: "1º Semestre 2027",
    description:
      "Machado Santos é um novo e empolgante empreendimento residencial localizado no coração do Montijo. Esta localização privilegiada oferece o equilíbrio perfeito entre a tranquilidade suburbana e o fácil acesso à vibrante vida urbana da capital, numa curta viagem de 25 minutos de ferry até o centro de Lisboa.\n\nO empreendimento conta com uma variedade de apartamentos modernos, desde unidades T0 penthouse até apartamentos T2 com pátios e jardins. Essas residências oferecem um excelente custo-benefício para aqueles que procuram viver no centro, aproveitando os benefícios de um estilo de vida mais tranquilo e acessível.",
    coverImage:
      "https://static.wixstatic.com/media/a9bb7d_aa24eb9118dd4ded8cb5103109d0e1f8~mv2.jpg/v1/fill/w_1905,h_782,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/img74.jpg",
    images: [
      "https://static.wixstatic.com/media/a9bb7d_aa24eb9118dd4ded8cb5103109d0e1f8~mv2.jpg/v1/fill/w_1905,h_782,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/img74.jpg",
      "https://static.wixstatic.com/media/a9bb7d_e7c3952e9bbb4c80a6a7855eb586efed~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_e7c3952e9bbb4c80a6a7855eb586efed~mv2.jpg",
      "https://static.wixstatic.com/media/a9bb7d_39d14fc50c6d4a46a51b5e5076d61dfd~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_39d14fc50c6d4a46a51b5e5076d61dfd~mv2.jpg",
      "https://static.wixstatic.com/media/a9bb7d_5a5d14da364b494db92967371ec765b2~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_5a5d14da364b494db92967371ec765b2~mv2.jpg",
      "https://static.wixstatic.com/media/a9bb7d_5a7c5366cc1d419ab56eeb2a487bcb93~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_5a7c5366cc1d419ab56eeb2a487bcb93~mv2.jpg",
      "https://static.wixstatic.com/media/a9bb7d_57c8957393af414a8efcdc600ac03528~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_57c8957393af414a8efcdc600ac03528~mv2.jpg",
    ],
    fractions: [
      {
        fraction: "RC Tardoz B",
        typology: "T2",
        area: "173,11 m²",
        price: "395 000 €",
        reference: "86063673",
        status: "available",
      },
      {
        fraction: "1º Frente C",
        typology: "T2",
        area: "80,02 m²",
        price: "285 000 €",
        reference: "86063685",
        status: "reserved",
      },
      {
        fraction: "1º Tardoz D",
        typology: "T2",
        area: "167,64 m²",
        price: "395 000 €",
        reference: "86063693",
        status: "available",
      },
      {
        fraction: "2º E",
        typology: "T0",
        area: "155,63 m²",
        price: "295 000 €",
        reference: "86063702",
        status: "available",
      },
      { fraction: "—", typology: "T1", area: "73,32 m²", price: "240 000 €", reference: "86063606", status: "sold" },
    ],
  },
  {
    slug: "horizon",
    name: "Horizon",
    location: "Lourinhã",
    region: "Lisboa",
    typology: "T3 – T4",
    priceRange: "1 450 000 € – 2 300 000 €",
    areaRange: "283,6 m² – 501,1 m²",
    highlights: [
      "15 moradias exclusivas",
      "Piscina privativa",
      "Totalmente mobiladas e decoradas",
      "Junto à Praia da Peralta",
    ],
    description:
      "Situado junto à Praia da Peralta, na Lourinhã, o HORIZON redefine o conceito de viver entre o mar e a sofisticação. Composto por apenas 15 moradias exclusivas (T3 e T4), o empreendimento destaca-se pela arquitetura contemporânea e janelas panorâmicas que trazem o Atlântico para dentro de casa.\n\nCada residência inclui elevador, jardim privativo, piscina e é entregue totalmente mobilada e decorada com acabamentos premium. A menos de uma hora de Lisboa, o HORIZON oferece o equilíbrio perfeito entre a tranquilidade da Região Oeste — famosa pela sua gastronomia e natureza preservada — e a conveniência da capital.",
    coverImage:
      "https://static.wixstatic.com/media/a9bb7d_60db3151f85d427fb897ea71a1adec88~mv2.jpg/v1/fill/w_1600,h_657,al_c,q_85,enc_avif,quality_auto/06.jpg",
    images: [
      "https://static.wixstatic.com/media/a9bb7d_60db3151f85d427fb897ea71a1adec88~mv2.jpg/v1/fill/w_1600,h_657,al_c,q_85,enc_avif,quality_auto/06.jpg",
      "https://static.wixstatic.com/media/a9bb7d_f06eca28a6e340cd82dcb7686d549410~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_f06eca28a6e340cd82dcb7686d549410~mv2.jpg",
      "https://static.wixstatic.com/media/a9bb7d_5e605e3d29434d2289069b43e0b83be0~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_5e605e3d29434d2289069b43e0b83be0~mv2.jpg",
      "https://static.wixstatic.com/media/a9bb7d_93159174bb5944d0bf14eb1c47ee5828~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_93159174bb5944d0bf14eb1c47ee5828~mv2.jpg",
      "https://static.wixstatic.com/media/a9bb7d_8b19922158634e68bf9c40244d8352c5~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_8b19922158634e68bf9c40244d8352c5~mv2.jpg",
      "https://static.wixstatic.com/media/a9bb7d_21fe884925134523b8e7bfb155ef9edc~mv2.jpg/v1/fit/w_1440,h_811,q_90,enc_avif,quality_auto/a9bb7d_21fe884925134523b8e7bfb155ef9edc~mv2.jpg",
    ],
    fractions: [
      {
        fraction: "Villa A",
        typology: "T4",
        area: "397,6 m²",
        price: "2 300 000 €",
        garage: "36,5 m²",
        reference: "86815141",
        status: "available",
      },
      {
        fraction: "Villa B",
        typology: "T4",
        area: "283,6 m²",
        price: "1 450 000 €",
        garage: "36,5 m²",
        reference: "86815156",
        status: "available",
      },
      {
        fraction: "Villa C",
        typology: "T3",
        area: "283,9 m²",
        price: "1 700 000 €",
        garage: "36,5 m²",
        reference: "86815165",
        status: "available",
      },
      {
        fraction: "Villa E",
        typology: "T3",
        area: "283,6 m²",
        price: "1 700 000 €",
        garage: "36,5 m²",
        reference: "86815169",
        status: "available",
      },
      {
        fraction: "Villa F",
        typology: "T4",
        area: "283,6 m²",
        price: "1 700 000 €",
        garage: "36,5 m²",
        reference: "86815172",
        status: "available",
      },
      {
        fraction: "Villa G",
        typology: "T4",
        area: "284,8 m²",
        price: "1 800 000 €",
        garage: "38,3 m²",
        reference: "86815220",
        status: "available",
      },
      {
        fraction: "Villa H",
        typology: "T4",
        area: "284,8 m²",
        price: "1 800 000 €",
        garage: "48,5 m²",
        reference: "86815225",
        status: "available",
      },
      {
        fraction: "Villa I",
        typology: "T3",
        area: "286,8 m²",
        price: "1 700 000 €",
        garage: "39,3 m²",
        reference: "86815232",
        status: "available",
      },
      {
        fraction: "Villa J",
        typology: "T3",
        area: "286,8 m²",
        price: "1 700 000 €",
        garage: "39,3 m²",
        reference: "86815252",
        status: "available",
      },
    ],
  },
  {
    slug: "vistabella-oeiras",
    name: "VistaBella Oeiras",
    location: "Oeiras",
    region: "Oeiras",
    typology: "T2",
    priceRange: "690 000 €",
    areaRange: "122 m²",
    completion: "Setembro 2027",
    highlights: [
      "T2 com 2 Suítes",
      "Varanda ampla com 26,87m²",
      "Jardim privativo com 9m²",
      "2 lugares de estacionamento",
      "Piscina exterior e SPA",
      "Ginásio e campo de padel",
      "Área gourmet",
    ],
    description:
      "Apresentamos este elegante apartamento T2 com duas suítes, inserido no moderno empreendimento VistaBella Oeiras, um projeto residencial pensado para proporcionar conforto, qualidade de vida e contacto com a natureza, numa das zonas mais valorizadas de Oeiras.\n\nCom 122 m² de área total, este apartamento destaca-se pela excelente distribuição de espaços, áreas generosas e zona exterior privativa, ideal para momentos de lazer e convívio.\n\n🌟 Características:\n• Tipologia T2 com 2 suítes\n• 122m² de área total\n• Varanda ampla com 26,87m²\n• Jardim privativo com 9m²\n• Sala e cozinha em conceito moderno\n• Arrecadação\n• 2 lugares de estacionamento\n\n🏊 Áreas Comuns do Condomínio:\n• Piscina exterior para adultos\n• Piscina infantil\n• Ginásio totalmente equipado\n• SPA\n• Área gourmet\n• Campo de padel\n• Parque infantil\n• Espaços verdes\n\n📍 Localização Privilegiada:\n• 3 minutos de Lagoas Park\n• 4 minutos de Hospital da Luz\n• 5 minutos de Parque dos Poetas\n• 10 minutos das praias de Oeiras\n• Próximo de escolas internacionais\n\n✅ Excelente opção para habitação própria ou investimento\n✅ Zona com forte valorização imobiliária\n✅ Construção com elevados padrões de eficiência energética",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9b274c3f592b?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9b274c3f592b?w=1440&h=811&fit=crop",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1440&h=811&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1440&h=811&fit=crop",
      "https://images.unsplash.com/photo-1540932239986-310128078ceb?w=1440&h=811&fit=crop",
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1440&h=811&fit=crop",
      "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1440&h=811&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1440&h=811&fit=crop",
      "https://images.unsplash.com/photo-1560126197-b8a5a6b7e9f5?w=1440&h=811&fit=crop",
      "https://images.unsplash.com/photo-1469022563149-aa64dbd37717?w=1440&h=811&fit=crop",
    ],
    fractions: [
      {
        fraction: "Apartamento T2",
        typology: "T2",
        area: "122 m²",
        price: "690 000 €",
        garage: "2 lugares",
        reference: "86818572",
        status: "available",
      },
    ],
  },
];
