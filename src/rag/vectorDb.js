/**
 * In-Memory & Remote Vector Database Client
 * Implements tokenization, TF-IDF vector generation, and Cosine Similarity.
 * Supports configurable remote vector DB endpoints (Pinecone / Supabase / Qdrant) via environment variables.
 */

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
  "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
  "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is",
  "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",
  "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should",
  "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them",
  "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've",
  "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd",
  "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's",
  "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't",
  "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

export class VectorDatabase {
  constructor() {
    // Read configuration from Next.js process.env or Vite import.meta.env
    const env = typeof process !== "undefined" && process.env ? process.env : (typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : {});
    const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";

    const storedProvider = isBrowser ? localStorage.getItem("satyam_vector_provider") : null;
    const storedUrl = isBrowser ? localStorage.getItem("satyam_vector_url") : null;
    const storedKey = isBrowser ? localStorage.getItem("satyam_vector_key") : null;

    const defaultUrl = env.UPSTASH_VECTOR_REST_URL || env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_URL || env.VITE_VECTOR_DB_URL || "";
    const defaultKey = env.UPSTASH_VECTOR_REST_TOKEN || env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_TOKEN || env.VITE_VECTOR_DB_API_KEY || "";

    this.provider = storedProvider || (defaultUrl.includes("upstash.io") ? "upstash" : (env.VITE_VECTOR_DB_PROVIDER || "inmemory"));
    this.dbUrl = storedUrl || defaultUrl;
    this.apiKey = storedKey || defaultKey;
    this.collection = env.VITE_VECTOR_DB_COLLECTION || "satyam_portfolio_embeddings";
    this.defaultTopK = parseInt(env.VITE_VECTOR_DB_TOP_K, 10) || 3;

    this.documents = [];
    this.vocabulary = new Map();
    this.inverseDocFreq = new Map();
    this.docVectors = [];
    this.docNorms = [];
    this.isIndexed = false;
  }

