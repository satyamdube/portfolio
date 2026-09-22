/**
 * RAG Orchestration Engine
 * Coordinates vector retrieval from the knowledge base and generates structured context blocks
 */

import { VectorDatabase } from "./vectorDb.js";
import { ragKnowledgeBase } from "../data/ragKnowledgeBase.js";

class RAGEngine {
  constructor() {
    this.vectorDb = new VectorDatabase();
    this.isReady = false;
  }

  /**
   * Initialize and index the knowledge base
   */
  async init() {
    if (this.isReady) return;
    this.vectorDb.index(ragKnowledgeBase);
    this.isReady = true;
  }

  /**
   * Return Vector DB config from environment
   */
  getConfig() {
    return this.vectorDb.getConfig();
  }

  /**
   * Execute semantic vector search and retrieve top-k chunks
   */
  async retrieve(query, topK = null) {
    if (!this.isReady) {
      await this.init();
    }
    return await this.vectorDb.search(query, topK);
  }

  /**
   * Format context block for synthesis
   */
  buildContext(retrievedChunks) {
    return retrievedChunks
      .map((item, index) => {
        return `[Source ${index + 1}: ${item.chunk.title} | Relevance: ${item.percentage}]\n${item.chunk.content}`;
      })
      .join("\n\n---\n\n");
  }
}

export const ragEngine = new RAGEngine();
