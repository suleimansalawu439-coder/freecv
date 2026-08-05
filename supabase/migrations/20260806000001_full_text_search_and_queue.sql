-- ==============================================================================
-- Migration: 20260806000001_full_text_search_and_queue.sql
-- Description:
-- 1. Full-Text Search (tsvector + GIN index + search RPC) for candidate_profiles
-- 2. Webhook event retry queue table for guaranteed payment processing
-- ==============================================================================

-- 1. Webhook Event Retry Queue
CREATE TABLE IF NOT EXISTS webhook_event_queue (
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

CREATE INDEX IF NOT EXISTS idx_webhook_queue_status_retry 
  ON webhook_event_queue (status, next_retry_at) 
  WHERE status IN ('pending', 'failed');

CREATE INDEX IF NOT EXISTS idx_webhook_queue_event_id 
  ON webhook_event_queue (event_id);

-- 2. Full-Text Search Column & Index on candidate_profiles
DO $$
BEGIN
  -- Add search_vector column if candidate_profiles table exists and column is missing
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'candidate_profiles') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'candidate_profiles' AND column_name = 'search_vector') THEN
      ALTER TABLE candidate_profiles ADD COLUMN search_vector tsvector;
    END IF;

    -- Create GIN index for search_vector
    CREATE INDEX IF NOT EXISTS candidate_profiles_search_vector_idx 
      ON candidate_profiles USING GIN (search_vector);
  END IF;
END $$;

-- 3. Trigger Function to Keep search_vector Up-to-Date
CREATE OR REPLACE FUNCTION update_candidate_profile_search_vector()
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
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'candidate_profiles') THEN
    DROP TRIGGER IF EXISTS trg_candidate_profiles_search_vector ON candidate_profiles;
    CREATE TRIGGER trg_candidate_profiles_search_vector
      BEFORE INSERT OR UPDATE ON candidate_profiles
      FOR EACH ROW EXECUTE FUNCTION update_candidate_profile_search_vector();
      
    -- Backfill existing rows
    UPDATE candidate_profiles SET search_vector = 
      setweight(to_tsvector('english', coalesce(full_name, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(current_title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(title_category, '')), 'B') ||
      setweight(to_tsvector('english', coalesce(array_to_string(skills, ' '), '')), 'B') ||
      setweight(to_tsvector('english', coalesce(summary, '')), 'C') ||
      setweight(to_tsvector('english', coalesce(country, '')), 'D') ||
      setweight(to_tsvector('english', coalesce(city, '')), 'D')
    WHERE search_vector IS NULL;
  END IF;
END $$;
