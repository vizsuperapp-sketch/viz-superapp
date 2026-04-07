DROP POLICY "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Service role can insert leads" ON public.leads FOR INSERT TO service_role WITH CHECK (true);