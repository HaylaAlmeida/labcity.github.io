import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Revalidation secret set in Sanity webhook settings
const secret = process.env.SANITY_REVALIDATE_SECRET?.trim().replace(/^["'](.+)["']$/, '$1');

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}

async function handleRevalidation(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const manualSecret = searchParams.get('secret');

    // Log para depuração de env (anonimizado para segurança)
    console.log(`[Webhook] Server Secret configured? ${Boolean(secret)} (Length: ${secret?.length ?? 0})`);
    if (manualSecret) {
      console.log(`[Webhook] manualSecret length: ${manualSecret.length}`);
    }

    // Suporte para revalidação manual via URL (ex: /api/revalidate?secret=...)
    if (manualSecret && secret && manualSecret === secret) {
      console.log('[Webhook] Manual revalidation triggered via URL');
      revalidateTag('sanity-data', 'default');
      return NextResponse.json({
        status: 200,
        revalidated: true,
        type: 'manual',
        now: Date.now()
      });
    }

    // Apenas POST pode processar o body do Sanity
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed (or manual secret mismatch)', { status: 405 });
    }

    if (!secret) {
      console.error('[Webhook] SANITY_REVALIDATE_SECRET is NOT SET in environment variables');
      return new Response('Server configuration error: Missing Secret', { status: 500 });
    }

    const { isValidSignature, body } = await parseBody(req, secret);
    console.log(`[Webhook] Received request. Type: ${body?._type}, ID: ${body?._id}`);
    console.log(`[Webhook] Is signature valid? ${isValidSignature}`);

    if (!isValidSignature) {
      console.error('[Webhook] Invalid signature');
      return new Response('Invalid signature (check SANITY_REVALIDATE_SECRET in both Vercel and Sanity)', { status: 401 });
    }

    if (!body?._type) {
      console.error('[Webhook] Bad request: missing _type');
      return new Response('Bad Request', { status: 400 });
    }

    // Always revalidate the base sanity-data tag we injected in sanityQuery
    console.log('[Webhook] Revalidating tag: sanity-data');
    revalidateTag('sanity-data', 'default');

    // Also revalidate specific tags if they match the document type
    console.log(`[Webhook] Revalidating tag: ${body._type}`);
    revalidateTag(body._type, 'default');

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body
    });
  } catch (err: any) {
    console.error('[Webhook] Error during revalidation:', err);
    return new Response(err.message, { status: 500 });
  }
}
