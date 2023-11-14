import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

const URL = process.env.SUPABASE_URL as string;
const KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient<Database>(URL, KEY);

export default supabase;
