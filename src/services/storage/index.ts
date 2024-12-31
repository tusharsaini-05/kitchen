import { isSupabaseEnabled } from '../../config/supabase';
import { localStorage } from './local';
import { supabaseStorage } from './supabase';

// Use local storage if Supabase is not configured
export const storage = isSupabaseEnabled ? supabaseStorage : localStorage;