import React from 'react';
import { resumeData } from '../src/data/resumeData.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <div className="footer-logo">Satyam Dubey</div>
          <p className="footer-tagline">
            Crafted with React, Next.js App Router, Vanilla CSS &amp; Client-Side RAG Vector Engine.
          </p>
        </div>
        <div className="footer-links">
          <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={resumeData.personal.githubPortfolio} target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
          <a href={`mailto:${resumeData.personal.email}`}>Email</a>
          <a href="#home">Back to Top ↑</a>
        </div>
      </div>
    </footer>
  );
}