  setVectorCredentials(provider, url, key) {
    this.provider = provider;
    this.dbUrl = url;
    this.apiKey = key;
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("satyam_vector_provider", provider);
      localStorage.setItem("satyam_vector_url", url);
      localStorage.setItem("satyam_vector_key", key);
    }
  }

  /**
   * Returns current Vector DB configuration details for UI and telemetry
   */
  getConfig() {
    const isUpstash = Boolean(this.dbUrl && this.dbUrl.includes("upstash.io"));
    return {
      provider: isUpstash ? "Upstash Cloud Vector DB" : (this.provider === "inmemory" ? "In-Memory Vector Engine" : this.provider),
      dbUrl: this.dbUrl ? `${this.dbUrl.slice(0, 24)}...` : "in-memory (browser)",
      collection: this.collection,
      isRemote: isUpstash || (this.provider !== "inmemory" && Boolean(this.dbUrl)),
      documentsCount: this.documents.length,
      isIndexed: this.isIndexed
    };
  }

  /**
   * Tokenize text into normalized terms and bigrams
   */
  tokenize(text) {
    if (!text) return [];
    const clean = text
      .toLowerCase()
      .replace(/https?:\/\/[^\s]+/g, "url")
      .replace(/[^a-z0-9+#_.-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const rawTokens = clean.split(" ").filter(t => t.length > 1 && !STOP_WORDS.has(t));
    const tokens = [...rawTokens];

    // Include select bigrams for better contextual matching (e.g. 'nextjs ssr', 'axis bank', 'core web')
    for (let i = 0; i < rawTokens.length - 1; i++) {
      tokens.push(`${rawTokens[i]}_${rawTokens[i + 1]}`);
    }

    return tokens;
  }

  /**
   * Load and index documents
   */
  index(documents) {
    this.documents = documents;
    const N = documents.length;
    const docTokenFreqs = [];
    const docFreq = new Map();

    // 1. Build document frequency and vocabulary
    documents.forEach((doc) => {
      const combinedText = `${doc.title} ${doc.tags.join(" ")} ${doc.tags.join(" ")} ${doc.content}`;
      const tokens = this.tokenize(combinedText);
      const tf = new Map();

      tokens.forEach(token => {
        tf.set(token, (tf.get(token) || 0) + 1);
      });

      docTokenFreqs.push({ tf, total: tokens.length });

      for (const term of tf.keys()) {
        docFreq.set(term, (docFreq.get(term) || 0) + 1);
        if (!this.vocabulary.has(term)) {
          this.vocabulary.set(term, this.vocabulary.size);
        }
      }
    });

    // 2. Compute IDF: log(1 + (N - df + 0.5) / (df + 0.5))
    for (const [term, df] of docFreq.entries()) {
      const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5)) + 1.0;
      this.inverseDocFreq.set(term, idf);
    }

    // 3. Build document vectors and precompute norms
    this.docVectors = [];
    this.docNorms = [];

    docTokenFreqs.forEach(({ tf, total }) => {
      const vector = new Map();
      let sumSquares = 0;

      for (const [term, count] of tf.entries()) {
        const idf = this.inverseDocFreq.get(term) || 1.0;
        const weight = (count / (total || 1)) * idf;
        vector.set(term, weight);
        sumSquares += weight * weight;
      }

      this.docVectors.push(vector);
      this.docNorms.push(Math.sqrt(sumSquares) || 1e-9);
    });

    this.isIndexed = true;
    console.log(`[VectorDB] Indexed ${documents.length} knowledge chunks. Provider: ${this.provider}. Vocabulary: ${this.vocabulary.size} terms.`);
  }

  /**
   * Embed a search query into vector space
   */
  embedQuery(queryString) {
    const tokens = this.tokenize(queryString);
    const tf = new Map();
    tokens.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));

    const vector = new Map();
    let sumSquares = 0;

    for (const [term, count] of tf.entries()) {
      if (this.inverseDocFreq.has(term)) {
        const idf = this.inverseDocFreq.get(term);
        const weight = (count / tokens.length) * idf;
        vector.set(term, weight);
        sumSquares += weight * weight;
      }
    }

    const norm = Math.sqrt(sumSquares) || 1e-9;
    return { vector, norm, tokens };
  }

  /**
   * Cosine Similarity Search: finds top-k nearest document chunks
   * Supports optional remote vector DB fallback if configured
   */
  async search(queryString, topK = null) {
    const k = topK || this.defaultTopK;

    // 1. Try Next.js Serverless Vector Search API route (Upstash Cloud Vector DB)
    if (typeof window !== "undefined") {
      try {
        const apiRes = await fetch("/api/vector-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: queryString, topK: k })
        });
        if (apiRes.ok) {
          const data = await apiRes.json();
          if (data.success && data.results && data.results.length > 0) {
            console.log(`[VectorDB] Retrieved ${data.results.length} chunks from Upstash Cloud Vector DB via /api/vector-search (${data.latencyMs}ms)`);
            return data.results;
          }
        }
      } catch (err) {
        // Silent fallback to direct or local vector engine
      }
    }

    // 2. Direct Upstash Cloud Vector DB query if URL & Token present
    if (this.dbUrl && this.apiKey && this.dbUrl.includes("upstash.io")) {
      try {
        const upstashResults = await this.queryUpstashVectorDb(queryString, k);
        if (upstashResults && upstashResults.length > 0) {
          console.log(`[VectorDB] Retrieved ${upstashResults.length} chunks directly from Upstash Cloud Vector DB`);
          return upstashResults;
        }
      } catch (err) {
        console.warn("[VectorDB] Direct Upstash query failed, falling back to local vector engine:", err.message);
      }
    }

    // 3. Optional Remote Generic Vector DB API call
    if (this.provider !== "inmemory" && this.dbUrl && this.apiKey && !this.dbUrl.includes("upstash.io")) {
      try {
        const remoteResults = await this.queryRemoteVectorDb(queryString, k);
        if (remoteResults && remoteResults.length > 0) {
          return remoteResults;
        }
      } catch (err) {
        console.warn("[VectorDB] Remote query failed, falling back to in-memory vector store:", err.message);
      }
    }

    // 4. High-Fidelity Local In-Memory Cosine Similarity Vector Search
    return this.searchLocal(queryString, k);
  }

  /**
   * Local in-memory Cosine Similarity
   */
  searchLocal(queryString, topK = 3) {
    if (!this.isIndexed) {
      throw new Error("VectorDatabase is not indexed yet.");
    }

    const { vector: qVec, norm: qNorm } = this.embedQuery(queryString);
    if (qVec.size === 0) {
      return this.documents.slice(0, topK).map(doc => ({
        chunk: doc,
        similarity: 0.5,
        percentage: "50.0%",
        source: "vector_db"
      }));
    }

    const results = [];

    for (let i = 0; i < this.documents.length; i++) {
      const dVec = this.docVectors[i];
      const dNorm = this.docNorms[i];

      let dotProduct = 0;
      for (const [term, qWeight] of qVec.entries()) {
        if (dVec.has(term)) {
          dotProduct += qWeight * dVec.get(term);
        }
      }

      let tagBonus = 0;
      const doc = this.documents[i];
      const queryLower = queryString.toLowerCase();
      doc.tags.forEach(tag => {
        if (queryLower.includes(tag.toLowerCase())) tagBonus += 0.08;
      });
      if (queryLower.includes(doc.title.toLowerCase())) tagBonus += 0.15;

      const baseCosine = dotProduct / (qNorm * dNorm);
      const score = Math.min(0.99, Math.max(0, baseCosine * 0.85 + tagBonus));

      results.push({
        chunk: doc,
        similarity: score,
        percentage: (score * 100).toFixed(1) + "%",
        source: `vector_db:${this.collection}`
      });
    }

    results.sort((a, b) => b.similarity - a.similarity);
    return results.slice(0, topK);
  }

  /**
   * Remote Vector Database Fetcher (Pinecone / Supabase / Qdrant)
   */
  async queryRemoteVectorDb(queryString, topK) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${this.dbUrl}/vectors/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        collection: this.collection,
        query: queryString,
        topK
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return data.matches.map(m => ({
      chunk: {
        id: m.id,
        title: m.metadata?.title || m.id,
        content: m.metadata?.content || m.text || "",
        tags: m.metadata?.tags || []
      },
      similarity: m.score || 0.85,
      percentage: ((m.score || 0.85) * 100).toFixed(1) + "%",
      source: `remote:${this.provider}`
    }));
  }

  /**
   * Direct Upstash Cloud Vector Database Query
   */
  async queryUpstashVectorDb(queryString, topK = 3) {
    const cleanUrl = this.dbUrl.replace(/\/+$/, '');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${cleanUrl}/query-data`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: queryString,
        topK,
        includeMetadata: true,
        includeData: true
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);
    if (!res.ok) throw new Error(`Upstash HTTP ${res.status}`);

    const data = await res.json();
    const matches = Array.isArray(data.result) ? data.result : [];

    return matches.map(item => {
      const score = typeof item.score === "number" ? Math.min(0.99, item.score) : 0.85;
      return {
        chunk: {
          id: item.id,
          title: item.metadata?.title || item.id,
          content: item.data || item.metadata?.content || "",
          tags: Array.isArray(item.metadata?.tags) ? item.metadata.tags : []
        },
        similarity: score,
        percentage: (score * 100).toFixed(1) + "%",
        source: "upstash_cloud_vector_db"
      };
    });
  }
}
