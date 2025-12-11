// src/app/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const error_description = requestUrl.searchParams.get('error_description');
  const origin = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, error_description);
    return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent(error_description || error)}`);
  }

  if (code) {
    try {
      const supabase = await createServerClient();
      
      // Exchange the code for a session
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError);
        return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent('Authentication failed. Please try again.')}`);
      }

      // Successful authentication - redirect to home page
      return NextResponse.redirect(`${origin}/`);
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(`${origin}/auth?error=${encodeURIComponent('An unexpected error occurred')}`);
    }
  }

  // No code present - redirect to auth page
  return NextResponse.redirect(`${origin}/auth`);
}