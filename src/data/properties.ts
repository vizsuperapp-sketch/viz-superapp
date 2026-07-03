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
  badge?: string;
  video360?: string;
}

export const properties: Property[] = [
  {
    slug: "oeiras",
    name: "Oeiras",
    location: "Oeiras",
    region: "Oeiras",
    typology: "T2 com 2 Suítes",
    priceRange: "690 000 €",
    areaRange: "122 m²",
    completion: "Setembro 2027",
    badge: "NOVO",
    video360: "https://www.youtube.com/embed/Go_zTwaMz1I",
    highlights: [
      "Varanda ampla com 26,87m²",
      "Jardim privativo com 9m²",
      "2 lugares de estacionamento",
      "Piscina exterior e SPA",
      "Ginásio completo",
      "Campo de padel",
      "Área gourmet privada",
      "Parque infantil e pet place",
    ],
    description:
      "é um novo conceito de bairro planeado localizado na região central de Oeiras, um dos concelhos mais valorizados da Grande Lisboa.\n\n🌟 Um Bairro Completo:\nMais que uma morada, VistaBella oferece um estilo de vida premium com três empreendimentos residenciais (Panorama, Boulevard e Mirador) integrados num bairro com infraestruturas de excelência.\n\n📍 Localização Estratégica:\n• Junto ao Parque dos Poetas\n• Próximo do centro comercial Oeiras Parque\n• 10 minutos das praias da região\n• Acesso a escolas e hospitais de referência\n• Lagoas Park e Taguspark a curta distância\n• 15 minutos de Lisboa\n\n🏊 Clube Privado Condomínio:\n• Ginásio totalmente equipado\n• Spa completo (sauna, jacuzzi, relaxamento)\n• Piscina exterior para adultos\n• Piscina infantil\n• Área gourmet premium\n• Quadra de padel regulamentada\n\n🌳 Infraestruturas do Bairro:\n• Parque urbano arborizado\n• Parque infantil seguro\n• Ruas pavimentadas com betão poroso\n• Estacionamento para visitantes\n• Ecoponto subterrâneo\n• Painéis solares fotovoltaicos\n• Pet place (zona dedicada a animais de estimação)\n\n✅ Construção Sustentável:\n✅ Arquitetura contemporânea e moderna\n✅ Eficiência energética excepcional\n✅ Materiais premium em todo o empreendimento\n✅ Excelente isolamento térmico e acústico\n✅ Painéis solares integrados\n\n💡 Ideal Para:\n✓ Famílias que procuram qualidade de vida\n✓ Investimento imobiliário de alto potencial\n✓ Zona em constante desenvolvimento urbano\n✓ Mercado premium em Oeiras",
    coverImage: "https://www.vistabellaoeiras.com/images/intro.jpg",
    images: [
      "https://www.vistabellaoeiras.com/images/intro.jpg",
      "https://www.vistabellaoeiras.com/images/mapa-03empreendimentos.jpg",
      "https://www.vistabellaoeiras.com/images/gallery/panorama/pan-varanda-gourmet.jpg",
      "https://www.vistabellaoeiras.com/images/gallery/panorama/pan-suite-master.jpg",
      "https://www.vistabellaoeiras.com/images/gallery/panorama/pan-suite.jpg",
      "https://www.vistabellaoeiras.com/images/gallery/panorama/pan-varanda.jpg",
      "https://www.vistabellaoeiras.com/images/gallery/boulevard/bou-piscina.jpg",
      "https://www.vistabellaoeiras.com/images/gallery/boulevard/bou-suite-master.jpg",
      "https://www.vistabellaoeiras.com/images/gallery/mirador/mir-suite.jpg",
    ],
    fractions: [
      {
        fraction: "Apartamento T2 com 2 Suítes",
        typology: "T2",
        area: "122 m²",
        price: "690 000 €",
        garage: "2 lugares",
        reference: "86818572",
        status: "available",
      },
    ],
  },
  {
    slug: "MONTIJO",
    name: "MONTIJO",
    location: "Montijo",
    region: "Margem Sul",
    typology: "T0 – T2",
    priceRange: "285 000 € – 395 000 €",
    areaRange: "80,02 m² – 173,11 m²",
    completion: "1º Semestre 2027",
    description:
      "È um novo e empolgante empreendimento residencial localizado no coração do Montijo. Esta localização privilegiada oferece o equilíbrio perfeito entre a tranquilidade suburbana e o fácil acesso à vibrante vida urbana da capital, numa curta viagem de 25 minutos de ferry até o centro de Lisboa.\n\nO empreendimento conta com uma variedade de apartamentos modernos, desde unidades T0 penthouse até apartamentos T2 com pátios e jardins. Essas residências oferecem um excelente custo-benefício para aqueles que procuram viver no centro, aproveitando os benefícios de um estilo de vida mais tranquilo e acessível.",
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
    slug: "Lourinhã",
    name: "Lourinhã",
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
      "Situado junto à Praia da Peralta, na Lourinhã,   redefine o conceito de viver entre o mar e a sofisticação. Composto por apenas 15 moradias exclusivas (T3 e T4), o empreendimento destaca-se pela arquitetura contemporânea e janelas panorâmicas que trazem o Atlântico para dentro de casa.\n\nCada residência inclui elevador, jardim privativo, piscina e é entregue totalmente mobilada e decorada com acabamentos premium. A menos de uma hora de Lisboa, o HORIZON oferece o equilíbrio perfeito entre a tranquilidade da Região Oeste — famosa pela sua gastronomia e natureza preservada — e a conveniência da capital.",
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
];
