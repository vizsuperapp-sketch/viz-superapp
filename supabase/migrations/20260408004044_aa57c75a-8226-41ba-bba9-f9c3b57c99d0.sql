
-- Create client_documents table (append-only, no DELETE)
CREATE TABLE public.client_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  bucket TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  document_type TEXT NOT NULL DEFAULT 'outro',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;

-- Users can view their own documents
CREATE POLICY "Users can view own client_documents"
  ON public.client_documents FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own documents
CREATE POLICY "Users can insert own client_documents"
  ON public.client_documents FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all documents
CREATE POLICY "Admins can view all client_documents"
  ON public.client_documents FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Remove user DELETE policies from storage buckets
DROP POLICY "Users can delete own documents" ON storage.objects;
DROP POLICY "Users can delete own property files" ON storage.objects;

-- Add admin-only DELETE policies for storage buckets
CREATE POLICY "Admins can delete documents"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete property files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'property-files' AND public.has_role(auth.uid(), 'admin'));
