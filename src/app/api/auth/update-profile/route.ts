import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient();
    const body = await req.json();
    const { full_name } = body;

    if (!full_name) {
      return NextResponse.json(
        { error: 'full_name required' },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = user.id;

    // ⭐ Update profiles table (primary source of truth)
    const { error: upsertErr } = await supabase.from('profiles').upsert({
      id: userId,
      full_name,
    }, { onConflict: 'id' });

    if (upsertErr) {
      console.error('profiles upsert error:', upsertErr);
      return NextResponse.json(
        { error: upsertErr.message },
        { status: 500 }
      );
    }

    // ⭐ Also update auth user metadata (optional, for consistency)
    const { data: updateData, error: updateErr } = await supabase.auth.updateUser({
      data: { full_name },
    });

    if (updateErr) {
      console.warn('auth.updateUser failed:', updateErr.message);
    }

    return NextResponse.json(
      { user: updateData?.user || user },
      { status: 200 }
    );
  } catch (err) {
    console.error('Update profile error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}