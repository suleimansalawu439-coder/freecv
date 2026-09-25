-- ============================================================================
-- Recruiter marketplace ("sell the match, not the database")
-- Tables: credit_packs, recruiter_credits, credit_ledger, contact_unlocks,
--         jd_searches, shortlists, profile_views
-- RPCs:   match_candidate_ranks (FTS rank over consented profiles),
--         adjust_recruiter_credits (atomic balance change + ledger row),
--         unlock_candidate_contact (atomic spend + unlock + view rows)
-- Also: adds candidate_profiles.deleted_at (the recruiter search route already
-- filters on it; the column was missing from the table definition).
-- Idempotent where possible (IF NOT EXISTS / ON CONFLICT / DROP POLICY).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 0. candidate_profiles.deleted_at (defensive; consent route / search rely on it)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'candidate_profiles' AND column_name = 'deleted_at'
  ) THEN
    ALTER TABLE public.candidate_profiles ADD COLUMN deleted_at TIMESTAMPTZ;
    CREATE INDEX IF NOT EXISTS idx_candidate_profiles_deleted_at
      ON public.candidate_profiles(deleted_at);
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 1. credit_packs (price list; amounts in kobo)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.credit_packs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  credits INTEGER NOT NULL CHECK (credits > 0),
  price_kobo INTEGER NOT NULL CHECK (price_kobo > 0),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

