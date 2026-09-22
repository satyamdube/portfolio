'use client';

import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal"
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target.id === 'project-modal') onClose();
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span className="modal-category" id="modal-category">
              {project.categoryLabel}
            </span>
            <h3 className="modal-title" id="modal-title">
              {project.title}
            </h3>
          </div>
          <button className="modal-close" id="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <div className="modal-body" id="modal-body">
          <h4>Project Architecture &amp; Overview</h4>
          <p>{project.details}</p>

          <h4>Key Engineering Contributions</h4>
          <ul>
            {project.highlights.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>

          <h4>Performance &amp; Scale Metrics</h4>
          <p>
            <strong>Impact:</strong> {project.metrics}
          </p>

          <h4>Technology Stack</h4>
          <div className="project-tech-tags" style={{ marginTop: '0.5rem' }}>
            {project.technologies.map((t, idx) => (
              <span key={idx} className="tech-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-footer" id="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span>Visit Production Application</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
