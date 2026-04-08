
-- Chat sessions table (stores pre-chat lead info)
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can create a session (anonymous visitors)
CREATE POLICY "Anyone can insert chat_sessions" ON public.chat_sessions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admins can view all sessions
CREATE POLICY "Admins can view chat_sessions" ON public.chat_sessions
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert messages (anonymous visitors via edge function)
CREATE POLICY "Anyone can insert chat_messages" ON public.chat_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Admins can view all messages
CREATE POLICY "Admins can view chat_messages" ON public.chat_messages
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
