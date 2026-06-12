import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, Loader2, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadWithProgress } from "@/lib/uploadWithProgress";
import { useToast } from "@/hooks/use-toast";

interface PhotoItem {
  id: string;
  file: File;
  preview: string;
  enhancedPreview?: string;
  enhancing: boolean;
  uploaded: boolean;
  storagePath?: string;
}

interface StepPhotosProps {
  propertyId: string;
  userId: string;
  onFinish: () => void;
  onBack: () => void;
}

const StepPhotos = ({ propertyId, userId, onFinish, onBack }: StepPhotosProps) => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesSelect = (files: FileList) => {
    const newPhotos: PhotoItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      enhancing: false,
      uploaded: false,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const enhancePhoto = async (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (!photo) return;

    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enhancing: true } : p))
    );

    try {
      const base64 = await fileToBase64(photo.file);
      const { data, error } = await supabase.functions.invoke("enhance-photo", {
        body: { imageBase64: base64 },
      });

      if (error) throw error;
      if (data?.error) {
        toast({ title: "Erro", description: data.error, variant: "destructive" });
        setPhotos((prev) =>
          prev.map((p) => (p.id === id ? { ...p, enhancing: false } : p))
        );
        return;
      }

      setPhotos((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, enhancing: false, enhancedPreview: data.enhancedImage }
            : p
        )
      );
      toast({ title: "Foto melhorada com sucesso!" });
    } catch (e) {
      console.error(e);
      toast({ title: "Erro ao melhorar foto", variant: "destructive" });
      setPhotos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, enhancing: false } : p))
      );
    }
  };

  const handleFinish = async () => {
    // Verify session before upload
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: "Sessão expirada", description: "Faça login novamente.", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      for (const photo of photos) {
        const ext = photo.file.name.split(".").pop();
        const filePath = `${userId}/${propertyId}/photos/${photo.id}.${ext}`;

        // Upload original or enhanced
        let fileToUpload: Blob = photo.file;
        if (photo.enhancedPreview) {
          const res = await fetch(photo.enhancedPreview);
          fileToUpload = await res.blob();
        }

        const { error } = await supabase.storage
          .from("property-files")
          .upload(filePath, fileToUpload, { upsert: true });

        if (error) {
          toast({ title: `Erro ao carregar ${photo.file.name}`, description: error.message, variant: "destructive" });
          continue;
        }
      }

      toast({ title: "Fotos carregadas com sucesso!" });
      onFinish();
    } catch (e) {
      console.error(e);
      toast({ title: "Erro ao carregar fotos", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Fotos do Imóvel</h2>
        <p className="text-muted-foreground">Adicione fotos e melhore-as automaticamente com IA.</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFilesSelect(e.target.files);
          e.target.value = "";
        }}
      />

      <Button
        variant="outline"
        className="w-full h-24 border-dashed border-2 border-border hover:border-primary/40"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-6 w-6 text-muted-foreground" />
          <span className="text-muted-foreground">Clica para adicionar fotos</span>
        </div>
      </Button>

      {photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative rounded-xl border border-border bg-card overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={photo.enhancedPreview || photo.preview}
                  alt="Foto do imóvel"
                  className="w-full h-full object-cover"
                />
                {photo.enhancedPreview && (
                  <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md">
                    IA Melhorada
                  </span>
                )}
              </div>
              <div className="p-3 flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground truncate">{photo.file.name}</p>
                <div className="flex gap-1 shrink-0">
                  {!photo.enhancedPreview && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={photo.enhancing}
                      onClick={() => enhancePhoto(photo.id)}
                    >
                      {photo.enhancing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => removePhoto(photo.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button
          variant="hero"
          size="lg"
          disabled={photos.length === 0 || uploading}
          onClick={handleFinish}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              A submeter...
            </>
          ) : (
            "Concluir publicação"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepPhotos;
