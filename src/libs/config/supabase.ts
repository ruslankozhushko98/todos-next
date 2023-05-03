import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

export const supabase = createClient(
  String(process.env.SUPABASE_URL),
  String(process.env.ANON_API_KEY),
);
