-- Run this in the Supabase SQL Editor to create the tables.

-- 1. Candidates Table (Opt-In Talent Pool)
CREATE TABLE public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    job_title TEXT,
    resume_data JSONB NOT NULL,
    template_id TEXT NOT NULL,
    opted_in_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
-- Allow anonymous inserts (so users can opt in)
CREATE POLICY "Allow public inserts to candidates" ON public.candidates FOR INSERT WITH CHECK (true);
-- Only authenticated admins can view
CREATE POLICY "Allow authenticated read candidates" ON public.candidates FOR SELECT USING (auth.role() = 'authenticated');

-- 2. Analytics Events Table
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    session_id TEXT NOT NULL,
    template_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts to analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read analytics" ON public.analytics_events FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Site Configuration
CREATE TABLE public.site_config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
-- Anyone can read the site config (for the frontend to consume)
CREATE POLICY "Allow public read site_config" ON public.site_config FOR SELECT USING (true);
-- Only admins can update
CREATE POLICY "Allow authenticated update site_config" ON public.site_config FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert site_config" ON public.site_config FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default site config
INSERT INTO public.site_config (key, value) VALUES (
    'global_announcement', 
    '{"enabled": false, "message": "Welcome to FreeCV! Build your premium resume for free."}'::jsonb
);
