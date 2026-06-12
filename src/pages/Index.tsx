import HeroSection from "@/components/HeroSection";
import EcosystemServicesSection from "@/components/EcosystemServicesSection";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import NotAgencySection from "@/components/NotAgencySection";
import ComparisonSection from "@/components/ComparisonSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ManifestoSection from "@/components/ManifestoSection";
import BenefitsSection from "@/components/BenefitsSection";
import EcosystemSection from "@/components/EcosystemSection";
import FinalCTASection from "@/components/FinalCTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Primeira coisa que vê */}
      <HeroSection />

      {/* Imóveis em Destaque - COM VÍDEO 360° DO VistaBella */}
      <FeaturedPropertiesSection />

      {/* Resto das seções */}
      <NotAgencySection />
      <ComparisonSection />
      <HowItWorksSection />
      <ManifestoSection />
      <BenefitsSection />
      <EcosystemSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
