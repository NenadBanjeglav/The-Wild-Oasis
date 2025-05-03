import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://akjkrldfflwrzrghpquw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFramtybGRmZmx3cnpyZ2hwcXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxOTE5NzgsImV4cCI6MjA2MTc2Nzk3OH0.NzSxd2iDoMWCXH64sMkjGb-YEnJYeaBl17RaAyev4jc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
