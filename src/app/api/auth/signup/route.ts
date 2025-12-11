import { createServerClient } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createServerClient();

    // Sign up with email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || '',
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Check if email confirmation is required
    // Send welcome email (async, don't wait)
    if (data.user?.email) {
      try {
        const { sendWelcomeEmail } = await import('@/lib/resend');
        await sendWelcomeEmail(data.user.email, name || data.user.email);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the signup if email fails
      }
    }

    if (data.user && !data.session) {
      return NextResponse.json(
        { 
          message: 'Sign up successful! Please check your email to confirm your account.',
          user: data.user,
          requiresEmailConfirmation: true,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Sign up successful',
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: 'An error occurred during sign up' },
      { status: 500 }
    );
  }
}