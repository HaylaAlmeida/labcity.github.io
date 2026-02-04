import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const DEFAULT_TAGS = ['sanity:publications', 'sanity:projects', 'sanity:team'];

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;

  const fromQuery = req.nextUrl.searchParams.get('secret');
  const fromHeader = req.headers.get('x-revalidate-secret');

  return fromQuery === secret || fromHeader === secret;
}

function parseTags(req: NextRequest): string[] {
  const tagParam = req.nextUrl.searchParams.get('tag');
  if (tagParam) return [tagParam];
  return DEFAULT_TAGS;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const tags = parseTags(req);
  for (const tag of tags) revalidateTag(tag, {});

  return NextResponse.json({ ok: true, revalidated: tags });
}

export async function GET(req: NextRequest) {
  return POST(req);
}
