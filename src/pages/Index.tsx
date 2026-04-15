import { HeroSection } from "@/components/HeroSection";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <main className="min-h-screen bg-[#06080F]">
      <HeroSection />
      <FeaturedPropertiesSection />
      <ChatWidget />
    </main>
  );
};

export default Index;
