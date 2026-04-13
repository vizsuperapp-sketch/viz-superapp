-- Fix: restrict documents DELETE policy to authenticated users only
DROP POLICY IF EXISTS "Users can delete own documents" ON storage.objects;
CREATE POLICY "Users can delete own documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Fix: add UPDATE policy for property-files bucket
CREATE POLICY "Users can update own property files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'property-files' AND auth.uid()::text = (storage.foldername(name))[1]);