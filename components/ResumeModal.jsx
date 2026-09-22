'use client';

import React, { useEffect } from 'react';
import { resumeData } from '../src/data/resumeData.js';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="resume-modal"
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target.id === 'resume-modal') onClose();
      }}
    >
      <div className="modal-card resume-card">
        <div className="modal-header">
          <div>
            <span className="modal-category">Curriculum Vitae</span>
            <h3 className="modal-title">Satyam Dubey — Resume</h3>
          </div>
          <div className="resume-modal-actions">
            <button
              id="print-resume-btn"
              className="btn btn-outline btn-sm"
              onClick={() => window.print()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print / PDF</span>
            </button>
            <button className="modal-close" id="resume-close-btn" onClick={onClose} aria-label="Close modal">
              ×
            </button>
          </div>
        </div>

        <div className="modal-body resume-preview-body" id="resume-content-area">
          <div className="resume-sheet">
            <header
              className="resume-header"
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '1rem'
              }}
            >
              <img
                src="/satyam-dubey.jpg"
                alt="Satyam Dubey"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #2563eb',
                  flexShrink: 0
                }}
              />
              <div>
                <h1 style={{ margin: 0, fontSize: '1.85rem', color: '#0f172a' }}>
                  {resumeData.personal.name}
                </h1>
                <div
                  className="resume-title"
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: '#2563eb',
                    margin: '0.2rem 0'
                  }}
                >
                  {resumeData.personal.title} · {resumeData.personal.experience}
                </div>
                <div className="resume-contact-line" style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                  {resumeData.personal.location} | Phone:{' '}
                  <a href={`tel:${resumeData.personal.phone}`}>{resumeData.personal.phone}</a> | Email:{' '}
                  <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a> | LinkedIn:{' '}
                  <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/satyam8586864294
                  </a>{' '}
                  | Portfolio:{' '}
                  <a href={resumeData.personal.githubPortfolio} target="_blank" rel="noopener noreferrer">
                    satyamdube.github.io/portfolio
                  </a>
                </div>
              </div>
            </header>

            <h2>Professional Summary</h2>
            <p>{resumeData.summary}</p>

            <h2>Core Skills</h2>
            <p>
              <strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), Vue.js, Redux Toolkit / RTK Query, HTML5, CSS3, Tailwind CSS, SCSS, Responsive Design, Performance Optimization, Accessibility, Jest, React Testing Library
            </p>
            <p>
              <strong>Backend:</strong> Node.js, Express.js, NestJS, REST APIs, GraphQL, Authentication &amp; Authorization (JWT/OAuth), Middleware, WebSockets
            </p>
            <p>
              <strong>System Architecture:</strong> Microservices &amp; Distributed Systems, Next.js App Router &amp; Server-Side Streaming (SSR), Component Design Systems, Load Balancing, Rate Limiting, API Gateways
            </p>
            <p>
              <strong>Databases:</strong> MySQL, MongoDB, Redis (Caching &amp; Rate Limiting), SQL Indexing, Query Optimization
            </p>
            <p>
              <strong>System Design &amp; DevOps:</strong> API Architecture, Microservices Basics, Load Balancing, Docker, Git/GitHub CI/CD, Azure/AWS Basics, Nginx, Linux
            </p>
            <p>
              <strong>E-Commerce Fundamentals:</strong> Core Web Vitals (30-40% boost), SEO, Conversion Optimization, GA4/GTM Analytics
            </p>

            <h2>Professional Experience</h2>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span>{exp.role} — {exp.company}</span>
                  <span style={{ fontWeight: 500, color: '#64748b' }}>{exp.period}</span>
                </div>
                <ul>
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h2>Key Flagship Projects</h2>
            <ul>
              <li><strong>Axis Edge Project</strong> (traveledge.axis.bank.in): Scalable travel &amp; rewards platform for Axis Bank, API integration, 35% load time boost.</li>
              <li><strong>BCG UDAAN Project</strong> (Punjab National Bank - udaan.pnb.bank.in): Enterprise digital banking transformation with Boston Consulting Group, reusable component architecture.</li>
              <li><strong>RedDoorz Platform</strong> (reddoorz.com): High-traffic hospitality platform serving millions of users across Southeast Asia, dynamic room booking and high concurrency.</li>
              <li><strong>Vernost iCuracao Travel Project</strong> (travel.icuracao.com): Responsive travel booking portal built with React.js &amp; Next.js.</li>
              <li><strong>SBI Card Project</strong>: Reusable component architecture, high security, API integrations, and UX latency reduction.</li>
              <li><strong>ThinkExam Platform</strong> (thinkexam.com): Online assessment platform with zero-latency test taking, WebSocket sync, and anti-cheat capabilities.</li>
            </ul>

            <h2>Education &amp; Awards</h2>
            <p><strong>Education:</strong> BCA (Information Technology) · Diploma in IT · 12th (PCM)</p>
            <p><strong>Awards:</strong> Outstanding Performer Award — GingerWebs Pvt. Ltd. (2020)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
