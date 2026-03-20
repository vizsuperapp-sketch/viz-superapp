import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DifferentiationSection from "@/components/DifferentiationSection";
import FinalCTASection from "@/components/FinalCTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <DifferentiationSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
