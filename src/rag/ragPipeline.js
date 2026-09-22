/**
 * Complete End-to-End RAG (Retrieval-Augmented Generation) Pipeline
 * 
 * Pipeline Architecture:
 * 1. Document Ingestion & Chunking
 * 2. Vector Embedding & Database Indexing
 * 3. Query Ingestion, Normalization & Intent Recognition
 * 4. Vector DB Semantic Cosine Similarity Retrieval
 * 5. Re-ranking & Confidence Scoring
 * 6. Context Augmentation (Grounding Prompt Formulation)
 * 7. Streaming LLM Synthesis with Real-Time Pipeline Trace
 */

import { VectorDatabase } from "./vectorDb.js";
import { AISynthesizer } from "./aiSynthesizer.js";
import { ragKnowledgeBase } from "../data/ragKnowledgeBase.js";

export class RAGPipeline {
  constructor() {
    this.vectorDb = new VectorDatabase();
    this.synthesizer = new AISynthesizer();
    this.isInitialized = false;
    this.lastTrace = null;
  }

  /**
   * Pipeline Stage 1: Document Ingestion & Vector Indexing
   */
  async initialize() {
    if (this.isInitialized) return;

    const startTime = performance.now();
    console.log("[RAG Pipeline] Initializing Document Ingestion & Vector DB Indexing...");

    // Chunk and index knowledge documents
    this.vectorDb.index(ragKnowledgeBase);
    this.isInitialized = true;

    const indexingDuration = (performance.now() - startTime).toFixed(1);
    console.log(`[RAG Pipeline] Indexed ${ragKnowledgeBase.length} knowledge chunks in ${indexingDuration}ms.`);
  }

  /**
   * Pipeline Stage 2: Query Preprocessing & Intent Recognition
   */
  preprocessQuery(userQuery) {
    const clean = (userQuery || "").trim();
    const lower = clean.toLowerCase();

    let intent = "general_inquiry";
    if (lower.includes("perf") || lower.includes("speed") || lower.includes("cwv") || lower.includes("30") || lower.includes("40")) {
      intent = "performance_optimization";
    } else if (lower.includes("bank") || lower.includes("axis") || lower.includes("udaan") || lower.includes("sbi") || lower.includes("pnb")) {
      intent = "banking_enterprise";
    } else if (lower.includes("travel") || lower.includes("reddoorz") || lower.includes("hotel") || lower.includes("icuracao")) {
      intent = "hospitality_travel";
    } else if (lower.includes("react") || lower.includes("next") || lower.includes("fullstack") || lower.includes("node") || lower.includes("tech")) {
      intent = "fullstack_architecture";
    } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("phone")) {
      intent = "recruitment_contact";
    }

    return {
      rawQuery: clean,
      normalizedQuery: lower,
      intent
    };
  }

  /**
   * Pipeline Stage 3: Vector DB Similarity Retrieval
   */
  async retrieve(query, topK = 3) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return await this.vectorDb.search(query, topK);
  }

  /**
   * Pipeline Stage 4: Re-ranking & Relevance Filtering
   */
  rerank(queryInfo, candidateChunks) {
    // Re-score based on intent affinity and keyword density
    return candidateChunks.map(candidate => {
      let boost = 0;
      const tags = candidate.chunk.tags || [];
      tags.forEach(tag => {
        if (queryInfo.normalizedQuery.includes(tag.toLowerCase())) boost += 0.05;
      });

      const adjustedScore = Math.min(0.99, candidate.similarity + boost);
      return {
        ...candidate,
        similarity: adjustedScore,
        percentage: (adjustedScore * 100).toFixed(1) + "%"
      };
    }).sort((a, b) => b.similarity - a.similarity);
  }

  /**
   * Pipeline Stage 5: Context Augmentation (Prompt Formulation)
   */
  formulateAugmentedPrompt(query, topChunks) {
    const contextBody = topChunks
      .map((c, i) => `[Document ${i + 1}: ${c.chunk.title} | Confidence: ${c.percentage}]\n${c.chunk.content}`)
      .join("\n\n---\n\n");

    const systemInstructions = `You are Satyam Dubey's verified AI Copilot. Synthesize a professional, accurate response using ONLY the provided verified context documents. Adhere to factuality, highlight measurable production metrics (e.g. 30–40% performance gains), and format with structured markdown.`;

    return {
      systemInstructions,
      contextBody,
      fullPrompt: `${systemInstructions}\n\n=== VERIFIED CONTEXT DOCUMENTS ===\n${contextBody}\n\n=== USER QUESTION ===\n${query}`
    };
  }

  /**
   * Pipeline Stage 6: Full Execution Flow with Telemetry Trace
   */
  async execute(userQuery, onTokenUpdate, onComplete) {
    const pipelineStartTime = performance.now();

    // Stage 1: Query Ingestion
    const queryInfo = this.preprocessQuery(userQuery);

    // Stage 2 & 3: Vector DB Retrieval
    const retrievalStart = performance.now();
    const rawChunks = await this.retrieve(userQuery, 3);
    const retrievalLatency = (performance.now() - retrievalStart).toFixed(1);

    // Stage 4: Re-ranking
    const rankedChunks = this.rerank(queryInfo, rawChunks);

    // Stage 5: Context Augmentation
    const promptPackage = this.formulateAugmentedPrompt(userQuery, rankedChunks);

    // Prepare Pipeline Execution Trace
    const trace = {
      timestamp: new Date().toLocaleTimeString(),
      query: userQuery,
      intent: queryInfo.intent,
      retrievalLatencyMs: retrievalLatency,
      topKRetrieved: rankedChunks.length,
      chunks: rankedChunks,
      totalExecutionLatencyMs: 0,
      promptTokensEstimated: Math.round(promptPackage.fullPrompt.length / 4)
    };
    this.lastTrace = trace;

    // Stage 6: LLM Synthesis with Streaming
    await this.synthesizer.generateResponse(
      userQuery,
      rankedChunks,
      partialText => {
        if (onTokenUpdate) onTokenUpdate(partialText, trace);
      },
      (finalText, sources) => {
        trace.totalExecutionLatencyMs = (performance.now() - pipelineStartTime).toFixed(1);
        this.lastTrace = trace;
        if (onComplete) onComplete(finalText, sources, trace);
      }
    );

    return trace;
  }

  getTrace() {
    return this.lastTrace;
  }

  getConfig() {
    return this.vectorDb.getConfig();
  }
}

export const ragPipeline = new RAGPipeline();
