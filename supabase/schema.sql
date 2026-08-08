-- ==============================================================================
-- FreeCV / Cvyon - MASTER COMPLETE DATABASE WIPE & RECREATION SCRIPT
-- ==============================================================================
-- This script contains the 100% complete, fully aligned database definition for 
-- FreeCV / Cvyon. It creates all 30 public tables, partitioned event logs,
-- search triggers, functions, storage buckets, RLS policies, and seed data.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- STEP 1: CLEAN SLATE WIPE (DROPS ALL EXISTING PUBLIC TABLES & TRIGGERS)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS public.webhook_event_queue CASCADE;
DROP TABLE IF EXISTS public.webhook_events CASCADE;
DROP TABLE IF EXISTS public.revenue_ledger CASCADE;
DROP TABLE IF EXISTS public.expenditures CASCADE;
DROP TABLE IF EXISTS public.sales_pipeline CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.job_clicks CASCADE;
DROP TABLE IF EXISTS public.affiliate_conversions CASCADE;
DROP TABLE IF EXISTS public.affiliate_clicks CASCADE;
DROP TABLE IF EXISTS public.affiliates CASCADE;
DROP TABLE IF EXISTS public.job_postings CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.recruiters CASCADE;
DROP TABLE IF EXISTS public.candidate_profiles CASCADE;
DROP TABLE IF EXISTS public.candidates CASCADE;
DROP TABLE IF EXISTS public.user_resumes CASCADE;
DROP TABLE IF EXISTS public.public_resumes CASCADE;
DROP TABLE IF EXISTS public.analytics_events CASCADE;
DROP TABLE IF EXISTS public.ai_usage_logs CASCADE;
DROP TABLE IF EXISTS public.ai_response_cache CASCADE;
DROP TABLE IF EXISTS public.consent_logs CASCADE;
DROP TABLE IF EXISTS public.export_logs CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS public.seo_pages CASCADE;
DROP TABLE IF EXISTS public.support_tickets CASCADE;
DROP TABLE IF EXISTS public.feature_flags CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.app_settings CASCADE;
DROP TABLE IF EXISTS public.site_config CASCADE;

-- ------------------------------------------------------------------------------
-- STEP 2: EXTENSIONS & UTILITIES
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- STEP 3: CORE USER & RESUME TABLES
-- ------------------------------------------------------------------------------

-- Authenticated User Resumes
CREATE TABLE public.user_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Untitled Resume',
    resume_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_user_resumes_user_id ON public.user_resumes(user_id);
CREATE INDEX idx_user_resumes_created_at ON public.user_resumes(created_at DESC);

CREATE TRIGGER trg_user_resumes_updated_at
    BEFORE UPDATE ON public.user_resumes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Public Web Shareable Resumes (/r/[handle])
CREATE TABLE public.public_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handle TEXT UNIQUE NOT NULL,
    data JSONB NOT NULL,
    views INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_public_resumes_handle ON public.public_resumes(handle);

