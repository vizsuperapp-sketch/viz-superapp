// Dentro do return do teu PropertyCard
<div className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-slate-100">
  {/* Badge de Destaque */}
  <div className="absolute top-4 left-4 z-10">
    <span className="bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
      Destaque
    </span>
  </div>

  {/* Imagem com Zoom no Hover */}
  <div className="aspect-[4/3] overflow-hidden">
    <img
      src={property.image}
      alt={property.title}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  </div>

  {/* Informações com Hierarquia */}
  <div className="p-5">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-cyan-600 transition-colors">
        {property.title}
      </h3>
      <p className="text-cyan-600 font-extrabold text-xl">{property.price}€</p>
    </div>

    <p className="text-slate-500 text-sm mb-4 flex items-center">
      <span className="mr-1">📍</span> {property.location}
    </p>

    {/* Detalhes Técnicos Estilizados */}
    <div className="flex border-t border-slate-50 pt-4 gap-4 text-slate-600 text-xs font-medium">
      <span className="flex items-center">🛏️ {property.beds} Quartos</span>
      <span className="flex items-center">🛁 {property.baths} Banhos</span>
      <span className="flex items-center">📐 {property.sqft}m²</span>
    </div>
  </div>
</div>;
