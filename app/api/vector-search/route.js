import { NextResponse } from 'next/server';

/**
 * Serverless Route Handler: Upstash Cloud Vector Database Query
 * Queries Upstash Vector using built-in embedding and cosine similarity.
 */
export async function POST(request) {
  try {
    const { query, topK = 3 } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const upstashUrl = process.env.UPSTASH_VECTOR_REST_URL || process.env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_URL;
    const upstashToken = process.env.UPSTASH_VECTOR_REST_TOKEN || process.env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_TOKEN;

    if (!upstashUrl || !upstashToken) {
      return NextResponse.json({
        success: false,
        isConfigured: false,
        message: 'Upstash Vector DB credentials not configured in environment variables.'
      });
    }

    const cleanUrl = upstashUrl.replace(/\/+$/, '');
    const startTime = performance.now();

    const response = await fetch(`${cleanUrl}/query-data`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${upstashToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: query,
        topK: Number(topK) || 3,
        includeMetadata: true,
        includeData: true
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('[Upstash Vector Notice]: Upstream returned HTTP', response.status, errorText);
      return NextResponse.json({
        success: false,
        fallback: true,
        upstreamStatus: response.status,
        error: errorText,
        message: 'Upstash returned an error. Using high-speed in-browser vector engine.'
      });
    }

    const data = await response.json();
    const latencyMs = (performance.now() - startTime).toFixed(1);

    const matches = Array.isArray(data.result) ? data.result : [];

    const formattedResults = matches.map((item) => {
      const score = typeof item.score === 'number' ? Math.min(0.99, item.score) : 0.85;
      return {
        chunk: {
          id: item.id,
          title: item.metadata?.title || item.id,
          content: item.data || item.metadata?.content || '',
          tags: Array.isArray(item.metadata?.tags) ? item.metadata.tags : []
        },
        similarity: score,
        percentage: (score * 100).toFixed(1) + '%',
        source: 'upstash_cloud_vector_db'
      };
    });

    return NextResponse.json({
      success: true,
      isConfigured: true,
      latencyMs,
      count: formattedResults.length,
      results: formattedResults
    });
  } catch (error) {
    console.error('[Vector Search Route Handler Exception]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
