import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // ⭐ NEW: Fetch profile data from profiles table
    const { data: profileData, error: profileErr } = await supabase
      .from('profiles')
      .select('full_name, plan, created_at')
      .eq('id', user.id)
      .single();

    if (profileErr) {
      console.error('Profile fetch error:', profileErr);
    }

    // ⭐ Merge profile data into user object
    const mergedUser = {
      ...user,
      user_metadata: {
        ...user.user_metadata,
        full_name: profileData?.full_name ?? user.user_metadata?.full_name ?? '',
        plan: profileData?.plan ?? user.user_metadata?.plan ?? 'free',
      },
      profile: profileData ?? null,
    };

    return NextResponse.json(
      { user: mergedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching user' },
      { status: 500 }
    );
  }
}