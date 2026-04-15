import { HeroSection } from "@/components/HeroSection";
import { FeaturedPropertiesSection } from "@/components/FeaturedPropertiesSection";
import { ChatWidget } from "@/components/ChatWidget";
// ... outros imports que já tenhas

const Index = () => {
  return (
    <main className="min-h-screen bg-[#06080F]">
      <HeroSection />
      {/* Coloquei aqui logo após o topo para dar o destaque que pediste */}
      <FeaturedPropertiesSection />

      {/* As outras secções vêm depois */}
      <ChatWidget />
    </main>
  );
};

export default Index;
