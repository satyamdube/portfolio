import React from 'react';
import { resumeData } from '../src/data/resumeData.js';

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="about-title">About Me</h2>
            <p>
              I am a passionate <strong>Sr. Frontend Developer &amp; Full Stack Developer with over 7 years of experience</strong> building dynamic, high-performance web applications. My core expertise spans <strong>React.js, Next.js, and TypeScript</strong> on the frontend, paired with robust backend services using <strong>Node.js, Express.js/NestJS</strong>, and databases (MySQL, MongoDB, Redis).
            </p>
            <p>
              I believe that <strong>performance is a feature</strong>. I focus heavily on writing clean, modular, and maintainable code. Whether it's managing complex state with Redux Toolkit / RTK Query, implementing Server-Side Rendering (SSR) for low-latency TTFB, or reducing load times by <strong>30–40% through code splitting and memoization</strong>, I enjoy solving hard engineering challenges.
            </p>
            <p>
              Beyond traditional web development, I actively work with modern AI architectures, specifically <strong>Retrieval-Augmented Generation (RAG)</strong> and semantic vector search using high-dimensional embeddings and cosine similarity to build intelligent, context-aware applications.
            </p>
          </div>

          <div className="about-stats-grid">
            {resumeData.metrics.map((m, idx) => (
              <div key={idx} className="about-stat-card">
                <div className="stat-val">{m.value}</div>
                <div className="stat-label">{m.label}</div>
                <div className="stat-sub">{m.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
