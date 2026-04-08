
-- Create property status enum
CREATE TYPE public.property_status AS ENUM ('draft', 'pending', 'active');

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT,
  typology TEXT,
  location TEXT,
  area NUMERIC,
  condition TEXT,
  extras TEXT,
  description TEXT,
  ai_description TEXT,
  status property_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Users can view their own properties
CREATE POLICY "Users can view own properties"
  ON public.properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own properties
CREATE POLICY "Users can insert own properties"
  ON public.properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own properties
CREATE POLICY "Users can update own properties"
  ON public.properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all properties
CREATE POLICY "Admins can view all properties"
  ON public.properties FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for property files
INSERT INTO storage.buckets (id, name, public) VALUES ('property-files', 'property-files', false);

-- Storage RLS: users can upload to their own folder
CREATE POLICY "Users can upload property files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Storage RLS: users can view their own files
CREATE POLICY "Users can view own property files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'property-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Storage RLS: users can delete their own files
CREATE POLICY "Users can delete own property files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'property-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Storage RLS: admins can view all property files
CREATE POLICY "Admins can view all property files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'property-files' AND public.has_role(auth.uid(), 'admin'));
