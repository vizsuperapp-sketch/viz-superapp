-- Add DELETE policy so users can remove their own documents from storage
CREATE POLICY "Users can delete own documents"
ON storage.objects
FOR DELETE
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);