import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import StepDocuments from "@/components/vender/StepDocuments";
import StepDescription from "@/components/vender/StepDescription";
import StepPhotos from "@/components/vender/StepPhotos";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const STEPS = ["Documentos", "Descrição", "Fotos"];

const Vender = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [createError, setCreateError] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && !propertyId && !createError) {
      createDraftProperty();
    }
  }, [user]);

  const createDraftProperty = async () => {
    if (!user) return;
    setCreateError(false);

    const newId = crypto.randomUUID();
    const { error } = await supabase
      .from("properties")
      .insert({ id: newId, user_id: user.id, status: "draft" as any });

    if (error) {
      console.error("Error creating draft property:", error);
      setCreateError(true);
      toast({ title: "Erro ao iniciar processo", description: error.message, variant: "destructive" });
      return;
    }
    setPropertyId(newId);
  };

  const handleDescriptionNext = async (data: {
    propertyData: { typology: string; location: string; area: string; condition: string; extras: string };
    description: string;
  }) => {
    if (!propertyId) return;

    const { error } = await supabase
      .from("properties")
      .update({
        typology: data.propertyData.typology,
        location: data.propertyData.location,
        area: data.propertyData.area ? Number(data.propertyData.area) : null,
        condition: data.propertyData.condition,
        extras: data.propertyData.extras,
        ai_description: data.description,
        description: data.description,
      } as any)
      .eq("id", propertyId);

    if (error) {
      toast({ title: "Erro ao guardar dados", variant: "destructive" });
      return;
    }
    setCurrentStep(2);
  };

  const handleFinish = async () => {
    if (!propertyId) return;

    await supabase
      .from("properties")
      .update({ status: "pending" as any })
      .eq("id", propertyId);

    toast({ title: "Imóvel submetido com sucesso!", description: "A sua publicação será revista em breve." });
    navigate("/sucesso");
  };

  if (loading || (!user)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">A carregar...</div>
      </div>
    );
  }

  if (createError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">Erro ao iniciar o processo de venda.</p>
          <Button variant="outline" onClick={createDraftProperty}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  if (!propertyId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                  i <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm hidden sm:inline ${
                  i <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 h-0.5 ${
                    i < currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        {currentStep === 0 && (
          <StepDocuments
            propertyId={propertyId}
            userId={user.id}
            onNext={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 1 && (
          <StepDescription
            propertyId={propertyId}
            onNext={handleDescriptionNext}
            onBack={() => setCurrentStep(0)}
          />
        )}
        {currentStep === 2 && (
          <StepPhotos
            propertyId={propertyId}
            userId={user.id}
            onFinish={handleFinish}
            onBack={() => setCurrentStep(1)}
          />
        )}
      </div>
    </div>
  );
};

export default Vender;
