export type SanityFetchOptions = {
  /** seconds */
  revalidate?: number;
  tags?: string[];
};

type SanityQueryResponse<T> = {
  result: T;
};

import imageUrlBuilder from '@sanity/image-url';

function getSanityConfig() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';
  const token = process.env.SANITY_API_READ_TOKEN;
  return { projectId, dataset, apiVersion, token };
}

export function isSanityEnabled(): boolean {
  const { projectId } = getSanityConfig();
  return Boolean(projectId);
}

const builder = imageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
});

export function urlForImage(source: any) {
  return builder.image(source);
}

export async function sanityQuery<T>(
  query: string,
  params: Record<string, string | number> = {},
  options: SanityFetchOptions = {}
): Promise<T> {
  const { projectId, dataset, apiVersion, token } = getSanityConfig();

  if (!projectId) {
    throw new Error('SANITY_PROJECT_ID is not set');
  }

  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const res = await fetch(url.toString(), {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    next: {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Sanity query failed (${res.status}): ${text || res.statusText}`);
  }

  const json = (await res.json()) as SanityQueryResponse<T>;
  return json.result;
}
