import { HeroSection } from "@/components/HeroSection";
import { FeaturedPropertiesSection } from "@/components/FeaturedPropertiesSection";
import { ChatWidget } from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#06080F]">
      {/* Tentativa de carregar a HeroSection */}
      <HeroSection />

      {/* Secção de Imóveis no topo */}
      <FeaturedPropertiesSection />

      {/* Chat flutuante */}
      <ChatWidget />
    </div>
  );
};

export default Index;
