import HeroSection from "@/components/HeroSection";
import ComparisonSection from "@/components/ComparisonSection";
import ComparisonTableSection from "@/components/ComparisonTableSection";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DifferentiationSection from "@/components/DifferentiationSection";
import FinalCTASection from "@/components/FinalCTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ComparisonSection />
      <ComparisonTableSection />
      <ProblemSection />
      <BenefitsSection />
      <HowItWorksSection />
      <DifferentiationSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
