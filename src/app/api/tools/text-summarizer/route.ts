import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Limit configuration
const RATE_LIMIT = 5; // max requests
const WINDOW_MS = 3 * 60 * 60 * 1000; // 3 hours


// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(req: NextRequest): string {
  // Use IP address or fallback to a header
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(key: string, limit: number = RATE_LIMIT, windowMs: number = WINDOW_MS ): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(key);

  if (!userLimit || now > userLimit.resetTime) {
    // First request or window expired - reset
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= limit) {
    // Limit exceeded
    return false;
  }

  // Increment count
  userLimit.count++;
  return true;
}

function getRemainingTime(key: string): number {
  const userLimit = rateLimitMap.get(key);
  if (!userLimit) return 0;
  const remaining = Math.ceil((userLimit.resetTime - Date.now()) / 1000 / 60); // minutes
  return Math.max(0, remaining);
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey, RATE_LIMIT, WINDOW_MS)) {
      const remainingMinutes = getRemainingTime(rateLimitKey);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: `You've reached your limit of ${RATE_LIMIT} requests every 3 hours. Please try again in ${remainingMinutes} minutes.`,
          resetIn: remainingMinutes
        },
        { status: 429 }
      );
    }

    const { text, action, length = 'medium' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide text to process.' },
        { status: 400 }
      );
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Please add HUGGINGFACE_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    // Limit text length
    const maxLength = 10000;
    const processText = text.slice(0, maxLength);

    // Determine max/min lengths based on user's choice
    const lengthParams = {
      short: { max: 80, min: 20 },
      medium: { max: 150, min: 30 },
      long: { max: 250, min: 50 }
    };

    const { max, min } = lengthParams[length as keyof typeof lengthParams] || lengthParams.medium;

    if (action === 'summarize') {
      // Use BART model for summarization
      const summary = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: processText,
        parameters: {
          max_length: max,
          min_length: min,
        }
      });

      // Handle both array and object response forms
      const summaryText = Array.isArray(summary)
        ? summary[0]?.summary_text
        : (summary as any)?.summary_text;

      return NextResponse.json({
        success: true,
        data: {
          summary: summaryText,
          originalLength: text.length,
          summaryLength: summaryText?.length ?? 0,
          action: 'summarize'
        },
      });
    }

    if (action === 'title') {
      // Use BART for title generation by treating it as a very short summary
      const result = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: processText.slice(0, 1000),
        parameters: {
          max_length: 15,
          min_length: 5,
        }
      });

      // Handle both array and object response forms
      const titleText = Array.isArray(result)
        ? result[0]?.summary_text
        : (result as any)?.summary_text;

      let title = titleText?.trim() || '';
      
      // Capitalize first letter and clean up
      title = title.charAt(0).toUpperCase() + title.slice(1);
      // Remove period at the end if present
      title = title.replace(/\.$/, '');
      
      return NextResponse.json({
        success: true,
        data: {
          title,
          action: 'title'
        },
      });
    }

    if (action === 'bullets') {
      // Generate bullet points by creating a summary and splitting into points
      const summary = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: processText,
        parameters: {
          max_length: max,
          min_length: min,
        }
      });

      // Handle both array and object response forms
      const summaryText = Array.isArray(summary)
        ? summary[0]?.summary_text
        : (summary as any)?.summary_text;

      // Split summary into sentences and format as bullet points
      const safeSummary = String(summaryText || "");
      const sentences = safeSummary
        .split(/[.!?]+/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 10);


      return NextResponse.json({
        success: true,
        data: {
          bullets: sentences,
          action: 'bullets'
        },
      });
    }

    if (action === 'both') {
      // Do both summarization and title generation
      const summaryPromise = hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: processText,
        parameters: {
          max_length: max,
          min_length: min,
        }
      });

      const titlePromise = hf.summarization({
        model: 't5-base',
        inputs: `summarize: ${processText.slice(0, 500)}`,
        parameters: {
          max_length: 20,
          min_length: 5,
        }
      });

      const [summaryResult, titleResult] = await Promise.all([
        summaryPromise,
        titlePromise,
      ]);

      // Handle both array and object response forms
      const summaryText = Array.isArray(summaryResult)
        ? summaryResult[0]?.summary_text
        : (summaryResult as any)?.summary_text;

      const titleTextRaw = Array.isArray(titleResult)
        ? titleResult[0]?.summary_text
        : (titleResult as any)?.summary_text;

      let title = (titleTextRaw || "").trim();
      title = title.charAt(0).toUpperCase() + title.slice(1);

      return NextResponse.json({
        success: true,
        data: {
          summary: summaryText,
          title,
          originalLength: text.length,
          summaryLength: summaryText?.length ?? 0,
          action: 'both',
        },
      });
    }


    return NextResponse.json(
      { error: 'Invalid action. Use: summarize, title, bullets, or both' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Text processing error:', error);
    
    // Better error messages
    let errorMessage = 'Failed to process text';
    if (error.message?.includes('Model') || error.message?.includes('not available')) {
      errorMessage = 'AI model temporarily unavailable. Please try again in a moment.';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Text Summarizer & Title Generator API',
    usage: 'POST with { text: "...", action: "summarize" | "title" | "bullets" | "both", length: "short" | "medium" | "long" }',
    rateLimit: "5 requests every 3 hours per IP (stored in Supabase)",
  });
}