CREATE OR REPLACE FUNCTION public.increment_resume_views(resume_handle TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.public_resumes
  SET views = coalesce(views, 0) + 1
  WHERE handle = resume_handle;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- STEP 4: CANDIDATES & TALENT POOL CRM
-- ------------------------------------------------------------------------------

-- Raw Candidates Table (User opt-ins from builder/export)
CREATE TABLE public.candidates (
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
    skills TEXT[] DEFAULT '{}',
    languages TEXT[] DEFAULT '{}',
    github TEXT,
    linkedin TEXT,
    portfolio TEXT,
    resume_data JSONB,
    template_id TEXT,
    opted_in_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    consent_given_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_candidates_email ON public.candidates(email);
CREATE INDEX idx_candidates_country ON public.candidates(country);
CREATE INDEX idx_candidates_opted_in_at ON public.candidates(opted_in_at DESC);
CREATE INDEX idx_candidates_consent_given_at ON public.candidates(consent_given_at DESC);

CREATE TRIGGER trg_candidates_updated_at
    BEFORE UPDATE ON public.candidates
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Normalized Candidate Profiles (Search Index for Recruiter B2B Portal)
CREATE TABLE public.candidate_profiles (
    id UUID PRIMARY KEY REFERENCES public.candidates(id) ON DELETE CASCADE,
    full_name TEXT,
    current_title TEXT,
    title_category TEXT,
    summary TEXT,
    industry TEXT,
    country TEXT,
    city TEXT,
    experience_years SMALLINT,
    employment_status TEXT,
    preferred_work TEXT,
    highest_education TEXT,
    degree TEXT,
    university TEXT,
    skills TEXT[] DEFAULT '{}',
    skill_categories TEXT[] DEFAULT '{}',
    languages TEXT[] DEFAULT '{}',
    salary_expectation TEXT,
    currency TEXT DEFAULT 'USD',
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    completeness_score SMALLINT DEFAULT 0,
    freshness_days SMALLINT DEFAULT 0,
    ats_score_avg SMALLINT DEFAULT 0,
    consent_recruiter_share BOOLEAN DEFAULT FALSE,
    consent_email_jobs BOOLEAN DEFAULT FALSE,
    consent_analytics BOOLEAN DEFAULT TRUE,
    consent_version TEXT DEFAULT 'v1.0',
    consent_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    resume_data JSONB,
    search_vector TSVECTOR,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_candidate_profiles_title ON public.candidate_profiles(current_title);
CREATE INDEX idx_candidate_profiles_skills ON public.candidate_profiles USING GIN(skills);
CREATE INDEX idx_candidate_profiles_country ON public.candidate_profiles(country);
CREATE INDEX idx_candidate_profiles_freshness ON public.candidate_profiles(freshness_days);
CREATE INDEX idx_candidate_profiles_completeness ON public.candidate_profiles(completeness_score DESC);
CREATE INDEX idx_candidate_profiles_search_vector ON public.candidate_profiles USING GIN(search_vector);

CREATE OR REPLACE FUNCTION public.update_candidate_profile_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', coalesce(NEW.full_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.current_title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.title_category, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.skills, ' '), '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.summary, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.country, '')), 'D') ||
    setweight(to_tsvector('english', coalesce(NEW.city, '')), 'D');
  NEW.updated_at := timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_candidate_profiles_search_vector
    BEFORE INSERT OR UPDATE ON public.candidate_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_candidate_profile_search_vector();

-- ------------------------------------------------------------------------------
-- STEP 5: B2B RECRUITER PORTAL, JOBS & PAYSTACK SUBSCRIPTIONS
-- ------------------------------------------------------------------------------

-- Recruiters Table
CREATE TABLE public.recruiters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    contact_email TEXT,
    paystack_customer_code TEXT,
    api_key UUID DEFAULT gen_random_uuid() UNIQUE,
    api_calls_count INT DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_recruiters_user_id ON public.recruiters(user_id);
CREATE INDEX idx_recruiters_api_key ON public.recruiters(api_key);

CREATE OR REPLACE FUNCTION public.increment_api_calls(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.recruiters
  SET api_calls_count = coalesce(api_calls_count, 0) + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Paystack Subscriptions Table
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
    paystack_subscription_code TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active',
    tier TEXT DEFAULT 'basic',
    plan TEXT,
    amount_minor INT DEFAULT 0,
    currency TEXT DEFAULT 'NGN',
    fx_to_usd NUMERIC(10, 6) DEFAULT 1.0,
    current_period_end TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_subscriptions_recruiter_id ON public.subscriptions(recruiter_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);

CREATE TRIGGER trg_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Job Postings Table
CREATE TABLE public.job_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_job_postings_recruiter ON public.job_postings(recruiter_id);
CREATE INDEX idx_job_postings_skills ON public.job_postings USING GIN(skills);

-- Webhook Events Table
CREATE TABLE public.webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT NOT NULL UNIQUE,
    event_type TEXT NOT NULL,
    payload JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_webhook_events_id ON public.webhook_events(event_id);

-- Webhook Retry Queue Table
CREATE TABLE public.webhook_event_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    provider TEXT NOT NULL DEFAULT 'paystack',
    payload JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'failed')),
    retry_count INT NOT NULL DEFAULT 0,
    max_retries INT NOT NULL DEFAULT 5,
    last_error TEXT,
    next_retry_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_webhook_queue_status_retry ON public.webhook_event_queue (status, next_retry_at) WHERE status IN ('pending', 'failed');
