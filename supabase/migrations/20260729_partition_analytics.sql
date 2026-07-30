-- Migration: Convert analytics_events to a partitioned table

-- 1. Rename existing table
ALTER TABLE public.analytics_events RENAME TO analytics_events_old;

-- 2. Create the new partitioned table
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id, created_at) -- Partition key must be part of primary key
) PARTITION BY RANGE (created_at);

-- 3. Create partitions for the current and next few months (assuming we're in 2026)
CREATE TABLE public.analytics_events_2026_07 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');

CREATE TABLE public.analytics_events_2026_08 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');

CREATE TABLE public.analytics_events_2026_09 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');

CREATE TABLE public.analytics_events_2026_10 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');

CREATE TABLE public.analytics_events_2026_11 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-11-01') TO ('2026-12-01');

CREATE TABLE public.analytics_events_2026_12 PARTITION OF public.analytics_events
    FOR VALUES FROM ('2026-12-01') TO ('2027-01-01');

-- Default partition for values that don't fit
CREATE TABLE public.analytics_events_default PARTITION OF public.analytics_events DEFAULT;

-- 4. Copy data from old table to new partitioned table
INSERT INTO public.analytics_events (
    id, event_type, template_id, session_id, country, city, device_type, 
    browser, os, referrer, page_url, screen_width, ip_address, variant_assignment, created_at
)
SELECT 
    id, event_type, template_id, session_id, country, city, device_type, 
    browser, os, referrer, page_url, screen_width, ip_address, variant_assignment, created_at
FROM public.analytics_events_old;

-- 5. Drop old table
DROP TABLE public.analytics_events_old;

-- 6. Add RLS Policies back to new table
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all users" ON public.analytics_events
    FOR INSERT WITH CHECK (true);
