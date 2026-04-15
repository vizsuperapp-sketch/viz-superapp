import HeroSection from "@/components/HeroSection";
import NotAgencySection from "@/components/NotAgencySection";
import ComparisonSection from "@/components/ComparisonSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ManifestoSection from "@/components/ManifestoSection";
import BenefitsSection from "@/components/BenefitsSection";
import EcosystemSection from "@/components/EcosystemSection";
import FeaturedPropertiesSection from "@/components/FeaturedPropertiesSection";
import FinalCTASection from "@/components/FinalCTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedPropertiesSection />
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
