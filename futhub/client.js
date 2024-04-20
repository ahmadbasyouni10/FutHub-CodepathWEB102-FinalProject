import { createClient } from '@supabase/supabase-js'
const APIKEY = process.env.NEXT_PUBLIC_API_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_supabaseURL
export const supabase = createClient(supabaseUrl, APIKEY)
