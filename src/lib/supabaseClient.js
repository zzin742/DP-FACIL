import { createClient } from '@supabase/supabase-js';

// 🔗 Configurações vindas do arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 🚀 Cria o cliente Supabase (usa suas chaves)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
