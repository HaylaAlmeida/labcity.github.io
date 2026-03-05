import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Revalidation secret set in Sanity webhook settings
const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody(req, secret);

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }
    // Always revalidate the base sanity-data tag we injected in sanityQuery
    revalidateTag('sanity-data', 'default');

    // Also revalidate specific tags if they match the document type
    revalidateTag(body._type, 'default');

    return NextResponse.json({ status: 200, revalidated: true, now: Date.now(), body });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
