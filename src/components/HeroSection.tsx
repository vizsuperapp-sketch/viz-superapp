import { ArrowRight, Home, Shield, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const handleComecar = () => {
    alert("🚀 Versão Demo: Em breve poderá criar a sua conta. Deixe o seu email para prioridade!");
  };

  const handleVender = () => {
    alert("🏠 Demo de Venda: Simule já o seu imóvel sem comissão!");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Zero comissão • 100% transparente</span>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent">
            SuperApp da casa
          </h1>

          {/* Subtítulo */}
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Comprar ou vender, <span className="text-primary">sem comissões</span>.
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            A VIZ liga comprador e vendedor diretamente, com tecnologia, transparência e zero comissão.
          </p>

          {/* Destaque */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 max-w-2xl mx-auto mb-10">
            <p className="text-gray-700 font-medium">
              🏢 Não somos uma imobiliária. Somos a nova infraestrutura da transação imobiliária.
            </p>
          </div>

          {/* Cards de benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-semibold">Dados verificados</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-semibold">Processo seguro</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <Home className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-semibold">Apoio em cada passo</p>
            </div>
          </div>

          {/* Botões CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleComecar}
              className="group bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              Começar agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={handleVender}
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 flex items-center justify-center gap-2"
            >
              Quero vender
              <Home className="w-5 h-5" />
            </button>
          </div>

          {/* Texto adicional */}
          <p className="text-sm text-gray-500 mt-8">Sem custos escondidos • Dados protegidos • Apoio humano incluído</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
