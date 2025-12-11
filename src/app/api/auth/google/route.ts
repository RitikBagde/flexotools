// src/app/api/auth/google/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Google OAuth error:', error);
      
      // Check if provider is not enabled
      if (error.message.includes('provider is not enabled') || error.message.includes('Unsupported provider')) {
        return NextResponse.json(
          { error: 'Google sign-in is not configured yet. Please use email/password to sign in.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!data.url) {
      return NextResponse.json(
        { error: 'No redirect URL received from authentication provider' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { url: data.url },
      { status: 200 }
    );
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'An error occurred during Google sign in' },
      { status: 500 }
    );
  }
}