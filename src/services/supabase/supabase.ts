import { createClient } from '@supabase/supabase-js';

const URL = process.env.SUPABASE_URL as string;
const KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient(URL, KEY);

export default supabase;