CREATE INDEX idx_webhook_queue_event_id ON public.webhook_event_queue (event_id);

-- ------------------------------------------------------------------------------
-- STEP 6: RANGE-PARTITIONED ANALYTICS & EVENT TRACKING
-- ------------------------------------------------------------------------------

CREATE TABLE public.analytics_events (
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
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE TABLE public.analytics_events_2026_01 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE public.analytics_events_2026_02 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
CREATE TABLE public.analytics_events_2026_03 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE public.analytics_events_2026_04 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE public.analytics_events_2026_05 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE public.analytics_events_2026_06 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE public.analytics_events_2026_07 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE public.analytics_events_2026_08 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
CREATE TABLE public.analytics_events_2026_09 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');
CREATE TABLE public.analytics_events_2026_10 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');
CREATE TABLE public.analytics_events_2026_11 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-11-01') TO ('2026-12-01');
CREATE TABLE public.analytics_events_2026_12 PARTITION OF public.analytics_events FOR VALUES FROM ('2026-12-01') TO ('2027-01-01');
CREATE TABLE public.analytics_events_2027_01 PARTITION OF public.analytics_events FOR VALUES FROM ('2027-01-01') TO ('2027-02-01');
CREATE TABLE public.analytics_events_2027_02 PARTITION OF public.analytics_events FOR VALUES FROM ('2027-02-01') TO ('2027-03-01');
CREATE TABLE public.analytics_events_default PARTITION OF public.analytics_events DEFAULT;

CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_session ON public.analytics_events(session_id);
CREATE INDEX idx_analytics_events_created ON public.analytics_events(created_at DESC);

-- ------------------------------------------------------------------------------
-- STEP 7: AFFILIATE NETWORK & MONETIZATION
-- ------------------------------------------------------------------------------

CREATE TABLE public.affiliates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    ref_code TEXT UNIQUE NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 20.00,
    payout_email TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_affiliates_ref_code ON public.affiliates(ref_code);

CREATE TABLE public.affiliate_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref_code TEXT REFERENCES public.affiliates(ref_code) ON DELETE CASCADE,
    session_id TEXT,
    ip_address TEXT,
    country TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_affiliate_clicks_ref ON public.affiliate_clicks(ref_code);
CREATE INDEX idx_affiliate_clicks_created ON public.affiliate_clicks(created_at DESC);

CREATE TABLE public.affiliate_conversions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref_code TEXT REFERENCES public.affiliates(ref_code) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_affiliate_conversions_ref ON public.affiliate_conversions(ref_code);

CREATE TABLE public.job_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_url TEXT NOT NULL,
    job_title TEXT,
    company TEXT,
    user_name TEXT,
    user_email TEXT,
    device_type VARCHAR(50) DEFAULT 'desktop',
    country TEXT,
    city TEXT,
    location TEXT,
    cpc_value NUMERIC(10,4) DEFAULT 0.05,
    user_ip TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_job_clicks_country ON public.job_clicks(country);
CREATE INDEX idx_job_clicks_created ON public.job_clicks(created_at DESC);
CREATE INDEX idx_job_clicks_email ON public.job_clicks(user_email);

-- ------------------------------------------------------------------------------
-- STEP 8: FINANCIALS, REVENUE LEDGER, EXPENSES & PIPELINE
-- ------------------------------------------------------------------------------

CREATE TABLE public.expenditures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'hosting',
    amount_minor INT NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    fx_to_usd NUMERIC(10, 6) DEFAULT 1.0,
    vendor TEXT,
    receipt_url TEXT,
    notes TEXT,
    spent_on DATE NOT NULL DEFAULT CURRENT_DATE,
    created_by TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_expenditures_spent_on ON public.expenditures(spent_on DESC);
CREATE INDEX idx_expenditures_category ON public.expenditures(category);

CREATE TABLE public.sales_pipeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    contact_name TEXT,
    contact_email TEXT NOT NULL,
    stage TEXT DEFAULT 'lead',
    deal_value_minor INT DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    notes TEXT,
    assigned_to TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_sales_pipeline_stage ON public.sales_pipeline(stage);
CREATE INDEX idx_sales_pipeline_created ON public.sales_pipeline(created_at DESC);

CREATE TRIGGER trg_sales_pipeline_updated_at
    BEFORE UPDATE ON public.sales_pipeline
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE public.revenue_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ref TEXT,
    transaction_ref TEXT,
    source TEXT DEFAULT 'subscription',
    type TEXT DEFAULT 'subscription',
    recruiter_id UUID REFERENCES public.recruiters(id) ON DELETE SET NULL,
    customer_code TEXT,
    amount_minor INT NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'NGN',
    fx_to_usd NUMERIC(10, 6) DEFAULT 1.0,
    status TEXT NOT NULL DEFAULT 'settled',
    channel TEXT DEFAULT 'paystack',
    period_start TIMESTAMPTZ,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE UNIQUE INDEX idx_revenue_ledger_ref_uniq ON public.revenue_ledger(ref) WHERE ref IS NOT NULL;
CREATE UNIQUE INDEX idx_revenue_ledger_tx_ref_uniq ON public.revenue_ledger(transaction_ref) WHERE transaction_ref IS NOT NULL;
CREATE INDEX idx_revenue_ledger_created ON public.revenue_ledger(created_at DESC);

-- ------------------------------------------------------------------------------
-- STEP 9: AI USAGE, CACHE, AUDIT & TELEMETRY LOGS
-- ------------------------------------------------------------------------------

CREATE TABLE public.ai_usage_logs (
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
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_ai_usage_created ON public.ai_usage_logs(created_at DESC);

CREATE TABLE public.ai_response_cache (
    hash_key TEXT PRIMARY KEY,
    prompt_type VARCHAR(50) NOT NULL,
    response_data JSONB NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_ai_cache_expires ON public.ai_response_cache(expires_at);

CREATE TABLE public.consent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    email TEXT,
    consent_marketing BOOLEAN DEFAULT FALSE,
    consent_ai BOOLEAN DEFAULT FALSE,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_consent_logs_session ON public.consent_logs(session_id);

CREATE TABLE public.export_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    format VARCHAR(10) NOT NULL,
    template_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_export_logs_created ON public.export_logs(created_at DESC);

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_email TEXT NOT NULL DEFAULT 'admin',
    actor_role TEXT NOT NULL DEFAULT 'admin',
    action TEXT NOT NULL,
    target_table TEXT,
    target_id TEXT,
    metadata JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);

-- ------------------------------------------------------------------------------
-- STEP 10: CMS, BLOG, SEO & COMMUNICATIONS
-- ------------------------------------------------------------------------------

CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published);

CREATE TRIGGER trg_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'blog',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);

