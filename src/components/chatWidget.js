/**
 * Satyam AI Copilot - Chat Widget Controller
 * Integrates in-browser Vector DB & RAG Semantic Retrieval with streaming synthesis
 */

import { ragPipeline } from "../rag/ragPipeline.js";

export function initChatWidget() {
  const toggleBtn = document.getElementById("ai-chat-toggle");
  const chatWindow = document.getElementById("ai-chat-window");
  const closeBtn = document.getElementById("ai-chat-close");
  const form = document.getElementById("ai-chat-form");
  const input = document.getElementById("ai-chat-input");
  const messagesContainer = document.getElementById("chat-messages");
  const suggestionChips = document.getElementById("suggestion-chips");
  const navTrigger = document.getElementById("nav-chat-trigger");
  const heroTrigger = document.getElementById("hero-ai-btn");
  const mobileChatTrigger = document.getElementById("mobile-chat-trigger");

  // RAG Inspector Elements
  const inspectorToggle = document.getElementById("rag-inspector-toggle");
  const inspectorDrawer = document.getElementById("rag-inspector-drawer");
  const inspectorChevron = document.getElementById("inspector-chevron");
  const inspectorChunks = document.getElementById("inspector-chunks");
  const inspectorStatus = document.getElementById("inspector-status-text");

  // Settings elements
  const settingsBtn = document.getElementById("ai-settings-btn");
  const settingsDrawer = document.getElementById("ai-settings-drawer");
  const providerSelect = document.getElementById("provider-select");
  const apiKeyGroup = document.getElementById("api-key-group");
  const apiKeyInput = document.getElementById("api-key-input");
  const saveSettingsBtn = document.getElementById("save-settings-btn");

  let isGenerating = false;

  // Initialize End-to-End RAG Pipeline
  ragPipeline.initialize().then(() => {
    const config = ragPipeline.getConfig();
    console.log("[ChatWidget] End-to-End RAG Pipeline initialized.", config);
    if (inspectorStatus) {
      inspectorStatus.innerHTML = `<strong>RAG Pipeline Ready:</strong> Vector DB (${config.provider}) · ${config.documentsCount} Chunks Indexed`;
    }
  });

  // Open / Close Window
  function openChat(initialQuery = null) {
    if (window.__closeNavDrawer) window.__closeNavDrawer();
    if (!chatWindow) return;
    chatWindow.classList.remove("hidden");
    input?.focus();
    if (initialQuery) {
      handleUserQuery(initialQuery);
    }
  }

  function closeChat() {
    if (chatWindow) chatWindow.classList.add("hidden");
  }

  toggleBtn?.addEventListener("click", () => {
    if (chatWindow.classList.contains("hidden")) {
      openChat();
    } else {
      closeChat();
    }
  });

  closeBtn?.addEventListener("click", closeChat);
  navTrigger?.addEventListener("click", () => openChat());
  heroTrigger?.addEventListener("click", () => openChat());
  mobileChatTrigger?.addEventListener("click", () => openChat());

  // RAG Inspector toggle
  inspectorToggle?.addEventListener("click", () => {
    inspectorDrawer.classList.toggle("hidden");
    inspectorChevron.classList.toggle("open");
  });

  // Settings toggle
  settingsBtn?.addEventListener("click", () => {
    settingsDrawer.classList.toggle("hidden");
  });

  providerSelect?.addEventListener("change", () => {
    apiKeyGroup.style.display = providerSelect.value === "builtin" ? "none" : "block";
  });

  saveSettingsBtn?.addEventListener("click", () => {
    ragPipeline.synthesizer.setCredentials(providerSelect.value, apiKeyInput.value.trim());
    settingsDrawer.classList.add("hidden");
  });

  // Suggestion chips
  suggestionChips?.querySelectorAll(".chip-btn").forEach(chip => {
    chip.addEventListener("click", () => {
      const query = chip.getAttribute("data-query");
      if (query && !isGenerating) {
        handleUserQuery(query);
      }
    });
  });

  // Form submission
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const query = input.value.trim();
    if (query && !isGenerating) {
      input.value = "";
      handleUserQuery(query);
    }
  });

  /**
   * Format intent code to human readable title
   */
  function formatIntent(intentCode) {
    const map = {
      performance_optimization: "Performance & CWV",
      banking_enterprise: "Banking & Enterprise",
      hospitality_travel: "Hospitality & Travel",
      fullstack_architecture: "Fullstack Architecture",
      recruitment_contact: "Contact & Hiring",
      general_inquiry: "General Inquiry"
    };
    return map[intentCode] || intentCode || "General Inquiry";
  }

  /**
   * Main query execution pipeline
   */
  async function handleUserQuery(query) {
    isGenerating = true;

    // 1. Append User Message
    appendMessage(query, "user");

    // 2. Append Assistant Message in streaming mode
    const assistantBubble = appendMessage("", "assistant", true);

    // 3. Update inspector to indicate active pipeline stages
    if (inspectorStatus) {
      inspectorStatus.innerHTML = `<span class="inspector-pulse active"></span> <em>Executing RAG Pipeline for query...</em>`;
    }

    try {
      // Execute 6-stage RAG Pipeline
      await ragPipeline.execute(
        query,
        (partialText, trace) => {
          assistantBubble.innerHTML = formatMarkdown(partialText);
          updateInspector(query, trace);
          scrollToBottom();
        },
        (finalText, sources, trace) => {
          // Format text with telemetry footer
          let finalHtml = formatMarkdown(finalText);
          finalHtml += `
            <div class="message-pipeline-footer">
              <span class="pipeline-pill intent-pill" title="Intent classified via semantic rules">🎯 ${formatIntent(trace.intent)}</span>
              <span class="pipeline-pill latency-pill" title="Vector DB Cosine Search Latency">⚡ ${trace.retrievalLatencyMs}ms vector fetch</span>
              <span class="pipeline-pill chunks-pill" title="Top-K knowledge chunks retrieved and re-ranked">📚 ${trace.topKRetrieved} sources</span>
              <button class="pipeline-inspect-btn" id="inspect-trace-btn" title="View Full RAG Pipeline Telemetry">Inspect Trace ↗</button>
            </div>
          `;
          assistantBubble.innerHTML = finalHtml;

          // Attach listener to trace inspect button
          const inspectBtn = assistantBubble.querySelector("#inspect-trace-btn");
          inspectBtn?.addEventListener("click", () => {
            inspectorDrawer?.classList.remove("hidden");
            inspectorChevron?.classList.add("open");
            inspectorDrawer?.scrollIntoView({ behavior: "smooth", block: "nearest" });
          });

          updateInspector(query, trace);
          scrollToBottom();
          isGenerating = false;
        }
      );
    } catch (err) {
      console.error("[ChatWidget] RAG Pipeline error:", err);
      assistantBubble.innerHTML = `<p>I apologize, but an error occurred during RAG pipeline execution. You can reach Satyam directly at <a href="mailto:satyamdubey9450@gmail.com">satyamdubey9450@gmail.com</a>.</p>`;
      isGenerating = false;
    }
  }

  function appendMessage(text, role, isStreaming = false) {
    const row = document.createElement("div");
    row.className = `message-row ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    if (!isStreaming) {
      bubble.innerHTML = formatMarkdown(text);
    } else {
      bubble.innerHTML = `
        <div class="pipeline-progress-ticker">
          <div class="ticker-spinner"></div>
          <span>Executing RAG Vector Retrieval &amp; Neural Synthesis...</span>
        </div>
      `;
    }

    row.appendChild(bubble);
    messagesContainer.appendChild(row);
    scrollToBottom();
    return bubble;
  }

  function updateInspector(query, trace) {
    if (!inspectorChunks || !inspectorStatus) return;

    if (!trace) return;

    inspectorStatus.innerHTML = `<strong>RAG Trace:</strong> ${trace.retrievalLatencyMs}ms · ${trace.topKRetrieved} Chunks · Intent: ${formatIntent(trace.intent)}`;

    const chunksHtml = (trace.chunks || [])
      .map((r, i) => `
        <div class="retrieved-chunk-item">
          <div class="chunk-title-row">
            <span class="chunk-index">#${i + 1} ${r.chunk.title}</span>
            <span class="chunk-score">${r.percentage}</span>
          </div>
          <div class="chunk-meta-row">
            <span class="chunk-source">${r.source || 'vector_db'}</span>
            <span class="chunk-tags">${(r.chunk.tags || []).slice(0, 3).map(t => `#${t}`).join(' ')}</span>
          </div>
          <div class="chunk-preview">${r.chunk.content.slice(0, 130)}...</div>
        </div>
      `)
      .join("");

    inspectorChunks.innerHTML = `
      <div class="inspector-telemetry-bar">
        <div class="telemetry-pill">
          <span class="telemetry-label">Intent:</span>
          <span class="telemetry-val">${formatIntent(trace.intent)}</span>
        </div>
        <div class="telemetry-pill">
          <span class="telemetry-label">Vector Search:</span>
          <span class="telemetry-val">${trace.retrievalLatencyMs} ms</span>
        </div>
        <div class="telemetry-pill">
          <span class="telemetry-label">Prompt Tokens:</span>
          <span class="telemetry-val">~${trace.promptTokensEstimated || 0}</span>
        </div>
        <div class="telemetry-pill">
          <span class="telemetry-label">Total Pipeline:</span>
          <span class="telemetry-val">${trace.totalExecutionLatencyMs ? trace.totalExecutionLatencyMs + ' ms' : 'Streaming...'}</span>
        </div>
      </div>
      <div class="inspector-stages-flow">
        <span class="stage-step completed">1. Query Preprocess</span>
        <span class="stage-arrow">→</span>
        <span class="stage-step completed">2. Vector Retrieval</span>
        <span class="stage-arrow">→</span>
        <span class="stage-step completed">3. Re-ranking</span>
        <span class="stage-arrow">→</span>
        <span class="stage-step ${trace.totalExecutionLatencyMs ? 'completed' : 'active'}">4. LLM Synthesis</span>
      </div>
      <div class="inspector-chunks-header">Top Re-Ranked Vector Chunks (${(trace.chunks || []).length}):</div>
      ${chunksHtml}
    `;
  }


  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  /**
   * Safe, lightweight Markdown formatter
   */
  function formatMarkdown(text) {
    if (!text) return "";
    let html = text
      // Escape script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      // Blockquotes
      .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      // Links
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Unordered lists
      .replace(/^\s*[-*]\s+(.*$)/gim, "<li>$1</li>");

    // Wrap list items
    html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");
    // Clean duplicate <ul><ul>
    html = html.replace(/<\/ul>\s*<ul>/g, "");

    // Paragraphs
    const paragraphs = html.split("\n\n").filter(p => p.trim().length > 0);
    return paragraphs
      .map(p => {
        if (p.startsWith("<h") || p.startsWith("<ul") || p.startsWith("<blockquote")) {
          return p;
        }
        return `<p>${p.replace(/\n/g, "<br/>")}</p>`;
      })
      .join("");
  }
}
