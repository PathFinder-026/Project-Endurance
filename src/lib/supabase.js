import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cfdtvtrohgtauhjravyl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZHR2dHJvaGd0YXVoanJhdnlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyMzE4MjYsImV4cCI6MjEwOTgwNzgyNn0.8sSFXFdoTq7bUrDeZYIG3tYphu9B_5UCtjDlOR7IVMs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

export const DEFAULT_MERCHANT_ID = import.meta.env.VITE_DEFAULT_MERCHANT_ID || 'a0000000-0000-0000-0000-000000000001';

