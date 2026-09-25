-- Admin-settable pricing + USD default for recruiter credit packs.
-- Applied 2026-09-25.

ALTER TABLE credit_packs
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'USD';

UPDATE credit_packs SET price_kobo = 500,   currency = 'USD', name = 'Single unlock' WHERE id = 'single';
UPDATE credit_packs SET price_kobo = 3900,  currency = 'USD', name = '10 unlocks'    WHERE id = 'pack-10';
UPDATE credit_packs SET price_kobo = 14900, currency = 'USD', name = '50 unlocks'    WHERE id = 'pack-50';
