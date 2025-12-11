// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient as createBrowserSupabaseClient, createServerClient as createServerSupabaseClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Basic Supabase client (for general use - your existing one, now with auth config)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Client-side Supabase client (for use in client components with auth)
export const createBrowserClient = () => {
  return createBrowserSupabaseClient(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client (for use in server components and API routes)
export const createServerClient = async () => {
  const cookieStore = await cookies();
  
  return createServerSupabaseClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};

// Helper function to get current user (server-side)
export const getCurrentUser = async () => {
  const supabase = await createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting user:', error);
    return null;
  }
  
  return user;
};

// Helper function to check if user is authenticated (server-side)
export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return !!user;
};