import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;

/**
 * Upload um ficheiro para Supabase Storage com progresso real via XHR.
 * O cliente JS de Storage não emite progresso — por isso vamos directos à REST API.
 */
export async function uploadWithProgress(
  bucket: string,
  path: string,
  file: File,
  onProgress: (pct: number) => void,
): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Sessão expirada. Faz login novamente.");

  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${encodeURI(path)}`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", `Bearer ${session.access_token}`);
    xhr.setRequestHeader("x-upsert", "false");
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) {
        onProgress(Math.round((evt.loaded / evt.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        let msg = `Upload falhou (${xhr.status})`;
        try {
          const body = JSON.parse(xhr.responseText);
          if (body?.message) msg = body.message;
        } catch {
          /* ignore */
        }
        reject(new Error(msg));
      }
    };

    xhr.onerror = () => reject(new Error("Erro de rede durante o upload."));
    xhr.ontimeout = () => reject(new Error("O upload demorou demasiado."));
    xhr.send(file);
  });
}
