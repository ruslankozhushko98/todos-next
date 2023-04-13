import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.BASE_URL,
  process.env.ANON_API_KEY,
);