CREATE TABLE public.seo_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    sample_data JSONB NOT NULL,
    views INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_seo_pages_slug ON public.seo_pages(slug);

CREATE OR REPLACE FUNCTION public.increment_seo_views(page_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.seo_pages
  SET views = coalesce(views, 0) + 1
  WHERE slug = page_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TABLE public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    admin_reply TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX idx_support_tickets_email ON public.support_tickets(user_email);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);

CREATE TRIGGER trg_support_tickets_updated_at
    BEFORE UPDATE ON public.support_tickets
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- STEP 11: CONFIGURATION, FEATURE FLAGS & APP SETTINGS
-- ------------------------------------------------------------------------------

CREATE TABLE public.feature_flags (
    key VARCHAR(50) PRIMARY KEY,
    is_enabled BOOLEAN DEFAULT TRUE,
    description TEXT
);

CREATE TABLE public.site_settings (
    id INT PRIMARY KEY DEFAULT 1,
    site_name VARCHAR(100) DEFAULT 'FreeCV',
    meta_title VARCHAR(255),
    meta_description TEXT,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.app_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.site_config (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Realtime Configuration
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE support_tickets;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END
$$;

-- Storage Buckets Configuration
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('profile_pictures', 'profile_pictures', false),
  ('parsed_pdfs', 'parsed_pdfs', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Default Seed Data
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

INSERT INTO public.app_settings (key, value)
VALUES
    ('maintenance', '{"enabled": false}'::jsonb),
    ('paystack_plans', '{"basic_price": 5000, "pro_price": 15000}'::jsonb),
    ('branding', '{"brandName": "Cvyon", "logoUrl": "/logo.png", "supportEmail": "contact@cvyon.com"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.affiliates (name, ref_code, commission_rate, payout_email)
VALUES ('Official Partner', 'cvyon-launch', 20.00, 'partners@cvyon.com')
ON CONFLICT (ref_code) DO NOTHING;

-- ------------------------------------------------------------------------------
-- STEP 12: ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

ALTER TABLE public.user_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_event_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenditures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_pipeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
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

-- User Resumes RLS
DROP POLICY IF EXISTS "Users can read their own resumes" ON public.user_resumes;
CREATE POLICY "Users can read their own resumes" ON public.user_resumes FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Users can insert their own resumes" ON public.user_resumes;
CREATE POLICY "Users can insert their own resumes" ON public.user_resumes FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Users can update their own resumes" ON public.user_resumes;
CREATE POLICY "Users can update their own resumes" ON public.user_resumes FOR UPDATE USING (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Users can delete their own resumes" ON public.user_resumes;
CREATE POLICY "Users can delete their own resumes" ON public.user_resumes FOR DELETE USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- Public Resumes RLS
DROP POLICY IF EXISTS "Allow public read access to public_resumes" ON public.public_resumes;
CREATE POLICY "Allow public read access to public_resumes" ON public.public_resumes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert to public_resumes" ON public.public_resumes;
CREATE POLICY "Allow public insert to public_resumes" ON public.public_resumes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to public_resumes" ON public.public_resumes;
CREATE POLICY "Allow public update to public_resumes" ON public.public_resumes FOR UPDATE USING (true);

-- Candidates & Candidate Profiles RLS
DROP POLICY IF EXISTS "Allow public inserts for candidates" ON public.candidates;
CREATE POLICY "Allow public inserts for candidates" ON public.candidates FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin read candidates" ON public.candidates;
CREATE POLICY "Allow admin read candidates" ON public.candidates FOR SELECT USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow admin modify candidates" ON public.candidates;
CREATE POLICY "Allow admin modify candidates" ON public.candidates FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow users to read their own profile" ON public.candidate_profiles;
CREATE POLICY "Allow users to read their own profile" ON public.candidate_profiles FOR SELECT USING (auth.uid() = id OR consent_recruiter_share = true OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow users to update their own profile" ON public.candidate_profiles;
CREATE POLICY "Allow users to update their own profile" ON public.candidate_profiles FOR UPDATE USING (auth.uid() = id OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow public insert candidate profiles" ON public.candidate_profiles;
CREATE POLICY "Allow public insert candidate profiles" ON public.candidate_profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all candidate profiles" ON public.candidate_profiles;
CREATE POLICY "Allow admin all candidate profiles" ON public.candidate_profiles FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

-- Recruiters & Subscriptions RLS
DROP POLICY IF EXISTS "Recruiters can create their own profile" ON public.recruiters;
CREATE POLICY "Recruiters can create their own profile" ON public.recruiters FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Recruiters can read their own profile" ON public.recruiters;
CREATE POLICY "Recruiters can read their own profile" ON public.recruiters FOR SELECT USING (auth.uid() = user_id OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Recruiters can update their own profile" ON public.recruiters;
CREATE POLICY "Recruiters can update their own profile" ON public.recruiters FOR UPDATE USING (auth.uid() = user_id OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Recruiters can read their own subscription" ON public.subscriptions;
CREATE POLICY "Recruiters can read their own subscription" ON public.subscriptions FOR SELECT USING (recruiter_id IN (SELECT id FROM public.recruiters WHERE user_id = auth.uid()) OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admin full subscriptions" ON public.subscriptions;
CREATE POLICY "Admin full subscriptions" ON public.subscriptions FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Recruiters can manage their own jobs" ON public.job_postings;
CREATE POLICY "Recruiters can manage their own jobs" ON public.job_postings FOR ALL USING (recruiter_id IN (SELECT id FROM public.recruiters WHERE user_id = auth.uid()) OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public can view active job postings" ON public.job_postings;
CREATE POLICY "Public can view active job postings" ON public.job_postings FOR SELECT USING (is_active = true);

-- Analytics & Monetization RLS
DROP POLICY IF EXISTS "Enable insert for all users on analytics_events" ON public.analytics_events;
CREATE POLICY "Enable insert for all users on analytics_events" ON public.analytics_events FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view analytics_events" ON public.analytics_events;
CREATE POLICY "Admins can view analytics_events" ON public.analytics_events FOR SELECT USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow public inserts for affiliate clicks" ON public.affiliate_clicks;
CREATE POLICY "Allow public inserts for affiliate clicks" ON public.affiliate_clicks FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all affiliates" ON public.affiliates;
CREATE POLICY "Admins can view all affiliates" ON public.affiliates FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins can view all affiliate clicks" ON public.affiliate_clicks;
CREATE POLICY "Admins can view all affiliate clicks" ON public.affiliate_clicks FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins can view all affiliate conversions" ON public.affiliate_conversions;
CREATE POLICY "Admins can view all affiliate conversions" ON public.affiliate_conversions FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Enable insert for all users on job_clicks" ON public.job_clicks;
CREATE POLICY "Enable insert for all users on job_clicks" ON public.job_clicks FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable select for job_clicks" ON public.job_clicks;
CREATE POLICY "Enable select for job_clicks" ON public.job_clicks FOR SELECT USING (auth.role() = 'authenticated' OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins manage expenditures" ON public.expenditures;
CREATE POLICY "Admins manage expenditures" ON public.expenditures FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins manage sales_pipeline" ON public.sales_pipeline;
CREATE POLICY "Admins manage sales_pipeline" ON public.sales_pipeline FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins manage revenue_ledger" ON public.revenue_ledger;
CREATE POLICY "Admins manage revenue_ledger" ON public.revenue_ledger FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins manage webhook_events" ON public.webhook_events;
CREATE POLICY "Admins manage webhook_events" ON public.webhook_events FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins manage webhook_event_queue" ON public.webhook_event_queue;
CREATE POLICY "Admins manage webhook_event_queue" ON public.webhook_event_queue FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

-- Support Tickets & Logs RLS
DROP POLICY IF EXISTS "Allow public inserts for support tickets" ON public.support_tickets;
CREATE POLICY "Allow public inserts for support tickets" ON public.support_tickets FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow users to read their own tickets" ON public.support_tickets;
CREATE POLICY "Allow users to read their own tickets" ON public.support_tickets FOR SELECT USING (auth.jwt() ->> 'email' = user_email OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role' OR auth.role() = 'anon');

DROP POLICY IF EXISTS "Allow admin update support tickets" ON public.support_tickets;
CREATE POLICY "Allow admin update support tickets" ON public.support_tickets FOR UPDATE USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Insert audit logs" ON public.audit_logs;
CREATE POLICY "Insert audit logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins view audit logs" ON public.audit_logs;
CREATE POLICY "Admins view audit logs" ON public.audit_logs FOR SELECT USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public insert ai usage logs" ON public.ai_usage_logs;
CREATE POLICY "Public insert ai usage logs" ON public.ai_usage_logs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins view ai usage logs" ON public.ai_usage_logs;
CREATE POLICY "Admins view ai usage logs" ON public.ai_usage_logs FOR SELECT USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public access ai cache" ON public.ai_response_cache;
CREATE POLICY "Public access ai cache" ON public.ai_response_cache FOR ALL USING (true);

DROP POLICY IF EXISTS "Public insert consent logs" ON public.consent_logs;
CREATE POLICY "Public insert consent logs" ON public.consent_logs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins view consent logs" ON public.consent_logs;
CREATE POLICY "Admins view consent logs" ON public.consent_logs FOR SELECT USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Public insert export logs" ON public.export_logs;
CREATE POLICY "Public insert export logs" ON public.export_logs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins view export logs" ON public.export_logs;
CREATE POLICY "Admins view export logs" ON public.export_logs FOR SELECT USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

-- CMS, Blog & Settings RLS
DROP POLICY IF EXISTS "Allow public read published blog_posts" ON public.blog_posts;
CREATE POLICY "Allow public read published blog_posts" ON public.blog_posts FOR SELECT USING (is_published = true OR (current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins manage blog_posts" ON public.blog_posts;
CREATE POLICY "Admins manage blog_posts" ON public.blog_posts FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow public insert newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow public insert newsletter_subscribers" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins view newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admins view newsletter_subscribers" ON public.newsletter_subscribers FOR SELECT USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow public read seo_pages" ON public.seo_pages;
CREATE POLICY "Allow public read seo_pages" ON public.seo_pages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage seo_pages" ON public.seo_pages;
CREATE POLICY "Admins manage seo_pages" ON public.seo_pages FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage site_settings" ON public.site_settings;
CREATE POLICY "Admins manage site_settings" ON public.site_settings FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow public read app_settings" ON public.app_settings;
CREATE POLICY "Allow public read app_settings" ON public.app_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage app_settings" ON public.app_settings;
CREATE POLICY "Admins manage app_settings" ON public.app_settings FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow public read site_config" ON public.site_config;
CREATE POLICY "Allow public read site_config" ON public.site_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage site_config" ON public.site_config;
CREATE POLICY "Admins manage site_config" ON public.site_config FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Allow public read feature_flags" ON public.feature_flags;
CREATE POLICY "Allow public read feature_flags" ON public.feature_flags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage feature_flags" ON public.feature_flags;
CREATE POLICY "Admins manage feature_flags" ON public.feature_flags FOR ALL USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');

-- Storage Policies
DROP POLICY IF EXISTS "Users can upload their own profile pictures" ON storage.objects;
CREATE POLICY "Users can upload their own profile pictures" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'profile_pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can read their own profile pictures" ON storage.objects;
CREATE POLICY "Users can read their own profile pictures" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'profile_pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can update their own profile pictures" ON storage.objects;
CREATE POLICY "Users can update their own profile pictures" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'profile_pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can delete their own profile pictures" ON storage.objects;
CREATE POLICY "Users can delete their own profile pictures" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'profile_pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can upload their own PDFs" ON storage.objects;
CREATE POLICY "Users can upload their own PDFs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'parsed_pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can read their own PDFs" ON storage.objects;
CREATE POLICY "Users can read their own PDFs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'parsed_pdfs' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Admins can read all objects" ON storage.objects;
CREATE POLICY "Admins can read all objects" ON storage.objects FOR SELECT TO authenticated USING ((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin' OR auth.role() = 'service_role');
