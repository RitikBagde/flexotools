import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_LIMIT = 5;
const WINDOW_MS = 3 * 60 * 60 * 1000;

// BART's safe input limit in characters (~1024 tokens ≈ 3500–4000 chars)
const CHUNK_SIZE = 3500;
const MAX_INPUT_CHARS = 20000; // allow longer docs via chunking

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip =
    forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(
  key: string,
  limit: number = RATE_LIMIT,
  windowMs: number = WINDOW_MS
): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(key);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (userLimit.count >= limit) return false;
  userLimit.count++;
  return true;
}

function getRemainingTime(key: string): number {
  const userLimit = rateLimitMap.get(key);
  if (!userLimit) return 0;
  return Math.max(0, Math.ceil((userLimit.resetTime - Date.now()) / 1000 / 60));
}

/**
 * Split text into chunks that fit within BART's token window.
 * Splits on sentence boundaries when possible to avoid cutting mid-sentence.
 */
function splitIntoChunks(text: string, chunkSize: number = CHUNK_SIZE): string[] {
  if (text.length <= chunkSize) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= chunkSize) {
      chunks.push(remaining.trim());
      break;
    }

    // Try to split at a sentence boundary within the chunk window
    const slice = remaining.slice(0, chunkSize);
    const lastSentenceEnd = Math.max(
      slice.lastIndexOf('. '),
      slice.lastIndexOf('! '),
      slice.lastIndexOf('? '),
      slice.lastIndexOf('\n\n')
    );

    const splitAt = lastSentenceEnd > chunkSize * 0.5 ? lastSentenceEnd + 1 : chunkSize;

    chunks.push(remaining.slice(0, splitAt).trim());
    remaining = remaining.slice(splitAt).trim();
  }

  return chunks.filter(Boolean);
}

/**
 * Summarize text, automatically chunking if it exceeds BART's limit.
 * For multi-chunk texts, summarizes each chunk then summarizes the combined result.
 */
async function summarizeText(
  text: string,
  maxLength: number,
  minLength: number
): Promise<string> {
  const chunks = splitIntoChunks(text);

  if (chunks.length === 1) {
    // Single chunk — direct summarization
    const result = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: chunks[0],
      parameters: { max_length: maxLength, min_length: minLength },
    });
    const r = Array.isArray(result) ? result[0] : (result as any);
    return r?.summary_text ?? '';
  }

  // Multi-chunk: summarize each chunk individually
  const chunkSummaries = await Promise.all(
    chunks.map((chunk) =>
      hf
        .summarization({
          model: 'facebook/bart-large-cnn',
          inputs: chunk,
          // Shorter per-chunk summaries so combined text fits for final pass
          parameters: { max_length: 120, min_length: 20 },
        })
        .then((r) => {
          const item = Array.isArray(r) ? r[0] : (r as any);
          return (item?.summary_text ?? '').trim();
        })
    )
  );

  const combined = chunkSummaries.join(' ');

  // Final summarization pass over the combined chunk summaries
  if (combined.length <= CHUNK_SIZE) {
    const final = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: combined,
      parameters: { max_length: maxLength, min_length: minLength },
    });
    const r = Array.isArray(final) ? final[0] : (final as any);
    return r?.summary_text ?? combined;
  }

  // If combined summaries are still too long, return them joined as-is
  return combined;
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey, RATE_LIMIT, WINDOW_MS)) {
      const remainingMinutes = getRemainingTime(rateLimitKey);
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `You've reached your limit of ${RATE_LIMIT} requests every 3 hours. Please try again in ${remainingMinutes} minutes.`,
          resetIn: remainingMinutes,
        },
        { status: 429 }
      );
    }

    const { text, action, length = 'medium' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Please provide text to process.' }, { status: 400 });
    }

    if (!process.env.HUGGINGFACE_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Please add HUGGINGFACE_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const processText = text.slice(0, MAX_INPUT_CHARS);

    const lengthParams = {
      short:  { max: 80,  min: 20 },
      medium: { max: 150, min: 30 },
      long:   { max: 250, min: 50 },
    };
    const { max, min } =
      lengthParams[length as keyof typeof lengthParams] ?? lengthParams.medium;

    // ── summarize ────────────────────────────────────────────────────────────
    if (action === 'summarize') {
      const summaryText = await summarizeText(processText, max, min);

      return NextResponse.json({
        success: true,
        data: {
          summary: summaryText,
          originalLength: text.length,
          summaryLength: summaryText.length,
          action: 'summarize',
        },
      });
    }

    // ── title ────────────────────────────────────────────────────────────────
    if (action === 'title') {
      // Use only the first chunk for title generation — titles need the opening context
      const titleInput = processText.slice(0, CHUNK_SIZE);

      const result = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: titleInput,
        parameters: { max_length: 15, min_length: 5 },
      });

      const r = Array.isArray(result) ? result[0] : (result as any);
      let title = (r?.summary_text ?? '').trim();
      title = title.charAt(0).toUpperCase() + title.slice(1);
      title = title.replace(/\.$/, '');

      return NextResponse.json({ success: true, data: { title, action: 'title' } });
    }

    // ── bullets ──────────────────────────────────────────────────────────────
    if (action === 'bullets') {
      // Get a longer summary so we have enough content for multiple bullet points
      const bulletsMax = Math.max(max, 200);
      const bulletsMin = Math.max(min, 60);
      const summaryText = await summarizeText(processText, bulletsMax, bulletsMin);

      const sentences = summaryText
        .split(/(?<=[.!?])\s+/)           // split after sentence-ending punctuation
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 10);

      return NextResponse.json({
        success: true,
        data: { bullets: sentences, action: 'bullets' },
      });
    }

    // ── both ─────────────────────────────────────────────────────────────────
    if (action === 'both') {
      // Run summary (full text with chunking) and title (first chunk) in parallel
      const summaryPromise = summarizeText(processText, max, min);

      const titleInput = processText.slice(0, CHUNK_SIZE);
      const titlePromise = hf
        .summarization({
          model: 'facebook/bart-large-cnn',
          inputs: titleInput,
          parameters: { max_length: 15, min_length: 5 },
        })
        .then((r) => {
          const item = Array.isArray(r) ? r[0] : (r as any);
          let t = (item?.summary_text ?? '').trim();
          t = t.charAt(0).toUpperCase() + t.slice(1);
          return t.replace(/\.$/, '');
        });

      const [summaryText, title] = await Promise.all([summaryPromise, titlePromise]);

      return NextResponse.json({
        success: true,
        data: {
          summary: summaryText,
          title,
          originalLength: text.length,
          summaryLength: summaryText.length,
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

    let errorMessage = 'Failed to process text';
    if (error.message?.includes('Model') || error.message?.includes('not available')) {
      errorMessage = 'AI model temporarily unavailable. Please try again in a moment.';
    } else if (error.message?.includes('413') || error.message?.includes('too long')) {
      errorMessage = 'Text is too long even after chunking. Try a shorter input.';
    }

    return NextResponse.json({ error: errorMessage, details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Text Summarizer & Title Generator API',
    usage: 'POST with { text: "...", action: "summarize" | "title" | "bullets" | "both", length: "short" | "medium" | "long" }',
    rateLimit: `${RATE_LIMIT} requests every 3 hours per IP`,
    maxInputLength: `${MAX_INPUT_CHARS} characters (chunked automatically)`,
  });
}