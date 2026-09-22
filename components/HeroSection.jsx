'use client';

import React from 'react';
import { resumeData } from '../src/data/resumeData.js';

export default function HeroSection({ onOpenResume, onOpenChat }) {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-layout">
        <div className="hero-content">
          <div className="hero-status-row">
            <div className="hero-avatar">
              <img src="/satyam-dubey.jpg" alt="Satyam Dubey" />
            </div>
            <div className="availability-pill">
              <span className="pulse-dot-green" />
              <span>Available for Opportunities</span>
            </div>
          </div>

          <h1 className="hero-title">
            Hi, I'm<br />
            <span className="text-accent">Satyam Dubey.</span>
          </h1>

          <h2 className="hero-subheading">
            Sr. Frontend Developer / Full Stack Developer
          </h2>

          <div className="hero-tech-mono">
            React.js · Next.js · Node.js · TypeScript · Redux Toolkit
          </div>

          <p className="hero-description">
            Sr. Frontend Developer / Full Stack Developer with <strong>7+ years of experience</strong> building scalable, high-performance web applications and seamlessly integrating complex APIs and third-party services.
          </p>

          {/* Action CTA Group */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary btn-lg shimmer-btn">
              <span>View My Work →</span>
            </a>
            <button id="hero-resume-btn" className="btn btn-outline btn-lg" onClick={onOpenResume}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
              </svg>
              <span>Download Resume</span>
            </button>
            <button
              id="hero-ai-btn"
              className="btn btn-glass btn-lg"
              onClick={() => onOpenChat()}
            >
              <span className="ai-spark-icon">⚡</span>
              <span>Query Satyam AI (RAG)</span>
            </button>
          </div>

          {/* Social Links Row */}
          <div className="hero-socials">
            <a
              href="mailto:satyamdubey9450@gmail.com"
              className="social-link"
              title="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </a>
            <a
              href="tel:+918586864294"
              className="social-link"
              title="Phone / WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            <a
              href={resumeData.personal.linkedin}
              className="social-link"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href={resumeData.personal.githubPortfolio}
              className="social-link"
              title="GitHub Portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Code Card on Right */}
        <div className="hero-visual">
          <div className="code-card-surface">
            <div className="card-topbar">
              <div className="window-dots">
                <span className="window-dot red" />
                <span className="window-dot yellow" />
                <span className="window-dot green" />
              </div>
              <span className="file-name">engineer.ts</span>
            </div>
            <div className="code-body">
              <div><span className="code-keyword">const</span> <span className="code-var">engineer</span> = &#123;</div>
              <div>&nbsp;&nbsp;<span className="code-prop">name</span>: <span className="code-str">"Satyam Dubey"</span>,</div>
              <div>&nbsp;&nbsp;<span className="code-prop">role</span>: <span className="code-str">"Sr. Frontend / Full Stack Developer"</span>,</div>
              <div>&nbsp;&nbsp;<span className="code-prop">email</span>: <span className="code-str">"satyamdubey9450@gmail.com"</span>,</div>
              <div>&nbsp;&nbsp;<span className="code-prop">contact</span>: <span className="code-str">"+91 8586864294"</span>,</div>
              <div>&nbsp;&nbsp;<span className="code-prop">skills</span>: [</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-str">"Frontend Development"</span>,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-str">"Backend Development"</span>,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-str">"API Creation &amp; Integration"</span>,</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-str">"State Management"</span></div>
              <div>&nbsp;&nbsp;],</div>
              <div>&nbsp;&nbsp;<span className="code-prop">experience</span>: <span className="code-str">"7+ years"</span>,</div>
              <div>&nbsp;&nbsp;<span className="code-prop">status</span>: <span className="code-str">"open_to_work"</span> <span className="code-success">✓</span></div>
              <div>&#125;;</div>
              <div className="prompt-line">
                <span>&gt; Ready to build something great</span><span className="cursor-blink" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
