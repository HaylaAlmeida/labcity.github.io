import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Revalidation secret set in Sanity webhook settings
const secret = process.env.SANITY_REVALIDATE_SECRET;

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

    // Suporte para revalidação manual via URL (ex: /api/revalidate?secret=...)
    if (manualSecret && manualSecret === secret) {
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
      return new Response('Method Not Allowed', { status: 405 });
    }

    const { isValidSignature, body } = await parseBody(req, secret);
    console.log(`[Webhook] Received request. Type: ${body?._type}, ID: ${body?._id}`);
    console.log(`[Webhook] Is signature valid? ${isValidSignature}`);

    if (!isValidSignature) {
      console.error('[Webhook] Invalid signature');
      return new Response('Invalid signature', { status: 401 });
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