INSERT INTO public.credit_packs (id, name, credits, price_kobo, active) VALUES
  ('single',  'Single unlock', 1,  250000,  true),
  ('pack-10', '10 unlocks',    10, 1990000, true),
  ('pack-50', '50 unlocks',    50, 7490000, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  credits = EXCLUDED.credits,
  price_kobo = EXCLUDED.price_kobo,
  active = EXCLUDED.active;

-- ---------------------------------------------------------------------------
-- 2. recruiter_credits (balance) + credit_ledger (every balance change)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recruiter_credits (
  recruiter_id UUID PRIMARY KEY REFERENCES public.recruiters(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.credit_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_credit_ledger_recruiter
  ON public.credit_ledger(recruiter_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- 3. contact_unlocks (full audit trail of every purchased contact)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
  candidate_profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  credits_spent INTEGER NOT NULL DEFAULT 1,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  receipt_ref TEXT NOT NULL UNIQUE
);
CREATE INDEX IF NOT EXISTS idx_contact_unlocks_recruiter
  ON public.contact_unlocks(recruiter_id, unlocked_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS uq_contact_unlocks_pair
  ON public.contact_unlocks(recruiter_id, candidate_profile_id);

-- ---------------------------------------------------------------------------
-- 4. jd_searches (saved JD searches + AI extraction + counts)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jd_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
  job_title TEXT,
  job_description TEXT NOT NULL,
  extracted_json JSONB,
  counts_json JSONB,
  saved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_jd_searches_recruiter
  ON public.jd_searches(recruiter_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- 5. shortlists
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.shortlists (
  recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
  candidate_profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (recruiter_id, candidate_profile_id)
);

-- ---------------------------------------------------------------------------
-- 6. profile_views (candidate transparency: who viewed their profile)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profile_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_profile_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  recruiter_id UUID NOT NULL REFERENCES public.recruiters(id) ON DELETE CASCADE,
  unlocked BOOLEAN NOT NULL DEFAULT false,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_profile_views_candidate
  ON public.profile_views(candidate_profile_id, viewed_at DESC);

-- ---------------------------------------------------------------------------
-- 7. RPC: FTS rank over consented, non-deleted profiles only.
--    The consent filter lives in SQL so it can never be skipped by a caller.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.match_candidate_ranks(p_query TEXT)
RETURNS TABLE (profile_id UUID, rank REAL)
LANGUAGE plpgsql STABLE AS $$
BEGIN
  IF p_query IS NULL OR btrim(p_query) = '' THEN
    RETURN;
  END IF;
  RETURN QUERY
  SELECT
    cp.id,
    ts_rank(cp.search_vector, websearch_to_tsquery('english', p_query))::REAL AS rank
  FROM public.candidate_profiles cp
  LEFT JOIN public.candidates c ON c.id = cp.id
  WHERE cp.consent_recruiter_share = true
    AND cp.deleted_at IS NULL
    AND (c.deleted_at IS NULL)
    AND cp.search_vector @@ websearch_to_tsquery('english', p_query)
  ORDER BY rank DESC;
END $$;

-- ---------------------------------------------------------------------------
-- 8. RPC: atomic credit adjustment — balance change and ledger row in one
--    transaction. The ONLY sanctioned path for mutating recruiter_credits.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.adjust_recruiter_credits(
  p_recruiter_id UUID,
  p_delta INTEGER,
  p_reason TEXT,
  p_ref TEXT DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql AS $$
DECLARE
  v_balance INTEGER;
BEGIN
  IF p_delta = 0 THEN
    RAISE EXCEPTION 'delta must not be zero';
  END IF;

  INSERT INTO public.recruiter_credits (recruiter_id, balance)
  VALUES (p_recruiter_id, 0)
  ON CONFLICT (recruiter_id) DO NOTHING;

  UPDATE public.recruiter_credits
  SET balance = balance + p_delta,
      updated_at = timezone('utc'::text, now())
  WHERE recruiter_id = p_recruiter_id
  RETURNING balance INTO v_balance;

  IF v_balance < 0 THEN
    RAISE EXCEPTION 'insufficient_credits';
  END IF;

  INSERT INTO public.credit_ledger (recruiter_id, delta, reason, ref)
  VALUES (p_recruiter_id, p_delta, p_reason, p_ref);

  RETURN v_balance;
END $$;

-- ---------------------------------------------------------------------------
-- 9. RPC: atomic contact unlock — spend 1 credit, write ledger + unlock +
--    profile-view rows. Raises 'insufficient_credits' when balance < 1.
--    The recruiter row is locked (FOR UPDATE) so concurrent unlocks cannot
--    overspend the balance.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.unlock_candidate_contact(
  p_recruiter_id UUID,
  p_profile_id UUID,
  p_receipt_ref TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql AS $$
DECLARE
  v_balance INTEGER;
  v_found BOOLEAN;
  v_already BOOLEAN;
BEGIN
  INSERT INTO public.recruiter_credits (recruiter_id, balance)
  VALUES (p_recruiter_id, 0)
  ON CONFLICT (recruiter_id) DO NOTHING;

  SELECT balance INTO v_balance
  FROM public.recruiter_credits
  WHERE recruiter_id = p_recruiter_id
  FOR UPDATE;
  v_found := FOUND;

  -- Idempotent: if a concurrent request already unlocked this pair, the
  -- second caller is NOT charged again.
  -- (v_found captured above because SELECT INTO resets FOUND.)
  SELECT EXISTS (
    SELECT 1 FROM public.contact_unlocks
    WHERE recruiter_id = p_recruiter_id AND candidate_profile_id = p_profile_id
  ) INTO v_already;
  IF v_already THEN
    RETURN v_balance;
  END IF;

  IF NOT v_found OR v_balance < 1 THEN
    RAISE EXCEPTION 'insufficient_credits';
  END IF;

  UPDATE public.recruiter_credits
  SET balance = balance - 1,
      updated_at = timezone('utc'::text, now())
  WHERE recruiter_id = p_recruiter_id
  RETURNING balance INTO v_balance;

  INSERT INTO public.credit_ledger (recruiter_id, delta, reason, ref)
  VALUES (p_recruiter_id, -1, 'contact_unlock', p_receipt_ref);

  INSERT INTO public.contact_unlocks (recruiter_id, candidate_profile_id, credits_spent, receipt_ref)
  VALUES (p_recruiter_id, p_profile_id, 1, p_receipt_ref);

  INSERT INTO public.profile_views (candidate_profile_id, recruiter_id, unlocked)
  VALUES (p_profile_id, p_recruiter_id, true);

  RETURN v_balance;
END $$;

-- ---------------------------------------------------------------------------
-- 10. RLS: enable + restrictive policies. All marketplace routes run through
--     supabaseAdmin (service_role), which bypasses RLS. anon/authenticated get
--     no access — mirror of the restrictive pattern used on revenue tables.
-- ---------------------------------------------------------------------------
ALTER TABLE public.credit_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiter_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jd_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'credit_packs', 'recruiter_credits', 'credit_ledger', 'contact_unlocks',
    'jd_searches', 'shortlists', 'profile_views'
  ] LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Service role full access" ON public.%I', t);
    EXECUTE format(
      'CREATE POLICY "Service role full access" ON public.%I FOR ALL USING (auth.role() = ''service_role'')',
      t
    );
  END LOOP;
END $$;
