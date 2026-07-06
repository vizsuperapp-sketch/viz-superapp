import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import VizHero from "@/components/viz/VizHero";
import VizStatsBar from "@/components/viz/VizStatsBar";
import VizProblemSection from "@/components/viz/VizProblemSection";
import VizSolutionSection from "@/components/viz/VizSolutionSection";
import VizHowItWorks from "@/components/viz/VizHowItWorks";
import VizServicesGrid from "@/components/viz/VizServicesGrid";
import VizRoadmap from "@/components/viz/VizRoadmap";
import VizWaitlistForm from "@/components/viz/VizWaitlistForm";
import VizFooter from "@/components/viz/VizFooter";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      requestAnimationFrame(() => {
        document
          .getElementById(state.scrollTo!)
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.state]);

  return (
    <main className="min-h-screen">
      <VizHero />
      <VizStatsBar />
      <VizProblemSection />
      <VizSolutionSection />
      <VizHowItWorks />
      <VizServicesGrid />
      <div id="roadmap" className="scroll-mt-20">
        <VizRoadmap />
      </div>
      <VizWaitlistForm />
      <VizFooter />
    </main>
  );
};

export default Index;
