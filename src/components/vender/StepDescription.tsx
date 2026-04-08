import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PropertyData {
  typology: string;
  location: string;
  area: string;
  condition: string;
  extras: string;
}

interface StepDescriptionProps {
  propertyId: string;
  onNext: (data: { propertyData: PropertyData; description: string }) => void;
  onBack: () => void;
}

const StepDescription = ({ propertyId, onNext, onBack }: StepDescriptionProps) => {
  const { toast } = useToast();
  const [propertyData, setPropertyData] = useState<PropertyData>({
    typology: "",
    location: "",
    area: "",
    condition: "",
    extras: "",
  });
  const [description, setDescription] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleChange = (field: keyof PropertyData, value: string) => {
    setPropertyData((prev) => ({ ...prev, [field]: value }));
  };

  const generateDescription = async () => {
    if (!propertyData.typology && !propertyData.location) {
      toast({ title: "Preenche pelo menos a tipologia e localização", variant: "destructive" });
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-description", {
        body: propertyData,
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "Erro", description: data.error, variant: "destructive" });
        return;
      }

      setDescription(data.description || "");
      toast({ title: "Descrição gerada com sucesso!" });
    } catch (e) {
      console.error(e);
      toast({ title: "Erro ao gerar descrição", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const canProceed = propertyData.typology && propertyData.location && description;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Descrição do Imóvel</h2>
        <p className="text-muted-foreground">Preenche os dados e gera uma descrição profissional com IA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipologia *</Label>
          <Input
            placeholder="Ex: T3, Moradia, Loja"
            value={propertyData.typology}
            onChange={(e) => handleChange("typology", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Localização *</Label>
          <Input
            placeholder="Ex: Lisboa, Cascais"
            value={propertyData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Área (m²)</Label>
          <Input
            type="number"
            placeholder="Ex: 120"
            value={propertyData.area}
            onChange={(e) => handleChange("area", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Estado</Label>
          <Input
            placeholder="Ex: Renovado, Novo, Para remodelar"
            value={propertyData.condition}
            onChange={(e) => handleChange("condition", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Extras / Características</Label>
        <Input
          placeholder="Ex: Garagem, piscina, vista mar, varanda"
          value={propertyData.extras}
          onChange={(e) => handleChange("extras", e.target.value)}
        />
      </div>

      <Button
        onClick={generateDescription}
        disabled={generating}
        variant="outline"
        className="w-full border-primary/30 hover:border-primary/50"
      >
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            A gerar descrição...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Gerar descrição com IA
          </>
        )}
      </Button>

      {description && (
        <div className="space-y-2">
          <Label>Descrição gerada (podes editar)</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            className="resize-y"
          />
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button
          variant="hero"
          size="lg"
          disabled={!canProceed}
          onClick={() => onNext({ propertyData, description })}
        >
          Próximo passo
        </Button>
      </div>
    </div>
  );
};

export default StepDescription;
