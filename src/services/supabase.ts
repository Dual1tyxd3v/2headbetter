import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ohopguuizrdqesfynmzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob3BndXVpenJkcWVzZnlubXprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyODE5ODAsImV4cCI6MjAxNTg1Nzk4MH0.XO5fbp0Fb3yKRd8bQFycNyWvmWQOYIATWT0ZtuOtFVE';
const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseStorage = 'https://ohopguuizrdqesfynmzk.supabase.co/storage/v1/object/public/charts/';

export default supabase;
