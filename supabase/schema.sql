-- ==============================================================================
-- FreeCV / Cvyon - Master Complete Production SQL Schema
-- ==============================================================================
-- Run this entire script in your Supabase SQL Editor.
-- It is designed to be idempotent (safe to run on fresh or existing databases).
-- ==============================================================================

-- 0. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ==============================================================================
-- 1. CORE & AUTHENTICATED USER RESUMES
-- ==============================================================================

-- User Resumes (Multi-Resume Support for Logged-In Users)
CREATE TABLE IF NOT EXISTS public.user_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Untitled Resume',
    resume_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_user_resumes_user_id ON public.user_resumes(user_id);

-- Public Resumes (Shareable Web Link Resumes)
CREATE TABLE IF NOT EXISTS public.public_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handle TEXT UNIQUE NOT NULL,
    data JSONB NOT NULL,
    views INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_public_resumes_handle ON public.public_resumes(handle);

-- RPC to increment public resume views atomically
CREATE OR REPLACE FUNCTION public.increment_resume_views(resume_handle TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.public_resumes
  SET views = views + 1
  WHERE handle = resume_handle;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 2. CANDIDATES & TALENT POOL CRM
-- ==============================================================================

-- Raw Candidates Table (Opt-In Talent Pool)
CREATE TABLE IF NOT EXISTS public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    job_title TEXT,
    current_title TEXT,
    industry TEXT,
    city TEXT,
    location TEXT,
    country TEXT,
    device_type TEXT,
    experience_years SMALLINT,
    highest_education TEXT,
    degree TEXT,
    university TEXT,
    salary_expectation TEXT,
    employment_status TEXT,
    preferred_work TEXT,
    skills TEXT[],
    languages TEXT[],
    github TEXT,
    linkedin TEXT,
    portfolio TEXT,
    resume_data JSONB,
    template_id TEXT,
    opted_in_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_candidates_email ON public.candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_country ON public.candidates(country);

-- Normalized Candidate Profiles (Search Index for Recruiter B2B Portal)
CREATE TABLE IF NOT EXISTS public.candidate_profiles (
    id UUID PRIMARY KEY REFERENCES public.candidates(id) ON DELETE CASCADE,
    full_name TEXT,
    current_title TEXT,
    title_category TEXT,
    industry TEXT,
    country TEXT,
    city TEXT,
    experience_years SMALLINT,
    employment_status TEXT,
    preferred_work TEXT,
    highest_education TEXT,
    degree TEXT,
    university TEXT,
    skills TEXT[],
    skill_categories TEXT[],
    salary_expectation TEXT,
    currency TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    completeness_score SMALLINT,
    freshness_days SMALLINT,
    ats_score_avg SMALLINT,
    consent_recruiter_share BOOLEAN DEFAULT FALSE,
    consent_email_jobs BOOLEAN DEFAULT FALSE,
    consent_analytics BOOLEAN DEFAULT TRUE,
    consent_version TEXT,
    consent_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    resume_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_title ON public.candidate_profiles(current_title);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_skills ON public.candidate_profiles USING GIN(skills);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_country ON public.candidate_profiles(country);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_freshness ON public.candidate_profiles(freshness_days);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_completeness ON public.candidate_profiles(completeness_score DESC);

-- ==============================================================================
-- 3. B2B RECRUITER PORTAL, JOBS & SUBSCRIPTIONS (PAYSTACK)
-- ==============================================================================

-- Recruiters Table
CREATE TABLE IF NOT EXISTS public.recruiters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    paystack_customer_code TEXT,
    api_key UUID DEFAULT gen_random_uuid() UNIQUE,
    api_calls_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_recruiters_user_id ON public.recruiters(user_id);
CREATE INDEX IF NOT EXISTS idx_recruiters_api_key ON public.recruiters(api_key);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
    paystack_subscription_code TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL, -- 'active', 'canceled', 'past_due'
    tier TEXT DEFAULT 'basic', -- 'basic', 'pro'
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_recruiter_id ON public.subscriptions(recruiter_id);

-- Job Postings
CREATE TABLE IF NOT EXISTS public.job_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_job_postings_recruiter ON public.job_postings(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_job_postings_skills ON public.job_postings USING GIN(skills);

-- Webhook Events (Idempotency Table for Paystack & External Webhooks)
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT NOT NULL UNIQUE,
    event_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_webhook_events_id ON public.webhook_events(event_id);

-- ==============================================================================
-- 4. ANALYTICS & EVENT TRACKING (RANGE-PARTITIONED)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    template_id TEXT,
    session_id TEXT,
    country TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    referrer TEXT,
    page_url TEXT,
    screen_width INTEGER,
    ip_address TEXT,
    variant_assignment TEXT,
    metadata JSONB,
    event_year SMALLINT,
    event_month SMALLINT,
    event_day SMALLINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Partitions for 2026 / 2027
CREATE TABLE IF NOT EXISTS public.analytics_events_2026_07 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');

CREATE TABLE IF NOT EXISTS public.analytics_events_2026_08 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');

CREATE TABLE IF NOT EXISTS public.analytics_events_2026_09 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');

CREATE TABLE IF NOT EXISTS public.analytics_events_2026_10 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');

CREATE TABLE IF NOT EXISTS public.analytics_events_2026_11 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-11-01') TO ('2026-12-01');

CREATE TABLE IF NOT EXISTS public.analytics_events_2026_12 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-12-01') TO ('2027-01-01');

CREATE TABLE IF NOT EXISTS public.analytics_events_default PARTITION OF public.analytics_events DEFAULT;

CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON public.analytics_events(created_at DESC);

-- ==============================================================================
-- 5. AFFILIATE NETWORK & MONETIZATION
-- ==============================================================================

-- Affiliates Table
CREATE TABLE IF NOT EXISTS public.affiliates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    ref_code TEXT UNIQUE NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 20.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_affiliates_ref_code ON public.affiliates(ref_code);

-- Affiliate Clicks Table
CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref_code TEXT REFERENCES public.affiliates(ref_code) ON DELETE CASCADE,
    session_id TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_ref ON public.affiliate_clicks(ref_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_created ON public.affiliate_clicks(created_at DESC);

-- Affiliate Conversions Table
CREATE TABLE IF NOT EXISTS public.affiliate_conversions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref_code TEXT REFERENCES public.affiliates(ref_code) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_affiliate_conversions_ref ON public.affiliate_conversions(ref_code);

-- Job Clicks (CareerJet & External Job Board Clicks)
CREATE TABLE IF NOT EXISTS public.job_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_url TEXT NOT NULL,
    job_title TEXT,
    company TEXT,
    country TEXT,
    cpc_value NUMERIC(10,4),
    user_ip TEXT,
    location TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_job_clicks_country ON public.job_clicks(country);
CREATE INDEX IF NOT EXISTS idx_job_clicks_created ON public.job_clicks(created_at DESC);

-- ==============================================================================
-- 6. AI USAGE, CACHE & SYSTEM LOGS
-- ==============================================================================

-- AI Usage & Token Logs
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT,
    feature VARCHAR(50),
    endpoint VARCHAR(100) NOT NULL,
    input_tokens INT DEFAULT 0,
    output_tokens INT DEFAULT 0,
    prompt_tokens INT DEFAULT 0,
    completion_tokens INT DEFAULT 0,
    cost_estimate DECIMAL(10, 6) DEFAULT 0.0,
    cache_hit BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ai_usage_created ON public.ai_usage_logs(created_at DESC);

-- AI Response Cache
CREATE TABLE IF NOT EXISTS public.ai_response_cache (
    hash_key TEXT PRIMARY KEY,
    prompt_type VARCHAR(50) NOT NULL,
    response_data JSONB NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ai_cache_expires ON public.ai_response_cache(expires_at);

-- Consent Logs (GDPR / Compliance Tracking)
CREATE TABLE IF NOT EXISTS public.consent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    email TEXT,
    consent_marketing BOOLEAN DEFAULT FALSE,
    consent_ai BOOLEAN DEFAULT FALSE,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_consent_logs_session ON public.consent_logs(session_id);

-- Resume Export Format Logs
CREATE TABLE IF NOT EXISTS public.export_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    format VARCHAR(10) NOT NULL,
    template_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 7. CMS, BLOG, SEO & COMMUNICATIONS
-- ==============================================================================

-- Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'blog',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);

-- SEO Dynamic Landing Pages
CREATE TABLE IF NOT EXISTS public.seo_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    sample_data JSONB NOT NULL,
    views INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON public.seo_pages(slug);

-- Support Tickets (Live Chat & Customer Helpdesk)
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'open', -- 'open', 'pending', 'closed'
    admin_reply TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_support_tickets_email ON public.support_tickets(user_email);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON public.support_tickets(status);

-- ==============================================================================
-- 8. SYSTEM CONFIGURATION, FEATURE FLAGS & APP SETTINGS
-- ==============================================================================

-- Feature Flags
CREATE TABLE IF NOT EXISTS public.feature_flags (
    key VARCHAR(50) PRIMARY KEY,
    is_enabled BOOLEAN DEFAULT TRUE,
    description TEXT
);

-- Site Settings (Global Defaults)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    site_name VARCHAR(100) DEFAULT 'FreeCV',
    meta_title VARCHAR(255),
    meta_description TEXT,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- App Settings (Dynamic JSON Configuration Store)
CREATE TABLE IF NOT EXISTS public.app_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Site Config (Legacy announcements & notifications)
CREATE TABLE IF NOT EXISTS public.site_config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 9. DEFAULT SEED DATA & SETTINGS
-- ==============================================================================

INSERT INTO public.site_settings (id, site_name, maintenance_mode) 
VALUES (1, 'FreeCV', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.feature_flags (key, description, is_enabled) 
VALUES 
    ('docx_export', 'Enable DOCX Export', true),
    ('ai_rewriter', 'Enable AI Rewriter', true),
    ('linkedin_import', 'Enable LinkedIn Import', true)
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.site_config (key, value) 
VALUES 
    ('global_announcement', '{"enabled": false, "message": "Welcome to FreeCV! Build your premium resume for free."}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ==============================================================================
-- 10. CANDIDATE PROFILES BACKFILL
-- ==============================================================================

INSERT INTO public.candidate_profiles (
    id, full_name, current_title, country, city, experience_years,
    highest_education, employment_status, preferred_work, industry,
    skills, linkedin_url, github_url, portfolio_url,
    consent_recruiter_share, consent_email_jobs, consent_analytics,
    consent_version, consent_at, created_at, updated_at
)
SELECT
    c.id,
    COALESCE(c.full_name, c.name),
    COALESCE(c.current_title, c.job_title),
    c.country, c.city, c.experience_years,
    c.highest_education, c.employment_status, c.preferred_work, c.industry,
    c.skills, c.linkedin, c.github, c.portfolio,
    FALSE, FALSE, TRUE,
    'v1.0-backfill', now(), c.opted_in_at, now()
FROM public.candidates c
WHERE NOT EXISTS (SELECT 1 FROM public.candidate_profiles cp WHERE cp.id = c.id);

-- ==============================================================================
-- 11. REALTIME CONFIGURATION
-- ==============================================================================

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE support_tickets;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END
$$;

-- ==============================================================================
-- 12. STORAGE BUCKETS CONFIGURATION
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('profile_pictures', 'profile_pictures', false),
  ('parsed_pdfs', 'parsed_pdfs', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- ==============================================================================
-- 13. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.user_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_response_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- A. User Resumes
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can read their own resumes" ON public.user_resumes;
CREATE POLICY "Users can read their own resumes" ON public.user_resumes
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own resumes" ON public.user_resumes;
CREATE POLICY "Users can insert their own resumes" ON public.user_resumes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own resumes" ON public.user_resumes;
CREATE POLICY "Users can update their own resumes" ON public.user_resumes
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own resumes" ON public.user_resumes;
CREATE POLICY "Users can delete their own resumes" ON public.user_resumes
    FOR DELETE USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- B. Public Resumes
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access to public_resumes" ON public.public_resumes;
CREATE POLICY "Allow public read access to public_resumes" ON public.public_resumes
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to public_resumes" ON public.public_resumes;
CREATE POLICY "Allow public insert to public_resumes" ON public.public_resumes
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to public_resumes" ON public.public_resumes;
CREATE POLICY "Allow public update to public_resumes" ON public.public_resumes
    FOR UPDATE USING (true);

-- ------------------------------------------------------------------------------
-- C. Candidates & Candidate Profiles
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public inserts for candidates" ON public.candidates;
CREATE POLICY "Allow public inserts for candidates" ON public.candidates
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin read candidates" ON public.candidates;
CREATE POLICY "Allow admin read candidates" ON public.candidates
    FOR SELECT USING (
        (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
        OR auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "Allow users to read their own profile" ON public.candidate_profiles;
CREATE POLICY "Allow users to read their own profile" ON public.candidate_profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.candidate_profiles;
CREATE POLICY "Allow users to update their own profile" ON public.candidate_profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow admin read candidate profiles" ON public.candidate_profiles;
CREATE POLICY "Allow admin read candidate profiles" ON public.candidate_profiles
    FOR SELECT USING (
        (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
        OR auth.role() = 'service_role'
    );

-- ------------------------------------------------------------------------------
-- D. Recruiters, Subscriptions & Job Postings
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Recruiters can create their own profile" ON public.recruiters;
CREATE POLICY "Recruiters can create their own profile" ON public.recruiters
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Recruiters can read their own profile" ON public.recruiters;
CREATE POLICY "Recruiters can read their own profile" ON public.recruiters
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Recruiters can update their own profile" ON public.recruiters;
CREATE POLICY "Recruiters can update their own profile" ON public.recruiters
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Recruiters can read their own subscription" ON public.subscriptions;
CREATE POLICY "Recruiters can read their own subscription" ON public.subscriptions
    FOR SELECT USING (
        recruiter_id IN (SELECT id FROM public.recruiters WHERE user_id = auth.uid())
    );

DROP POLICY IF EXISTS "Recruiters can manage their own jobs" ON public.job_postings;
CREATE POLICY "Recruiters can manage their own jobs" ON public.job_postings
    FOR ALL USING (
        recruiter_id IN (SELECT id FROM public.recruiters WHERE user_id = auth.uid())
    );

-- ------------------------------------------------------------------------------
-- E. Analytics, Clicks & Monetization Tracking
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Enable insert for all users on analytics_events" ON public.analytics_events;
CREATE POLICY "Enable insert for all users on analytics_events" ON public.analytics_events
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view analytics_events" ON public.analytics_events;
CREATE POLICY "Admins can view analytics_events" ON public.analytics_events
    FOR SELECT USING (
        (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
        OR auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "Allow public inserts for affiliate clicks" ON public.affiliate_clicks;
CREATE POLICY "Allow public inserts for affiliate clicks" ON public.affiliate_clicks
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all affiliates" ON public.affiliates;
CREATE POLICY "Admins can view all affiliates" ON public.affiliates
    FOR ALL USING (
        (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
        OR auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "Admins can view all affiliate clicks" ON public.affiliate_clicks;
CREATE POLICY "Admins can view all affiliate clicks" ON public.affiliate_clicks
    FOR ALL USING (
        (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
        OR auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "Admins can view all affiliate conversions" ON public.affiliate_conversions;
CREATE POLICY "Admins can view all affiliate conversions" ON public.affiliate_conversions
    FOR ALL USING (
        (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
        OR auth.role() = 'service_role'
    );

DROP POLICY IF EXISTS "Enable insert for all users on job_clicks" ON public.job_clicks;
CREATE POLICY "Enable insert for all users on job_clicks" ON public.job_clicks
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable select for authenticated users on job_clicks" ON public.job_clicks;
CREATE POLICY "Enable select for authenticated users on job_clicks" ON public.job_clicks
    FOR SELECT USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- F. Support Tickets
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public inserts for support tickets" ON public.support_tickets;
CREATE POLICY "Allow public inserts for support tickets" ON public.support_tickets
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow users to read their own tickets" ON public.support_tickets;
CREATE POLICY "Allow users to read their own tickets" ON public.support_tickets
    FOR SELECT USING (
        auth.jwt() ->> 'email' = user_email
        OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
        OR auth.role() = 'service_role'
        OR auth.role() = 'anon'
    );

DROP POLICY IF EXISTS "Allow admin update support tickets" ON public.support_tickets;
CREATE POLICY "Allow admin update support tickets" ON public.support_tickets
    FOR UPDATE USING (
        (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
        OR auth.role() = 'service_role'
    );

-- ------------------------------------------------------------------------------
-- G. CMS, Blog, Settings & Features
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read published blog_posts" ON public.blog_posts;
CREATE POLICY "Allow public read published blog_posts" ON public.blog_posts
    FOR SELECT USING (is_published = true OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Allow public insert newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow public insert newsletter_subscribers" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read seo_pages" ON public.seo_pages;
CREATE POLICY "Allow public read seo_pages" ON public.seo_pages
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
CREATE POLICY "Allow public read site_settings" ON public.site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read app_settings" ON public.app_settings;
CREATE POLICY "Allow public read app_settings" ON public.app_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read site_config" ON public.site_config;
CREATE POLICY "Allow public read site_config" ON public.site_config
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read feature_flags" ON public.feature_flags;
CREATE POLICY "Allow public read feature_flags" ON public.feature_flags
    FOR SELECT USING (true);

-- ------------------------------------------------------------------------------
-- H. Storage Objects Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can upload their own profile pictures" ON storage.objects;
CREATE POLICY "Users can upload their own profile pictures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile_pictures' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Users can read their own profile pictures" ON storage.objects;
CREATE POLICY "Users can read their own profile pictures"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile_pictures' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Users can update their own profile pictures" ON storage.objects;
CREATE POLICY "Users can update their own profile pictures"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile_pictures' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Users can delete their own profile pictures" ON storage.objects;
CREATE POLICY "Users can delete their own profile pictures"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile_pictures' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Users can upload their own PDFs" ON storage.objects;
CREATE POLICY "Users can upload their own PDFs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'parsed_pdfs' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Users can read their own PDFs" ON storage.objects;
CREATE POLICY "Users can read their own PDFs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'parsed_pdfs' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Admins can read all objects" ON storage.objects;
CREATE POLICY "Admins can read all objects"
ON storage.objects FOR SELECT
TO authenticated
USING (
  (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin'
  OR auth.role() = 'service_role'
);
