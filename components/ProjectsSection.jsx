'use client';

import React, { useState } from 'react';
import { resumeData } from '../src/data/resumeData.js';

export default function ProjectsSection({ onOpenCaseStudy }) {
  const [filter, setFilter] = useState('all');

  const filteredProjects =
    filter === 'all'
      ? resumeData.projects
      : resumeData.projects.filter((p) => p.category === filter);

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
            Projects
          </h2>
          <p className="section-subtitle">
            Selected production applications built for enterprise banking, travel, and high concurrency.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="filter-bar" id="project-filters">
          {[
            { key: 'all', label: 'All Platforms' },
            { key: 'banking', label: 'Enterprise & Banking' },
            { key: 'travel', label: 'Travel & Hospitality' },
            { key: 'fullstack', label: 'EdTech & Fullstack' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`filter-btn ${filter === tab.key ? 'active' : ''}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid" id="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card" data-id={project.id}>
              <div>
                <div className="project-card-top">
                  <span className={`project-category-badge ${project.category}`}>
                    {project.categoryLabel}
                  </span>
                  <div className="project-live-indicator">
                    <span className="project-live-dot" />
                    <span>Production</span>
                  </div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-role">{project.role}</div>
                <p className="project-summary">{project.summary}</p>
                <div className="project-metric-pill">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  <span>{project.metrics}</span>
                </div>
                <div className="project-tech-tags">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-actions">
                <button
                  className="btn btn-primary btn-sm btn-deep-dive"
                  onClick={() => onOpenCaseStudy(project)}
                >
                  <span>Case Study</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <span>Live Site</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
