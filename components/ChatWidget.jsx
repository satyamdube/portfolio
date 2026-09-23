'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ragPipeline } from '../src/rag/ragPipeline.js';

function formatMarkdown(text) {
  if (!text) return '';
  let html = text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:|tel:)[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>')
    .replace(/^\s*(\d+\.)\s+(.*$)/gim, '<li><strong>$1</strong> $2</li>');

  html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');

  const paragraphs = html.split(/\n\n+/);
  return paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (
        trimmed.startsWith('<h3>') ||
        trimmed.startsWith('<h2>') ||
        trimmed.startsWith('<ul>') ||
        trimmed.startsWith('<blockquote>')
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');
}

function formatIntent(intentCode) {
  const map = {
    performance_optimization: 'Performance & CWV',
    banking_enterprise: 'Banking & Enterprise',
    hospitality_travel: 'Hospitality & Travel',
    fullstack_architecture: 'Fullstack Architecture',
    recruitment_contact: 'Contact & Hiring',
    general_inquiry: 'General Inquiry'
  };
  return map[intentCode] || intentCode || 'General Inquiry';
}

export default function ChatWidget({ isOpen, onClose, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `<strong>Hello! I am Satyam's AI Copilot.</strong>\n\nI have direct access to an in-browser vector database indexing Satyam's 7+ years of experience across Frontend Development (React.js, Next.js, TypeScript), enterprise banking (Axis Edge, PNB Udaan), high-concurrency booking platforms (RedDoorz), and fullstack services.\n\nWhat would you like to explore?`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [provider, setProvider] = useState('builtin');
  const [apiKey, setApiKey] = useState('');
  const [ragStatusText, setRagStatusText] = useState('Initializing in-browser Vector Engine...');
  const [currentTrace, setCurrentTrace] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    ragPipeline.initialize().then(() => {
      const config = ragPipeline.getConfig();
      setRagStatusText(`RAG Pipeline Ready: Vector DB (${config.provider}) · ${config.documentsCount} Chunks Indexed`);
    });

    if (typeof window !== 'undefined') {
      const storedProvider = localStorage.getItem('satyam_llm_provider');
      const storedKey = localStorage.getItem('satyam_llm_api_key');
      if (storedProvider) setProvider(storedProvider);
      if (storedKey) setApiKey(storedKey);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveSettings = () => {
    ragPipeline.synthesizer.setCredentials(provider, apiKey.trim());
    setIsSettingsOpen(false);
  };

  const handleSend = async (queryToSend) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || isGenerating) return;

    setInputQuery('');
    setIsGenerating(true);

    // Atomically append user message and streaming assistant placeholder
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: q },
      { role: 'assistant', text: '', isStreaming: true }
    ]);

    try {
      await ragPipeline.execute(
        q,
        (partialText, trace) => {
          if (trace) setCurrentTrace(trace);
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: 'assistant',
              text: partialText,
              isStreaming: true,
              trace: trace || copy[copy.length - 1]?.trace
            };
            return copy;
          });
        },
        (finalResult, sources, trace) => {
          // Resolve finalText whether passed as string or object
          const resolvedText = typeof finalResult === 'string'
            ? finalResult
            : (finalResult?.answer || finalResult?.text || '');

          const resolvedTrace = trace || (sources && !Array.isArray(sources) ? sources : null);
          if (resolvedTrace) setCurrentTrace(resolvedTrace);

          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: 'assistant',
              text: resolvedText,
              isStreaming: false,
              trace: resolvedTrace || copy[copy.length - 1]?.trace
            };
            return copy;
          });
          setIsGenerating(false);
        }
      );
    } catch (err) {
      console.error('[ChatWidget] Error during generation:', err);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'assistant',
          text: `An error occurred: ${err.message}. Please try again.`,
          isStreaming: false
        };
        return copy;
      });
      setIsGenerating(false);
    }
  };

  return (
    <div id="ai-chat-root">
      {/* Floating Launcher Trigger Button */}
      <button
        id="ai-chat-toggle"
        className="ai-launcher"
        onClick={onToggle}
        aria-label="Open Satyam AI Copilot"
      >
        <div className="launcher-glow" />
        <div className="launcher-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
            <rect x="4" y="8" width="16" height="12" rx="4" />
            <circle cx="9" cy="13" r="1.5" fill="currentColor" />
            <circle cx="15" cy="13" r="1.5" fill="currentColor" />
            <path d="M10 17h4" />
          </svg>
        </div>
        <span className="launcher-text">Ask Satyam AI</span>
        <span className="launcher-pulse" />
      </button>

      {/* Chat Window Container */}
      <div id="ai-chat-window" className={`ai-chat-window ${isOpen ? '' : 'hidden'}`}>
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="ai-avatar">
              <img src="/satyam-dubey.jpg" alt="Satyam Dubey" />
              <span className="ai-online-dot" />
            </div>
            <div>
              <div className="ai-title-row">
                <h3 className="ai-name">Satyam AI Copilot</h3>
                <span className="rag-indicator-badge">RAG Vector DB</span>
              </div>
              <p className="ai-status">Retrieval-Augmented Assistant</p>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              id="ai-settings-btn"
              className="icon-btn"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              title="Configure LLM API Provider"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
            <button id="ai-chat-close" className="icon-btn" onClick={onClose} title="Close AI Copilot">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Settings Drawer */}
        {isSettingsOpen && (
          <div id="ai-settings-drawer" className="settings-drawer">
            <div className="settings-content">
              <h4>AI Inference Engine</h4>
              <p className="settings-sub">
                By default, the Copilot uses an in-browser RAG Vector Engine with zero setup needed. Optionally plug in your own API key below.
              </p>
              <div className="form-group">
                <label htmlFor="provider-select">Engine Provider</label>
                <select
                  id="provider-select"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <option value="builtin">Instant In-Browser RAG (Recommended)</option>
                  <option value="groq">Groq Llama 3.3 (Ultra Fast Cloud)</option>
                  <option value="openai">OpenAI GPT-4o-mini</option>
                </select>
              </div>
              {provider !== 'builtin' && (
                <div className="form-group" id="api-key-group">
                  <label htmlFor="api-key-input">API Key</label>
                  <input
                    type="password"
                    id="api-key-input"
                    placeholder="gsk_... or sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
              )}
              <button id="save-settings-btn" className="btn btn-primary btn-sm" onClick={handleSaveSettings}>
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Live RAG Inspector */}
        <div
          className="rag-inspector-bar"
          id="rag-inspector-toggle"
          onClick={() => setIsInspectorOpen(!isInspectorOpen)}
        >
          <div className="inspector-summary">
            <span className={`inspector-pulse ${isGenerating ? 'active' : ''}`} />
            <span id="inspector-status-text">{ragStatusText}</span>
          </div>
          <span className={`inspector-arrow ${isInspectorOpen ? 'open' : ''}`}>▼</span>
        </div>

        {isInspectorOpen && (
          <div className="rag-inspector-drawer" id="rag-inspector-drawer">
            <div className="inspector-header">
              <span>RAG Pipeline Telemetry</span>
              <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: 'normal' }}>
                Vector Cosine Sim + Re-ranking
              </span>
            </div>
            <div className="inspector-chunks-list" id="inspector-chunks">
              {currentTrace ? (
                <div>
                  <div className="inspector-telemetry-bar">
                    <div className="telemetry-pill">
                      <span className="telemetry-label">Intent:</span>
                      <span className="telemetry-val">{formatIntent(currentTrace.intent)}</span>
                    </div>
                    <div className="telemetry-pill">
                      <span className="telemetry-label">Vector Search:</span>
                      <span className="telemetry-val">{currentTrace.retrievalLatencyMs} ms</span>
                    </div>
                  </div>
                  <div className="inspector-chunks-header">
                    Top Chunks ({(currentTrace.chunks || []).length}):
                  </div>
                  {(currentTrace.chunks || []).map((chunkItem, cIdx) => (
                    <div key={cIdx} className="retrieved-chunk-item">
                      <div className="chunk-title-row">
                        <span className="chunk-index">#{cIdx + 1} {chunkItem.chunk?.title}</span>
                        <span className="chunk-score">{chunkItem.percentage}</span>
                      </div>
                      <div className="chunk-preview">{chunkItem.chunk?.content?.slice(0, 90)}...</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="inspector-empty">
                  Ask any question to inspect live RAG execution, vector latency, and re-ranked chunks.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="chat-messages" id="chat-messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`message-row ${m.role}`}>
              <div className="message-bubble">
                <div dangerouslySetInnerHTML={{ __html: formatMarkdown(m.text) }} />
                {m.trace && (
                  <div className="message-pipeline-footer">
                    <span className="pipeline-pill intent-pill">
                      Intent: {formatIntent(m.trace.intent)}
                    </span>
                    <span className="pipeline-pill latency-pill">
                      {m.trace.retrievalLatencyMs}ms
                    </span>
                    <span className="pipeline-pill chunks-pill">
                      {m.trace.chunks?.length || 0} chunks
                    </span>
                  </div>
                )}
                {m.isStreaming && (
                  <div className="pipeline-progress-ticker">
                    <span className="ticker-spinner" />
                    <span>Synthesizing response...</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="suggestion-chips" id="suggestion-chips">
          {[
            { label: 'React & Next.js', query: "Tell me about Satyam's React and Next.js experience" },
            { label: '30-40% Speed Gains', query: 'How does he achieve 30-40% performance improvement?' },
            { label: 'Axis & PNB Banking', query: 'What was his role on the Axis Bank and PNB projects?' },
            { label: 'Node.js & Backend', query: 'Tell me about his Node.js and backend API skills' }
          ].map((chip, cIdx) => (
            <button
              key={cIdx}
              className="chip-btn"
              onClick={() => handleSend(chip.query)}
              disabled={isGenerating}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Chat Input Form */}
        <form
          id="ai-chat-form"
          className="chat-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            id="ai-chat-input"
            placeholder="Ask anything about Satyam's skills or projects..."
            autoComplete="off"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            required
          />
          <button
            type="submit"
            id="ai-chat-send"
            className="send-btn"
            aria-label="Send message"
            disabled={isGenerating}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
