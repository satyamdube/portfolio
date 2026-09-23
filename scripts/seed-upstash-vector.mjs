/**
 * Upstash Vector DB Seeding Script
 * 
 * Ingests all 17 portfolio knowledge chunks into Upstash Cloud Vector Database.
 * Upstash automatically embeds the text using its built-in embedding model (e.g. BAAI/bge-small-en-v1.5).
 * 
 * Usage:
 *   node scripts/seed-upstash-vector.mjs
 */

import { ragKnowledgeBase } from '../src/data/ragKnowledgeBase.js';
import fs from 'fs';
import path from 'path';

// Helper to read .env or .env.local if not already in process.env
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const filePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...vals] = trimmed.split('=');
          const value = vals.join('=').trim().replace(/^["']|["']$/g, '');
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = value;
          }
        }
      }
    }
  }
}

loadEnv();

const upstashUrl = process.env.UPSTASH_VECTOR_REST_URL || process.env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_URL;
const upstashToken = process.env.UPSTASH_VECTOR_REST_TOKEN || process.env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_TOKEN;

async function seed() {
  console.log('====================================================');
  console.log('🚀 Seeding Upstash Cloud Vector Database');
  console.log('====================================================');

  if (!upstashUrl || !upstashToken) {
    console.error('\n❌ Missing Upstash Vector credentials!');
    console.error('Please set UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN in your .env or .env.local file:');
    console.error('  UPSTASH_VECTOR_REST_URL=https://<your-index>.upstash.io');
    console.error('  UPSTASH_VECTOR_REST_TOKEN=<your-token>\n');
    process.exit(1);
  }

  const cleanUrl = upstashUrl.replace(/\/+$/, '');
  console.log(`Connecting to: ${cleanUrl.slice(0, 30)}...`);
  console.log(`Knowledge chunks to index: ${ragKnowledgeBase.length}`);

  // Format documents for Upstash /upsert-data endpoint
  const batch = ragKnowledgeBase.map((chunk) => ({
    id: chunk.id,
    data: `${chunk.title}\nKeywords: ${chunk.tags.join(', ')}\n${chunk.content}`,
    metadata: {
      title: chunk.title,
      tags: chunk.tags,
      content: chunk.content
    }
  }));

  console.log(`\nUploading ${batch.length} chunks to Upstash...`);
  const startTime = Date.now();

  try {
    const res = await fetch(`${cleanUrl}/upsert-data`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${upstashToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(batch)
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Upstash API returned ${res.status}: ${err}`);
    }

    const json = await res.json();
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`\n✅ Successfully indexed ${batch.length} chunks in ${duration}s!`);
    console.log('Response:', json);
    console.log('\nYour Upstash Cloud Vector DB is now fully seeded and ready to receive queries!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
