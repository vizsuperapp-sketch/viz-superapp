REVOKE EXECUTE ON FUNCTION public.has_role FROM public;
GRANT EXECUTE ON FUNCTION public.has_role TO authenticated, service_role;

CREATE POLICY "Users can delete own files from property-files"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'property-files' AND (storage.foldername(name))[1] = auth.uid()::text);